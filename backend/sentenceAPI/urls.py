from django.urls import re_path
from sentenceAPI import views

urlpatterns = [
    re_path(r"get\/?", views.getSentence),
    re_path(r"add\/?", views.addSentence),
    re_path(r"upload\/?", views.addSentencesFromFile)
]
