
// -------------------------------------------------------------------------- //

import { perenual } from '../../../api/config.js';

// HOME: CLIENT ------------------------------------------------------------- //

export const init = () =>{
    console.log('   • Inicializando HOME (CLIENT)...');
}

// -------------------------------------------------------------------------- //

// Permite al botón de búsqueda realizar la consulta.
document.getElementById('hm-search-button').addEventListener('click', function() {
    const consulta = document.getElementById('hm-search-input').value;
    searchPlants(consulta);
});

// Realiza la consulta a la API tomando en cuenta la búsqueda ingresada por el usuario.
async function searchPlants(consulta) {
    await fetch(perenual.url.api + 'species-list?page=1&key=' + perenual.url.apiKey + '&q=' + consulta)
        .then(response => response.json())
        .then(data => { console.log(data.data); })
        .catch(error => { throw new Error('ERROR: ', error); });
};

// Muestra los resultados de la búsqueda.
function showResults(data) {
    let resultContainer = document.getElementById('hm-search-result');
    let detailsContainer = document.getElementById('hm-search-details');

    // Limpia resultados previos.
    resultContainer.innerHTML = '';
    detailsContainer.innerHTML = '';

    // Despliega los nuevos resultados.
    data.results.forEach(item => {
    const div = document.createElement('div');
        div.textContent = item.name;
        resultContainer.appendChild(div);

    // If you want to show more details
    const detailsDiv = document.createElement('div');
        detailsDiv.textContent = `Details about ${item.name}: ${item.details}`;
        detailsContainer.appendChild(detailsDiv);

    });
}

// -------------------------------------------------------------------------- //
