const {Client,Message, MessageEmbed} = require ('discord.js');
module.exports = {
    
    name: 'roles',
    description: 'Displays a member role(s)',

    
    run: async(Client,message,args) =>{
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!member) return message.reply('Please specify a member!').then(m => m.delete({ timeout: 5000}))

        const memberRoles = member.roles.cache 
        .filter((roles) => roles.id !== message.guild.id)
        .map((role) => role.toString());

        
        message.channel.send(
            new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic: true}))
            .setDescription(`${member}'s roles => ${memberRoles}`)
            .setColor('RANDOM')
        )
        message.delete(); message.content.slice(10);
    }
}