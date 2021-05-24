const Discord = require('discord.js');
const bot = new Discord.Client();
var stats = {};
var bannedWords = ["these nut", "deez nut", "deez"];

bot.on('message', (message) => {

    if(message.guild.id in stats === false){
        stats[message.guild.id] = {};
    }

    const guildStats = stats[message.guild.id];

    if (message.author.id in guildStats === false){
        guildStats[message.author.id] = {
            swear_count: 0,
            money_owe: 0,
            last_message: 0
        };
    }

    const userStats = guildStats[message.author.id];

    const parts = message.content.split(' ');

    if(parts[0] === "!hello"){
        message.reply('hi')
    }

    for (var i=0; i < bannedWords.length; i++){
        var temp = message.content.toLowerCase()
        if(temp.includes(bannedWords[i])){
                userStats.swear_count += 1;
                userStats.money_owe += 0.10;
                userStats.money_owe = Math.round(userStats.money_owe* 100)/100;
                message.reply(' now owes $' + userStats.money_owe.toFixed(2));
                break;
        }
    }
});

bot.login('ODQ2MTU3MzAzOTg0MjkxODQy.YKrbZg.DJo_1HuVfVxG5WTxqCzI8ML73xY');