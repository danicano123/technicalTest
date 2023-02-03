const boom = require('@hapi/boom');
const ClienttsSchema = require('../schemas/db.client.schema');
const { io } = require('../socket').socket;

const date = new Date();
const dateNow = `${date.getDate()} ${
  date.getMonth() + 1
} ${date.getFullYear()}`;

class ClientService {
  async create(client) {
    const img = `http://localhost:3000/public/files${client.img.filename}`;
    console.log(`${img}hola img`);
    // product.img = img;
    const newClient = {
      ...client,
      createdAt: dateNow,
      modifiedAt: null,
    };
    if (typeof newClient === 'object') {
      const dbClient = new ClienttsSchema(newClient);
      dbClient
        .save()
        .then((ok) => {
          console.log(ok);
        })
        .catch((err) => {
          console.log(err);
        });
      return [newClient, 201, 'successfully created'];
    }
    throw boom.badRequest(`${newClient} Must be an Object`);
  }

  async showAll() {
    return ClienttsSchema.find()
      .then((ok) => {
        io.emit('message', 'greetings from client backend!');
        return ok;
      })
      .catch((err) => {
        throw boom.internal(err);
      });
  }

  async findOneById(id) {
    return [
      201,
      ClienttsSchema.findById(id)
        .then((ok) => ok)
        .catch((err) => {
          throw boom.notFound(`Client not found by id: ${id}`);
        }),
    ];
  }

  async updateOneById(id, changes) {
    if (typeof changes === 'object') {
      const foundClient = await ClienttsSchema.findByIdAndUpdate(id, {
        ...changes,
        modifiedAt: dateNow,
      })
        .then((ok) => ok)
        .catch((err) => {
          throw boom.notFound(`Product not found by id: ${id}`);
        });

      return [204, foundClient];
    }
    throw boom.badRequest('Must be an Object');
  }

  async physicalDelete(id) {
    const foundClient = await ClienttsSchema.findByIdAndDelete(id)
      .then((ok) => ok)
      .catch((err) => {
        throw boom.notFound(`Client not found by id: ${id}`);
      });

    return [204, foundClient];
  }
}
module.exports = ClientService;
