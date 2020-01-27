const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {

    async index(request, response){
        //busca todos os devs num raio de 10km 
        //Filtrar po tecnologias 

        const { latitude, longitude, techs } = request.query;
        
        const techsArray = parseStringAsArray(techs);
        
        const devs = await Dev.find({
            techs: {
                /*$in >> e um operations do mongodb, pode se pesquisar quais sao os outros;
                Se o usuario possui as technologias dentro de ...
                */
                $in: techsArray,
            },
            location:{
                /* $near >> Consigo encontrar objetos perto de uma localização;

                */
               $near: {
                   $geometry: {
                       type:'Point',
                       coordinates: [longitude, latitude],
                   },
                   $maxDistance: 10000,//10km
               },
            }
        });

        // console.log(request.query);

        return response.json({ devs });
    }
};