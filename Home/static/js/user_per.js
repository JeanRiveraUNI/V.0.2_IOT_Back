function agregarVehiculo(tipo) {
    // Lógica para agregar un vehículo a la lista
    var listaVehiculos = document.getElementById('lista-vehiculos');
    var nuevoVehiculo = document.createElement('li');
    nuevoVehiculo.textContent = 'Nuevo vehículo - Tipo: ' + tipo;
    listaVehiculos.appendChild(nuevoVehiculo);
}

function eliminarVehiculo() {
    // Lógica para eliminar un vehículo de la lista
    var listaVehiculos = document.getElementById('lista-vehiculos');
    var ultimoVehiculo = listaVehiculos.lastElementChild;
    if (ultimoVehiculo) {
        listaVehiculos.removeChild(ultimoVehiculo);
    }
}