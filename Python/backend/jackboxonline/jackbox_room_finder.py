import datetime
import threading
from itertools import product
import logging
import time
import random
from multiprocessing import Process
from multiprocessing.pool import Pool
from django.conf import settings

import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
from .models import JackboxRoom
import string
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
                appId = data['app_id']
            except Exception as e:
                appId = ''

            try:
                appId = data['appid']
            except Exception as e:
                appId = ''




            # room_row = str(data['roomid']) + ',' + server + ',' + data['apptag'] + ',' + data[
            #     'appid'] + ',' + str(data['numPlayers']) + ',' + str(data['numAudience']) + ',' + data[
            #                'joinAs'] + ',' + str(locked) + ',' + str(
            #     datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S')) + ','
            # print(room_row)

            online = 'Y'

            if JackboxRoom.objects.filter(room_code=str(code)).exists() is True:
                room_data = JackboxRoom.objects.get(room_code=str(code))
                room_data.game_type = str(data['apptag'])
                room_data.app_id = str(appId)
                room_data.player_amount = data['numPlayers']
                room_data.audience_amount = data['numAudience']
                room_data.join_able = str(data['joinAs'])
                room_data.locked = str(locked)
                room_data.last_updated = str(datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S'))
                room_data.online = online
                room_data.save()
            else:
                room_data = JackboxRoom(room_code=str(code), game_type=str(data['apptag']),
                                        app_id=str(appId), player_amount=data['numPlayers'],
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
    # while True:
    #     code_list = generate_room_codes(4)
    #     for code in code_list:
    #         get_room_response(code)

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
    #     code_list = generate_room_codes(3)
        # for code in code_list:
        #     get_room_response(code)
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     a_list = ['A' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in a_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     b_list = ['B' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in b_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     c_list = ['C' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in c_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     d_list = ['D' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in d_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     e_list = ['E' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in e_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     f_list = ['F' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in f_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     g_list = ['G' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in g_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     h_list = ['H' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in h_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     i_list = ['I' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in i_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     j_list = ['J' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in j_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     k_list = ['K' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in k_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     l_list = ['L' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in l_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     m_list = ['M' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in m_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     n_list = ['N' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in n_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     o_list = ['O' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in o_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     p_list = ['P' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in p_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     q_list = ['Q' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in q_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     r_list = ['R' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in r_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     s_list = ['S' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in s_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     t_list = ['T' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in t_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     u_list = ['U' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in u_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     v_list = ['V' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in v_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     w_list = ['W' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in w_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     x_list = ['X' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in x_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     y_list = ['Y' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in y_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise
        # with ThreadPoolExecutor(max_workers=3) as executor:
        #     z_list = ['Z' + x for x in code_list]
        #     futures = [executor.submit(get_room_response, room) for room in z_list]
        #     try:
        #         for future in as_completed(futures):
        #             future.result()
        #     except KeyboardInterrupt as e:
        #         raise

                # executor._threads.clear()
                # thread._threads_queues.clear()


    while True:
        code_list = generate_room_codes(4)
        for code in code_list:
            get_room_response(code)

        with ThreadPoolExecutor(max_workers=64) as executor:
            futures = [executor.submit(get_room_response, code) for code in code_list]
            try:
                for future in as_completed(futures):
                    future.result()
            except KeyboardInterrupt as e:
                raise
                executor._threads.clear()
                thread._threads_queues.clear()





#
# def main():
#     set_room_data()
#
#
# if __name__ == "__main__":
#     main()
