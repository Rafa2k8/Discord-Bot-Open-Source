const { Client, Message, MessageEmbed} = require('discord.js');

module.exports = {
    name: 'reportbug',
    description: 'Reports a bug to the bot owner',
    
    run: async(client,message,args) => {
        const owner = client.users.cache.get ('Your ID here');
        
        const query = args.join(" ");
        if(!query) return message.reply('Please specify a query!');

        const reportEmbed = new MessageEmbed()
        .setTitle('New bug :/')
        .addField('Author', message.author.toString(), true)
        .addField('Guild', message.guild.name,true)
        .addField('Report', query)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp();

        owner.send(reportEmbed);
        message.reply('Bug sucessfully reported!')
    }
}