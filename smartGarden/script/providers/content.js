
// -------------------------------------------------------------------------- //

import { loadSessionComponents } from '../providers/components.js';

// LOAD: HEADER-CONTENT: ---------------------------------------------------- //

export async function headerContent(user) {
    let headerSidebar = document.getElementById('header-left');
    let headerNavigation = document.getElementById('header-center');

    let headerLogo = document.createElement('img');
        headerLogo.src = 'assets/adaptive-icon.png';
        headerLogo.alt = 'MY SMART-GARDEN';
        headerLogo.className = 'header-logo';

    // ---------------------------------------------------------------------- //

    if (user.role === null) {
        let headerInfo = document.getElementById('header-right');

        let signinButton = document.createElement('div');
            signinButton.classList = 'component-link session-button session-button-signin';
            signinButton.setAttribute('component-id', 'signin');
            let signinText = document.createElement('small');
            signinText.innerHTML = 'Iniciar sesión';
        signinButton.appendChild(signinText);

        let signupButton = document.createElement('div');
            signupButton.classList = 'component-link session-button session-button-signup';
            signupButton.setAttribute('component-id', 'signup');
            let signupText = document.createElement('small');
            signupText.innerHTML = 'Registrarse';
        signupButton.appendChild(signupText);

        headerNavigation.appendChild(headerLogo);
        headerInfo.appendChild(signinButton);
        headerInfo.appendChild(signupButton);

    } else {
        let userName = user.firstName.split(' ')[0] + ' ' + user.lastName.split(' ')[0];

        // Muestra el avatar del usuario.
        // showAvatar(user.firstName, user.lastName, user.image, user.role);
        showAvatar(user.firstName, user.lastName, user.role);

        // Rellena la informaicón del menú de sesión.
        headerSessionMenu(userName, user.role);

        // Crea el botón para desplegar el SIDEBAR.
        let sidebarButton = document.createElement('i');
        sidebarButton.classList = 'sidebar-button fa-solid fa-bars fa-lg';
        sidebarButton.id = 'toggle-sidebar';
        headerSidebar.appendChild(sidebarButton);

        // Rellena la información del SIDEBAR.
        sidebarMenu(user.role);

        // ------------------------------------------------------------------  //

        if (user.role === 'client') {
            // Nombre, ícono (FontAwesome), ID del componente.
            let shortcutOne = createShortcut('Inicio', 'fa-house', 'home');
            let shortcutTwo = createShortcut('Jardines', 'fa-leaf', 'gardens');
            let shortcutThree = createShortcut('Compras', 'fa-store', 'shopping');
            let shortcutFour = createShortcut('Información', 'fa-circle-info', 'about');

            headerNavigation.appendChild(shortcutOne);
            headerNavigation.appendChild(shortcutTwo);
            headerNavigation.appendChild(headerLogo);
            headerNavigation.appendChild(shortcutThree);
            headerNavigation.appendChild(shortcutFour);

        } else if (user.role === 'admin' || user.role === 'superAdmin') {
            // ...
        }

        closeAllMenu();
    }
}

// Crea los accesos directos del HEADER.
function createShortcut(name, iconFA, componentId) {
    let shortcut = document.createElement('div');
    shortcut.classList = 'component-link header-nav';
    shortcut.setAttribute('component-id', componentId);

    let icon = document.createElement('i');
    icon.classList = 'fa-solid ' + iconFA +  ' fa-sm header-icon';
    let nameElement = document.createElement('small');
    nameElement.innerHTML = name;

    shortcut.appendChild(icon);
    shortcut.appendChild(nameElement);

    return shortcut;
}

