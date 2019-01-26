import threading

from django.contrib import admin
from rest_framework.decorators import action

from jackboxonline.jackbox_room_finder import set_room_data
from .models import JackboxRoom


# Register your models here.

class JackboxRoomAdmin(admin.ModelAdmin):
    list_display = ('room_code', 'game_type', 'app_id', 'player_amount', 'join_able', 'locked', 'last_updated', 'online')



admin.site.register(JackboxRoom, JackboxRoomAdmin)