from django.shortcuts import render , redirect
from .forms import CreateUser
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.db import IntegrityError
import requests

# conectarse a la API
def get_api():
    URL_API = 'http://localhost:3000/api/v2/users'
    r = requests.get(URL_API)
    print(r.status_code == 200)
    return r.json()


# Create your views here.

def Home(request):
    return render(request, 'home.html')

def Signup(request):
    URL_API = 'http://localhost:3000/api/v2/users'
    r = requests.get(URL_API)
    print(r.status_code == 200)

    if request.method == 'GET':
        return render(request, 'signup.html', {'form': CreateUser()})
    elif request.method == 'POST':
        form = CreateUser(request.POST)
        print(form.is_valid()) 
        if form.is_valid():
            try:
                # Crear el usuario localmente
                user = User.objects.create_user(
                    email=form.cleaned_data['email'],
                    password=form.cleaned_data['password1']
                )
                login(request, user)
                return redirect('usuario')
            except IntegrityError:
                return render(request, 'signup.html', {'form': form, 'error': 'Usuario ya existe'})
        else:
            print(form.errors)
            return render(request, 'signup.html', {'form': form, 'error': 'El formulario no es válido'})
    else:
        return render(request, 'signup.html', {'form': CreateUser(), 'error': 'Método no permitido'})
    
def Users(request):
    return render(request, 'user.html')

def signout(request):
    logout(request)
    return redirect('Home')

def signin(request):
    URL_API = 'http://localhost:3000/api/v3/login'
    r = requests.get(URL_API)
    print(r.status_code == 200)
    if request.method == 'GET':
        return render(request, 'signin.html', {
            'form': AuthenticationForm()
        })
    else:
        user = authenticate(
            request, username=request.POST['username'], 
            password=request.POST['password'])
        if user is None:
            return render(request, 'signin.html', {
                'form': AuthenticationForm(),
                'error': 'Usuario y contraseña no coinciden'
            })
        else:
            login(request, user)
            return redirect('usuario')