
// Utilización de Mysql

// Fetch

const formulario = document.getElementById('form-producto');
const url = 'http://18.188.133.98:3050/api/productos';
const url2 = 'http://18.188.133.98:3050/api/registros';


// Visualización de datos

function fetchProductos() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const productoTableBody = document.getElementById('productoTableBody');
            productoTableBody.innerHTML = '';
            data.forEach(producto => {
                const row = `
                            <tr>
                                <td>${producto.id}</td>
                                <td>${producto.nombre}</td>
                                <td>${producto.precio}</td>
                                <td>${producto.Estado}</td>
                                <td>${producto.descripcion}</td>
                                <td>${producto.cliente_id}</td>
                                <td>
                                    <button class="btn btn-outline-danger btn-sm" onclick="deleteProductos(${producto.id})">
                                        <img src="img/borrar.png" style="border-radius: 20px;" alt="">
                                    </button>
                                </td>
                            </tr>
                        `;
                productoTableBody.innerHTML += row;
            });
        })
        .catch(error => console.log('Error al obtener productos:', error));
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

    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const Estado = document.getElementById('Estado').value;
    const descripcion = document.getElementById('descripcion').value;
    const cliente_id = document.getElementById('cliente_id').value;

    // Validar campos del formulario
    if (!nombre || !precio || !Estado || !descripcion || !cliente_id) {
        alert('*** Todos los campos son obligatorios. ***');
        return;
    }
    const productoData = { nombre, precio, Estado, descripcion, cliente_id};

    console.log('Se ha guardado el producto', productoData);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productoData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            fetchProductos(); // Asegúrate de que `fetchCustomers` esté definida
            const exampleModal = new bootstrap.Modal(document.getElementById('exampleModalLabel'));
            exampleModal.hide();
            formulario.reset();  // Usa `formulario` aquí en lugar de volver a obtener el elemento
        })
        .catch(error => console.log('Error al añadir el producto:', error));
});

// Obtener y mostrar los clientes al cargar la página
document.addEventListener('DOMContentLoaded', fetchProductos);

// Función para eliminar un cliente
function deleteProductos(productosId) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        fetch(`${url}/${productosId}`, {
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
                alert('*** Producto eliminado:', data);
                fetchProductos(); // Actualizar la lista de clientes
            })
            .catch(error => console.log('Error al eliminar el producto:', error));
    }
}
