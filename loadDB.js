const { Knex } = require("knex");
const { knex } = require("./options/mariaDB");
const { knexSqLite } = require("./options/mySqlite3");

const chat = [
  {
    mail: "bruno.acosta.99@gmail.com",
    fechaYhora: "25/6/2022 20:20:28",
    mensaje: "Hola!",
  },
  {
    mail: "silvina.correa.98@gmail.com",
    fechaYhora: "25/6/2022 20:20:42",
    mensaje: "Buenas tardes!",
  },
  {
    mail: "realstevejobs@gmail.com",
    fechaYhora: "25/6/2022 20:20:55",
    mensaje: "Hello!",
  },
  {
    mail: "bruno.acosta.99@gmail.com",
    fechaYhora: "26/6/2022 16:44:23",
    mensaje: "Holaaaaa",
  },
  {
    mail: "Susana",
    fechaYhora: "26/6/2022 16:44:32",
    mensaje: "Aloooo",
  },
];

const productos = [
  {
    title: "iPhone White",
    price: 899,
    thumbnail:
      "https://cdn4.iconfinder.com/data/icons/iphone-5s-5c/128/iPhone-5C-White.png",
    id: 1,
  },
  {
    title: "iPhone Black",
    price: 999,
    thumbnail:
      "https://cdn4.iconfinder.com/data/icons/iphone-5s-5c/128/iPhone-5S-Space-Grey.png",
    id: 2,
  },
  {
    title: "iPhone Red",
    price: 1099,
    thumbnail:
      "https://cdn4.iconfinder.com/data/icons/iphone-5s-5c/128/Pink-iPhone-5C.png",
    id: 3,
  },
];

knex.schema
  .createTable("productos", (table) => {
    table.string("title");
    table.string("price");
    table.string("thumbnail");
    table.increments("id");
  })
  .then(() => {
    return knex("productos").insert(productos);
  })
  .finally(() => {
    knex.destroy();
  });

knexSqLite.schema
  .createTable("chat", (table) => {
    table.string("mail");
    table.string("fechaYhora");
    table.string("mensaje");
  })
  .then(() => {
    return knexSqLite("chat").insert(chat);
  })
  .finally(() => {
    knexSqLite.destroy();
  });
