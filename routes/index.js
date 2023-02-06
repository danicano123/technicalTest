const express = require('express');
const usersRouter = require("./users.route");
const healthRouter = require("./health.route");

const routerApi = (app) => {
  const router = express.Router();
  app.use('/api', router);
  router.use("/users", usersRouter);
  router.use("/health", healthRouter);
};

module.exports = routerApi;
