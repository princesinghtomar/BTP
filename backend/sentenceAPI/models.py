from djongo import models

# Create your models here.
class Sentences(models.Model):
    id = models.BigIntegerField(primary_key=True)
    sentence = models.TextField()
    created_at = models.DateTimeField()
