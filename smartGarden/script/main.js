
// ------------------------------ MAIN JSCRIPT ------------------------------ //

import { loadComponent } from './providers/components.js';

// -------------------------------------------------------------------------- //

window.addEventListener('load', init);

function init() {
    console.time();
    console.log('- Inicializando APP...');
        showSessionInfo();
    console.timeEnd();
};

// -------------------------------------------------------------------------- //

document.addEventListener('DOMContentLoaded', () => {

    // Agrega eventos a los enlaces de navegación para cargar componentes
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', (event) => {
            event.preventDefault();
            const componentId = event.target.getAttribute('href').substring(1);
            loadComponent(componentId);
        });
    });

    // Agrega eventos a los botones con determinada clase.
    document.querySelectorAll('.component-link').forEach(button => {
        button.addEventListener('click', (event) => {
            const componentId = button.getAttribute('component-id');
            loadComponent(componentId);
        });
    });

    // TODO: Cambiar dependiendo si el usuario ya inicio sesión.
    // Cargar el componente inicial
    loadComponent('signin');
});

// -------------------------------------------------------------------------- //

let name_1 = 'Ed'; let name_2 = 'Rubio Zuñiga';
let user_image = null;//'https://i.pinimg.com/originals/bc/a5/38/bca5383122341b1acb4905d70dcfdbf4.png';

// Muestra elementos diferentes dependiendo de la sesión del usuario.
function showSessionInfo() {

    console.log(' - Inicializando HEADER...');
    showHeader();
};

// -------------------------------------------------------------------------- //

// Muestra información variable en el Header.
function showHeader() {
    let headerDiv = document.getElementById('headerDiv');
    let headerButtons = document.getElementById('header-buttons');

    // TODO: Mostrar si el usuario no ha iniciado sesión.
    let user = true; // Na'mas pa' simular el inicio de sesión.

    if(user === true) {
        showAvatar(name_1, name_2, user_image);

    } else {
        headerButtons.style.display = 'none';

        let sessionButtons = document.createElement('div');
        sessionButtons.className = 'session-buttons';

        headerDiv.appendChild(sessionButtons);

        let signinButton = document.createElement('session-button');
        signinButton.className = 'session-button session-button-signin';
        signinButton.innerHTML = 'Iniciar sesión';
        signinButton.href = '#';

        let signupButton = document.createElement('button');
        signupButton.className = 'session-button session-button-signup';
        signupButton.innerHTML = 'Registrarse';
        signupButton.href = '#';

        sessionButtons.appendChild(signinButton);
        sessionButtons.appendChild(signupButton);
    }

};

// -------------------------------------------------------------------------- //

// ----------------------- FUNCIONALIDAD DE LA PÁGINA ----------------------- //

// Permite mostrar/ocultar el sidebar al presionar un botón.
let headerSidebar = document.getElementById('toggle-sidemu');

headerSidebar.addEventListener('click', () => {
    let sidebar = document.getElementById('sidebar');
    let sidebarOpen = sidebar.getAttribute('open') === 'true';

    if (sidebarOpen) {
        sidebar.setAttribute('open', 'false');
        sidebar.style.display = 'none';
        headerSidebar.classList.remove('fa-xmark');
        headerSidebar.classList.add('fa-bars');
    } else {
        sidebar.setAttribute('open', 'true');
        sidebar.style.display = 'block';
        headerSidebar.classList.remove('fa-bars');
        headerSidebar.classList.add('fa-xmark');
    }
});


// Muestra las primeras dos iniciales o la imagen.
function showAvatar(name1, name2, image) {
    let headerProfile = document.getElementById('header-profile');

    if (!headerProfile) {
        throw new Error('header-profile element not found');
    }

    if (image !== null) {
        let headerImage = document.createElement('img');
        headerImage.addEventListener('click', () => { showSessionMenu() });
        headerProfile.appendChild(headerImage);
        headerImage.id = 'toggle-session';
        headerImage.alt = name1;
        headerImage.src = image;

    } else {
        const initial1 = name1.charAt(0).toUpperCase();
        const initial2 = name2.split(' ')[0].charAt(0).toUpperCase();

        let headerInitials = document.createElement('div');
        headerInitials.addEventListener('click', () => { showSessionMenu() });
        headerProfile.appendChild(headerInitials);
        headerInitials.id = 'toggle-session';

        let initialsText = document.createElement('span');
        initialsText.innerHTML = initial1 + initial2;
        headerInitials.appendChild(initialsText);
    }
}


// Permite mostrar/ocultar el menú de sesión.
function showSessionMenu() {
    let sessionMenu = document.getElementById('session-menu');
    let menuOpen = sessionMenu.getAttribute('open');

    if(menuOpen !== 'true') {
        sessionMenu.style.display = 'block';
        sessionMenu.setAttribute('open', 'true');
    } else {
        sessionMenu.style.display = 'none';
        sessionMenu.setAttribute('open', 'false');
    }
};

// -------------------------------------------------------------------------- //
