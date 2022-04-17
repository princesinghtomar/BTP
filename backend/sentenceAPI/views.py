from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from sentenceAPI.models import Sentences
from sentenceAPI.serializers import SentenceSerializer
from datetime import datetime
import random

# Create your views here.

@csrf_exempt
def getSentence(req):
    if req.method == "GET":
        total_items = Sentences.objects.all().count()
        rand_id = random.randint(0, total_items-1)
        try:
            sentence = Sentences.objects.get(id=rand_id)
            sentence = SentenceSerializer(sentence).data
            return JsonResponse(sentence)
        except Exception as E:
            print(E)
            return JsonResponse({"message": "No sentences found"}, status=404)


@csrf_exempt
def addSentence(req):
    if req.method == "POST":
        data = JSONParser().parse(req)
        total_items = Sentences.objects.all().count()
        data["created_at"] = datetime.now()
        data["id"] = total_items
        new_sentence = SentenceSerializer(data=data)
        if new_sentence.is_valid():
            new_sentence.save()
            return JsonResponse({"message": "Sentence added successfully"})
        else:
            return JsonResponse({"message": "Error"}, status=401)


@csrf_exempt
def addSentencesFromFile(req):
    if req.method == "POST":
        print(req.body)
        return JsonResponse({"message": "Being developed!"})
