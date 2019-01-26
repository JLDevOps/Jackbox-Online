from django.core.management.base import BaseCommand
from jackboxonline.models import JackboxRoom


class Command(BaseCommand):
    def handle(self, *args, **options):
        JackboxRoom.objects.all().delete()
