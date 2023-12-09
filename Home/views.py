from django.shortcuts import render , redirect
from .forms import CreateUser
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.db import IntegrityError
import requests

# Create your views here.
def Home(request):
    #response = requests.get('http://localhost:3000/api/v2/users')
    #data = response.json()
    return render(request, 'home.html')

def Signup(request):
    
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
        
def login(request):
    # URL de tu API Node.js
    URL_API = 'http://localhost:3000/api/v2/users'

    if request.method == 'GET':
        return render(request, 'login.html', {
            'form': AuthenticationForm()
        })
    else:
        # Realiza la petición a la API para autenticar al usuario
        api_response = requests.get(URL_API, params={
            'email': request.POST['email'],
            'password': request.POST['password']
        })

        # Imprime la respuesta de la API (puedes quitar esto en producción)
        print(api_response.text)

        # Verifica la respuesta de la API
        if api_response.status_code == 200:
            try:
                users_data = api_response.json()['data']

                # Busca el usuario correcto
                user_data = next((user for user in users_data if user.get('email') == request.POST['email']), None)

                if user_data:
                    #user = authenticate(request, email=user_data.get('email'), password=user_data.get('password'))
                    user = authenticate(request, email=user_data['email'], password=user_data['password'])
                    if user is None or not check_password(user_data['password'], user.password):
                        return render(request, 'login.html', {
                            'form': AuthenticationForm(),
                            'error': 'Usuario y contraseña no coinciden'
                        })
                    else:
                        login(request, user)
                        return redirect('usuario')
                else:
                    return render(request, 'login.html', {
                        'form': AuthenticationForm(),
                        'error': 'Usuario no encontrado'
                    })
            except Exception as e:
                return render(request, 'login.html', {
                    'form': AuthenticationForm(),
                    'error': 'Error al procesar la respuesta de la API'
                })
        else:
            # Maneja el caso en que la API no devuelva un estado 200 (éxito)
            return render(request, 'login.html', {
                'form': AuthenticationForm(),
                'error': 'Error al autenticar al usuario'
            })

def registro (request):
    return render(request, 'registro.html')

