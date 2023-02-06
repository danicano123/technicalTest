// initializations
const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const { socket, connect } = require("./socket");
require('./database');

connect(server);
const { io } = socket;
const {
  errorLoguer,
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/error.handler");
const routerApi = require("./routes/index");

io.on("connection", (alv) => {
  console.log(`hello from socket${alv}`);
  io.emit("message", "hello from backend!");
});

const port = 3000;
app.use(express.static("./public/views/"));

// General middlewares

app.use(express.json());

const whitelist = ["http://localhost:3000", "https://myapp.co"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("access denied"));
    }
  },
};
app.use(cors(options));
routerApi(app);

// My Middlewares (los Middlewares que se ejecutan en 'next' deben ir despues del enrutamiento)

app.use(errorLoguer);
app.use(boomErrorHandler);
app.use(errorHandler);


server.listen(port, () => {
  console.log(`listen at http://localhost:${port}`);
});

/*
const express = require('express')
const app = express()
const port = 3000

const MongoClient = require('mongodb').MongoClient

// Connection URL
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/test';

app.get('/', (req, res) => {
  MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
    if (err) {
      res.status(500).send('💥 Boom 💥: ' + err);
    } else {
      res.send('Me conecté a la DB!!! 😎');
      db.close();
    }
  });
});

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`))*/
