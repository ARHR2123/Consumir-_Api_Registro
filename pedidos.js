
// Utilización de Mysql

// Fetch

const formulario = document.getElementById('form-pedidos');
const url = 'http://3.129.128.247:3050/api/pedidos';
const url2 = 'http://3.129.128.247:3050/api/productos';


// Visualización de datos

function fetchPedidos() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const pedidosTableBody = document.getElementById('pedidosTableBody');
            pedidosTableBody.innerHTML = '';
            data.forEach(pedidos => {
                const row = `
                            <tr>
                                <td>${pedidos.id}</td>
                                <td>${pedidos.fecha}</td>
                                <td>${pedidos.estado}</td>
                                <td>${pedidos.total}</td>
                                <td>${pedidos.producto_id}</td>
                                <td>
                                    <button class="btn btn-outline-danger btn-sm" onclick="deletePedidos(${pedidos.id})">
                                        <img src="img/borrar.png" style="border-radius: 20px;" alt="">
                                    </button>
                                </td>
                            </tr>
                        `;
                pedidosTableBody.innerHTML += row;
            });
        })
        .catch(error => console.log('Error al obtener pedidos:', error));
}


document.addEventListener('DOMContentLoaded', () => {
    fetch(url2)
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('producto_id');
            
            data.forEach(producto => {
                const option = document.createElement('option');
                option.value = producto.id;
                option.textContent = producto.nombre;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener los datos:', error));
});



formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const fecha = document.getElementById('fecha').value;
    const estado = document.getElementById('estado').value;
    const total = document.getElementById('total').value;
    const producto_id = document.getElementById('producto_id').value;

    // Validar campos del formulario
    if (!fecha || !estado || !total ) {
        alert('*** Todos los campos son obligatorios. ***');
        return;
    }
    const pedidoData = { fecha, estado, total};

    console.log('Se ha guardado el pedido', pedidoData);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedidoData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            fetchPedidos(); // Asegúrate de que `fetchCustomers` esté definida
            const exampleModal = new bootstrap.Modal(document.getElementById('exampleModalLabel'));
            exampleModal.hide();
            formulario.reset();  // Usa `formulario` aquí en lugar de volver a obtener el elemento
        })
        .catch(error => console.log('Error al añadir el producto:', error));
});

// Obtener y mostrar los clientes al cargar la página
document.addEventListener('DOMContentLoaded', fetchPedidos);

// Función para eliminar un cliente
function deletePedidos(pedidosId) {
    if (confirm('¿Estás seguro de que deseas eliminar este pedido?')) {
        fetch(`${url}/${pedidosId}`, {
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
                alert('*** Pedido eliminado:', data);
                fetchPedidos(); // Actualizar la lista de clientes
            })
            .catch(error => console.log('Error al eliminar el pedido:', error));
    }
}
