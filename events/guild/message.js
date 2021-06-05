const fs = require('fs');
const jsonfile = require('jsonfile');
const unidecode = require('unidecode');
const profileModel = require('../../models/profileSchema');


module.exports = async (Discord, bot, message) =>{
    const prefix = '!';

    if(message.author.bot) return;


    let profileData;
    try{

        profileData = await profileModel.findOne({
            userID: message.author.id
        });

        if(!profileData){
            let profile = await profileModel.create({
                userID: message.author.id,
                guildData: [{
                    guildID: message.guild.id,
                    swearCount: 0,
                    moneyOwe: 0}]
            });
            profile.save();
        }
    }catch(err){
        console.log(err)
    }

    let guildInfo;
    try{

        guildInfo = await profileModel.findOne({
            userID: message.author.id,
            'guildData.guildID': message.guild.id
        });

        if(!guildInfo){
            let guild = await profileModel.findOneAndUpdate({
                userID: message.author.id,
                'guildData.guildID': message.guild.id},
                {$addToSet: {
                    guildData: {
                    guildID: message.guild.id,
                    swearCount: 0,
                    moneyOwe: 0
                    }
                }
            });
        }
    }catch(err){
        console.log(err)
    }


    if(message.content.startsWith(prefix)){

        const args = message.content.slice(prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();
        const command = bot.commands.get(cmd) || bot.commands.find(a => a.aliases && a.aliases.includes(cmd));

        if(command){
            command.execute(bot, message, args, Discord, profileData);
        }
    }

    var nickName = message.member.displayName.toLowerCase().replace(/[^a-z]/gi, '')
    if(nickName.includes('deez')){
        console.log('nickname is ' + nickName);
        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id,
            'guildData.guildID': message.guild.id
        },{
            $inc:{
                'guildData.$.swearCount': 1,
                'guildData.$.moneyOwe': 1
            }
        });

        var money_owe = response.guildData.find(data => data.guildID == message.guild.id).moneyOwe/10;

        console.log(money_owe);

        message.reply(' now owes $' + money_owe.toFixed(2));
    }

    /*var mention_lst = message.mentions.members
    console.log(mention_lst)
    for(i = 0; i < mention_lst.length; i++){
        console.log('looping through mentions')
        console.log(mention_lst[i].nickName.toLowerCase().replace(/[^a-z]/gi, ''))
        if(mention_lst[i].nickName.toLowerCase().replace(/[^a-z]/gi, '').includes('deez')){
            const response = await profileModel.findOneAndUpdate({
                userID: message.author.id,
                'guildData.guildID': message.guild.id
            },{
                $inc:{
                    'guildData.$.swearCount': 1,
                    'guildData.$.moneyOwe': 1
                }
            });
        }
    }*/


    var decoded_msg = unidecode(message.content.toLowerCase());
    var cleaned_msg = decoded_msg.replace(/[^a-z]/gi, '');
    console.log("cleaned message is:" + cleaned_msg);

    if(cleaned_msg.includes("deez")){

        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id,
            'guildData.guildID': message.guild.id
        },{
            $inc:{
                'guildData.$.swearCount': 1,
                'guildData.$.moneyOwe': 1
            }
        });

        var money_owe = response.guildData.find(data => data.guildID == message.guild.id).moneyOwe/10;

        console.log(money_owe);

        message.reply(' now owes $' + money_owe.toFixed(2));
    }

}