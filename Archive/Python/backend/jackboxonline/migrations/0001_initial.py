# Generated by Django 2.1.5 on 2019-01-24 01:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='JackboxRoom',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room_code', models.CharField(default=None, max_length=10)),
                ('game_type', models.CharField(default=None, max_length=200, null=True)),
                ('app_id', models.CharField(default=None, max_length=200, null=True)),
                ('player_amount', models.IntegerField(default=None, null=True)),
                ('audience_amount', models.IntegerField(default=None, null=True)),
                ('join_able', models.CharField(default=None, max_length=100, null=True)),
                ('locked', models.CharField(default=None, max_length=100, null=True)),
                ('last_updated', models.DateTimeField()),
                ('online', models.CharField(default=None, max_length=100, null=True)),
            ],
        ),
    ]