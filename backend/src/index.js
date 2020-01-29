const express  = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); //importando essa lib para criarmos um servidor para o webSocket

const routes = require('./routes');
const { setupWebSocket } = require('./websocket');//importando funcao do webSocket

const app = express();
/*  */
const server = http.Server(app); // Com isso Apartir temos um servidor fora do express

setupWebSocket(server); 

mongoose.connect('mongodb+srv://master:@master@cluster0-itqet.mongodb.net/week10?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

 /* 
 cors pode receber parametros e um deles e o 'origin', onde podemos definir um endereço de acesso 
  especifico.. quando vazio está livre. 
 */
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3333);