from rest_framework import serializers

from app.models import job,Register,Candidate
from django.contrib.auth.password_validation import validate_password

class jobSerializer(serializers.ModelSerializer):
    class Meta:
        model = job
        fields ="__all__"
        
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators = [validate_password])
    class Meta:
        model = Register
        fields = ["username","role","password","email"]
        
    def create(self,validate_data):
        user = Register.objects.create_user(
            username = validate_data["username"],
            password = validate_data["password"],
            email = validate_data["email"],
            role = validate_data["role"],
        )
        return user
        
class profileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Register
        fields = ["username","role","email"]
    
    
class candidateSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)  # <-- add thi
    class Meta :
        model = Candidate
        fields = ['name', 'age', 'email', 'phone', 'location', 'qualification', 'work_experience', 'profile_pic', 'resume', 'job', 'user']
        