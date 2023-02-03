const productsRouter = require("./products.route");

const routerApi = (app) => {
  app.use("/products", productsRouter);
};

module.exports = routerApi;
