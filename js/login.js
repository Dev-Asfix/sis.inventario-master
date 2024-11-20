document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar que la página se recargue

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    try {
        // Llamada a la API de autenticación en el servidor
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (result.success) {
            // Redirigir al dashboard si la autenticación es exitosa
            window.location.href = '/index.html';
        } else {
            // Mostrar mensaje de error si la autenticación falla
            errorMessage.textContent = 'Invalid username or password.';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error en la autenticación:', error);
        errorMessage.textContent = 'Error en el servidor.';
        errorMessage.style.display = 'block';
    }
});
