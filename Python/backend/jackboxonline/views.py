from django.shortcuts import render
from rest_framework import viewsets
from .serializers import JackboxRoomSerializer
from .models import JackboxRoom
from .jackbox_room_finder import set_room_data
from rest_framework.pagination import PageNumberPagination
import _thread
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

_thread.start_new_thread(set_room_data())

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000


class JackboxRoomView(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    serializer_class = JackboxRoomSerializer
    queryset = JackboxRoom.objects.all()
    #
    #
    # def set_data(self):
    #     set_room_data()
