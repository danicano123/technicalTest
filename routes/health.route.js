const express = require("express");

const router = express.Router();

// Mongo Connection URL
const MongoClient = require("mongodb").MongoClient;
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/Users";

router.get("/", async (req, res, next) => {
  try {
    MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, db) => {
      if (err) {
        res.status(500).send("💥 Boom 💥: " + err);
      } else {
        res.send({ mongoStatus: "ok" });
      }
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;