from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
import base64
from numpy import random

# Create your views here.
@csrf_exempt
def algo(req):
    if req.method == "POST":
        data = JSONParser().parse(req)
        audioData = base64.b64decode(data["audioData"][22:].encode('ascii'))
        prob = random.uniform(0, 1)
        if prob > 0.5:
            return JsonResponse({"output": "Nice!!", "feedback": "This is pos feedback"})
        else:
            return JsonResponse({"output": "Oh No!!", "feedback": "This is neg feedback"})
