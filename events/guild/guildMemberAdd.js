const profileModel = require('../../models/profileSchema');

module.exports = async(Discord, bot, member) =>{
    console.log('new member joined')
    let profile = await profileModel.create({
        userID: member.id,
        guildData: [{
            guildID: member.guild.id,
            swearCount: 0,
            moneyOwe: 0}]
        });
    profile.save();
}