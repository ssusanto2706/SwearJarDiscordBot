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
    const command = bot.commands.get(cmd) || bot.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if(command){
        command.execute(bot, message, args, Discord);
    }

    var decoded_msg = unidecode(message.content.toLowerCase());
    var cleaned_msg = decoded_msg.replace(/[^a-z]/gi, '');
    console.log("cleaned message is:" + cleaned_msg);

    if(cleaned_msg.includes("deez")){
        /*const response = await profileModel.findOneAndUpdate({
            userID: message.author.id
        },{
            $inc:{
                swearCount: 0,
                moneyOwe: 0.1
            }
        });*/
        userStats.swear_count += 1;
        userStats.money_owe += 0.10;
        userStats.money_owe = Math.round(userStats.money_owe* 100)/100;
        message.reply(' now owes $' + userStats.money_owe.toFixed(2));
    }

    jsonfile.writeFileSync('stats.json', stats);
}