// Muestra las primeras dos iniciales o la imagen de usuario.
async function showAvatar(name1, name2, type) {
    let headerProfile = document.getElementById('header-right');
    let sidebarProfile = document.getElementById('main-sidebar');

    if (!headerProfile) {
        throw new Error('ERROR: Element with ID "header-right" was not found.');
    }

    if (!sidebarProfile) {
        throw new Error('ERROR: Element with ID "header-right" was not found.');
    }

    // ---------------------------------------------------------------------- //

    // if (image !== null) {
    //     let headerImage = document.createElement('img');
    //     headerProfile.appendChild(headerImage);
    //     headerImage.id = 'toggle-session';
    //     headerImage.alt = name1;
    //     headerImage.src = image;
    //     headerImage.setAttribute('open', 'false');

    // } else {
        let initial1 = name1.split(' ')[0].charAt(0).toUpperCase();
        let initial2 = name2.split(' ')[0].charAt(0).toUpperCase();

        let headerInitials = document.createElement('div');
        headerProfile.appendChild(headerInitials);
        headerInitials.id = 'toggle-session';
        headerInitials.setAttribute('open', 'false');
        headerInitials.className = 'header-initials';

        let initialsText = document.createElement('span');
        initialsText.innerHTML = initial1 + initial2;
        headerInitials.appendChild(initialsText);
    // }

    let sidebarName = document.getElementById('sidebar-username');
    let userName = name1.split(' ')[0] + ' ' + name2.split(' ')[0];
    sidebarName.innerHTML = userName.toLocaleUpperCase();

    let sidebarType = document.getElementById('sidebar-usertype');

    if (type === 'client') {
        sidebarType.innerHTML = 'Amante de la naturaleza'.toLocaleUpperCase();
    } else if (type === 'admin') {
        sidebarType.innerHTML = 'Administrador'.toLocaleUpperCase();
    } else if (type === 'superAdmin') {
        sidebarType.innerHTML = 'Administrador principal'.toLocaleUpperCase();
    }

    // ---------------------------------------------------------------------- //

    let sessionToggle = document.getElementById('toggle-session');
    sessionToggle.setAttribute('open', 'false');

    sessionToggle.addEventListener('click', toggleSessionMenu);
}

// LOAD: SESSION-MENU-CONTENT: ---------------------------------------------- //

// Muestra la información del menú de sesión.
function headerSessionMenu(name, type) {
    let userName = document.getElementById('session-name');
    let userType = document.getElementById('session-type');
    let sessionMenu = document.getElementById('session-menu');

    userName.innerHTML = name.toUpperCase();

    if (type === 'client') {
        userType.innerHTML = 'Amante de la naturaleza';
    } else if (type === 'admin') {
        userType.innerHTML = 'Administrador';
    } else if (type === 'superAdmin') {
        userType.innerHTML = 'Administrador principal';
    }

    // ---------------------------------------------------------------------- //

    // Nombre, ícono (FontAwesome), ID del componente.
    let buttonOne = createSessionButton('Perfil', 'fa-user', 'profile');
    let buttonTwo = createSessionButton('Dudas frecuentes', 'fa-gear', 'profile');
    // let buttonThree = createSessionButton('Cerrar sesión', 'fa-right-from-bracket', 'profile');

    // ---------------------------------------------------------------------- //

    let buttonThree =  document.createElement('div');
    buttonThree.classList = 'session-menu-button';

    let icon = document.createElement('i');
    icon.classList = `fa-solid fa-right-from-bracket fa-sm`;
    let nameElement = document.createElement('small');
    nameElement.innerHTML = 'Cerrar sesión';

    buttonThree.addEventListener('click', () => {
        // Elimina los datos del usuario del almacenamiento local.
        localStorage.removeItem('user');

        // Carga los componentes para un usuario no autenticado.
        loadSessionComponents(null);

        // Recarga la página para reflejar el estado de no autenticado.
        window.location.reload();
    });

    buttonThree.appendChild(icon);
    buttonThree.appendChild(nameElement);

    // ---------------------------------------------------------------------- //

    sessionMenu.appendChild(buttonOne);
    sessionMenu.appendChild(buttonTwo);
    sessionMenu.appendChild(buttonThree);
};

// Crea los botones del menú de sesión.
function createSessionButton(name, iconClass, componentId) {
    let button = document.createElement('div');
    button.classList = 'component-link session-menu-button';
    button.setAttribute('component-id', componentId);

    let icon = document.createElement('i');
    icon.classList = `fa-solid ${iconClass} fa-sm`;
    let nameElement = document.createElement('small');
    nameElement.innerHTML = name;

    button.appendChild(icon);
    button.appendChild(nameElement);

    return button;
}

