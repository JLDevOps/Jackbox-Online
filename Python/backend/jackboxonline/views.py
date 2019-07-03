import threading
import re
from django.core.paginator import Paginator
from rest_framework import permissions, renderers, status
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView


from .jackbox_room_finder import set_room_data, get_room_response
from .models import JackboxRoom
from .serializers import JackboxRoomSerializer

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000


class JackboxRoomView(viewsets.ReadOnlyModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    pagination_class = StandardResultsSetPagination
    serializer_class = JackboxRoomSerializer

    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('room_code', 'online', 'last_updated', 'game_type', 'join_able')
    ordering = ('room_code',)

    def get_queryset(self):
        queryset = JackboxRoom.objects.all()

        room = self.request.query_params.get('room_code', None)
        pattern = re.compile("^[A-Za-z]{4}")
        if room is not None:
            get_room_response(room)
            queryset = queryset.filter(room_code=room)

        online_status = self.request.query_params.get('online', None)
        if online_status is not None:
            queryset = queryset.filter(online=online_status)

        join_able_status = self.request.query_params.get('join_able', None)
        if join_able_status is not None:
            queryset = queryset.filter(join_able=join_able_status)

        locked_status = self.request.query_params.get('locked', None)
        if locked_status is not None:
            queryset = queryset.filter(locked=locked_status)

        return queryset


# class JackboxRoomView(APIView):
#     permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
#     # pagination_class = StandardResultsSetPagination
#     serializer_class = JackboxRoomSerializer
#
#     filter_backends = (filters.OrderingFilter,)
#     ordering_fields = ('room_code', 'online', 'last_updated', 'game_type', 'join_able')
#     ordering = ('room_code',)
#     renderer_classes = (JSONRenderer,)
#     queryset = JackboxRoom.objects.all()
#
#     def get(self, request, format=None):
#
#         queryset = JackboxRoom.objects.all()
#         # paginator = Paginator(queryset, page_size)
#         # resources = paginator.page(1)
#
#         room = self.request.query_params.get('room_code', None)
#         if room is not None:
#             queryset = queryset.filter(room_code=room)
#
#         # online_status = self.request.query_params.get('online', None)
#         # if online_status is not None:
#         #     queryset = queryset.filter(online=online_status)
#         #
#         # join_able_status = self.request.query_params.get('join_able', None)
#         # if join_able_status is not None:
#         #     queryset = queryset.filter(join_able=join_able_status)
#         #
#         # locked_status = self.request.query_params.get('locked', None)
#         # if locked_status is not None:
#         #     queryset = queryset.filter(locked=locked_status)
#         data = JackboxRoomSerializer(queryset, many=True)
#
#         return Response(data.data)

# def check_room(request):
#     room = request.query_params.get('room_code', None)
#     pattern = re.compile("^[A-Za-z]{4}")
#     pattern.match(room)
#
#     if room is not None and pattern.match(room) is False:
#         get_room_response(room)
#         return Response('{ "Success" }', status=status.HTTP_200_OK)
#     else:
#         error = '{ "error" : "Incorrect room code" } '
#         return Response(error, status=status.HTTP_400_INTERNAL_SERVER_ERROR)


class Initiate(APIView):
    permission_classes = (permissions.IsAdminUser,)

    def get(self, request, format=None):
        t = threading.Thread(target=set_room_data(), args=(), kwargs={})
        t.setDaemon(True)
        t.daemon = True
        t.start()
        t._stop()
        return Response("Thread Done")

# class JackboxGame(APIView):
#
#     def get(self, request, format=None):
#         room = self.request.query_params.get('room_code', None)