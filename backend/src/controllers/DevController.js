const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConections, sendMessage} = require('../websocket');

module.exports = {
    //Buscando uma lista de devs
    async index(request, response){
        const devs = await Dev.find();
        
        return response.json(devs);
    },


    //Gravando uma informação no banco 
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
         
        let dev = await Dev.findOne({ github_username });

        //Valida se o dev ja existe no bd
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

          //filtrando todas as conexões que estão no máximo 10 km de distância
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