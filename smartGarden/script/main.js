
// ------------------------------ MAIN JSCRIPT ------------------------------ //

import { headerContent, closeAllMenu } from './providers/content.js';
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

    // Permite cerrar todoss los menús desplegables.
    closeAllMenu();
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

// -------------------------------------------------------------------------- //
