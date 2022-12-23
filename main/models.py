from django.db import models
from django.contrib.auth.models import User
# Create your models here.


    
class Internship(models.Model):
    title=models.CharField(max_length=100,default='Title')
    desc=models.TextField(default='Description')
    last=models.CharField(max_length=100,default='Not')
    category=models.CharField(max_length=100,default='web')
    duration=models.CharField(max_length=100,default='2')
    user=models.ForeignKey(User,on_delete=models.CASCADE,default=1)

    def __str__(self):
        return self.title

class Compulsary(models.Model):
    skill=models.CharField(max_length=100,default='Skill')
    internship=models.ForeignKey(Internship,on_delete=models.CASCADE)
    

class Optional(models.Model):
    skill=models.CharField(max_length=100,default='Skill')
    internship=models.ForeignKey(Internship,on_delete=models.CASCADE)


class Todo(models.Model):
    todo=models.CharField(max_length=100,default='Do Something')

