const express  = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); //importando essa lib para criarmos um servidor para o webSocket

const routes = require('./routes');
const { setupWebSocket } = require('./websocket');//importando funcao do webSocket

const app = express();
/* Apartir desse momento tenho um servidor fora do express */
const server = http.Server(app);

//instanciando função do websocket.js
setupWebSocket(server); 

mongoose.connect('mongodb+srv://master:@master@cluster0-itqet.mongodb.net/week10?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/**
 *  Apartir desse momento meio que cadastramos o json dentro do express, para entender requisições 
 * que possuem o corpo no formato JSON 
 * 
 *  */

 /* o cors pode receber parametro e um deles e o origin, onde podemos definir um endereçõ de acesso 
  especifico..
  em nosso caso deixaremos vazio para que esse acesso seja livre 
 */
app.use(cors());
app.use(express.json());
app.use(routes);

/**
 *   Apartir desse momento que declaramos o 'listen' conseguimo acessar nossa
 *   aplicação utilizando essa porta especificada no parametro.
*/
 server.listen(process.env.PORT || 3333);