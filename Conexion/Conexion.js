// Conexion.js
const sql = require('mssql');

class Conexion {
    constructor() {
        this.config = {
            user: 'sa',           // Usuario de SQL Server
            password: '123',     // Contraseña de SQL Server
            server: 'ROBERTRAMIREZ',           // Servidor (puede ser localhost o IP)
            database: 'AuthDB',            // Nombre de la base de datos
            options: {
                encrypt: false,            // Si usas SSL en el servidor, ponlo en true
                trustServerCertificate: true // Permitir certificados autofirmados
            }
        };
        this.pool = null;
    }

    async conectar() {
        try {
            if (!this.pool) {
                this.pool = await sql.connect(this.config);
                console.log('Conexión establecida con SQL Server');
            }
            return this.pool;
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            throw error;
        }
    }

    cerrarConexion() {
        if (this.pool) {
            this.pool.close();
            console.log('Conexión cerrada');
        }
    }
}

module.exports = Conexion;
