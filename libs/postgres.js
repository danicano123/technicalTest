/**
 * I use the "pg" library to make a connection between node and postgres
 *  that allows me to use query language inside js.
 */

const { Client } = require("pg");
async function getConnection() {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });
  await client.connect()
  return client;
}
module.exports = getConnection;
