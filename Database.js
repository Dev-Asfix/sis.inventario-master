const mysql = require('mysql2');

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root', // Cambia esto si tienes un usuario diferente
            password: '', // Cambia esto si tienes una contraseña configurada
            database: 'tienda_db'
        });

        this.connection.connect((err) => {
            if (err) {
                console.error('Error al conectar a la base de datos:', err);
            } else {
                console.log('Conexión exitosa a la base de datos.');
            }
        });
    }

    // Método para ejecutar consultas
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

    // Método para cerrar la conexión
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

module.exports = Database;
