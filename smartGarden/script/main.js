
// ------------------------------ MAIN JSCRIPT ------------------------------ //

import { headerContent } from './providers/content.js';
import { loadSessionComponents, loadSpecificComponent } from './providers/components.js';

// ---------------------------------- INIT ---------------------------------- //

window.addEventListener('load', init);

function init() {
    console.log('― Inicializando APP...');

    // ---------------------------------------------------------------------- //

    const noUser = { firstName: 'Anónimo', lastName: 'Anónimo', image: null, role: null };

    // Intenta obtener los datos del usuario desde el almacenamiento local.
    let user = localStorage.getItem('user');

    if (user) { user = JSON.parse(user);
    } else { user = noUser; localStorage.setItem('user', JSON.stringify(noUser)); }

    // Carga los componentes correspondientes al usuario.
    loadSessionComponents(user.role || null);

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

// -------------------------------------------------------------------------- //
