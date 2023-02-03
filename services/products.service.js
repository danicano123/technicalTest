const boom = require('@hapi/boom');
const ProductsSchema = require('../schemas/db.products.schema');
const { io } = require('../socket').socket;

const date = new Date();
const dateNow = `${date.getDate()} ${
  date.getMonth() + 1
} ${date.getFullYear()}`;

class ProductService {
  async create(product) {
    const img = `http://localhost:3000/public/files${product.img.filename}`;
    console.log(`${img}hola img`);
    // product.img = img;
    const newProduct = {
      ...product,
      createdAt: dateNow,
      modifiedAt: null,
    };
    if (typeof newProduct === 'object') {
      const dbProduct = new ProductsSchema(newProduct);
      dbProduct
        .save()
        .then((ok) => {
          console.log(ok);
        })
        .catch((err) => {
          console.log(err);
        });
      return [newProduct, 201, 'successfully created'];
    }
    throw boom.badRequest(`${newProduct} Must be an Object`);
  }

  async showAll() {
    return ProductsSchema.find()
      .then((ok) => {
        io.emit('message', 'greetings from backend!');
        return ok;
      })
      .catch((err) => {
        throw boom.internal(err);
      });
  }

  async findOneById(id) {
    return [
      201,
      ProductsSchema.findById(id)
        .then((ok) => ok)
        .catch((err) => {
          throw boom.notFound(`Product not found by id: ${id}`);
        }),
    ];
  }

  async updateOneById(id, changes) {
    if (typeof changes === 'object') {
      const foundProduct = await ProductsSchema.findByIdAndUpdate(id, {
        ...changes,
        modifiedAt: dateNow,
      })
        .then((ok) => ok)
        .catch((err) => {
          throw boom.notFound(`Product not found by id: ${id}`);
        });

      return [204, foundProduct];
    }
    throw boom.badRequest('Must be an Object');
  }

  async physicalDelete(id) {
    const foundProduct = await ProductsSchema.findByIdAndDelete(id)
      .then((ok) => ok)
      .catch((err) => {
        throw boom.notFound(`Product not found by id: ${id}`);
      });

    return [204, foundProduct];
  }
}
module.exports = ProductService;
