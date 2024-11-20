document.getElementById('registrar-button').addEventListener('click', async function () {
    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const contrasena = document.getElementById('contrasena').value;

    try {
        const response = await fetch('http://localhost:3000/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombreUsuario, contrasena }),
        });

        const data = await response.json();
        console.log(data.message); // Muestra el mensaje de éxito o error
    } catch (error) {
        console.error('Error al registrar:', error);
    }
});
