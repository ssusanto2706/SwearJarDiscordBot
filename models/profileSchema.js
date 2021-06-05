const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: {type: String, require: true, unique: true},
    guildData: [{
        guildID : {type: String},
        swearCount: {type: Number},
        moneyOwe: {type: Number}
    }]
});

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;