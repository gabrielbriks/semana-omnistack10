const socketio = require('socket.io');

// esportando funcao criada
exports.setupWebSocket = (server) => {
  const io = socketio(server);

  /*Adicionando ('on') um evento 'listen', no caso estamos ouvindo um evento, que vai ser um evento 
    de conexao.. Ou seja toda vez que um usuario se concetar  */
  io.on('connection',socket => {
    console.log(socket.id);
  })

};