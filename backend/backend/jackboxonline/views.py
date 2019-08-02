import threading

from rest_framework import permissions
from rest_framework import viewsets, filters, generics
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer

from .jackbox_room_finder import set_room_data
from .models import JackboxRoom
from .serializers import JackboxRoomSerializer

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 100

class JackboxRoomView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    pagination_class = StandardResultsSetPagination
    serializer_class = JackboxRoomSerializer

    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('room_code', 'online', 'last_updated', 'game_type', 'join_able')
    ordering = ('room_code',)

    def get(self, request, *args, **kwargs):
        response = super(JackboxRoomView, self).get(request, **kwargs)
        response['Content-Range'] = '100'
        response['X-Total-Count'] = '100'
        response['Access-Control-Expose-Headers'] = 'X-Total-Count, Content-Range'
        return response


    def get_queryset(self):
        queryset = JackboxRoom.objects.all()
        room = self.request.query_params.get('room_code', None)
        if room is not None:
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


class Initiate(APIView):
    renderer_classes = (JSONRenderer, )
    permission_classes = (permissions.IsAdminUser,)

    # def get(self, request, *args, **kwargs):
    #     response = super(JackboxRoomView, self).dispatch(request, *args, **kwargs)
    #     response.headers['X-Total-Count'] = '100'
    #     response.headers['Access-Control-Expose-Headers'] = 'X-Total-Count'
    #     return response

    # def get(self, request, *args, **kwargs):
    #     response = super(APIView, self).get(request, *args, **kwargs)
    #     response.headers['X-TOTAL-COUNT'] = '100'
    #     return response

    # def get(self, request, format=None):
    #     t = threading.Thread(target=set_room_data(), args=(), kwargs={})
    #     t.setDaemon(True)
    #     t.daemon = True
    #     t.start()
    #     t._stop()
    #     return Response("Thread Done")

# class JackboxGame(APIView):
#
#     def get(self, request, format=None):
#         room = self.request.query_params.get('room_code', None)