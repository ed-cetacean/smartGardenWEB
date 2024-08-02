
// -------------------------------------------------------------------------- //

import { smartGarden } from '../../../api/config.js';
import { loadSessionComponents, loadSpecificComponent } from '../../../script/providers/components.js';

// SIGNIN: START ------------------------------------------------------------ //

export const init = () =>{
    console.log('   • Inicializando SIGNIN (START)...');
    document.title= 'Iniciar sesión | Smart Garden';
}

// -------------------------------------------------------------------------- //

let continueButton = document.getElementById('si-continue');
let signUpButton = document.getElementById('si-new-account');

signUpButton.addEventListener('click', () => {
    loadSpecificComponent('signup');
});


continueButton.addEventListener('click', async () => {
    const email = document.getElementById('si-email').value;
    const password = document.getElementById('si-password').value;

    if (!email || !password) {
        alert('Por favor, rellene todos los campos.');
        return;
    }

    try {
        const response = await fetch(`${smartGarden.url.api}Auth/login`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) throw new Error('Error en la solicitud: ' + response.statusText);

        const data = await response.json();

        // Guarda los datos del usuario en el almacenamiento local.
        localStorage.setItem('user', JSON.stringify(data));
        let user = localStorage.getItem('user');

        // Carga los componentes correspondientes al usuario.
        loadSessionComponents(user.role);
        window.location.reload();

    } catch (error) {
        console.error('ERROR: ', error.message);
    }
});

// -------------------------------------------------------------------------- //
