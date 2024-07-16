// ----------------------------- APP COMPONENTS ----------------------------- //

// Lista de componentes.
export let settings = {

    load: {
        components: [
            { id: 'shopping-admin', url: 'components/admin/shopping' },
            { id: 'stats-admin', url: 'components/admin/stats' },

            { id: 'gardens', url: 'components/client/gardens' },
            { id: 'stats', url: 'components/client/stats' },
            { id: 'weather', url: 'components/client/weather' },
            { id: 'shopping', url: 'components/client/shopping' },

            { id: 'about', url: 'components/feed/about' },
            { id: 'home', url: 'components/feed/home' },

            { id: 'signin', url: 'components/start/signin' },
            { id: 'signup', url: 'components/start/signup' },
        ]
    },
}

// -------------------------------------------------------------------------- //

export async function loadComponent(componentId) {
    const component = settings.load.components.find(c => c.id === componentId);
    if (!component) throw new Error(`Component with id "${componentId}" was not found.`);

    const fileName = component.url.split('/').pop();
    if (!fileName) throw new Error('URL is required.');

    const now = Date.now();
    const componentUrl = `${window.location.href}${component.url}/${fileName}`;
    const requestUrl = `${componentUrl}.html?a=${now}`;
    const moduleUrl = `${componentUrl}.js`;

    const contentElement = document.getElementById('content');
    if (!contentElement) throw new Error(`Content element with id "content" was not found.`);

    console.log('- Loading component:', componentUrl);

    const response = await fetch(requestUrl, {
        headers: { 'cache': 'no-store' }
    });
    if (!response.ok) throw new Error(`Failed to load component: ${response.status} ${response.statusText}`);

    contentElement.innerHTML = await response.text();
    const styleElement = document.createElement('link');
    styleElement.rel = 'stylesheet';
    styleElement.href = `${component.url}.css`;
    document.head.appendChild(styleElement);

    importModule(moduleUrl);
}

// Import module.
async function importModule(moduleUrl) {
    console.log('Importing module: ' + moduleUrl);
    let { init } = await import(moduleUrl);
    init();
}

// -------------------------------------------------------------------------- /
