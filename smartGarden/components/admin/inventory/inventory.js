import { smartGarden } from '../../../api/config.js'; // Asegúrate de que esta ruta sea correcta

// -------------------------------------------------------------------------- //

// USERS: ADMIN ------------------------------------------------------------- //

export const init = async () => {
    console.log('   • Inicializando USERS (ADMIN)...');
    document.title = 'Inventario | Smart Garden';
    await loadInventarioChart();
    await loadVentasChart();
    await loadSensorPackTypes();
}

document.addEventListener('DOMContentLoaded', init);

// URLs de la API
const apiUrlSensorPackTypes = `${smartGarden.url.api}SensorPackType`;
const apiUrlInventario = `${smartGarden.url.api}Inventario`;
const apiUrlVentas = `${smartGarden.url.api}Venta`;

// Cargar gráfico de inventario
async function loadInventarioChart() {
    try {
        const response = await fetch(apiUrlInventario);
        const inventarioData = await response.json();

        console.log('Datos de inventario:', inventarioData);

        // Crear un mapa de inventario agrupando por sensorPackTypeId
        const stockMap = {};
        
        inventarioData.forEach(item => {
            const typeId = item.sensorPackTypeId;
            const stock = item.stock;

            // Si el tipo de sensor ya existe en el mapa, sumamos el stock
            if (stockMap[typeId]) {
                stockMap[typeId] += stock;
            } else {
                stockMap[typeId] = stock; // Si no existe, lo inicializamos
            }
        });

        // Preparar las etiquetas y valores para el gráfico
        const labels = Object.keys(stockMap).map(typeId => `Sensor Type ID: ${typeId}`);
        const stockValues = Object.values(stockMap);

        const ctx = document.getElementById('inventarioChart').getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Stock de Inventario',
                    data: stockValues,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        
    } catch (error) {
        console.error('Error al cargar el inventario:', error);
        alert('Error al cargar el inventario.');
    }
}


// Cargar gráfico de ventas
async function loadVentasChart() {
    try {
        const response = await fetch(apiUrlVentas);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const ventasData = await response.json();

        if (!Array.isArray(ventasData) || ventasData.length === 0) {
            console.warn('No hay datos de ventas disponibles');
            return;
        }

        const labels = ventasData.map(item => new Date(item.purchaseDate).toLocaleDateString());
        const totalPrices = ventasData.map(item => item.totalPrice);

        const ctx = document.getElementById('ventasChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Ventas Totales',
                    data: totalPrices,
                    fill: false,
                    backgroundColor: 'rgba(153, 102, 255, 1)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error al cargar las ventas:', error);
        alert('Error al cargar las ventas.');
    }
}

// Cargar tipos de sensor para el selector
async function loadSensorPackTypes() {
    try {
        const response = await fetch(apiUrlSensorPackTypes);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const sensorPackTypes = await response.json();

        const existingSensorSelect = document.getElementById('existingSensor');
        existingSensorSelect.innerHTML = ''; // Limpiar opciones existentes

        sensorPackTypes.forEach(sensor => {
            const option = document.createElement('option');
            option.value = sensor.id; // Asumir que cada sensor tiene un ID
            option.textContent = `${sensor.name} - ${sensor.description}`; // Mostrar nombre y descripción
            existingSensorSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar tipos de sensor:', error);
        alert('Error al cargar tipos de sensor.');
    }
}

// Manejar la adición de un nuevo tipo de sensor
document.getElementById('addSensorForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('sensorName').value.trim();
    const description = document.getElementById('sensorDescription').value.trim();

    try {
        const response = await fetch(apiUrlSensorPackTypes, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description }),
        });

        if (response.ok) {
            alert('Nuevo tipo de sensor agregado exitosamente');
            document.getElementById('addSensorForm').reset();
            loadSensorPackTypes(); // Recargar tipos de sensor
        } else {
            const errorData = await response.json();
            alert(`Error al agregar el tipo de sensor: ${response.status} - ${errorData.message || 'Error desconocido'}`);
        }
    } catch (error) {
        console.error('Error al agregar el tipo de sensor:', error);
        alert('Error al agregar el tipo de sensor.');
    }
});

// Manejar la adición de nuevo stock
document.getElementById('addStockForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const sensorPackTypeId = parseInt(document.getElementById('existingSensor').value);
    const stock = parseInt(document.getElementById('stock').value);

    const newStock = {
        sensorPackTypeId: sensorPackTypeId,
        stock: stock,
    };

    try {
        const response = await fetch(`${apiUrlInventario}/addStock`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStock),
        });

        if (response.ok) {
            alert('Stock añadido exitosamente');
            document.getElementById('addStockForm').reset();
            loadInventarioChart(); // Recargar el gráfico de inventario
        } else {
            const errorData = await response.json();
            alert(`Error al añadir stock: ${response.status} - ${errorData.message || 'Error desconocido'}`);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud al servidor.');
    }
});

// -------------------------------------------------------------------------- //
