

document.getElementById('miBoton').addEventListener('click', function(e) {
    e.preventDefault(); // Previene el envío del formulario
    
    const correo = document.getElementById('correo').value;
    if (!validarCorreo(correo)) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, introduce una dirección de correo electrónico válida.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    } else {
        Swal.fire({
            title: '¡Listo!',
            text: 'Se ha enviado un correo con las instrucciones para restablecer la contraseña',
            icon: 'success',
            confirmButtonText: 'Entendido'
        });
    }
});

// Función para validar el correo electrónico
function validarCorreo(correo) {
    var re = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(correo);
}

