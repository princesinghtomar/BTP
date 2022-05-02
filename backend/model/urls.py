from django.urls import re_path
from model import views

urlpatterns = [
    re_path(r"feedback\/?", views.algo)
]
