
// Utilización de Mysql

// Fetch

const formulario = document.getElementById('form-cliente');
const url = 'http://localhost:3050/api/customers';

// Visualización de datos

function fetchCustomers() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const customerTableBody = document.getElementById('customerTableBody');
            customerTableBody.innerHTML = '';
            data.forEach(customer => {
                const row = `
                            <tr>
                                <td>${customer.id}</td>
                                <td>${customer.name}</td>
                                <td>${customer.apellido}</td>
                                <td>${customer.dia_hora}</td>
                                <td>${customer.age}</td>
                                <td>
                                    <button class="btn btn-outline-danger btn-sm" onclick="deleteCustomer(${customer.id})">
                                        <img src="img/borrar.png" style="border-radius: 20px;" alt="">
                                    </button>
                                </td>
                            </tr>
                        `;
                customerTableBody.innerHTML += row;
            });
        })
        .catch(error => console.log('Error al obtener clientes:', error));
}

//var respuesta = document.getElementById('respuesta');

// Ingreso de Datos

formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const apellido = document.getElementById('apellido').value;
    const dia_hora = document.getElementById('dia_hora').value;
    const age = document.getElementById('age').value;

    // Validar campos del formulario
    if (!name || !apellido || !age) {
        alert('*** Todos los campos son obligatorios. ***');
        return;
    }
    const customerData = { name, apellido, age };

    console.log('Se ha guardado', customerData);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            fetchCustomers(); // Asegúrate de que `fetchCustomers` esté definida
            const exampleModal = new bootstrap.Modal(document.getElementById('exampleModalLabel'));
            exampleModal.hide();
            formulario.reset();  // Usa `formulario` aquí en lugar de volver a obtener el elemento
        })
        .catch(error => console.log('Error al añadir cliente:', error));
});

// Obtener y mostrar los clientes al cargar la página
document.addEventListener('DOMContentLoaded', fetchCustomers);

// Función para eliminar un cliente
function deleteCustomer(customerId) {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
        fetch(`${url}/${customerId}`, {
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
                alert('***Cliente eliminado:', data);
                fetchCustomers(); // Actualizar la lista de clientes
            })
            .catch(error => console.log('Error al eliminar cliente:', error));
    }
}

/*

    Otro método sin utilizar mysql 

    var datos = new FormData(formulario);

    console.log(datos)
    console.log(datos.get('name'))
    console.log(datos.get('apellido'))
    console.log(datos.get('dia_hora'))
    console.log(datos.get('age'))

    fetch('post.php',{
        method: 'POST',
        body: datos
    })
        .then( res => res.json())
        .then( data => {
            console.log(data)
            if(data === 'error'){
                respuesta.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        Llena todos los campos
                    </div>
                `
            }else if (data.status === 'success') {
                // Construir la tabla HTML con los datos recibidos
                let tableRows = data.data.map(item => `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.nombre}</td>
                        <td>${item.apellido}</td>
                        <td>${item.dia_hora}</td>
                        <td>${item.age}</td>
                    </tr>
                `).join('');

                respuesta.innerHTML = `
                    <div class="alert alert-primary" role="alert">
                        <table class="table table-hover" style="width: 50%;">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NOMBRE</th>
                                    <th scope="col">APELLIDO</th>
                                    <th scope="col">DIA Y HORA</th>
                                    <th scope="col">AGE</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tableRows}
                            </tbody>
                        </table>
                    </div>
                `;
            }
        })
})*/