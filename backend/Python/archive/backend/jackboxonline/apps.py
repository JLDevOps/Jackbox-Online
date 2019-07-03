import threading

from django.apps import AppConfig
from django.db.models.signals import  pre_save
from .jackbox_room_finder import *
from .signals import start_room_check


class JackboxonlineConfig(AppConfig):
    name = 'jackboxonline'

    # def ready(self):
    #     pre_save.connect(start_room_check())
