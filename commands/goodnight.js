module.exports = {
    name: 'goodnight',
    aliases: ['gn', 'night'],
    description: 'says night!',
    execute(bot, message, args, Discord){
        message.reply('Good Night! Zzz :)');
    }
}