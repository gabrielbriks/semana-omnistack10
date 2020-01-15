const express  = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://master:@master@cluster0-itqet.mongodb.net/week10?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
/**
 *  Apartir desse momento meio que cadastramos o json dentro do express, para entender requisições 
 * que possuem o corpo no formato JSON 
 * 
 *  */
app.use(express.json());
/**
 * definindo uma rota, onde o primeiro parametro defini a rota e o segundo parametro recebe uma
 * outra função, que recebera dois parametro req e res.
 * 
 * os principais metodos HTTP que iremos utilizar para as rotas são:
 *  get(usado para listar, buscar por exemplo usuarios), 
 *  post(usado quando queremos criar alguma info, Ex: salvar),
 *  put(usado quando realizamos o update/edição de uma info),
 *  delete(usado para deletar alguma informação)
 *  */ 
app.post('/users',(request, response) => {
  console.log(request.body);
  return response.json({ mensage: 'Hello Oministack' });
});

/**
 *   Apartir desse momento que declaramos o 'listen' conseguimo acessar nossa
 *   aplicação utilizando essa porta especificada no parametro.
*/
 app.listen(3333)