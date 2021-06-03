module.exports = {
    name: 'goodbye',
    aliases: ['bye', 'byebye'],
    description: 'says bye!',
    execute(bot, message, args, Discord){
        message.reply('byebye :c');
    }
}
