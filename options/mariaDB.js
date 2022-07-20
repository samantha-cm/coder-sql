// https://devhints.io/mysql
// https://devhints.io/knex

const knex = require("knex")({
  //mysql -u root
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "productos_db",
  },
});

module.exports = { knex };
