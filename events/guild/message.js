const fs = require('fs');
const jsonfile = require('jsonfile');
const unidecode = require('unidecode');
const profileModel = require('../../models/profileSchema');


module.exports = async (Discord, bot, message) =>{
    const prefix = '!';

    if(message.author.bot){
        return;
    }

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

    if(message.content.startsWith(prefix)){

        const args = message.content.slice(prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();
        const command = bot.commands.get(cmd) || bot.commands.find(a => a.aliases && a.aliases.includes(cmd));

        if(command){
            command.execute(bot, message, args, Discord, profileData);
        }
    }


    var decoded_msg = unidecode(message.content.toLowerCase());
    var cleaned_msg = decoded_msg.replace(/[^a-z]/gi, '');
    console.log("cleaned message is:" + cleaned_msg);

    if(cleaned_msg.includes("deez")){

        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id,
            guildData: {guildID}
        },{
            $inc:{
<<<<<<< HEAD
                'guildData.swearCount': 1,
                'guildData.moneyOwe': 1
            }
        }, options.new=true, callback);
        var money_owe = profileData.moneyOwe/10;
=======
                swearCount: 1,
                moneyOwe: 0.1
            }
        });
        var money_owe = profileData.moneyOwe;
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 74c7173 (changed money owe to 1 not 0.1 prevent rounding error)
=======
>>>>>>> parent of 74c7173 (changed money owe to 1 not 0.1 prevent rounding error)
=======
>>>>>>> parent of 74c7173 (changed money owe to 1 not 0.1 prevent rounding error)
        message.reply(' now owes $' + money_owe.toFixed(2));
    }
    
}