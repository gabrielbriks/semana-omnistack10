const mongoose = require('mongoose');

const DevSechema = new mongoose.Schema({
nome: String,
github_username: String,
bio: String,
avatar_url: String,
techs: [String], // o vetor dis que armazena uma ou mais strings de tecnologia

});

module.exports = mongoose.model('Dev', DevSechema);