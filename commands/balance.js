module.exports = {
    name: 'balance',
    aliases: ['bal', 'bl'],
    description: 'Checks the user balance',
    execute(bot, message, args, Discord, profileData){
        var money_owe = profileData.moneyOwe/10;
        message.reply('You still owe $' + money_owe.toFixed(2));
    }
}
