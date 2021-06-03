const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    guildID: {type: String, require: true, unique: true},
    userID: {type: String, require: true},
    swearCount: {type: Number},
    moneyOwe: {type: Number}
});

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;