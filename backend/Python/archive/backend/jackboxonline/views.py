from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action, detail_route

from .serializers import JackboxRoomSerializer
from .models import JackboxRoom
from .jackbox_room_finder import set_room_data
from rest_framework.pagination import PageNumberPagination
from threading import Thread
import threading
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000


class JackboxRoomView(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    serializer_class = JackboxRoomSerializer
    queryset = JackboxRoom.objects.all()


#
# def test(self):
#     t = threading.Thread(target=set_room_data(), args=(), kwargs={})
#     t.setDaemon(True)
#     t.start()

# @action(detail=True, methods=['get'], url_path='test', url_name='test')
# def test(request, pk=None):
#     t = threading.Thread(target=set_room_data(), args=(), kwargs={})
#     t.setDaemon(True)
#     t.start()

# @action(detail=True, methods=['get'])
# def online_rooms(self, request, pk=None):
