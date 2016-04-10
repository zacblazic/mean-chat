'use strict';

module.exports = function(io, socket) {

  console.log('user connected');

  socket.on('message', function(message) {
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

};
