from djongo import models

# Create your models here.
class Users(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    last_login = models.DateTimeField(null=True)
