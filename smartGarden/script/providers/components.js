
// ----------------------------- APP COMPONENTS ----------------------------- //

export let settings = {

    load: {

        // No se ha iniciado sesión.
        start: [
            { id: 'initialHome', url: 'components/start/initialHome' },
            { id: 'signin', url: 'components/start/signin' },
            { id: 'signup', url: 'components/start/signup' },
        ],

        // Se ha iniciado sesión.
        feed: [
            { id: 'about', url: 'components/feed/about' },
            { id: 'profile', url: 'components/feed/profile' },
        ],

        // Un cliente ha iniciado sesión.
        client: [
            { id: 'home', url: 'components/client/home' },
            { id: 'gardens', url: 'components/client/gardens' },
            { id: 'gardenStats', url: 'components/client/gardenStats' },
            { id: 'newProfile', url: 'components/client/newProfile' },
            { id: 'shopping', url: 'components/client/shopping' },
            { id: 'payments', url: 'components/client/payments' },
            { id: 'weather', url: 'components/client/weather' },
        ],

        // Un administrador ha iniciado sesión.
        admin: [
            { id: 'homeAdmin', url: 'components/admin/homeAdmin' }, // Sección Inicio
            { id: 'users', url: 'components/admin/users' }, // Sección de usuarios
            { id: 'inventory', url: 'components/admin/inventory' }, // Sección de inventario
            { id: 'memberships', url: 'components/admin/memberships' }, // Sección de membresías
            { id: 'sensorPacks', url: 'components/admin/sensorPacks' }, // Sección de paquetes de sensores
        ],


        // El administrador principal ha iniciado sesión.
        superAdmin: [
            { id: 'newAdmin', url: 'components/superAdmin/newAdmin' },
        ],

    },

};

// -------------------------------------------------------------------------- //

// Función auxiliar para cargar un componente.
async function loadComponent(component, ...args) {

    // Se obtiene el nombre de los archivos a cargar.
    const componentName = component.id;

    // Se obtiene la ruta de los archivos a cargar.
    const componentLocation = window.location.href;
    const componentURL = componentLocation + component.url + '/' + componentName;

    // Se agrega el parámetro de tiempo para evitar la caché del navegador.
    const now = Date.now();
    const requestURL = componentURL + '.html?a=' + now;

    const moduleURL = componentURL + '.js';

    // Elemento en el que se insertará el contenido del componente.
    const contentElement = document.getElementById('main-content');
    if (!contentElement) throw new Error('ERROR: Content element with ID "main-content" was not found.');

    // ---------------------------------------------------------------------- //

    console.log('   • Loading component: ' + componentName.toUpperCase());

    // ---------------------------------------------------------------------- //

    // Se realiza una solicitud para obtener el contenido HTML del componente.
    try {
        const response = await fetch(requestURL, { headers: { 'cache': 'no-store' } });
        if (!response.ok) throw new Error('ERROR: Failed to load component: ' + componentName + '. ' + response.status + ': ' + response.statusText);

        contentElement.innerHTML = await response.text();
    } catch (error) {
        console.error(error.message);
    }

    // Se importa y ejecuta el módulo JS del componente.
    try {
        await importModule(moduleURL, ...args);
    } catch (error) {
        console.error('ERROR: Failed to import module: ' + moduleURL + '. ' + error.message);
    }

};

// Función para importar y ejecutar el módulo JS de un componente.
async function importModule(moduleSRC, ...args) {
    console.log('   • Importing module: ' + moduleSRC);
    let { init } = await import(moduleSRC);
    init(...args);
};

// Función para la carga de componentes según el tipo de usuario.
export async function loadSessionComponents(user) {
    let componentList = []; // Lista de componentes a cargar.
    let mainComponent = null; // Componente principal (aquel que se mostrará primero).

    // ---------------------------------------------------------------------- //

    if (user === null) {
        componentList = settings.load.start;
        settings.load.start.find(component => component.id === 'initialHome');
    } else {
        componentList = settings.load.feed;

        if (user === 'client') {
            componentList = componentList.concat(settings.load.client);
            mainComponent = settings.load.client.find(component => component.id === 'home');
        } else if (user === 'admin') {
            componentList = componentList.concat(settings.load.admin);
            mainComponent = settings.load.admin.find(component => component.id === 'homeAdmin');
        } else if (user === 'superAdmin') {
            componentList = componentList.concat(settings.load.admin, settings.load.superAdmin);
            mainComponent = settings.load.superAdmin.find(component => component.id === 'newAdmin');
        }
    }

    // ---------------------------------------------------------------------- //

    // Lista los componentes accesibles para el usuario.
    window.availableComponents = componentList;

    // Carga primero el componente primario.
    if (mainComponent) {
        await loadComponent(mainComponent);
    }
};

// Función para cargar un componente específico.
export async function loadSpecificComponent(componentId, ...args) {
    const component = window.availableComponents.find(comp => comp.id === componentId);
    if (component) {
        await loadComponent(component, ...args);
    } else {
        throw new Error('ERROR: Component not found or not accessible for this user.');
    }
};

// -------------------------------------------------------------------------- /
