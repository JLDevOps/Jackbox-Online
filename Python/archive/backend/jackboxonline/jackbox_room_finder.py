import datetime
import threading
from itertools import product
import logging
import time
import random
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
from .models import JackboxRoom

base_url = "https://blobcast.jackboxgames.com/room/"
logger = logging.getLogger(__name__)
max_attempts = 100
attempts = 0


def generate_room_codes(length):
    chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    code_list = [''.join(i) for i in product(chars, repeat=length)]
    return code_list


def get_room_response(code):
    global attempts

    try:
        jackbox_url = base_url + str(code)

        while attempts < max_attempts:
            r = requests.get(url=jackbox_url)

            # If not rate limited, break out of while loop and continue with the rest of the code
            if r.status_code != 429:
                break

            # If rate limited, wait and try again
            time.sleep((2 ** attempts) + random.random())
            attempts = attempts + 1

        if r.status_code == 200:
            data = r.json()
            try:
                server = data['server']
            except Exception as e:
                server = ''

            try:
                locked = data['locked']
            except Exception as e:
                locked = 'False'


            # room_row = str(data['roomid']) + ',' + server + ',' + data['apptag'] + ',' + data[
            #     'appid'] + ',' + str(data['numPlayers']) + ',' + str(data['numAudience']) + ',' + data[
            #                'joinAs'] + ',' + str(locked) + ',' + str(
            #     datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S')) + ','
            # print(room_row)

            online = 'Y'

            if JackboxRoom.objects.filter(room_code=str(code)).exists() is True:
                room_data = JackboxRoom.objects.get(room_code=str(code))
                room_data.game_type = str(data['apptag'])
                room_data.app_id = str(data['app_id'])
                room_data.player_amount = data['numPlayers']
                room_data.audience_amount = data['numAudience']
                room_data.join_able = str(data['joinAs'])
                room_data.locked = str(locked)
                room_data.last_updated = str(datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S'))
                room_data.online = online
                room_data.save()
            else:
                room_data = JackboxRoom(room_code=str(code), game_type=str(data['apptag']),
                                        app_id=str(data['app_id']), player_amount=data['numPlayers'],
                                        audience_amount=data['numAudience'], join_able=str(data['joinAs']),
                                        locked=str(locked),
                                        last_updated=str(datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S')),
                                        online=online)
                room_data.save()

        else:
            online = 'N'

            if JackboxRoom.objects.filter(room_code=str(code)).exists() is True:
                room_data = JackboxRoom.objects.get(room_code=str(code))
                room_data.game_type = None
                room_data.app_id = None
                room_data.player_amount = None
                room_data.audience_amount = None
                room_data.join_able = None
                room_data.locked = None
                room_data.last_updated = str(datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S'))
                room_data.online = online
                room_data.save()
            else:
                room_data = JackboxRoom(room_code=str(code), game_type=None,
                                        app_id=None, player_amount=None,
                                        audience_amount=None, join_able=None,
                                        locked=None,
                                        last_updated=str(datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S')),
                                        online=online)
                room_data.save()

            # print('Room Not Found: ' + str(code))
            # logger.info('Room Saved: ' + str(code))

    except Exception as e:
        print("Error: " + str(e))


def set_room_data():
    while True:
        code_list = generate_room_codes(4)
        for code in code_list:
            get_room_response(code)

    # while True:
    #     code_list = generate_room_codes(4)
    #     # for code in code_list:
    #     #     get_room_response(code)
    #     with ThreadPoolExecutor(max_workers=10) as executor:
    #         futures = [executor.submit(get_room_response, code) for code in code_list]
    #         try:
    #             for future in as_completed(futures):
    #                 future.result()
    #         except KeyboardInterrupt as e:
    #             raise
    #             # executor._threads.clear()
    #             # thread._threads_queues.clear()

#
# def main():
#     set_room_data()
#
#
# if __name__ == "__main__":
#     main()
