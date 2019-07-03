"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from jackboxonline import views

base_api_endpoint = 'api/v1/'
router = routers.DefaultRouter()
router.register(r'jackboxrooms', views.JackboxRoomView, 'jackboxroom')


urlpatterns = [
    path('admin/', admin.site.urls),
    path(base_api_endpoint, include(router.urls)),
    # re_path(r'api/v1/jackboxrooms/check/(^[A-Za-z]{4})', views.check_room, name='check-room'),
    url(base_api_endpoint + 'initiate/', views.Initiate.as_view()),
    # url(base_api_endpoint + 'check/^[A-Za-z]{4}', views.check_room),

    # url(base_api_endpoint + 'game/', views.JackboxGame.as_view()),
]
