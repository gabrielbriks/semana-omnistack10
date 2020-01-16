const axios = require('axios');
const Dev = require('../models/Dev');

//Um controller possui 5 funções index, show, store, update, detroy
/**
 * Index: para quando queremos mostrar uma lista de dev por exemplo; 
 * Show: para quando queremos mostrar um unico dev por exemplo;
 * Store: para quando queremos criar um novo cadastro;
 * Update: para quando queremos alterar;
 * Destroy: para quando queremos deletar;  
 */
module.exports = {
    //Buscando uma lista de devs
    async index(request, response){
        const devs = await Dev.find();
        
        return response.json(devs);
    },


    //Gravando uma informação no banco 
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
        
        //Esse cara vai no banco de dados e busca um se baseando no username, 
        //se caso existir o Dev que esta sendo cadastrado ja se encontra no banco 
        let dev = await Dev.findOne({ github_username });

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
        const { name = login, avatar_url, bio } = apiResponse.data;
    
        // console.log(name, avatar_url, bio);
    
        const techsArray = techs.split(',').map(tech => tech.trim());//trim remove espaços no inicio e no fim 
        
        // criando esse location para armazenar a latitude e a longitude 
        const location = {
          type: 'Point',
          coordinates: [longitude, latitude]
        }
    
        const dev = await Dev.create({
          github_username,
          name,
          avatar_url,
          bio,
          techs: techsArray,
          location,
        });
    
        console.log(techsArray);
    
    }
        return response.json(dev);
      }
};