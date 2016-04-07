'use strict';

module.exports = function(socket, io) {

  console.log('user connected');

  socket.on('message', function(message) {
    socket.emit('message', message);
  });

};
