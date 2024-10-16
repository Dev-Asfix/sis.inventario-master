const Database = require('./Database'); // Importar la clase de conexión a la base de datos

class Usuario { // Definición de la clase Usuario
    constructor() { // Constructor de la clase Usuario
        this.db = new Database(); // Crear una nueva instancia de la clase Database y asignarla a la propiedad 'db'
    }

    // Método para listar todos los usuarios
    listarUsuarios() { // Definición del método listarUsuarios
        const query = 'SELECT * FROM usuarios'; // Consulta SQL para seleccionar todos los usuarios de la tabla 'usuarios'
        return this.db.query(query) // Llamar al método 'query' de la clase Database, pasando la consulta SQL
            .then(rows => { // Manejar la promesa resuelta (éxito)
                console.log('Lista de Usuarios:'); // Imprimir en la consola el encabezado para la lista de usuarios
                rows.forEach(row => { // Iterar sobre cada fila (usuario) en el resultado de la consulta
                    console.log(`ID: ${row.id}, Usuario: ${row.usuario}`); // Imprimir el ID y el nombre de usuario de cada fila
                });
                return rows; // Devolver las filas (usuarios) como resultado del método
            })
            .catch(err => { // Manejar la promesa rechazada (error)
                console.error('Error al listar los usuarios:', err); // Imprimir en la consola el mensaje de error
            })
            .finally(() => { // Código que se ejecuta al final, independientemente de si la promesa fue resuelta o rechazada
                this.db.close(); // Llamar al método 'close' de la clase Database para cerrar la conexión
            });
    }
}

module.exports = Usuario; // Exportar la clase Usuario para que pueda ser utilizada en otros archivos
