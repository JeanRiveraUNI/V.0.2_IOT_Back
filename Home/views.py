from django.http import HttpResponseBadRequest
from django.shortcuts import render , redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth import authenticate, login
from .forms import FormularioCrearPersona, FormularioCrearEmpresa, FormularioInicioPersona, FormularioIncioEmpresa

import requests


# Create your views here.
def Home(request):
    return render(request, 'home.html')

def Users(request):
    return render(request, 'user.html')

def signout(request):
    logout(request)
    return redirect('Home')

def registro_per(request):
    URL_API = 'http://localhost:3000/api/v2/users/'

    if request.method == 'POST':
        FormNewUser = FormularioCrearPersona(request.POST)
        if FormNewUser.is_valid():
            username = FormNewUser.cleaned_data['username']
            email = FormNewUser.cleaned_data['email']
            password = FormNewUser.cleaned_data['password1']
            Persona = FormNewUser.cleaned_data['role']
            new_user = {
                'username': username,
                'email': email,
                'password': password,
                'role': Persona
            }
            api_response = requests.post(URL_API, data=new_user)
            if api_response.status_code == 201:
                return redirect('login_per')
            else:
                print(api_response.status_code)
                return render(request, 'registro_per.html', {
                    'form': FormNewUser, 'error': 'Error al crear el usuario'
                })
        else:
            print(FormNewUser.errors)
            return render(request, 'registro_per.html', {
                'form': FormNewUser, 'error': 'El formulario no es válido'
            })
    elif request.method == 'GET':
        FormNewUser = FormularioCrearPersona()
        return render(request, 'registro_per.html', {'form': FormNewUser})
    else:
        # Devuelve una respuesta de error para cualquier otro caso
        return HttpResponseBadRequest('Método no permitido')


def registro_emp (request):
    URL_API = 'http://localhost:3000/api/v2/users/'

    if request.method == 'POST':
        FormNewUser = FormularioCrearEmpresa(request.POST)
        if FormNewUser.is_valid():
            username = FormNewUser.cleaned_data['username']
            rut = FormNewUser.cleaned_data['rut']
            email = FormNewUser.cleaned_data['email']
            password = FormNewUser.cleaned_data['password1']
            Empresa = FormNewUser.cleaned_data['role']
            new_user = {
                'username': username,
                'rut': rut,
                'email': email,
                'password': password,
                'role': Empresa
            }
            api_response = requests.post(URL_API, data=new_user)
            if api_response.status_code == 201:
                return redirect('login_emp')
            else:
                print(api_response.status_code)
                return render(request, 'registro_emp.html', {
                    'form': FormNewUser, 'error': 'Error al crear el usuario'
                })
        else:
            print(FormNewUser.errors)
            return render(request, 'registro_emp.html', {
                'form': FormNewUser, 'error': 'El formulario no es válido'
            })
    elif request.method == 'GET':
        FormNewUser = FormularioCrearEmpresa()
        return render(request, 'registro_emp.html', {'form': FormNewUser})
    else:
        # Devuelve una respuesta de error para cualquier otro caso
        return HttpResponseBadRequest('Método no permitido')

# incio de sesion para persona
def login_per (request):
    URL_API = 'http://localhost:3000/api/v2/users/'  # Ajusta la URL de la API

    if request.method == 'POST':
        FormInPer = FormularioInicioPersona(request.POST)
        if FormInPer.is_valid():
            # Obtén las credenciales del formulario
            email = FormInPer.cleaned_data['email']
            password = FormInPer.cleaned_data['password']

            # Realiza la solicitud a la API para autenticar al usuario
            api_data = {'email': email, 'password': password}
            api_response = requests.post(URL_API, data=api_data)

            if api_response.status_code == 200:
                # La API ha autenticado al usuario, ahora intenta iniciar sesión en Django
                UserPer = authenticate(email=email, password=password)

                if UserPer is not None:
                    login(request, UserPer)
                    return redirect('usuario')
                else:
                    return render(request, 'login_per.html', {
                        'form': FormInPer, 'error': 'Error al autenticar al usuario en Django'
                    })
            else:
                # La API no pudo autenticar al usuario
                return render(request, 'login_per.html', {
                    'form': FormInPer, 'error': 'Credenciales no válidas'
                })
        else:
            # El formulario no es válido
            return render(request, 'login_per.html', {
                'form': FormInPer, 'error': 'El formulario no es válido'
            })

    elif request.method == 'GET':
        FormInPer = FormularioInicioPersona()
        return render(request, 'login_per.html', {'form': FormInPer})

    else:
        # Devuelve una respuesta de error para cualquier otro caso
        return HttpResponseBadRequest('Método no permitido')
    
def login_emp (request):
    return render(request, 'login_emp.html')

