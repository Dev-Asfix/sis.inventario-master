const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Usuario = require('./js/Usuario'); // Importar la clase Usuario

const app = express();
const port = 3000;

// Middleware para analizar el cuerpo de la solicitud
app.use(bodyParser.json());

// Ruta para manejar la autenticación
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const usuario = new Usuario();

    try {
        const authenticated = await usuario.autenticar(username, password);
        if (authenticated) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Error durante la autenticación:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

// Ruta para manejar el registro de usuarios
app.post('/registrar', async (req, res) => {
    const { nombreUsuario, contrasena } = req.body; // Extraer los datos del cuerpo de la solicitud

    const usuario = new Usuario();

    try {
        const pool = await usuario.conexion.conectar(); // Conectar a la base de datos
        await pool.request()
            .input('nombreUsuario', sql.NVarChar, nombreUsuario)
            .input('contrasena', sql.NVarChar, contrasena)
            .query('INSERT INTO Usuarios (nombreUsuario, contrasena) VALUES (@nombreUsuario, @contrasena)'); // Ejecutar la consulta

        res.json({ message: 'Usuario registrado exitosamente' }); // Respuesta exitosa
    } catch (error) {
        console.error('Error al registrar usuario:', error); // Log del error
        res.status(500).json({ message: 'Error al registrar el usuario.' }); // Respuesta de error
    }
});




// Servir archivos estáticos
app.use(express.static(__dirname)); // Servir archivos estáticos desde el directorio raíz

// Ruta específica para servir login.html
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html')); // Enviar login.html
});

// Ruta para servir el formulario de registro
app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Enviar index.html para el registro
});

// Ruta para servir el formulario de registro
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Enviar index.html para el registro
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
