// require('./Contenedor.js')
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const { productosDB } = require("./Contenedor");
const { chatDB } = require("./Contenedor");

const productos = [];
productosDB.chatToArray(productos);

const chat = [];
chatDB.chatToArray(chat);

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.urlencoded({ extended: true }));

app.set("views", "./public");
app.set("view engine", "ejs");
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.render("formulario", { productos });
});

function asignId() {
  const idList = [];
  productos.forEach((element) => {
    idList.push(parseInt(element.id));
  });
  if (idList.length == 0) {
    return 1;
  } else {
    return Math.max(...idList) + 1;
  }
}

app.post("/productos", (req, res) => {
  const producto = req.body;

  const id = asignId();
  producto.id = id;
  productosDB.insertElement(producto);
  productos.push(producto);
  res.redirect("/");
});

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  io.sockets.emit("recargarChat", chat);

  io.sockets.emit("chatLogs");

  socket.on("recargarTabla", async (nuevoProducto) => {
    // const id = asignId();
    // nuevoProducto.id = id;
    console.log("nuevo", nuevoProducto);
    await productos.push(nuevoProducto);

    await productosDB.insertElement(nuevoProducto);

    io.sockets.emit("productos", productos);
  });

  socket.on("nuevoMensaje", async (nuevoMensaje) => {
    await chat.push(nuevoMensaje);
    console.log(chat);
    await chatDB.insertElement(nuevoMensaje);
    io.sockets.emit("recargarChat", chat);
  });
});

const PORT = 3060;
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
