
// GARDENS: CLIENT ---------------------------------------------------------- //

import { loadSpecificComponent } from '../../../script/providers/components.js';

// -------------------------------------------------------------------------- //

export const init = () =>{
    console.log('   • Inicializando GARDENS (CLIENT)...');
    document.title= 'Jardines | Smart Garden';

    getGardens();
}

// -------------------------------------------------------------------------- //

const response = [
    {
        "id": 1,
        "name": "Jardín del Sol",
        "description": "Un jardín lleno de plantas amantes del sol.",
        "longitude": -115.172816,
        "latitude": 32.716841,
        "userId": 2,
        "sensorPackId": 7,
        "lastTemperature": 25.5,
        "lastMoisture": 75.5,
        "lastLight": 75.5
    },
    {
        "id": 2,
        "name": "Oasis Verde",
        "description": "Un oasis de tranquilidad y frescura.",
        "longitude": -116.230018,
        "latitude": 33.158093,
        "userId": 2,
        "sensorPackId": 8,
        "lastTemperature": 21.2,
        "lastMoisture": 90.8,
        "lastLight": 42.1,
        "image": 'https://i0.wp.com/live-metal.com/wp-content/uploads/2023/07/SlaughterToPrevail070323_2.jpg?ssl=1',
    },
    {
        "id": 3,
        "name": "Paraíso Floral",
        "description": "Un paraíso lleno de coloridas flores.",
        "longitude": -117.161087,
        "latitude": 32.715736,
        "userId": 2,
        "sensorPackId": 9,
        "lastTemperature": 29.4,
        "lastMoisture": 89.7,
        "lastLight": 79.1
    },
    {
        "id": 4,
        "name": "Jardín Botánico",
        "description": "Un espacio dedicado a la diversidad botánica.",
        "longitude": -118.243683,
        "latitude": 34.052235,
        "userId": 2,
        "sensorPackId": 10,
        "lastTemperature": 15.9,
        "lastMoisture": 22.4,
        "lastLight": 75.1,
        "image": 'https://4kwallpapers.com/images/wallpapers/hunter-x-hunter-gon-3840x2160-10409.png',
    },
    {
        "id": 5,
        "name": "Huerto Urbano",
        "description": "Un huerto sostenible en la ciudad.",
        "longitude": -119.417931,
        "latitude": 36.778259,
        "userId": 2,
        "sensorPackId": 11,
        "lastTemperature": 38.7,
        "lastMoisture": 12.4,
        "lastLight": 82.9
    }
];

// -------------------------------------------------------------------------- //

// Obtine la lista de jardines del usuario, desplegándolas en una carousel.
function getGardens() {
    const carousel = document.getElementById('garden-carousel');

    // Crea un elemento en el carousel para cada GARDEN.
    response.forEach((garden, index) => {
        let gardenItem = document.createElement('div');
        gardenItem.classList.add('gd-carousel-item');
        gardenItem.id = 'gd-carousel-item-' + garden.id;
        carousel.appendChild(gardenItem);

        if (index === 0) gardenItem.classList.add('active');

        // ------------------------------------------------------------------ //

        // Brinda una imagen de fondo al GARDEN.
        if (garden.image) {
            gardenItem.style.backgroundImage = `linear-gradient(rgba(42, 49, 59, .8), rgba(42, 49, 59, .8)), url(${garden.image})`;

        } else {
            gardenItem.style.backgroundImage = 'linear-gradient(rgba(42, 49, 59, .8), rgba(42, 49, 59, .8)), url("../../../../../smartGardenWEB/smartGarden/assets/images/mainGarden.jpg")';
        }

        // Elementos HTML del GARDEN.
        gardenItem.innerHTML = `
            <strong class='garden-name'>${(garden.name).toUpperCase()}</strong>
            <small class='garden-description'>${garden.description}</small>

            <div class='garden-stats'>
                <div class='garden-stat'>
                    <strong>${garden.lastMoisture} %</strong>
                    <small>Humedad</small>
                </div>

                <div class='garden-stat'>
                    <strong>${garden.lastLight} %</strong>
                    <small>Intensidad de luz</small>
                </div>

                <div class='garden-stat'>
                    <strong> ${garden.lastTemperature} °C</strong>
                    <small>Temperatura</small>
                </div>
            </div>
        `;

        // Abre las estadísticas del GARDEN.
        gardenItem.addEventListener('click', () => {
            loadSpecificComponent('gardenStats', garden.id);
        });

    })

    setupCarouselControls();
}

function setupCarouselControls() {
    const prevBtn = document.getElementById('hm-prev-garden');
    const nextBtn = document.getElementById('hm-next-garden');

    const items = document.querySelectorAll('.gd-carousel-item');
    let currentGarden = 0;

    prevBtn.addEventListener('click', () => {
        items[currentGarden].classList.remove('active');
        currentGarden = (currentGarden === 0) ? items.length - 1 : currentGarden - 1;
        items[currentGarden].classList.add('active');
    });

    nextBtn.addEventListener('click', () => {
        items[currentGarden].classList.remove('active');
        currentGarden = (currentGarden === items.length - 1) ? 0 : currentGarden + 1;
        items[currentGarden].classList.add('active');
    });
}

// -------------------------------------------------------------------------- //
