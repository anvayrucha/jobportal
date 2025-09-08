from rest_framework.generics import CreateAPIView,ListAPIView, RetrieveAPIView,RetrieveUpdateAPIView
from rest_framework import permissions
from django.shortcuts import render
from app.serializer import jobSerializer,RegisterSerializer,profileSerializer,candidateSerializer
from app.models import job,Register,Candidate
from rest_framework import status
from rest_framework.response import Response

# Create your views here.

class Jobpost(CreateAPIView):
    queryset = job.objects.all()
    serializer_class = jobSerializer
    
class Jobget(ListAPIView):
    queryset = job.objects.all()
    serializer_class = jobSerializer

class singleJob(RetrieveAPIView):
    queryset = job.objects.all()
    serializer_class = jobSerializer
    
class RegisterView(CreateAPIView):
    queryset = Register.objects.all()
    serializer_class = RegisterSerializer
    
    def create(self,request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
            
        return Response ({
            "message " : "Register success fully",
            "profile": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
        },status = status.HTTP_201_CREATED)

class ProfileView(RetrieveUpdateAPIView):
    serializer_class = profileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
    
    
# class ApplyJob(CreateAPIView):
#     serializer_class = candidateSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
        
#         # Save the object and associate the user
#         application = serializer.save(user=self.request.user)

#         # Get username and position from the saved instance
#         username = self.request.user.username
#         position = getattr(application, 'position', 'the job')  # fallback if missing

#         return Response({
#             "message": f"{username} applied for {position} successfully."
#         }, status=status.HTTP_201_CREATED)

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)
    
    
# class ApplyJob(CreateAPIView):
#     serializer_class = candidateSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def create(self, request, *args, **kwargs):
#         job_id = kwargs.get("job_id")
#         job = get_object_or_404(Job, pk=job_id)  # ✅ Get the job from URL

#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)

#         # Save application with user and job
#         application = serializer.save(user=request.user, job=job)

#         # Optional: Get the job title or position
#         username = request.user.username
#         position = getattr(job, 'title', 'the job')

#         return Response({
#             "message": f"{username} applied for {position} successfully."
#         }, status=status.HTTP_201_CREATED)
    
from rest_framework import status, permissions
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
import logging
import traceback

logger = logging.getLogger(__name__)

class ApplyJob(CreateAPIView):
    serializer_class = candidateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        try:
            data = request.data.copy()
            data['job'] = kwargs.get('job_id')  # pass job_id to serializer

            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            application = serializer.save(user=self.request.user)

            username = self.request.user.username
            position = getattr(application, 'position', 'the job')

            return Response({
                "message": f"{username} applied for {position} successfully."
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            # Log the error message and full traceback to console
            print("Error in ApplyJob.create:")
            print(str(e))
            traceback.print_exc()

            # Also log with logger (optional)
            logger.error(f"Error in ApplyJob.create: {e}", exc_info=True)

            return Response({"detail": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
