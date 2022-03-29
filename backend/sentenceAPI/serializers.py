from rest_framework import serializers
from sentenceAPI.models import Sentences

class SentenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sentences
        fields = "__all__"
