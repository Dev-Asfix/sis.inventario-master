const Usuario = require('./Usuario'); // Asegúrate de que la ruta sea correcta

(async () => {
    const usuario = new Usuario();
    try {
        const usuarios = await usuario.listarUsuarios();
        console.log(usuarios); // Muestra la lista de usuarios en la consola
    } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
    }
})();
