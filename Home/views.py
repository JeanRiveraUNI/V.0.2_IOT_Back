from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm

# Create your views here.

def Home(request):
    return render(request, 'home.html')

def Signup(request):
    return render(request, 'signup.html',{'form': UserCreationForm})

