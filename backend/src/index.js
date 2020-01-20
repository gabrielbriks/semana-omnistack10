const express  = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

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
 app.listen(3333);