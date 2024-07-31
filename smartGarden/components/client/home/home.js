
// -------------------------------------------------------------------------- //

import { perenual } from '../../../api/config.js';

// HOME: CLIENT ------------------------------------------------------------- //

export const init = () =>{
    console.log('   • Inicializando HOME (CLIENT)...');
    document.title= 'Inicio | Smart Garden';
}

// -------------------------------------------------------------------------- //

// Permite al botón de búsqueda realizar la consulta.
let searchButton = document.getElementById('hm-search-button');
let searchInput = document.getElementById('hm-search-input');

// Activa la búsqueda al presionar el botón de búsqueda.
searchButton.addEventListener('click', searchPlants);

// Activa la búsqueda al presionar el botón de ENTER.
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchPlants();
    }
});

// Realiza la consulta a la API tomando en cuenta la búsqueda ingresada por el usuario.
async function searchPlants() {
    let consulta = searchInput.value;

    await fetch(perenual.url.api + 'species-list?page=1&key=' + perenual.url.apiKey + '&q=' + consulta)
        .then(response => response.json())
        .then(data => { showResults(data.data); })
        .catch(error => { throw new Error('ERROR: ', error); });
};

// Muestra los resultados de la búsqueda.
async function showResults(data) {
    let resultContainer = document.getElementById('hm-data-result');

    // Limpia resultados previos.
    resultContainer.innerHTML = '';

    // Despliega los nuevos resultados.
    data.forEach(item => {
        // Crea los elementos del contenedor.
        let dataItem = document.createElement('div');
        dataItem.className = 'hm-data-item';
        dataItem.id = 'hm-data-item-' + item.id;
        resultContainer.appendChild(dataItem);

        // Miniatura.
        let dataImage = document.createElement('img');
        dataImage.alt = item.common_name;
        dataImage.loading = 'lazy';
        dataItem.appendChild(dataImage);

        // Verifica si 'default_image' y 'thumbnail' existen y tienen una URL válida.
        if (item.default_image && item.default_image.thumbnail) {
            dataImage.src = item.default_image.thumbnail;
        } else if (item.default_image && item.default_image.original_url) {
            dataImage.src = item.default_image.original_url;
        } else {
            dataImage.src = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
        }

        // Contenerdor de nombres.
        let dataNames = document.createElement('div');
        dataItem.appendChild(dataNames);

        // Nombre común.
        let dataCommonName = document.createElement('strong');
        // dataCommonName.className = 'hm-result-common_name';
        dataCommonName.innerHTML = item.common_name;
        dataNames.appendChild(dataCommonName);

        // Nombre científico.
        let dataScientificName = document.createElement('small');
        // dataScientificName.className = 'hm-result-scientific_name';
        dataScientificName.innerHTML = item.scientific_name[0];
        dataNames.appendChild(dataScientificName);

        dataItem.addEventListener('click', () => { showDetails(item); });
    });
}

function showDetails(item) {
    let mainDetails = document.getElementById('hm-data-details');
    mainDetails.style.display = 'block';

    // ---------------------------------------------------------------------- //

    let detailsContainer = document.getElementById('hm-details-item');

    // Limpia detalles previos.
    detailsContainer.innerHTML = '';

    // Nombre común.
    let commonName = document.createElement('strong');
    commonName.id = 'hm-details-common_name';
    commonName.innerHTML = item.common_name;
    detailsContainer.appendChild(commonName);

    // Nombre científico.
    let scientificName = document.createElement('strong');
    scientificName.id = 'hm-details-scientific_name';
    scientificName.innerHTML = item.scientific_name[0];
    detailsContainer.appendChild(scientificName);

    // Imagen.
    let image = document.createElement('img');
    image.id = 'hm-details-image';
    image.alt = item.common_name;
    image.loading = 'lazy';
    detailsContainer.appendChild(image);

    // Verifica si 'default_image' y 'original_url/regular_url' existen y tienen una URL válida.
    if (item.default_image && item.default_image.original_url) {
        image.src = item.default_image.original_url;
    } else if (item.default_image && item.default_image.regular_url) {
        image.src = item.default_image.regular_url;
    } else {
        image.src = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
    }

    // Ciclo de vida.
    if (item.cycle) {
        let infoCycle = document.createElement('div');
        infoCycle.className = 'hm-details-info';
        detailsContainer.appendChild(infoCycle);

        let cycleIcon = document.createElement('i');
        cycleIcon.className = 'fa-solid fa-heart fa-sm';
        infoCycle.appendChild(cycleIcon);

        let cycleText = document.createElement('strong');
        cycleText.innerHTML = 'Ciclo de vida: ';
        infoCycle.appendChild(cycleText);

        let cyclePlant = document.createElement('small');
        cyclePlant.innerHTML = item.cycle;
        infoCycle.appendChild(cyclePlant);
    }

    // Luz solar.
    if (item.sunlight) {
        let infoSunlight = document.createElement('div');
        infoSunlight.className = 'hm-details-info';
        detailsContainer.appendChild(infoSunlight);

        let sunlightIcon = document.createElement('i');
        sunlightIcon.className = 'fa-solid fa-sun fa-sm';
        infoSunlight.appendChild(sunlightIcon);

        let sunlightText = document.createElement('strong');
        sunlightText.innerHTML = 'Luz requerida: ';
        infoSunlight.appendChild(sunlightText);

        let sunlightPlant = document.createElement('small');
        sunlightPlant.innerHTML = item.sunlight;
        infoSunlight.appendChild(sunlightPlant);
    }

    // Riego.
    if (item.watering) {
        let infoWatering = document.createElement('div');
        infoWatering.className = 'hm-details-info';
        detailsContainer.appendChild(infoWatering);

        let wateringIcon = document.createElement('i');
        wateringIcon.className = 'fa-solid fa-droplet fa-sm';
        infoWatering.appendChild(wateringIcon);

        let wateringText = document.createElement('strong');
        wateringText.innerHTML = 'Riego requerido: ';
        infoWatering.appendChild(wateringText);

        let wateringPlant = document.createElement('small');
        wateringPlant.innerHTML = item.watering;
        infoWatering.appendChild(wateringPlant);
    }
}

// -------------------------------------------------------------------------- //
