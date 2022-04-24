from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from django.conf import settings

from api.models import Users
from api.serializers import UserSerializer
from datetime import datetime, timedelta
import jwt
import base64
import random


# Create your views here.

@csrf_exempt
def register(req):
    if req.method == "POST":
        data = JSONParser().parse(req)
        data["password"] = make_password(data["password"])
        data["created_at"] = datetime.now()
        data["updated_at"] = datetime.now()
        data["last_login"] = None
        user = UserSerializer(data=data)
        if user.is_valid():
            user.save()
            return JsonResponse({"message": "User Added Successfully"})
        else:
            return JsonResponse({"message": "Invalid information"}, status=401)


@csrf_exempt
def login(req):
    if req.method == "POST":
        data = JSONParser().parse(req)
        try:
            user_object = Users.objects.get(email=data["email"])
            user = UserSerializer(user_object).data
            password_match = check_password(data["password"], user["password"])
            if password_match:
                token_expiry = datetime.now() + timedelta(hours=1)
                token = jwt.encode({
                    "id": user["_id"],
                    "name": user["name"],
                    "email": user["email"],
                    "exp": int(token_expiry.strftime('%s'))
                }, 
                settings.JWT_SECRET_KEY,
                algorithm="HS256")
                response = JsonResponse({"message": "Login Successful"})
                response.set_cookie('token', token)
                return response
            else:
                return JsonResponse({"message": "Invalid password"}, status=401)
        except Exception as e:
            return JsonResponse({"message": "Invalid Username"}, status=401)


@csrf_exempt
def whoami(req):
    if req.method == "GET":
        token = None
        if "X-Access-Token" in req.headers:
            token = req.headers["X-Access-Token"].encode("utf-8")
        elif "token" in req.COOKIES:
            token = req.COOKIES["token"].encode("utf-8")
        if token is not None and token != b'undefined':
            data = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=["HS256"])
            return JsonResponse({"success": True, 
                                "message": "Successfully got email",
                                "result": data["name"]})
        return JsonResponse({"message": "You are not logged in"}, status=401)


@csrf_exempt
def getAudio(req):
    if req.method == "POST":
        data = JSONParser().parse(req)
        audioData = base64.b64decode(data["audioData"][22:].encode('ascii'))
        sentence = data["sentence"].split()
        mask = []
        for _ in sentence:
            mask.append(int(random.random() <= 0.7))
        # data recieved and now can be sent to the model (local or in another server based on choice)
        return JsonResponse({"message": "Audio recieved", "mask": mask})
