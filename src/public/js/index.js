
const socket = io();

const table = document.getElementById('realTimeProducts');
console.log('recibe datos');
document.getElementById('createBtn').addEventListener('click', async () => {
    const body = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        thumbnail: ["sin imagen"],
        status: true,
        code: document.getElementById('code').value,
        stock: document.getElementById('stock').value,
        category: document.getElementById('category').value,
    };

    console.log(body);

    try {
        fetch('/api/products', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(result => result.json())
            .then(result => {
                if (result.status === 'error') throw new Error(result.error)
            })
            .then(() => fetch('/api/products'))
            .then(result => result.json())
            .then(result => {
                if (result.status === 'error') throw new Error(result.error)
                console.log('productList: ', result.payload)
                socket.emit('productList', result.payload);
                socket.emit('productList', result.payload)
                alert(`Ok. Todo salió bien! :)\nEl producto se ha agregado con éxito!\n\nVista actualizada!`)
                document.getElementById('title').value = ''
                document.getElementById('description').value = ''
                document.getElementById('price').value = ''
                document.getElementById('code').value = ''
                document.getElementById('stock').value = ''
                document.getElementById('category').value = ''
            })
        
    } catch (err) {
        console.log('Error:', err);
        alert(`Hubo un error al procesar la solicitud. Detalles: ${err.message}`);
    }
    
});



deleteProduct = (id) => {
    fetch(`/api/products/${id}`, {
        method: 'delete',
    })
    .then(result => {
        if (result.status === 'error') throw new Error(result.error)
        return result.json(); // Asegúrate de analizar la respuesta como JSON
    })
    .then(data => {
        socket.emit('productList', data.payload); // Emite el evento después de que la eliminación sea exitosa
        console.log("se elimino correctamente");

    })
    .catch(err => logger.error(`Ocurrió un error: ${err}`));
}

socket.on('updateProducts', (data) => {
    // Verifica si data no es nulo y es un iterable (array)
    console.log("data updateproducts cliente: ", data)
    if (data !== null && Array.isArray(data)) {
        table.innerHTML = 
            `<tr>
                <td></td>
                <td><strong>Producto</strong></td>
                <td><strong>Descripción</strong></td>
                <td><strong>Precio</strong></td>
                <td><strong>Code</strong></td>
                <td><strong>Stock</strong></td>
                <td><strong>Categoría</strong></td>
            </tr>`;
        for (const product of data) {
            let tr = document.createElement('tr')
            tr.innerHTML = `
                <td><button class="btn btn-danger" onclick="deleteProduct(${product.id})">Eliminar</td> 
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.code}</td>
                <td>${product.stock}</td>
                <td>${product.category}</td>
            `;
            table.getElementsByTagName('tbody')[0].appendChild(tr);
        }
    } else {
        // Maneja el caso en el que data no es un iterable válido o es nulo
        console.log('Los datos recibidos no son un iterable válido o son nulos:', data);
    }
})


