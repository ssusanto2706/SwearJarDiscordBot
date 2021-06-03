module.exports = {
    name: 'goodmorning',
    aliases: ['gm', 'morning', 'morn'],
    description: 'says morning!',
    execute(bot, message, args, Discord){
        message.reply('Good Morning! :)');
    }
}