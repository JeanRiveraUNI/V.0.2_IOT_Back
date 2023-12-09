const switchInput = document.getElementById('switch');
    const infoPersona = document.getElementById('info-persona');
    const infoEmpresa = document.getElementById('info-empresa');

    switchInput.addEventListener('change', () => {
        if (switchInput.checked) {
            infoPersona.style.display = 'block';
            infoEmpresa.style.display = 'none';
        } else {
            infoPersona.style.display = 'none';
            infoEmpresa.style.display = 'block';
        }
    });