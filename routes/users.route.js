const express = require("express");
const ProductService = require("../services/users.service");
const validatorHandler = require("../middlewares/validator.handler");

const router = express.Router();
const service = new ProductService();
const {
  createUserSchema,
  updateUserSchema,
  findUserSchema,
} = require("../schemas/users.schema");

// GET methods
router.get("/", async (req, res, next) => {
  try {
    res.json(await service.showAll());
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(findUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOneById(id);
      res.status(product[0]).json(await product[1]);
    } catch (error) {
      next(error);
    }
  }
);

// POST method
router.post(
  "/",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    const { body } = req;
    try {
      const user = await service.create(body);
      res
        .status(user[1])
        .json(`${Object.values(user[0])}  =>  ${user[2]}`);
    } catch (error) {
      next(error);
    }
  }
);

// PATCH method

router.patch(
  "/:id",
  validatorHandler(findUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const user = await service.updateOneById(id, body);
      console.log(user[1]);
      res.status(user[0]).json(await user[1]);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.physicalDelete(id);
    console.log(user[1]);
    res.status(user[0]).json(user[1]);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