// Permite mostrar/ocultar el menú de sesión al presionar un botón.
async function toggleSessionMenu() {
    let sessionToggle = document.getElementById('toggle-session');
    let sessionMenu = document.getElementById('session-menu');
    let sessionOpen = sessionToggle.getAttribute('open') === 'true';

    if (sessionOpen) {
        sessionToggle.setAttribute('open', 'false');
        sessionMenu.style.display = 'none';
    } else {
        sessionToggle.setAttribute('open', 'true');
        sessionMenu.style.display = 'block';
    }
};

// LOAD: SIDEBAR-CONTENT: --------------------------------------------------- //

// Muestra la información del SIDEBAR.
function sidebarMenu(type) {
    let sidebarButton = document.getElementById('toggle-sidebar');
        sidebarButton.setAttribute('open', 'false');
        sidebarButton.addEventListener('click', toggleSidebar);

    // ---------------------------------------------------------------------- //

    let sidebar = document.getElementById('main-sidebar');

    if (type === 'client') {
        // Nombre, ícono (FontAwesome), ID del componente.
        let buttonOne = createSidebarnButton('Perfil', 'fa-user', 'profile');
        let buttonTwo = createSidebarnButton('Jardines', 'fa-leaf', 'gardens');
        let buttonThree = createSidebarnButton('Compras', 'fa-store', 'shopping');
        let buttonFour = createSidebarnButton('Clima', 'fa-cloud-sun-rain', 'weather');

        sidebar.appendChild(buttonOne);
        sidebar.appendChild(buttonTwo);
        sidebar.appendChild(buttonThree);
        sidebar.appendChild(buttonFour);
    } else if (type === 'admin' || type === 'superAdmin') {
        // ...
    }

    if (type === 'superAdmin') {
        // ...
    }
};

// Crea los botones del SIDEBAR.
function createSidebarnButton(name, iconClass, componentId) {
    let button = document.createElement('div');
    button.classList = 'component-link main-sidebar-button';
    button.setAttribute('component-id', componentId);

    let icon = document.createElement('i');
    icon.classList = `fa-solid ${iconClass}`;
    let nameElement = document.createElement('strong');
    nameElement.innerHTML = name;

    button.appendChild(icon);
    button.appendChild(nameElement);

    return button;
}

// Permite mostrar/ocultar el SIDEBAR.
async function toggleSidebar() {
    let sidebar = document.getElementById('main-sidebar');
    let sidebarButton = document.getElementById('toggle-sidebar');
    let sidebarOpen = sidebarButton.getAttribute('open') === 'true';
    let contentPage = document.getElementById('page-content');

    if (sidebarOpen) {
        sidebarButton.setAttribute('open', 'false');
        sidebar.style.left = 'calc(-24rem - 4rem)';
        sidebar.style.boxShadow = 'none';
        sidebar.classList.remove('open');

        contentPage.style.filter = 'none';

        sidebarButton.classList.remove('fa-xmark');
        sidebarButton.classList.add('fa-bars');

    } else {
        sidebarButton.setAttribute('open', 'true');
        sidebar.style.left = '0';
        sidebar.style.boxShadow = '0 0rem 2rem var(--shadow-dark)';
        sidebar.classList.add('open');

        contentPage.style.filter = 'brightness(.8)';

        sidebarButton.classList.remove('fa-bars');
        sidebarButton.classList.add('fa-xmark');
    }
};

// Cierra los menús activos presionar en cualquier lugar de la pantalla.
export async function closeAllMenu() {
    let content = document.getElementById('page-content');

    let sidebar = document.getElementById('toggle-sidebar');
    let sessionMenu = document.getElementById('toggle-session');

    content.addEventListener('click', () => {
        sidebar.setAttribute('open', 'true');
        toggleSidebar();

        sessionMenu.setAttribute('open', 'true');
        toggleSessionMenu();
    });

}

// -------------------------------------------------------------------------- //
