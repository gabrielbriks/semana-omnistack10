const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections  = [];


// esportando funcao criada
exports.setupWebSocket = (server) => {
  io = socketio(server);

  /*Adicionando ('on') um evento 'listen', no caso estamos ouvindo um evento, que vai ser um evento 
    de conexao.. Ou seja toda vez que um usuario se concetar  */
  io.on('connection',socket => {
    const { latitude, longitude, techs } = socket.handshake.query;
     // console.log(socket.id);
    // console.log(socket.handshake.query); // essa é a variavel que acessamos as informações que vieram do front-mobile

    /*Toda vez que um user se conectar na application ele ira adicionar um novo objeto em nosso Array
      Ou seja estamos salvando todas as conections de nossa aplications
    */
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
                            //a funcao vai comparar essas duas cordenadas, e eu trato para ver se e menor que 10Km
    return calculateDistance(coordinates, connection.coordinates) < 10
    /*'some' retorna 'true', se condição dentro for verdadeira; 
      Ou seja, estou varrendo as techs do dev recém cadastrado, e verificando se possui alguma
      igual a da tech que foi pesquisada
    */
      && connection.techs.some(item => techs.includes(item))
  });
};

exports.sendMessage = (to, message, data) => {
  //Percorrendo o array de destinatarios
  to.forEach(connection => {
    io.to(connection.id).emit(message, data) // emitindo uma mensagem o dono do id in connection
  })
}