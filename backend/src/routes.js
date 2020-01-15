const { Router } = require('express');
const axios = require('axios');
const routes = Router();

routes.post('/devs', async (request, response) => {
    const { github_username } = request.body;
    
    const apiResponse = await axios.get(`{htps://api.github.com/devs/${github_username}`);

    console.log(apiResponse.data);

    return response.json({ mensage: 'Hello Oministack' });
  });

  module.exports = routes;
