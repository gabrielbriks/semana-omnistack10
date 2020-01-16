const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DevSechema = new mongoose.Schema({
nome: String,
github_username: String,
bio: String,
avatar_url: String,
techs: [String], // o vetor diz que armazena uma ou mais strings de tecnologia
location: { 
    type: PointSchema,
    createIndexes: '2dsphere'
 },
});

module.exports = mongoose.model('Dev', DevSechema);