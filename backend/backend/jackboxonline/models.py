from django.db import models


# Create your models here.
class JackboxRoom(models.Model):
    room_code = models.CharField(max_length=10, default=None)
    server = models.CharField(max_length=100, null=True, default=None)
    game_type = models.CharField(max_length=200, null=True, default=None)
    app_id = models.CharField(max_length=200, null=True, default=None)
    player_amount = models.IntegerField(null=True, default=None)
    audience_amount = models.IntegerField(null=True, default=None)
    join_able = models.CharField(max_length=100, null=True, default=None)
    locked = models.CharField(max_length=100, null=True, default=None)
    last_updated = models.DateTimeField()
    online = models.CharField(max_length=100, null=True, default=None)

    def _str_(self):
        return self.room_code
