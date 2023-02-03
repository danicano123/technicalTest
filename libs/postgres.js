/**
 * I use the "pg" library to make a connection between node and postgres
 *  that allows me to use query language inside js.
 */

const { Client } = require("pg");
async function getConnection() {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "nico",
    password: "admin123",
    database: "my_store",
  });
  await client.connect();
  return client;
}
module.exports = getConnection;
