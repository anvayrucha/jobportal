from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class job(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    company = models.CharField(max_length=50)
    location = models.TextField()
    posted_at = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
class Register(AbstractUser):
    ROLE_CHOICES = [
        ("candidate","candidate"),
        ("employer","employer"),
        ("admin","admin")
    ]
    
   
    email = models.EmailField(unique=True)
    role = models.CharField(max_length = 100,choices = ROLE_CHOICES,default  = "candidate" )
    
    def __str__(self):
        return f"{self.username} ({self.role})"
   
   
   

from django.conf import settings

class Candidate(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # who applied
    job = models.ForeignKey("job", on_delete=models.CASCADE, related_name="applications")  # which job
    name = models.CharField(max_length=150)
    age = models.IntegerField()
    email = models.EmailField(null=True, blank=True)  # added email field
    phone = models.CharField(max_length=15)  # added phone number field
    location = models.CharField(max_length=255)
    qualification = models.CharField(max_length=255)
    work_experience = models.TextField()
    profile_pic = models.ImageField(upload_to="profile_pics/", blank=True, null=True)
    resume = models.FileField(upload_to="resumes/", blank=True, null=True)
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} applied for {self.job.title}"
