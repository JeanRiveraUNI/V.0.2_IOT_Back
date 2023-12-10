from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class AuthenticationForm(forms.Form):
    email = forms.EmailField(label="Correo electrónico")
    password = forms.CharField(label="Contraseña", widget=forms.PasswordInput)

    # Puedes agregar validaciones personalizadas si es necesario
    def clean_email(self):
        email = self.cleaned_data['email']

        # Verifica si el correo electrónico ya está registrado en la base de datos
        try:
            User.objects.get(email=email)
            return email
        except User.DoesNotExist:
            raise forms.ValidationError("Este correo electrónico no está registrado.")


class CreateUser(UserCreationForm):
    # Agrega campos adicionales si es necesario
    email = forms.EmailField(label="Correo electrónico")

    class Meta:
        model = User  # Puedes personalizar el modelo si lo necesitas
        fields = ['email', 'password1', 'password2']

    # Puedes agregar validaciones personalizadas si es necesario
    def clean_email(self):
        email = self.cleaned_data['email']

        # Verifica si el correo electrónico ya está registrado en la base de datos
        try:
            User.objects.get(email=email)
            raise forms.ValidationError("Este correo electrónico ya está registrado.")
        except User.DoesNotExist:
            return email
        
    