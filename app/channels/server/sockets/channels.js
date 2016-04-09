'use strict';

module.exports = function(io, socket) {

  console.log('user connected');

  socket.on('joined channel', function(channel) {
    console.log(channel);
    socket.join(channel.channelId);
  });

  socket.on('message', function(message) {
    socket.broadcast.to(message.channel).emit('message', message);
  });

};
