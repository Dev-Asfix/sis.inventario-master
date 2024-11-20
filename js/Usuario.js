// Usuario.js
const Conexion = require('../Conexion/Conexion'); // Importar la clase Conexion
const sql = require('mssql');

class Usuario {
    constructor() {
        this.conexion = new Conexion(); // Instancia de la conexión
    }

    // Método para autenticar usuario
    async autenticar(nombreUsuario, contrasena) {
        try {
            const pool = await this.conexion.conectar(); // Conectar a la BD
            const result = await pool.request()
                .input('nombreUsuario', sql.NVarChar, nombreUsuario)
                .input('contrasena', sql.NVarChar, contrasena)
                .query('SELECT * FROM Usuarios WHERE nombreUsuario = @nombreUsuario AND contrasena = @contrasena');

            // Verificar si las credenciales son correctas
            if (result.recordset.length > 0) {
                console.log('Autenticación exitosa');
                return true;
            } else {
                console.log('Autenticación fallida');
                return false;
            }
        } catch (error) {
            console.error('Error durante la autenticación:', error);
            throw error;
        }
    }

    // Método para listar todos los usuarios
    async listarUsuarios() {
        try {
            const pool = await this.conexion.conectar(); // Conectar a la BD
            const result = await pool.request().query('SELECT * FROM Usuarios'); // Consultar todos los usuarios
            
            if (result.recordset.length > 0) {
                console.log('Lista de usuarios:', result.recordset);
                return result.recordset; // Retornar los usuarios encontrados
            } else {
                console.log('No se encontraron usuarios');
                return [];
            }
        } catch (error) {
            console.error('Error al listar usuarios:', error);
            throw error;
        }
    }
}

module.exports = Usuario; // Exportar la clase
