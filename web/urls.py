"""
URL configuration for web project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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

from django.urls import path
from Home import views 

urlpatterns = [
    path('', views.Home , name='Home'),
    path('login/persona', views.login_per , name='login_per'),
    path("login/empresa", views.login_emp , name="login_emp"),
    path('registro/persona', views.registro_per, name='registro_per'),
    path("registro/empresa", views.registro_emp, name="registro_emp"),
    path('usuario/persona', views.UserPer , name='usuario_per'),
    path('usuario/empresa', views.UserEmp , name='usuario_emp'),
    path('salir/', views.signout , name='salir'),
]
