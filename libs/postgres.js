/**
 * I use the "pg" library to make a connection between node and postgres
 *  that allows me to use query language inside js.
 */
const config = require("../config");
const { Client } = require("pg");
async function getConnection() {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: config.PostgresUser,
    password: config.postgresPassword,
    database: config.postgresDatabase,
  });
  await client.connect()
  return client;
}
module.exports = getConnection;
