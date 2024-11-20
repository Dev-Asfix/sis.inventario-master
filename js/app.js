// app.js
const Usuario = require('../js/Usuario');

async function iniciarSesion() {
    const usuario = new Usuario();

    const nombreUsuario = 'admin'; // Usuario de prueba
    const contrasena = 'admin';    // Contraseña de prueba

    const autenticado = await usuario.autenticar(nombreUsuario, contrasena);

    if (autenticado) {
        console.log('Usuario autenticado correctamente');
    } else {
        console.log('Error en la autenticación');
    }
}

iniciarSesion();
