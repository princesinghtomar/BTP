from django.urls import re_path
from api import views


urlpatterns = [
    re_path(r"login\/?", views.login),
    re_path(r"register\/?", views.register),
    re_path(r"whoami\/?", views.whoami),
    re_path(r"audio\/?", views.getAudio),
]
