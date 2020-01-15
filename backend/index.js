const express  = require('express');
const app = express();

/**
 * definindo uma rota, onde o primeiro parametro defini a rota e o segundo parametro recebe uma
 * outra função, que recebera dois parametro req e res.
 * 
 * os principais metodos que iremos utilizar para as rotas são:
 *  get(usado para listar, buscar por exemplo usuarios), 
 *  post(usado quando queremos criar alguma info, Ex: salvar),
 *  put(usado quando realizamos o update/edição de uma info),
 *  delete(usado para deletar alguma informação)
 *  */ 
app.get('/',(request, response) => {
  return response.json({ mensage: 'Hello Oministack' });
});

/**
 *   Apartir desse momento que declaramos o 'listen' conseguimo acessar nossa
 *   aplicação utilizando essa porta especificada no parametro.
*/
 app.listen(3333)