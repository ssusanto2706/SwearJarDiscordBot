const unidecode = require('unidecode');
const profileModel = require('../../models/profileSchema');

module.exports = async (Discord, bot, oldMessage, newMessage) =>{
    var decoded_msg = unidecode(newMessage.content.toLowerCase());
    var cleaned_msg = decoded_msg.replace(/[^a-z]/gi, '');
    console.log("cleaned message is:" + cleaned_msg);

    if(cleaned_msg.includes("deez")){

        const response = await profileModel.findOneAndUpdate({
            userID: newMessage.author.id,
            'guildData.guildID': newMessage.guild.id
        },{
            $inc:{
                'guildData.$.swearCount': 1,
                'guildData.$.moneyOwe': 1
            }
        });

        var money_owe = response.guildData.find(data => data.guildID == newMessage.guild.id).moneyOwe/10;

        console.log(money_owe);

        newMessage.reply(' now owes $' + money_owe.toFixed(2));
    }
}