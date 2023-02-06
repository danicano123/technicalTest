const config = {
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/Users",
  dbUrl: "mongodb+srv://danicano:Danicano3264-@testdb.c5iv0kv.mongodb.net/test",
  PostgresUser: process.env.POSTGRES_USER,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresDatabase: process.env.POSTGRES_DB,
};
module.exports = config;
