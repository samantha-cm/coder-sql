const { knex } = require("./options/mariaDB");
const { knexSqLite } = require("./options/mySqlite3");

// const fs = require('fs')

class Contenedor {
  constructor(knex, tabla) {
    this.knex = knex;
    this.tabla = tabla;
  }

  chatToArray(chat) {
    this.knex
      .from(this.tabla)
      .select("*")
      .then((rows) => {
        const result = Object.values(JSON.parse(JSON.stringify(rows)));
        result.forEach((row) => chat.push(row));
        console.log(chat);
      })
      .finally(() => {
        this.knex.destroy();
      })
      .catch(() => {
        console.log("No hay historial");
      });
  }

  async insertElement(ele) {
    try {
      console.log(ele);
      await this.knex(this.tabla).insert(ele);
      console.log("Elemento insertado");
    } catch (error) {
      console.log(error);
    }
  }
}

const chatDB = new Contenedor(knexSqLite, "chat");
const productosDB = new Contenedor(knex, "productos");

module.exports = { productosDB, chatDB };

// productosDB.insertElement({
//     title: "iPhone White",
//     price: 899,
//     thumbnail: "https://cdn4.iconfinder.com/data/icons/iphone-5s-5c/128/iPhone-5C-White.png",
//     id: 4
// })
