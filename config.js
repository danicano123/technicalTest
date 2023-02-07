const config = {
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/Users",
  PostgresUser: process.env.POSTGRES_USER,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresDatabase: process.env.POSTGRES_DB,
  exchangeApiKey: process.env.EXCHANGE_API_KEY,
  ACCESS_KEY_ID_AWS: process.env.ACCESS_KEY_ID_AWS,
  SECRET_ACCESS_KEY_ID_AWS: process.env.ACCESS_KEY_ID_AWS,
  REGION_AWS: process.env.REGION_AWS,
  TOPIC_ARN_AWS: process.env.TOPIC_ARN_AWS,
};
module.exports = config;
