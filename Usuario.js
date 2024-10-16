const Database = require('./Database'); // Importar la clase de conexión

class Usuario {
    constructor() {
        this.db = new Database();
    }

    // Método para listar todos los usuarios
    listarUsuarios() {
        const query = 'SELECT * FROM usuarios';
        return this.db.query(query)
            .then(rows => {
                console.log('Lista de Usuarios:');
                rows.forEach(row => {
                    console.log(`ID: ${row.id}, Usuario: ${row.usuario}`);
                });
                return rows;
            })
            .catch(err => {
                console.error('Error al listar los usuarios:', err);
            })
            .finally(() => {
                this.db.close();
            });
    }
}

module.exports = Usuario;
