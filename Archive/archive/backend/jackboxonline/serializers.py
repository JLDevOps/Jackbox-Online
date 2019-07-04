from rest_framework import serializers
from .models import JackboxRoom


class JackboxRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = JackboxRoom
        fields = (
            'room_code', 'game_type', 'app_id', 'player_amount', 'audience_amount', 'join_able', 'locked', 'last_updated',
            'online')
