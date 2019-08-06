import datetime
import logging
import random
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from itertools import product

import requests

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

            try:
                app_id = data['appid']
            except Exception as e:
                app_id = ''

            try:
                game_type = data['apptag']
            except Exception as e:
                game_type = ''

            online = 'Y'

            if JackboxRoom.objects.filter(room_code=str(code)).exists() is True:
                room_data = JackboxRoom.objects.get(room_code=str(code))
                room_data.server = str(server)
                room_data.game_type = str(game_type)
                room_data.app_id = str(app_id)
                room_data.player_amount = data['numPlayers']
                room_data.audience_amount = data['numAudience']
                room_data.join_able = str(data['joinAs'])
                room_data.locked = str(locked)
                room_data.last_updated = str(datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S'))
                room_data.online = online
                room_data.save()
            else:
                room_data = JackboxRoom(room_code=str(code), server=str(server), game_type=str(data['apptag']),
                                        app_id=str(app_id), player_amount=data['numPlayers'],
                                        audience_amount=data['numAudience'], join_able=str(data['joinAs']),
                                        locked=str(locked),
                                        last_updated=str(datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S')),
                                        online=online)
                room_data.save()

        else:
            online = 'N'

            if JackboxRoom.objects.filter(room_code=str(code)).exists() is True:
                room_data = JackboxRoom.objects.get(room_code=str(code))
                room_data.server = None
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
                room_data = JackboxRoom(room_code=str(code), server=None, game_type=None,
                                        app_id=None, player_amount=None,
                                        audience_amount=None, join_able=None,
                                        locked=None,
                                        last_updated=str(datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S')),
                                        online=online)
                room_data.save()

    except Exception as e:
        raise e


def spawn_room_thread(letter, code_list):
    with ThreadPoolExecutor(max_workers=64) as executor:
        room_list = [letter + x for x in code_list]
        futures = [executor.submit(get_room_response, code) for code in room_list]
        try:
            for future in as_completed(futures):
                future.result()
        except KeyboardInterrupt as e:
            raise


def set_room_data():
    while True:
        code_list = generate_room_codes(4)
        for code in code_list:
            get_room_response(code)

    # while True:
    #     code_list = generate_room_codes(3)
    #     # for code in code_list:
    #     #     get_room_response(code)
    #
    #     letter_list = list(string.ascii_uppercase)
    #     for letter in letter_list:
    #         t = threading.Thread(target=spawn_room_thread, args=(letter, code_list), kwargs={})
    #         t.setDaemon(True)
    #         t.start()

    # while True:
    #     code_list = generate_room_codes(4)
    #     with ThreadPoolExecutor(max_workers=64) as executor:
    #         futures = [executor.submit(get_room_response, code) for code in code_list]
    #         try:
    #             for future in as_completed(futures):
    #                 future.result()
    #         except KeyboardInterrupt as e:
    #             raise
    #             executor._threads.clear()
    #             thread._threads_queues.clear()
