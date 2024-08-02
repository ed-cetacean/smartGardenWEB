// Importar configuración de la API
import { smartGarden } from '../../../api/config.js';

// URL de la API de Membresías
const apiUrl = smartGarden.url.api + 'Membresia';

// Inicializar la aplicación
export const init = () => {
    console.log('   • Inicializando MEMBERSHIPS (ADMIN)...');
    document.title = 'Membresías | Smart Garden';
    loadMemberships();
}

// Manejar la creación de nuevas membresías
document.getElementById('createMembershipForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const newMembership = {
        name: document.getElementById('membershipName').value.trim(),
        description: document.getElementById('membershipDescription').value.trim(),
        durationDays: parseInt(document.getElementById('membershipDurationDays').value.trim(), 10),
        price: parseFloat(document.getElementById('membershipPrice').value.trim()),
    };

    // Validar que los campos no estén vacíos
    if (!newMembership.name || !newMembership.description || isNaN(newMembership.durationDays) || isNaN(newMembership.price)) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMembership),
        });

        if (response.ok) {
            alert('Membresía creada exitosamente');
            loadMemberships();
            document.getElementById('createMembershipForm').reset();
        } else {
            const errorData = await response.json();
            alert(`Error al crear la membresía: ${response.status} - ${errorData.message || 'Error desconocido'}`);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud al servidor.');
    }
});

// Función para cargar todas las membresías
async function loadMemberships() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error al cargar las membresías');

        const memberships = await response.json();
        const membershipList = document.getElementById('membershipList');
        membershipList.innerHTML = '';

        if (memberships.length === 0) {
            membershipList.innerHTML = '<li>No hay membresías registradas.</li>';
        } else {
            memberships.forEach(membership => {
                const li = document.createElement('li');
                li.textContent = `${membership.name} - ${membership.description}`;

                const updateButton = document.createElement('button');
                updateButton.textContent = 'Modificar';
                updateButton.addEventListener('click', () => fillUpdateForm(membership));

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', async () => {
                    const confirmDelete = confirm(`¿Estás seguro de que deseas eliminar la membresía "${membership.name}"?`);
                    if (confirmDelete) {
                        await deleteMembership(membership.id);
                    }
                });

                li.appendChild(updateButton);
                li.appendChild(deleteButton);
                membershipList.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Error al cargar las membresías:', error);
        alert('Error al cargar las membresías');
    }
}

// Función para llenar el formulario de actualización
function fillUpdateForm(membership) {
    document.getElementById('updateMembershipId').value = membership.id; // Guardar el ID para la actualización
    document.getElementById('updateMembershipName').value = membership.name;
    document.getElementById('updateMembershipDescription').value = membership.description;
    document.getElementById('updateMembershipDurationDays').value = membership.durationDays; // Agregar duración
    document.getElementById('updateMembershipPrice').value = membership.price; // Agregar precio
    document.getElementById('updateMembershipForm').style.display = 'block'; // Mostrar el formulario de actualización
}

// Manejar la actualización de membresías
document.getElementById('updateMembershipForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const membershipId = document.getElementById('updateMembershipId').value;
    const updatedMembership = {
        id: membershipId, // Asegúrate de incluir el ID
        name: document.getElementById('updateMembershipName').value.trim(),
        description: document.getElementById('updateMembershipDescription').value.trim(),
        durationDays: parseInt(document.getElementById('updateMembershipDurationDays').value.trim(), 10),
        price: parseFloat(document.getElementById('updateMembershipPrice').value.trim()),
    };

    // Validar que los campos no estén vacíos
    if (!updatedMembership.name || !updatedMembership.description || isNaN(updatedMembership.durationDays) || isNaN(updatedMembership.price)) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${membershipId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedMembership),
        });

        if (response.ok) {
            alert('Membresía actualizada exitosamente');
            loadMemberships();
            document.getElementById('updateMembershipForm').reset();
            document.getElementById('updateMembershipForm').style.display = 'none'; // Ocultar sección de actualización
        } else {
            const errorData = await response.json();
            alert(`Error al actualizar la membresía: ${response.status} - ${errorData.message || 'Error desconocido'}`);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud al servidor.');
    }
});

// Función para eliminar una membresía
async function deleteMembership(membershipId) {
    try {
        const response = await fetch(`${apiUrl}/${membershipId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Membresía eliminada exitosamente');
            loadMemberships();
        } else {
            const errorData = await response.json();
            alert(`Error al eliminar la membresía: ${response.status} - ${errorData.message || 'Error desconocido'}`);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud al servidor.');
    }
}

// Inicializar la aplicación
init();
