import threading

from rest_framework import permissions
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination

from .jackbox_room_finder import set_room_data
from .models import JackboxRoom
from .serializers import JackboxRoomSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000


class JackboxRoomView(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    pagination_class = StandardResultsSetPagination
    serializer_class = JackboxRoomSerializer

    filter_backends = (filters.OrderingFilter, filters.SearchFilter, )
    search_fields = ('=room_code',)
    ordering_fields = ('room_code', 'online', 'last_updated')
    ordering = ('room_code',)

    def get_queryset(self):
        queryset = JackboxRoom.objects.all()

        room = self.request.query_params.get('room_code', None)
        if room is not None:
            queryset = queryset.filter(room_code=room)

        online_status = self.request.query_params.get('online', None)
        if online_status is not None:
            queryset = queryset.filter(online=online_status)

        return queryset


class JackboxAdminView(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAdminUser,)

    @action(detail=True, methods=['get'], url_path='test', url_name='test')
    def test(self, request, pk=None):
        t = threading.Thread(target=set_room_data(), args=(), kwargs={})
        t.setDaemon(True)
        t.start()
