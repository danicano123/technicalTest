const express = require('express');
const ProductService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();
const service = new ProductService();
const {
  createProductSchema,
  updateProductSchema,
  findProductSchema,
} = require('../schemas/users.schema');

// GET methods
router.get('/', async (req, res, next) => {
  try {
    res.json(await service.showAll());
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(findProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOneById(id);
      res.status(product[0]).json(await product[1]);
    } catch (error) {
      next(error);
    }
  },
);

// POST method
router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    const { body } = req;
    try {
      const product = await service.create(body);
      res
        .status(product[1])
        .json(`${Object.values(product[0])}  =>  ${product[2]}`);
    } catch (error) {
      next(error);
    }
  },
);

// PATCH method

router.patch(
  '/:id',
  validatorHandler(findProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const product = await service.updateOneById(id, body);
      console.log(product[1]);
      res.status(product[0]).json(await product[1]);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.physicalDelete(id);
    console.log(product[1]);
    res.status(product[0]).json(product[1]);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
