"""
URL configuration for job project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.http import HttpResponse  # Import for simple view
from app.views import Jobpost, Jobget, singleJob, RegisterView, ProfileView, ApplyJob
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView,
)

# Simple view for the root URL
def home(request):
    return HttpResponse("""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Job Portal API</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
                h1 { color: #2563eb; }
                ul { line-height: 1.8; }
                a { color: #2563eb; text-decoration: none; }
                a:hover { text-decoration: underline; }
                code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; }
            </style>
        </head>
        <body>
            <h1>🚀 Job Portal API is Live!</h1>
            <p>Your Django backend is successfully deployed on Render.</p>
            
            <h2>Available Endpoints:</h2>
            <ul>
                <li><a href="/admin/">🔧 Admin Panel</a></li>
                <li><strong>Authentication:</strong>
                    <ul>
                        <li><code>POST /register/</code> - User registration</li>
                        <li><code>POST /login/</code> - Get JWT tokens</li>
                        <li><code>POST /refresh/</code> - Refresh access token</li>
                        <li><code>POST /logout/</code> - Logout (blacklist token)</li>
                        <li><code>GET /profile/</code> - User profile</li>
                    </ul>
                </li>
                <li><strong>Jobs:</strong>
                    <ul>
                        <li><code>POST /post-job</code> - Create job post</li>
                        <li><code>GET /get-job</code> - Get all jobs</li>
                        <li><code>GET /single-job/&lt;id&gt;</code> - Get single job</li>
                        <li><code>POST /jobs/&lt;job_id&gt;/apply/</code> - Apply for job</li>
                    </ul>
                </li>
            </ul>
            
            <p><strong>Note:</strong> Use tools like Postman or Thunder Client to test the API endpoints.</p>
        </body>
        </html>
    """)

urlpatterns = [
    # Root URL - shows welcome page
    path('', home, name='home'),
    
    # Admin site
    path('admin/', admin.site.urls),
    
    # Job endpoints
    path("post-job", Jobpost.as_view()),
    path("get-job", Jobget.as_view()),
    path("single-job/<int:pk>", singleJob.as_view()),
    
    # Authentication endpoints
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', TokenBlacklistView.as_view(), name='logout'),
    path('profile/', ProfileView.as_view(), name='profile'),    
    
    # Job application endpoint
    path("jobs/<int:job_id>/apply/", ApplyJob.as_view(), name="apply-job"),
]