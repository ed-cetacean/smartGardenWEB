// -------------------------------------------------------------------------- //

// Importar configuración de la API
import { smartGarden } from '../../../api/config.js';

// USERS: ADMIN ------------------------------------------------------------- //

export const init = () => {
    console.log('   • Inicializando USERS (ADMIN)...');
    document.title = 'Usuarios | Smart Garden';
}

const apiUrl = smartGarden.url.api + 'Usuario';

document.getElementById('createUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;

    // Verificar si el correo electrónico ya existe
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
        alert('El correo electrónico ya está en uso. Por favor, ingresa uno nuevo.');
        return;
    }

    const newUser = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: email,
        password: document.getElementById('password').value,
        street: document.getElementById('street').value,
        zip: document.getElementById('zip').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        country: document.getElementById('country').value,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        if (response.ok) {
            alert('Usuario creado exitosamente');
            loadUsers();
            document.getElementById('createUserForm').reset();
        } else {
            const errorData = await response.json();
            alert(`Error al crear el usuario: ${response.status} - ${errorData.message || 'Error desconocido'}`);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud al servidor.');
    }
});

// Función para verificar si el correo electrónico ya existe
async function checkEmailExists(email) {
    try {
        const response = await fetch(`${smartGarden.url.api}Usuario/exists/${encodeURIComponent(email)}`);
        if (!response.ok) {
            throw new Error('Error al verificar el correo electrónico');
        }
        const data = await response.json();
        return data.exists;
    } catch (error) {
        console.error('Error al verificar el correo electrónico:', error);
        return false;
    }
}

// Función para cargar todos los usuarios
async function loadUsers() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error al cargar los usuarios');

        const users = await response.json();
        const userList = document.getElementById('userList');
        const userSelect = document.getElementById('userSelect');
        userList.innerHTML = '';
        userSelect.innerHTML = '<option value="">Seleccionar usuario</option>';

        if (users.length === 0) {
            userList.innerHTML = '<li>No hay usuarios registrados.</li>';
        } else {
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.firstName} ${user.lastName} - ${user.email}`;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', async () => {
                    const confirmDelete = confirm(`¿Estás seguro de que deseas eliminar a ${user.firstName} ${user.lastName}?`);
                    if (confirmDelete) {
                        await deleteUser(user.id);
                    }
                });

                li.appendChild(deleteButton);
                userList.appendChild(li);

                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = `${user.firstName} ${user.lastName}`;
                userSelect.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        alert('Error al cargar los usuarios');
    }
}
loadUsers();

// Manejar la selección de usuario
document.getElementById('userSelect').addEventListener('change', async () => {
    const userId = document.getElementById('userSelect').value;
    const updateUserForm = document.getElementById('updateUserForm');

    if (userId) {
        const usuario = await fetchUserById(userId);
        fillUpdateForm(usuario);
        updateUserForm.style.display = 'block';
    } else {
        updateUserForm.style.display = 'none';
    }
});

// Función para obtener un usuario por ID
async function fetchUserById(userId) {
    try {
        const response = await fetch(`${apiUrl}/${userId}`);
        if (!response.ok) throw new Error('Error al cargar el usuario');

        return await response.json();
    } catch (error) {
        console.error('Error al cargar el usuario:', error);
        alert('Error al cargar el usuario');
    }
}

// Llenar el formulario de actualización
function fillUpdateForm(usuario) {
    document.getElementById('updateUserId').value = usuario.id;
    document.getElementById('updateFirstName').value = usuario.firstName;
    document.getElementById('updateLastName').value = usuario.lastName;
    document.getElementById('updateEmail').value = usuario.email;
    document.getElementById('updateStreet').value = usuario.street || '';
    document.getElementById('updateZip').value = usuario.zip || '';
    document.getElementById('updateCity').value = usuario.city || '';
    document.getElementById('updateState').value = usuario.state || '';
    document.getElementById('updateCountry').value = usuario.country || '';
}

// Manejar la actualización de usuario
document.getElementById('updateUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const updatedUser = {
        id: document.getElementById('updateUserId').value,
        firstName: document.getElementById('updateFirstName').value,
        lastName: document.getElementById('updateLastName').value,
        email: document.getElementById('updateEmail').value,
        street: document.getElementById('updateStreet').value,
        zip: document.getElementById('updateZip').value,
        city: document.getElementById('updateCity').value,
        state: document.getElementById('updateState').value,
        country: document.getElementById('updateCountry').value,
    };

    try {
        const response = await fetch(`${apiUrl}/${updatedUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });

        if (response.ok) {
            alert('Usuario actualizado exitosamente');
            loadUsers();
            document.getElementById('updateUserForm').reset();
        } else {
            const errorData = await response.json();
            alert(`Error al actualizar el usuario: ${response.status} - ${errorData.message || 'Error desconocido'}`);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud al servidor.');
    }
});

// Función para eliminar un usuario
async function deleteUser(userId) {
    try {
        const response = await fetch(`${apiUrl}/${userId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Usuario eliminado exitosamente');
            loadUsers();
        } else {
            const errorData = await response.json();
            alert(`Error al eliminar el usuario: ${response.status} - ${errorData.message || 'Error desconocido'}`);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud al servidor.');
    }
}

// -------------------------------------------------------------------------- //
