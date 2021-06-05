const unidecode = require('unidecode');
const profileModel = require('../../models/profileSchema');

module.exports = async (Discord, bot, oldMessage, newMessage) =>{
    var decoded_msg = unidecode(newMessage.content.toLowerCase());
    var cleaned_msg = decoded_msg.replace(/[^a-z]/gi, '');
    console.log("cleaned message is:" + cleaned_msg);

    if(cleaned_msg.includes("deez")){
        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id
        },{
            $inc:{
                swearCount: 0,
                moneyOwe: 0.1
            }
        });
    }
}