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
from django.urls import path, include
from rest_framework import routers
from jackboxonline import views
import uuid

base_api_endpoint = 'api/v1/rooms/'
# router = routers.DefaultRouter()
# router.register(r'jackboxrooms', views.JackboxRoomView, 'jackboxroom')
admin_url = uuid.uuid4().hex + '/admin/'
print(admin_url)

urlpatterns = [
    path(admin_url, admin.site.urls),
    # path(base_api_endpoint, include(router.urls)),
    path(base_api_endpoint, views.JackboxRoomView.as_view()),
    url(base_api_endpoint + 'initiate/', views.Initiate.as_view()),

    # url(base_api_endpoint + 'game/', views.JackboxGame.as_view()),
]

