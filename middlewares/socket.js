const socketIo = require('socket.io');

const socket = {};

const connect = (server) => {
  socket.io = socketIo(server);
};
module.exports = {
  connect,
  socket,
};
