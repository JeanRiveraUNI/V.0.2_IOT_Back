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
    return render(request, 'home.html')

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
        
def login_view(request):
    # URL de tu API Node.js para obtener la lista de usuarios
    URL_API_LIST = 'http://localhost:3000/api/v2/users'
    
    if request.method == 'GET':
        return render(request, 'login.html', {'form': AuthenticationForm()})
    elif request.method == 'POST':
        # Realiza la petición a la API para obtener la lista de usuarios
        api_response_list = requests.get(URL_API_LIST, params={
            'email': request.POST['email'],
            'password': request.POST['password']
        })

        if api_response_list.status_code == 200:
            try:
                users_data = api_response_list.json()['data']
                user_data = next((user for user in users_data if user.get('email') == request.POST['email']), None)

                if user_data:
                    user_id = user_data.get('_id')
                    URL_API_USER = f'http://localhost:3000/api/v2/users/{user_id}'
                    api_response_user = requests.get(URL_API_USER)

                    if api_response_user.status_code == 200:
                        user_data = api_response_user.json()['data']
                        user = authenticate(request, email=user_data.get('email'), password=request.POST['password'])

                        if user is not None:
                            login(request, user)
                            return redirect('usuario')
                        else:
                            return render(request, 'login.html', {'form': AuthenticationForm(), 'error': 'Error al autenticar al usuario'})
                    else:
                        return render(request, 'login.html', {'form': AuthenticationForm(), 'error': 'Error al obtener los detalles del usuario por ID'})
                else:
                    return render(request, 'login.html', {'form': AuthenticationForm(), 'error': 'Correo o contraseña incorrectos'})
            except Exception as e:
                return render(request, 'login.html', {'form': AuthenticationForm(), 'error': 'Error al procesar la respuesta de la API'})
        else:
            return render(request, 'login.html', {'form': AuthenticationForm(), 'error': 'Error al autenticar al usuario'})

    else:
        return render(request, 'login.html', {'form': AuthenticationForm(), 'error': 'Método no permitido'})
    
def Users(request):
    return render(request, 'user.html')

def signout(request):
    logout(request)
    return redirect('Home')

def registro (request):
    return render(request, 'registro.html')

