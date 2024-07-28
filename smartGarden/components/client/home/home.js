
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
        .then(data => { showResults(data.data); })
        .catch(error => { throw new Error('ERROR: ', error); });
};

// Muestra los resultados de la búsqueda.
async function showResults(data) {
    let resultContainer = document.getElementById('hm-data-result');
    let detailsContainer = document.getElementById('hm-data-details');

    // Limpia resultados previos.
    resultContainer.innerHTML = '';
    detailsContainer.innerHTML = '';

    // Despliega los nuevos resultados.
    data.forEach(item => {
        console.log(item);

        // Contenedor.
        let dataItem = document.createElement('div');
        dataItem.className = 'hm-data-item';
        dataItem.id = item.id;

        // Miniatura.
        if (item.default_image) {
            let dataImage = document.createElement('img');

            dataImage.src = item.default_image.thumbnail !== null ? item.default_image.thumbnail : 'https://static.thenounproject.com/png/4693713-200.png';
            dataImage.alt = item.common_name;
            dataImage.loading = 'lazy';

            dataItem.appendChild(dataImage);
        }

        // Nombre común.
        let dataCommonName = document.createElement('strong');
        dataCommonName.className = 'hm-result-common_name';
        dataCommonName.innerHTML = item.common_name;

        // Nombre científico.
        let dataScientificName = document.createElement('small');
        dataScientificName.className = 'hm-result-scientific_name';
        dataScientificName.innerHTML = item.scientific_name[0];

        // Añade los elementos al contenedor.

        dataItem.appendChild(dataCommonName);
        dataItem.appendChild(dataScientificName);

        // Añade el contenedor al resultado.
        resultContainer.appendChild(dataItem);
    });
}


// -------------------------------------------------------------------------- //
