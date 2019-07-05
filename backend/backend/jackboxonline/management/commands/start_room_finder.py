from django.core.management.base import BaseCommand
from jackboxonline.jackbox_room_finder import set_room_data


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        set_room_data()
