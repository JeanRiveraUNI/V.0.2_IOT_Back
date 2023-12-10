from django.http import HttpResponseBadRequest
from django.shortcuts import render , redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth import authenticate, login
from .forms import FormularioCrearPersona, FormularioCrearEmpresa
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

def login_per (request):
    return render(request, 'login_per.html')

def login_emp (request):
    return render(request, 'login_emp.html')

