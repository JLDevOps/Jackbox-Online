from rest_framework import serializers
from .models import JackboxRoom


class JackboxRoomSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):

        super(JackboxRoomSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        if request and request.query_params.get('fields'):
            fields = request.query_params.get('fields')
            if fields:
                fields = fields.split(',')
                allowed = set(fields)
                existing = set(self.fields.keys())
                for field_name in existing - allowed:
                    self.fields.pop(field_name)


    class Meta:
        model = JackboxRoom
        fields = (
            'room_code', 'server', 'game_type', 'app_id', 'player_amount', 'audience_amount', 'join_able', 'locked',
            'last_updated', 'online')
