from django.http import HttpResponseBadRequest
from django.shortcuts import render , redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout, authenticate 
from .forms import FormularioCrearPersona, FormularioCrearEmpresa, FormularioInicioPersona, FormularioIncioEmpresa

import requests


# Create your views here.
def Home(request):
    return render(request, 'home.html')

def signout(request):
    logout(request)
    return redirect('Home')

def registro_per(request):
    URL_API = 'http://localhost:3000/api/v2/users/createPersona/'

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
    URL_API = 'http://localhost:3000/api/v2/users/createEmpresa/'

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
    
    
def login_per(request):
    if request.method == 'POST':
        form_login_per = FormularioInicioPersona(request.POST)
        if form_login_per.is_valid():
            email = form_login_per.cleaned_data['email']
            password = form_login_per.cleaned_data['password']

            api_url = 'http://localhost:3000/api/v2/users/'
            api_params = {
                'email': email,
                'password': password
            }

            try:
                api_response = requests.get(api_url, params=api_params)
                api_response.raise_for_status()  # Lanza una excepción para errores HTTP (4xx, 5xx)
                
                response_data = api_response.json()
                if response_data['status'] == 'OK':
                    user_list = response_data['data']

                    # Realiza la lógica de autenticación según la respuesta de la API
                    authenticated_user = next((user for user in user_list if user['email'] == email and user['password'] == password), None)

                    if authenticated_user:
                        # Aquí puedes manejar la autenticación en tu sistema Django
                        return redirect('usuario_per')
                    else:
                        print('Usuario y/o contraseña no válidos')
                        return render(request, 'login_per.html',{'error':'Usuario y/o contraseña no válidos'})
                else:
                    print('Error en la respuesta de la API')
                    return render(request, 'login_per.html', {'error': 'Error en la respuesta de la API'})
            
            except requests.RequestException as e:
                print(f"Error en la solicitud a la API: {e}")
                return render(request, 'login_per.html', {'error': 'Error en la autenticación'})
        
        else:
            print(form_login_per.errors)
            return render(request, 'login_per.html', {'error': 'Usuario y/o contraseña son incorrectos'})
    
    else:
        form_login_per = FormularioInicioPersona()
        return render(request, 'login_per.html', {'form': form_login_per})

def login_emp(request):
    if request.method == 'POST':
        form_login_emp = FormularioIncioEmpresa(request.POST)
        if form_login_emp.is_valid():
            rut = form_login_emp.cleaned_data['rut']
            password = form_login_emp.cleaned_data['password']

            api_url = 'http://localhost:3000/api/v2/users/'
            api_params = {
                'rut': rut,
                'password': password
            }

            try:
                api_response = requests.get(api_url, params=api_params)
                api_response.raise_for_status()  # Lanza una excepción para errores HTTP (4xx, 5xx)

                response_data = api_response.json()
                if response_data['status'] == 'OK':
                    user_list = response_data['data']

                    # Realiza la lógica de autenticación según la respuesta de la API
                    authenticated_user = next(
                        (user for user in user_list if user.get('rut') == rut and user['password'] == password),
                        None
                    )

                    if authenticated_user:
                        # Aquí puedes manejar la autenticación en tu sistema Djangod
                        return redirect('usuario_emp')
                    else:
                        print('Usuario y/o contraseña no válidos')
                        return render(request, 'login_emp.html', {'error': 'Usuario y/o contraseña no válidos'})
                else:
                    print('Error en la respuesta de la API')
                    return render(request, 'login_emp.html', {'error': 'Error en la respuesta de la API'})

            except requests.RequestException as e:
                print(f"Error en la solicitud a la API: {e}")
                return render(request, 'login_emp.html', {'error': 'Error en la autenticación'})

        else:
            print(form_login_emp.errors)
            return render(request, 'login_emp.html', {'error': 'Usuario y/o contraseña no válidos'})

    else:
        form_login_emp = FormularioIncioEmpresa()
        return render(request, 'login_emp.html', {'form': form_login_emp})  
                    
def UserPer(request):
    # Lista de estacionamientos
    URL = 'http://localhost:3000/api/v2/parkings'
    api_response = requests.get(URL)

    try:
        api_response.raise_for_status()  # Verificar si hay errores HTTP

        response_data = api_response.json()

        # Verificar si 'status' está en el diccionario
        if 'status' in response_data and response_data['status'] == 'OK':

            # Verificar si 'data' está en el diccionario
            if 'data' in response_data:
                parkings_list = response_data['data']
                print(parkings_list)
                return render(request, 'user_per.html', {'parkings_list': parkings_list})
            else:
                print('Error en la respuesta de la API: clave "data" no encontrada')
                return render(request, 'user_per.html', {'error': 'Error en la respuesta de la API'})

        else:
            print('Error en la respuesta de la API: clave "status" no es "OK"')
            return render(request, 'user_per.html', {'error': 'Error en la respuesta de la API'})

    except requests.exceptions.RequestException as e:
        print(f'Error al hacer la solicitud a la API: {e}')
        return render(request, 'user_per.html', {'error': 'Error al hacer la solicitud a la API'})


def UserEmp(request):
    return render(request, 'user_emp.html')