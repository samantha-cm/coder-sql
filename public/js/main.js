const socket = io.connect()

function renderizar(productos) {
    document.getElementById('tablediv').innerHTML = `
        <table class="table table-dark">
            <tr style="color: yellow;"> <th>Producto</th> <th>Precio</th> <th>Foto</th> </tr>
        </table>`
    productos.forEach(producto => {
        const nuevoElemento = `
        <tr>
            <td>${producto.title}</td>
            <td>${producto.price}</td>
            <td><img src='${producto.thumbnail}' alt='${producto.title}'></td>
        </tr>
        `
        document.querySelector('table tbody').innerHTML += nuevoElemento
    });
}

function hacerHTML(chat) {
    return chat.map((elem, index) => {
        return(`
            <div>
            <strong> <span style="color:blue"> ${elem.mail} </span> </strong>
            <span style="color:brown"> [${elem.fechaYhora}] </span>:
            <i> <span style="color:green">${elem.mensaje}</span> </i>
            </div>`)
    }).join(" ")
}

function recargarChat(chat) {
    const chatInsert = hacerHTML(chat)
    document.getElementById('mensajes').innerHTML = chatInsert
}

function tomarProducto(e) {
    const nuevoProducto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    }
    socket.emit('recargarTabla', nuevoProducto)
    return false
}

function agregarMensaje(e) {
    const date = new Date()
    const nuevoMensaje = {
        mail: document.getElementById('mail').value,
        fechaYhora: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
        mensaje: document.getElementById('mensaje').value        
    }
    document.getElementById('mensaje').value = ''
    socket.emit('nuevoMensaje',nuevoMensaje)
    return false
}

socket.on('productos', productos => {renderizar(productos)})
socket.on('recargarChat', chat => {recargarChat(chat)})