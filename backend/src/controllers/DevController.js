const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConections, sendMessage} = require('../websocket');
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

        if(!dev)
        {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
          const { name = login, avatar_url, bio } = apiResponse.data;
      
          //  console.log(name, avatar_url, bio);
      
          const techsArray = parseStringAsArray(techs);
          
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

          /* Vamos filtrar as coexoes que estao no maximo 10km de distancia
            e que o novo dev tenha pelo menos uma das techs filtradas 
          */
          const sendSocketMenssageTo = findConections(
            { latitude, longitude },
            techsArray,
          );
          
          sendMessage(sendSocketMenssageTo, 'new-dev', dev);

          // console.log(sendSocketMenssageTo);
          return response.json(dev);
        }
      }
        
        
    //Criar >> async Update;
    //Criar >> async Destroy
};