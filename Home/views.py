from django.shortcuts import render , redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth import authenticate, login
from .forms import AuthenticationForm, CreateUser
import requests

# URL de tu API Node.js para obtener la lista de usuarios
URL_API_LIST = 'http://localhost:3000/api/v2/users'

def authenticate_user(email, password):
    # Realiza la petición a la API para obtener la lista de usuarios
    api_response_list = requests.get(URL_API_LIST, params={
        'email': email,
        'password': password
    })

    if api_response_list.status_code != 200:
        return None, 'Error al autenticar al usuario'

    try:
        users_data = api_response_list.json()['data']
        user_data = next((user for user in users_data if user.get('email') == email), None)

        if not user_data:
            return None, 'Correo o contraseña incorrectos'

        user_id = user_data.get('_id')
        URL_API_USER = f'http://localhost:3000/api/v2/users/{user_id}'
        api_response_user = requests.get(URL_API_USER)

        if api_response_user.status_code != 200:
            return None, 'Error al obtener los detalles del usuario por ID'

        user_data = api_response_user.json()['data']
        user = authenticate(email=user_data.get('email'), password=password)

        return user, None
    except Exception as e:
        return None, 'Error al procesar la respuesta de la API'

def login_view(request):
    if request.method == 'GET':
        form = AuthenticationForm()
    elif request.method == 'POST':
        user, error = authenticate_user(request.POST['email'], request.POST['password'])

        if user is not None:
            login(request, user)
            return redirect('usuario')

        form = AuthenticationForm()
    else:
        error = 'Método no permitido'
        form = AuthenticationForm()

    return render(request, 'login.html', {'form': form, 'error': error})

# Create your views here.
def Home(request):
    return render(request, 'home.html')

def Signup(request):
    if request.method == 'GET':
        return render(request, 'signup.html', {'form': CreateUser()})
    elif request.method == 'POST':
        form = CreateUser(request.POST)
        if form.is_valid():
            try:
                # Enviar la solicitud a la API para crear el usuario
                URL_API_CREATE_USER = 'http://localhost:3000/api/v2/users'
                payload = {
                    'username': form.cleaned_data['username'],
                    'email': form.cleaned_data['email'],
                    'password': form.cleaned_data['password1']
                }
                api_response = requests.post(URL_API_CREATE_USER, data=payload)

                if api_response.status_code == 201:  # Código para creación exitosa
                    # Puedes realizar acciones adicionales si es necesario
                    login(request, user)
                    return redirect('usuario')
                else:
                    # Manejar el caso de error en la creación del usuario
                    return render(request, 'signup.html', {'form': form, 'error': 'Error al crear el usuario'})
            except Exception as e:
                return render(request, 'signup.html', {'form': form, 'error': 'Error al crear el usuario'})
        else:
            return render(request, 'signup.html', {'form': form, 'error': 'El formulario no es válido'})
    else:
        return render(request, 'signup.html', {'form': CreateUser(), 'error': 'Método no permitido'})
    

def Users(request):
    return render(request, 'user.html')

def signout(request):
    logout(request)
    return redirect('Home')

def registro_per (request):
    return render(request, 'registro_per.html')

def registro_emp (request):
    return render(request, 'registro_emp.html')

def login_per (request):
    return render(request, 'login_per.html')

def login_emp (request):
    return render(request, 'login_emp.html')

