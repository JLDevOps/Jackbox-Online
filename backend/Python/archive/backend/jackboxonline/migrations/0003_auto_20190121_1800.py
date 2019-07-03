# Generated by Django 2.1.5 on 2019-01-21 23:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jackboxonline', '0002_auto_20190117_2247'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jackboxroom',
            name='app_id',
            field=models.CharField(default=None, max_length=200),
        ),
        migrations.AlterField(
            model_name='jackboxroom',
            name='audience_amount',
            field=models.IntegerField(default=None),
        ),
        migrations.AlterField(
            model_name='jackboxroom',
            name='game_type',
            field=models.CharField(default=None, max_length=200),
        ),
        migrations.AlterField(
            model_name='jackboxroom',
            name='join_able',
            field=models.CharField(default=None, max_length=100),
        ),
        migrations.AlterField(
            model_name='jackboxroom',
            name='locked',
            field=models.CharField(default=None, max_length=100),
        ),
        migrations.AlterField(
            model_name='jackboxroom',
            name='online',
            field=models.CharField(default=None, max_length=100),
        ),
        migrations.AlterField(
            model_name='jackboxroom',
            name='player_amount',
            field=models.IntegerField(default=None),
        ),
        migrations.AlterField(
            model_name='jackboxroom',
            name='room_code',
            field=models.CharField(default=None, max_length=10),
        ),
    ]
