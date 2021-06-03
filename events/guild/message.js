const fs = require('fs');
const jsonfile = require('jsonfile');
const unidecode = require('unidecode');

var stats = {};

if(fs.existsSync('stats.json')){
    stats = jsonfile.readFileSync('stats.json');
}

module.exports = (Discord, bot, message) =>{
    const prefix = '!';
    if(message.author.bot){
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if(command){
        command.execute(bot, message, args, Discord);
    }

    var decoded_msg = unidecode(message.content.toLowerCase());
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

    jsonfile.writeFileSync('stats.json', stats);
}