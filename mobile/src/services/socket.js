import socketio from 'socket.io-client';

const socket = socketio('http://192.168.1.4:3333',{
  autoConnect: false, //Nao quero que faça a conexão de forma automatica
});

function subscribeToNewDev(subscribeFunction){
   //vai ouvir ouvir o evento 'new-dev', evento dispara ao cadastrar um novo dev lá no back-end (DevController)
   socket.on('new-dev', subscribeFunction);
}

function connect(latitude, longitude, techs){
  socket.io.opts.query = { // Mandando informacções para o back-end
    latitude,
    longitude,
    techs,
  };

  socket.connect();

  // socket.on('menssage', text =>{ // TESTE
  //   console.log(text);
  // }); 
}


function discconnect(){
  if(socket.connected){
    socket.disconnect();
  }
}

export {
  connect,
  discconnect,
  subscribeToNewDev,
};
