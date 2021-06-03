module.exports = {
    name: 'hello',
    aliases: ['hi'],
    description: 'says hello!',
    execute(bot, message, args, Discord){
        message.reply('hi');
    }
}
