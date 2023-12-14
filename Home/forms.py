from django import forms

class FormularioCrearPersona(forms.Form):
    username = forms.CharField(label='Nombre de usuario', max_length=100)
    email = forms.EmailField(label='Correo electrónico', max_length=100)
    password1 = forms.CharField(label='Contraseña', max_length=100, widget=forms.PasswordInput)
    password2 = forms.CharField(label='Confirmar contraseña', max_length=100, widget=forms.PasswordInput)
    role = forms.CharField(label='Rol', max_length=100, widget=forms.HiddenInput, initial='Persona')

class FormularioCrearEmpresa(forms.Form):
    username = forms.CharField(label='Nombre de usuario', max_length=100)
    rut = forms.CharField(label='Rol Único Tributario', max_length=15)
    email = forms.EmailField(label='Correo electrónico', max_length=100)
    password1 = forms.CharField(label='Contraseña', max_length=100, widget=forms.PasswordInput)
    password2 = forms.CharField(label='Confirmar contraseña', max_length=100, widget=forms.PasswordInput)
    role = forms.CharField(label='Rol', max_length=100, widget=forms.HiddenInput, initial='Empresa')

class FormularioInicioPersona(forms.Form):
    email = forms.EmailField(label='Correo electrónico', max_length=100)
    password = forms.CharField(label='Contraseña', max_length=100, widget=forms.PasswordInput)

class FormularioIncioEmpresa(forms.Form):
    rut = forms.CharField(label='Rol Único Tributario', max_length=15)
    password = forms.CharField(label='Contraseña', max_length=100, widget=forms.PasswordInput)


    