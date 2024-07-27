
// ------------------------------ MAIN JSCRIPT ------------------------------ //

import { headerContent } from './providers/content.js';
import { loadSessionComponents, loadSpecificComponent } from './providers/components.js';

// -------------------------------------------------------------------------- //

const user = {
    firstName: 'Ed',
    lastName: 'Rubio Zuñiga',
    image: null,//'https://i.pinimg.com/originals/bc/a5/38/bca5383122341b1acb4905d70dcfdbf4.png',
    type: 'client',
}

// ---------------------------------- INIT ---------------------------------- //

window.addEventListener('load', init);

function init() {
    console.log('― Inicializando APP...');

    // Carga los componentes correspondientes al usuario.
    loadSessionComponents(user.type);

    // Carga los accesos directos del HEADER correspondientes al usuario.
    headerContent(user);

    // Permite la carga de componentes en determinados botones.
    setupShortcuts();
};

// ----------------------- FUNCIONALIDAD DE LA PÁGINA ----------------------- //

// Toma el 'componen-id' de cada elemento con la clase 'component-link'.
// Permitiendo así la carga del componente específico de cada uno.
function setupShortcuts() {
    document.querySelectorAll('.component-link').forEach(button => {
        button.addEventListener('click', (event) => {
            const componentId = button.getAttribute('component-id');
            loadSpecificComponent(componentId);
        });
    });
}




// LOAD: SIDEBAR-CONTENT: --------------------------------------------------- //

function sidebarContent(user) {
    let sidebar = document.getElementById('sidebar');

}





















// ----------------------- FUNCIONALIDAD DE LA PÁGINA ----------------------- //

// Permite mostrar/ocultar el sidebar al presionar un botón.
// let toggleSidebar = document.getElementById('toggle-sidebar');

// headerSidebar.addEventListener('click', () => {
//     let sidebar = document.getElementById('sidebar');
//     let sidebarOpen = sidebar.getAttribute('open') === 'true';

//     if (sidebarOpen) {
//         sidebar.setAttribute('open', 'false');
//             sidebar.classList.add('sidebar-open');

//         // Cambia el ícono del botón que abre el SIDEBAR.
//         toggleSidebar.classList.remove('fa-xmark');
//         toggleSidebar.classList.add('fa-bars');

//     } else {
//         sidebar.setAttribute('open', 'true');
//             sidebar.classList.remove('sidebar-open');

//         // Cambia el ícono del botón que cierra el SIDEBAR.
//         toggleSidebar.classList.remove('fa-bars');
//         toggleSidebar.classList.add('fa-xmark');
//     }

// })





// headerSidebar.addEventListener('click', () => {
//     let sidebar = document.getElementById('sidebar');
//     let sidebarOpen = sidebar.getAttribute('open') === 'true';

//     if (sidebarOpen) {
//         sidebar.setAttribute('open', 'false');
//         sidebar.style.display = 'none';
//         headerSidebar.classList.remove('fa-xmark');
//         headerSidebar.classList.add('fa-bars');
//     } else {
//         sidebar.setAttribute('open', 'true');
//         sidebar.style.display = 'block';
//         headerSidebar.classList.remove('fa-bars');
//         headerSidebar.classList.add('fa-xmark');
//     }
// });

// -------------------------------------------------------------------------- //
