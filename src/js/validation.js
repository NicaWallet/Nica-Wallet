document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('contrasena');

    togglePassword.addEventListener('click', function() {
        // Cambia el tipo de input
        const isPassword = passwordField.getAttribute('type') === 'password';
        passwordField.setAttribute('type', isPassword ? 'text' : 'password');

        // Cambia el SVG
        this.innerHTML = isPassword ?
            '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M53.92 34.62a8 8 0 1 0-11.84 10.76l19.24 21.17C25 88.84 9.38 123.2 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208a127.11 127.11 0 0 0 52.07-10.83l22 24.21a8 8 0 1 0 11.84-10.76Zm47.33 75.84l41.67 45.85a32 32 0 0 1-41.67-45.85M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.16 133.16 0 0 1 25 128c4.69-8.79 19.66-33.39 47.35-49.38l18 19.75a48 48 0 0 0 63.66 70l14.73 16.2A112 112 0 0 1 128 192m6-95.43a8 8 0 0 1 3-15.72a48.16 48.16 0 0 1 38.77 42.64a8 8 0 0 1-7.22 8.71a6.39 6.39 0 0 1-.75 0a8 8 0 0 1-8-7.26A32.09 32.09 0 0 0 134 96.57m113.28 34.69c-.42.94-10.55 23.37-33.36 43.8a8 8 0 1 1-10.67-11.92a132.77 132.77 0 0 0 27.8-35.14a133.15 133.15 0 0 0-23.12-30.77C185.67 75.19 158.78 64 128 64a118.37 118.37 0 0 0-19.36 1.57A8 8 0 1 1 106 49.79A134 134 0 0 1 128 48c34.88 0 66.57 13.26 91.66 38.35c18.83 18.83 27.3 37.62 27.65 38.41a8 8 0 0 1 0 6.5Z"/></svg>' : 
            '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M5.09 14.781c1.749 1.368 3.219 1.806 4.91 1.806c1.471 0 3.391-.613 5.238-1.919c1.332-.942 2.433-2.315 3.3-4.13c-.94-1.632-2.028-2.968-3.263-4.013c-1.71-1.448-3.582-2.112-5.312-2.112c-1.79 0-3.85.798-5.608 2.474c-1.266 1.206-2.225 2.42-2.88 3.638c1.065 1.789 2.27 3.206 3.614 4.256M10 18c-1.974 0-3.735-.525-5.741-2.094c-1.577-1.232-2.964-2.901-4.164-5a.724.724 0 0 1-.021-.678c.734-1.493 1.851-2.95 3.347-4.377C5.438 3.928 7.833 3 9.963 3c2.043 0 4.223.775 6.184 2.434c1.449 1.226 2.703 2.802 3.763 4.722c.11.198.12.439.027.645c-.988 2.2-2.295 3.882-3.921 5.032C13.94 17.3 11.749 18 9.999 18m.234-3.6a3.7 3.7 0 1 1 0-7.4a3.7 3.7 0 0 1 0 7.4m0-1.4a2.3 2.3 0 1 0 0-4.6a2.3 2.3 0 0 0 0 4.6"/></svg>';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita el envío del formulario

        const correo = document.getElementById('correo').value.trim();
        const contrasena = document.getElementById('contrasena').value.trim();

        // Primera validación: verifica si alguno de los campos está vacío
        if (correo === '' || contrasena === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Campos vacíos',
                text: 'Por favor, completa todos los campos.',
                confirmButtonText: 'Ok'
            });
            return;
        }

        // Segunda validación: valida el correo electrónico
        if (!validarCorreo(correo)) {
            // La alerta se muestra dentro de validarCorreo
            return;
        }

        // Tercera validación: valida la contraseña
        if (!validarContrasena(contrasena)) {
            // La alerta se muestra dentro de validarContrasena
            return;
        }

        // Si todas las validaciones son correctas, muestra una alerta de éxito
        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión correcto',
            text: 'Has iniciado sesión con éxito.',
            confirmButtonText: 'Ok'
        });
    });
});

function validarCorreo(correo) {
    const expresion = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!expresion.test(correo)) {
        Swal.fire({
            icon: 'error',
            title: 'Correo inválido',
            text: 'El correo electrónico no es válido.',
            confirmButtonText: 'Ok'
        });
        return false;
    }
    return true;
}

function validarContrasena(contrasena) {
    if (contrasena.length < 6) {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña inválida',
            text: 'La contraseña debe tener al menos 6 caracteres.',
            confirmButtonText: 'Ok'
        });
        return false;
    }
    return true;
}

function validaNumericos(event) {
    if(event.charCode >= 48 && event.charCode <= 57){
    return true;
    }
    return false;        
}

function verificarPasswords() {
 
    // Ontenemos los valores de los campos de contraseñas 
    pass1 = document.getElementById('pass1');
    pass2 = document.getElementById('pass2');
    
    if(pass1.value != "" && pass1.value == pass2.value) {
        if(!checkPassword(pass1.value)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Contraseña inválida',
                    text: 'La Contraseña requiere que al menos tenga una letra, un numero, una letra mayúscula, 8 caracteres, no permite espacios.',
                    confirmButtonText: 'Ok'
                });
          return false;
        }
    }       
    // Verificamos si las constraseñas no coinciden 
    if (pass1.value != pass2.value) {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña inválida',
            text: 'Las Contraseñas no coinciden, vuelve a intentar !',
            confirmButtonText: 'Ok'
        });            
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Contraseña Coinciden',
            text: 'Procesando...',
        });
        // Desabilitamos el botón de login 
        document.getElementById("mybutton").disabled = true;
 
        // Refrescamos la página (Simulación de envío del formulario) 
        setTimeout(function() {
            location.href ="login.html";
        }, 2000);
        return true;
    }    
    return true;
}

function checkPassword(valor){
    var myregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; 
   if(myregex.test(valor)){       
       return true;        
   }else{      
       return false;        
   }   
 }