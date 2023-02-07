const boom = require("@hapi/boom");
const getConnection = require("../libs/postgres");
const getExchange = require("../libs/exchangeRates");
const usersSchema = require("../schemas/db.users.schema");
const { io } = require("../socket").socket;

const date = new Date();
const dateNow = `${date.getDate()} ${
  date.getMonth() + 1
} ${date.getFullYear()}`;

const encryptionAlgorithm = (number) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let str = number.toString().split("").reverse().join("");
  let result = "";

  for (let i = 0; i < str.length; i++) {
    let letter;
    let aux;
    let digit = parseInt(str[i]);

    if (digit % 2 === 1) {
      aux = 0;
      for (let index = 0; index <= digit; index++) {
        if (index % 2 === 1) {
          aux++;
        }
      }
      letter = alphabet[aux - 1];
    } else {
      aux = 0;
      for (let index = 0; index <= digit; index++) {
        if (index % 2 === 0) {
          aux++;
        }
      }
      letter = alphabet[25 - (aux - 1)];
    }
    result += letter;
  }

  let firstHalf = result.slice(0, Math.ceil(result.length / 2));
  let secondHalf = result.slice(Math.ceil(result.length / 2));

  return secondHalf + firstHalf;
};

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

  async migrate(user) {
    const client = await getConnection();
    const rta = await client.query("SELECT * FROM Users");
    console.log(rta.rows);
    rta.rows.forEach(async(user) => {
      let { money, ...data } = user;
      if (typeof data === "object") {
        console.log(money);
        const newIdCard = encryptionAlgorithm(data.id_card);
        data.idCard = newIdCard;
        money = await getExchange(money);
        console.log(money);

        const newUser = { ...data, money };
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
    });
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
