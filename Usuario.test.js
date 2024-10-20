const Usuario = require('./Usuario'); // Importar la clase Usuario
const Database = require('./Database'); // Importar la clase Database

// Mocks de la clase Database para evitar conexiones reales
jest.mock('./Database'); // Simular las funciones de la base de datos para pruebas

describe('Usuario', () => {
    let usuario; // Declarar la variable para la instancia de Usuario

    beforeAll(() => {
        // Espiar las funciones console.log y console.error para no imprimir en la consola durante las pruebas
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        // Restaurar las funciones originales de console.log y console.error
        console.log.mockRestore();
        console.error.mockRestore();
    });

    beforeEach(() => {
        usuario = new Usuario(); // Crear una nueva instancia de Usuario antes de cada prueba
    });

    test('debe listar todos los usuarios', async () => {
        // Mock de la respuesta de la consulta
        const mockUsers = [
            { id: 1, usuario: 'admin' }, // Primer usuario
            { id: 2, usuario: 'user2' }, // Segundo usuario
            { id: 3, usuario: 'user3' }, // Tercer usuario
        ];

        Database.prototype.query.mockResolvedValue(mockUsers); // Simular la consulta a la base de datos con éxito

        const result = await usuario.listarUsuarios(); // Llamar al método listarUsuarios

        expect(result).toEqual(mockUsers); // Verificar que el resultado sea el esperado
        expect(console.log).toHaveBeenCalledWith('Lista de Usuarios:'); // Verificar que se llama a console.log con el mensaje adecuado
        mockUsers.forEach(user => {
            expect(console.log).toHaveBeenCalledWith(`ID: ${user.id}, Usuario: ${user.usuario}`); // Verificar que se imprime la información de cada usuario
        });
    });

    test('debe manejar errores al listar usuarios', async () => {
        const mockError = new Error('Error de conexión'); // Crear un error simulado
        Database.prototype.query.mockRejectedValue(mockError); // Simular un error en la consulta

        await usuario.listarUsuarios(); // Llamar al método listarUsuarios

        expect(console.error).toHaveBeenCalledWith('Error al listar los usuarios:', mockError); // Verificar que se maneje el error y se imprima en la consola
    });
});
