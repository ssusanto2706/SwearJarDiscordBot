require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs');
const jsonfile = require('jsonfile');

const bot = new Discord.Client();

var stats = {};
var bannedWords = ["these nut", "deez nut", "deez", "neez dut", "denise noots"];

if(fs.existsSync('stats.json')){
    stats = jsonfile.readFileSync('stats.json');
}

bot.on('message', (message) => {

    if(!(message.guild.id in stats)){
        stats[message.guild.id] = {};
    }

    const guildStats = stats[message.guild.id];

    if (!(message.author.id in guildStats)){
        guildStats[message.author.id] = {
            swear_count: 0,
            money_owe: 0
        };
    }

    const userStats = guildStats[message.author.id];

    const parts = message.content.split(' ');

    if(parts[0] === "!hello"){
        message.reply('hi')
    }
    else if(parts[0] === "!bye"){
        message.reply('bye')
    }
    else if(parts[0] === "!gm"){
        message.reply('Good Morning! :)')
    }
    else if(parts[0] === "!gn"){
        message.reply('Good Night! Zzz')
    }
    else if(parts[0] === "!ily"){
        message.reply('I love you too <3')
    }
    else if(parts[0] === "!ilya"){
        message.channel.send('I love Amzy! She is the best')
    }


   for (var i=0; i < bannedWords.length; i++){
        var lower_message = message.content.toLowerCase();
        if(lower_message.includes(bannedWords[i])){
                userStats.swear_count += 1;
                userStats.money_owe += 0.10;
                userStats.money_owe = Math.round(userStats.money_owe* 100)/100;
                message.reply(' now owes $' + userStats.money_owe.toFixed(2));
                break;
        }
    }

/*var regex = new RegExp('deez*')
if(regex.test(message.content.toLowerCase())){
    userStats.swear_count += 1;
    userStats.money_owe += 0.10;
    userStats.money_owe = Math.round(userStats.money_owe* 100)/100;
    message.reply(' now owes $' + userStats.money_owe.toFixed(2));            
}*/

    jsonfile.writeFileSync('stats.json', stats);
});


bot.login(process.env.BOT_TOKEN);