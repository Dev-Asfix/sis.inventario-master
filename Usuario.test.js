const Usuario = require('./Usuario'); // Importar la clase Usuario
const Database = require('./Database'); // Importar la clase Database

// Mocks de la clase Database para evitar conexiones reales
jest.mock('./Database');

describe('Usuario', () => {
    let usuario;

    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        console.log.mockRestore();
        console.error.mockRestore();
    });

    beforeEach(() => {
        usuario = new Usuario();
    });

    test('debe listar todos los usuarios', async () => {
        // Mock de la respuesta de la consulta
        const mockUsers = [
            { id: 1, usuario: 'admin' },
            { id: 2, usuario: 'user2' },
            { id: 3, usuario: 'user3' },
        ];

        Database.prototype.query.mockResolvedValue(mockUsers); // Simular la consulta a la base de datos

        const result = await usuario.listarUsuarios();

        expect(result).toEqual(mockUsers); // Verificar que el resultado sea el esperado
        expect(console.log).toHaveBeenCalledWith('Lista de Usuarios:'); // Verificar que se llama a console.log
        mockUsers.forEach(user => {
            expect(console.log).toHaveBeenCalledWith(`ID: ${user.id}, Usuario: ${user.usuario}`);
        });
    });

    test('debe manejar errores al listar usuarios', async () => {
        const mockError = new Error('Error de conexión');
        Database.prototype.query.mockRejectedValue(mockError); // Simular un error en la consulta

        await usuario.listarUsuarios();

        expect(console.error).toHaveBeenCalledWith('Error al listar los usuarios:', mockError); // Verificar que se maneje el error
    });
});
