const Discord = require ("discord.js")
module.exports ={
    name : 'send',
    description : 'Sends a dm to an user',
    run: async(bot, message, args) => {
    const mention = message.mentions.users.first();
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You dont have permission to use this command D:');
    if(!mention) return message.channel.send('Please specidy a user to send a message');
    message.delete();
    mentionMessage = message.content.slice(8);
    mention.send(args.join(' '))
    message.channel.send(content);
    }
}