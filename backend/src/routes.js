const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();


//rota listar devs
routes.get('/devs', DevController.index);
//rota cadastrar new dev
routes.post('/devs', DevController.store);
//rota de busca
routes.get('/search', SearchController.index);

module.exports = routes;
