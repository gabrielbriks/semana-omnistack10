const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections  = [];


// esportando funcao criada
exports.setupWebSocket = (server) => {
  io = socketio(server);

  io.on('connection',socket => {
    const { latitude, longitude, techs } = socket.handshake.query;
     // console.log(socket.id);
    // console.log(socket.handshake.query); // essa é a variavel que acessamos as informações que vieram do front-mobile

    
    //estamos salvando todas as conections de nossa aplications
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude), // convertendo valore da variavel em numero
        longitude: Number(longitude),
      },
      techs : parseStringAsArray(techs),
    });

    // setTimeout(() => { TESTE
    //   socket.emit('menssage', 'Hello Oministack 10')
    // }, 3000);
  })
};

exports.findConections = (coordinates, techs) => {
  return connections.filter(connection => {
    //a funcao vai comparar essas duas cordenadas, e vrificar se e menor que 10Km
    return calculateDistance(coordinates, connection.coordinates) < 10
      && connection.techs.some(item => techs.includes(item))
  });
};

exports.sendMessage = (to, message, data) => {
  //Percorrendo o array de destinatarios
  to.forEach(connection => {
    io.to(connection.id).emit(message, data) // emitindo uma mensagem ao dono do id 
  })
}