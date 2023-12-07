from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

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
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("Este correo electrónico ya está registrado.")
        return email
