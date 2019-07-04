# import threading
#
# from .jackbox_room_finder import set_room_data
#
#
# def start_room_check(sender, *args, **kwargs):
#     t = threading.Thread(target=set_room_data(), args=(), kwargs={})
#     t.setDaemon(True)
#     t.start()
