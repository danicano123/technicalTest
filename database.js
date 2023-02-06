const db = require("mongoose");
const config = require("./config");

db.Promise = global.Promise;

db.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("[MongoDB in cloud]: successfully connected"))
  .catch((err) => console.log(err));
