const profileModel = require('../../models/profileSchema');

module.exports = async(bot, Discord, member) =>{
    let profile = await profileModel.create({
        guildID: member.guild.id,
        userID: member.id,
        swearCount: 0,
        moneyOwe: 0
    });
    
    profile.save();
}