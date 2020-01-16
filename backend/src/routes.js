const { Router } = require('express');
const DevController = require('./controllers/DevController');

const routes = Router();


//rota listar devs
routes.get('/devs', DevController.index);
//rota cadastrar new dev
routes.post('/devs', DevController.store);

module.exports = routes;
