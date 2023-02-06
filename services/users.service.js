const boom = require("@hapi/boom");
const usersSchema = require("../schemas/db.users.schema");
const { io } = require("../socket").socket;

const date = new Date();
const dateNow = `${date.getDate()} ${
  date.getMonth() + 1
} ${date.getFullYear()}`;

class UserService {
  async create(user) {
    const newUser = {
      ...user,
    };
    if (typeof newUser === "object") {
      const dbUser = new usersSchema(newUser);
      dbUser
        .save()
        .then((ok) => {
          console.log(ok);
        })
        .catch((err) => {
          console.log(err);
        });
      return [newUser, 201, "successfully created"];
    }
    throw boom.badRequest(`${newUser} Must be an Object`);
  }

  async showAll() {
    return usersSchema
      .find()
      .then((ok) => {
        io.emit("message", "greetings from backend!");
        return ok;
      })
      .catch((err) => {
        throw boom.internal(err);
      });
  }

  async findOneById(id) {
    return [
      201,
      usersSchema
        .findById(id)
        .then((ok) => ok)
        .catch((err) => {
          throw boom.notFound(`User not found by id: ${id}`);
        }),
    ];
  }

  async updateOneById(id, changes) {
    if (typeof changes === "object") {
      const foundProduct = await usersSchema
        .findByIdAndUpdate(id, {
          ...changes,
        })
        .then((ok) => ok)
        .catch((err) => {
          throw boom.notFound(`Product not found by id: ${id}`);
        });

      return [204, foundProduct];
    }
    throw boom.badRequest("Must be an Object");
  }

  async physicalDelete(id) {
    const foundProduct = await usersSchema
      .findByIdAndDelete(id)
      .then((ok) => ok)
      .catch((err) => {
        throw boom.notFound(`Product not found by id: ${id}`);
      });

    return [204, foundProduct];
  }
}
module.exports = UserService;
