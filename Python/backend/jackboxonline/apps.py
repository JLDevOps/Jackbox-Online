from django.apps import AppConfig
from .jackbox_room_finder import *
from django.db.models.signals import pre_save

class JackboxonlineConfig(AppConfig):
    name = 'jackboxonline'
    set_room_data()

    def ready(self):
        set_room_data()
