
// -------------------------------------------------------------------------- //

import { smartGarden } from '../../../api/config.js';
import { loadSpecificComponent } from '../../../script/providers/components.js';

// SIGNUP: START ------------------------------------------------------------ //

export const init = () =>{
    console.log('   • Inicializando SIGNUP (START)...');
    document.title= 'Registrarse | Smart Garden';
}

// -------------------------------------------------------------------------- //

let continueButton = document.getElementById('su-continue');
let signInButton = document.getElementById('su-login');

signInButton.addEventListener('click', async () => {
    loadSpecificComponent('signin');
});

continueButton.addEventListener('click', async () => {
    const email = document.getElementById('su-email').value;
    const password = document.getElementById('su-password').value;
    const firstName = document.getElementById('su-firstName').value;
    const lastName = document.getElementById('su-lastName').value;
    const street = document.getElementById('su-street').value;
    const zip = document.getElementById('su-zip').value;
    const city = document.getElementById('su-city').value;
    const state = document.getElementById('su-state').value;
    const country = document.getElementById('su-country').value;

    // Verifica que todos los campos estén completos
    if (!email || !password || !firstName || !lastName || !street || !zip || !city || !state || !country) {
        alert('Por favor, rellene todos los campos.');
        return;
    }

    try {
        // Envía una solicitud POST a la API de registro
        const response = await fetch(`${smartGarden.url.api}Auth/register`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, firstName, lastName, street, zip, city, state, country }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error('ERROR: ' + errorText);
        }

        // Muestra un mensaje de éxito o redirige al usuario
        alert('Registro exitoso. Por favor, inicia sesión.');
        loadSpecificComponent('signin');

    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        alert('Hubo un problema al registrar tu cuenta. Por favor, inténtalo de nuevo.');
    }
});
// -------------------------------------------------------------------------- //
