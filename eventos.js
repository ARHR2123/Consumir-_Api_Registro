
// Utilización de Mysql

// Fetch

const formulario = document.getElementById('form-evento');
const url = 'http://18.188.133.98:3050/api/eventos';


// Visualización de datos

function fetchEventos() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const eventosTableBody = document.getElementById('eventosTableBody');
            eventosTableBody.innerHTML = '';
            data.forEach(eventos => {
                const row = `
                            <tr>
                                <td>${eventos.id}</td>
                                <td>${eventos.titulo}</td>
                                <td>${eventos.ubicacion}</td>
                                <td>${eventos.fecha}</td>
                                <td>${eventos.hora}</td>
                                <td>${eventos.descripcion}</td>
                                <td>
                                    <button class="btn btn-outline-danger btn-sm" onclick="deleteEventos(${eventos.id})">
                                        <img src="img/borrar.png" style="border-radius: 20px;" alt="">
                                    </button>
                                </td>
                            </tr>
                        `;
                eventosTableBody.innerHTML += row;
            });
        })
        .catch(error => console.log('Error al obtener Eventos:', error));
}

//var respuesta = document.getElementById('respuesta');

// Ingreso de Datos

formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const descripcion = document.getElementById('descripcion').value;

    // Validar campos del formulario
    if (!titulo || !ubicacion || !fecha || !hora || !descripcion) {
        alert('*** Todos los campos son obligatorios. ***');
        return;
    }
    const eventosData = { titulo, ubicacion, fecha, hora, descripcion};

    console.log('Se ha guardado el Evento', eventosData);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventosData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            fetchEventos(); // Asegúrate de que `fetchCustomers` esté definida
            const exampleModal = new bootstrap.Modal(document.getElementById('exampleModalLabel'));
            exampleModal.hide();
            formulario.reset();  // Usa `formulario` aquí en lugar de volver a obtener el elemento
        })
        .catch(error => console.log('Error al añadir un Evento:', error));
});

// Obtener y mostrar los clientes al cargar la página
document.addEventListener('DOMContentLoaded', fetchEventos);

// Función para eliminar un evento
function deleteEventos(eventosId) {
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
        fetch(`${url}/${eventosId}`, {
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
                alert('*** Evento eliminado:', data);
                fetchEventos();
            })
            .catch(error => console.log('Error al eliminar el evento:', error));
    }
}
