// Usuario.test.js
const Usuario = require('../js/Usuario');

describe('Pruebas para la clase Usuario con base de datos real', () => {
    let usuario;

    // Inicializar antes de cada prueba
    beforeEach(() => {
        usuario = new Usuario();
    });

    // Cerrar la conexión a la base de datos después de todas las pruebas
    afterAll(async () => {
        await usuario.conexion.cerrarConexion(); // Asegúrate de que el método cerrar() esté en tu clase Conexion
    });

    describe('Método listarUsuarios', () => {
        test('Debe listar todos los usuarios de la base de datos real', async () => {
            const usuarios = await usuario.listarUsuarios();
            expect(usuarios).toBeInstanceOf(Array); // Verifica que es un array
            expect(usuarios.length).toBeGreaterThan(0); // Verifica que no está vacío
            // Puedes agregar más aserciones aquí si es necesario
        });
    });

    describe('Método autenticar', () => {
        test('Debe autenticar correctamente con credenciales válidas', async () => {
            const nombreUsuario = 'admin'; // Cambia a un usuario válido en tu BD
            const contrasena = 'admin'; // Cambia a la contraseña correcta
            
            const resultado = await usuario.autenticar(nombreUsuario, contrasena);
            expect(resultado).toBe(true); // La autenticación debería ser exitosa
        });

        test('Debe fallar la autenticación con credenciales inválidas', async () => {
            const nombreUsuario = 'usuario_invalido'; // Cambia a un usuario que no exista en tu BD
            const contrasena = 'contrasena_invalida'; // Cambia a una contraseña incorrecta
            
            const resultado = await usuario.autenticar(nombreUsuario, contrasena);
            expect(resultado).toBe(false); // La autenticación debería fallar
        });
    });
});
