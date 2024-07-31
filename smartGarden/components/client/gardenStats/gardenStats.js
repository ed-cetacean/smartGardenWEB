
// GARDEN-STATS: CLIENT ----------------------------------------------------- //

export const init = (GardenID) => {
    console.log('   • Inicializando GARDEN-STATS (CLIENT)...');
    document.title= 'Estadísticas | Smart Garden';

    // ---------------------------------------------------------------------- //

    if (GardenID) {
        var gardenData = getGardenData(GardenID, response);

        if (gardenData) {
            const lightData = gardenData.sensors.light ? prepareChartData(gardenData.sensors.light) : [];
            const moistureData = gardenData.sensors.moisture ? prepareChartData(gardenData.sensors.moisture) : [];
            const temperatureData = gardenData.sensors.temperature ? prepareChartData(gardenData.sensors.temperature) : [];

            const gardenName = document.getElementById('gs-garden-name');
            gardenName.innerHTML = gardenData.gardenName;

            const chartContainer = document.getElementById('gs-garden-stats');

            // -------------------------------------------------------------- //

            if (moistureData.length > 0) {
                let moistureDiv = document.createElement('div');
                moistureDiv.id = 'moisture-chart';
                moistureDiv.classList.add('gs-chart');
                chartContainer.appendChild(moistureDiv);

                // ---------------------------------------------------------- //

                Highcharts.chart('moisture-chart', {
                    chart: { type: 'area', backgroundColor: 'transparent' },
                    title: { text: 'Nivel de humedad' },

                    xAxis: { type: 'datetime' },
                    yAxis: { title: { text: 'Humedad (%)' } },
                    series: [{ name: 'Nivel de humedad', data: moistureData, color: '#C4DFFA'  }]
                });
            }

            if (lightData.length > 0) {
                let lightDiv = document.createElement('div');
                lightDiv.id = 'light-chart';
                lightDiv.classList.add('gs-chart');
                chartContainer.appendChild(lightDiv);

                // ---------------------------------------------------------- //

                Highcharts.chart('light-chart', {
                    chart: { type: 'area', backgroundColor: 'transparent' },
                    title: { text: 'Intensidad de luz' },

                    xAxis: { type: 'datetime' },
                    yAxis: { title: { text: 'Luz solar (%)' } },
                    series: [{ name: 'Nivel de luz',data: lightData, color: '#FFE078' }]
                });
            }

            if (temperatureData.length > 0) {
                let temperatureDiv = document.createElement('div');
                temperatureDiv.id = 'temperature-chart';
                temperatureDiv.classList.add('gs-chart');
                chartContainer.appendChild(temperatureDiv);

                // ---------------------------------------------------------- //

                Highcharts.chart('temperature-chart', {
                    chart: { type: 'area', backgroundColor: 'transparent' },
                    title: { text: 'Temperatura ambiental' },

                    xAxis: { type: 'datetime' },
                    yAxis: { title: { text: 'Temperatura (°C)' } },
                    series: [{ name: 'Temperatura', data: temperatureData, color: '#FF6961' }]
                });
            }
        }
    };

}

// -------------------------------------------------------------------------- //

const response = [
    {
        id: 1,
        gardenName: 'Disenchanted',
        sensors: {
            moisture: [
                { timestamp: "2024-06-30T00:00:00Z", value: 30 },
                { timestamp: "2024-06-30T01:00:00Z", value: 35 },
                { timestamp: "2024-06-30T02:00:00Z", value: 32 },
                { timestamp: "2024-06-30T03:00:00Z", value: 28 },
                { timestamp: "2024-06-30T04:00:00Z", value: 33 },
                { timestamp: "2024-06-30T05:00:00Z", value: 30 },
            ],
            light: [
                { timestamp: "2024-06-30T00:00:00Z", value: 200 },
                { timestamp: "2024-06-30T01:00:00Z", value: 210 },
                { timestamp: "2024-06-30T02:00:00Z", value: 190 },
                { timestamp: "2024-06-30T03:00:00Z", value: 205 },
                { timestamp: "2024-06-30T04:00:00Z", value: 195 },
                { timestamp: "2024-06-30T05:00:00Z", value: 200 },
            ],
            temperature: [
                { timestamp: "2024-06-30T00:00:00Z", value: 25 },
                { timestamp: "2024-06-30T01:00:00Z", value: 24 },
                { timestamp: "2024-06-30T02:00:00Z", value: 26 },
                { timestamp: "2024-06-30T03:00:00Z", value: 23 },
                { timestamp: "2024-06-30T04:00:00Z", value: 22 },
                { timestamp: "2024-06-30T05:00:00Z", value: 24 },
            ]
        }
    },
    {
        id: 2,
        gardenName: 'Togetherness',
        sensors: {
            moisture: [
                { timestamp: "2024-06-30T00:00:00Z", value: 40 },
                { timestamp: "2024-06-30T01:00:00Z", value: 42 },
                { timestamp: "2024-06-30T02:00:00Z", value: 39 },
                { timestamp: "2024-06-30T03:00:00Z", value: 41 },
                { timestamp: "2024-06-30T04:00:00Z", value: 38 },
                { timestamp: "2024-06-30T05:00:00Z", value: 40 },
            ],
            temperature: [
                { timestamp: "2024-06-30T04:00:00Z", value: 22 },
                { timestamp: "2024-06-30T05:00:00Z", value: 23 },
                { timestamp: "2024-06-30T06:00:00Z", value: 21 },
                { timestamp: "2024-06-30T07:00:00Z", value: 22 },
                { timestamp: "2024-06-30T08:00:00Z", value: 23 },
                { timestamp: "2024-06-30T09:00:00Z", value: 22 },
            ]
        }
    },
    {
        id: 3,
        gardenName: 'Departure',
        sensors: {
            light: [
                { timestamp: "2024-06-30T00:00:00Z", value: 300 },
                { timestamp: "2024-06-30T01:00:00Z", value: 310 },
                { timestamp: "2024-06-30T02:00:00Z", value: 290 },
                { timestamp: "2024-06-30T03:00:00Z", value: 305 },
                { timestamp: "2024-06-30T04:00:00Z", value: 295 },
                { timestamp: "2024-06-30T05:00:00Z", value: 300 },
            ],
            temperature: [
                { timestamp: "2024-06-30T00:00:00Z", value: 28 },
                { timestamp: "2024-06-30T01:00:00Z", value: 27 },
                { timestamp: "2024-06-30T02:00:00Z", value: 29 },
                { timestamp: "2024-06-30T03:00:00Z", value: 28 },
                { timestamp: "2024-06-30T04:00:00Z", value: 27 },
                { timestamp: "2024-06-30T08:00:00Z", value: 28 },
            ]
        }
    }
];

// -------------------------------------------------------------------------- //

// Filtra los datos del GARDEN por ID.
const getGardenData = (gardenId, data) => {
    return data.find(garden => garden.id === gardenId);
};

// Configura la manera en que se mostrarán los datos.
const prepareChartData = (sensorData) => {
    if (!Array.isArray(sensorData)) {
        return []; // Retorna un array vacío si sensorData no es un array.
    }
    return sensorData.map(reading => {
        return {
            x: new Date(reading.timestamp).getTime(),
            y: reading.value
        };
    });
};

// -------------------------------------------------------------------------- //

