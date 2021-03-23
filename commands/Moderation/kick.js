const { GuildMemberManager } = require("discord.js");

module.exports ={
    name : 'kick',
    description : 'Kicks a member',
    run : async(client,message,args) =>{
        if(!message.member.permissions.has('KICK_MEMBER')) return message.channel.send('You dont have permission to use this command D:');
        const Member = message.mentions.members.first()
        if(!Member) return message.channel.send('Please specify a member to kick!');
        await Member.kick({reason : args.slice(1).join(" ")})
        message.channel.send(`${Member.user.tag} was kicked from the server!`)
        
    }

}