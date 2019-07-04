from django.contrib import admin

from .models import JackboxRoom


# Register your models here.

class JackboxRoomAdmin(admin.ModelAdmin):
    list_display = (
        'room_code', 'server', 'game_type', 'app_id', 'player_amount', 'join_able', 'locked', 'last_updated', 'online')


admin.site.register(JackboxRoom, JackboxRoomAdmin)
