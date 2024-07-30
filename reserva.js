
// Utilización de Mysql

// Fetch

const formulario = document.getElementById('form-reserva');
const url = 'http://18.188.133.98:3050/api/reservas';
const url2 = 'http://18.188.133.98:3050/api/registros';


// Visualización de datos

function fetchReservas() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const reservaTableBody = document.getElementById('reservaTableBody');
            reservaTableBody.innerHTML = '';
            data.forEach(reserva => {
                const row = `
                            <tr>
                                <td>${reserva.id}</td>
                                <td>${reserva.cliente_id}</td>
                                <td>${reserva.fecha}</td>
                                <td>${reserva.estado}</td>
                                <td>${reserva.dia}</td>
                                <td>
                                    <button class="btn btn-outline-danger btn-sm" onclick="deleteReservas(${reserva.id})">
                                        <img src="img/borrar.png" style="border-radius: 20px;" alt="">
                                    </button>
                                </td>
                            </tr>
                        `;
                reservaTableBody.innerHTML += row;
            });
        })
        .catch(error => console.log('Error al obtener reserva:', error));
}

// Seleccionar los clientes en los productos

document.addEventListener('DOMContentLoaded', () => {
    fetch(url2)
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('cliente_id');
            
            data.forEach(customer => {
                const option = document.createElement('option');
                option.value = customer.id;
                option.textContent = customer.name;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener los datos:', error));
});

//var respuesta = document.getElementById('respuesta');

// Ingreso de Datos

formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const cliente_id = document.getElementById('cliente_id').value;
    const fecha = document.getElementById('fecha').value;
    const estado = document.getElementById('estado').value;
    const dia = document.getElementById('dia').value;

    // Validar campos del formulario
    if ( !fecha || !estado || !dia ) {
        alert('*** Todos los campos son obligatorios. ***');
        return;
    }
    const reservaData = { fecha, estado, dia};

    console.log('Se ha guardado la reserva', reservaData);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservaData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            fetchReservas(); // Asegúrate de que `fetchCustomers` esté definida
            const exampleModal = new bootstrap.Modal(document.getElementById('exampleModalLabel'));
            exampleModal.hide();
            formulario.reset();  // Usa `formulario` aquí en lugar de volver a obtener el elemento
        })
        .catch(error => console.log('Error al añadir la reserva:', error));
});

// Obtener y mostrar los clientes al cargar la página
document.addEventListener('DOMContentLoaded', fetchReservas);

// Función para eliminar un cliente
function deleteReservas(reservasId) {
    if (confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
        fetch(`${url}/${reservasId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                alert('*** Reserva eliminada:', data);
                fetchReservas(); // Actualizar la lista de clientes
            })
            .catch(error => console.log('Error al eliminar la reserva:', error));
    }
}
