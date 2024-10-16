const mysql = require('mysql2'); // Importar el módulo 'mysql2' para manejar conexiones a MySQL

class Database { // Definición de la clase Database
    constructor() { // Constructor de la clase Database
        // Crear una conexión a la base de datos utilizando las credenciales proporcionadas
        this.connection = mysql.createConnection({
            host: 'localhost', // Dirección del servidor de la base de datos (localhost en este caso)
            user: 'root', // Nombre de usuario para la conexión (puede ser diferente según la configuración)
            password: '', // Contraseña para la conexión (dejar vacía si no hay contraseña)
            database: 'tienda_db' // Nombre de la base de datos a la que se va a conectar
        });

        // Intentar establecer la conexión a la base de datos
        this.connection.connect((err) => { // Conectar a la base de datos y manejar el error si ocurre
            if (err) { // Si hay un error al conectar
                console.error('Error al conectar a la base de datos:', err); // Imprimir el mensaje de error en la consola
            } else { // Si la conexión es exitosa
                console.log('Conexión exitosa a la base de datos.'); // Imprimir un mensaje de éxito en la consola
            }
        });
    }

    // Método para ejecutar consultas a la base de datos
    query(sql, args) { // El método recibe una consulta SQL y sus argumentos
        return new Promise((resolve, reject) => { // Devolver una nueva promesa para manejar operaciones asíncronas
            this.connection.query(sql, args, (err, rows) => { // Ejecutar la consulta
                if (err) { // Si hay un error en la consulta
                    return reject(err); // Rechazar la promesa con el error
                }
                resolve(rows); // Resolver la promesa con las filas devueltas por la consulta
            });
        });
    }

    // Método para cerrar la conexión a la base de datos
    close() { // Método para cerrar la conexión
        return new Promise((resolve, reject) => { // Devolver una nueva promesa para manejar la operación asíncrona
            this.connection.end(err => { // Cerrar la conexión y manejar el error si ocurre
                if (err) { // Si hay un error al cerrar
                    return reject(err); // Rechazar la promesa con el error
                }
                resolve(); // Resolver la promesa si se cierra correctamente
            });
        });
    }
}

module.exports = Database; // Exportar la clase Database para que pueda ser utilizada en otros archivos
