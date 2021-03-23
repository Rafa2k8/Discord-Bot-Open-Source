const { GuildMemberManager } = require("discord.js");

module.exports ={
    name : 'ban',
    description: 'Bans a member!',
    run : async(client,message,args) =>{
        if(!message.member.permissions.has('BAN_MEMBER')) return message.channel.send('You dont have permission to use this command D:');
        const Member = message.mentions.members.first()
        if(!Member) return message.channel.send('Please specify a member to Ban!');
        await Member.ban({reason : args.slice(1).join(" ")})
        message.channel.send(`${Member.user.tag} was Banned from the server!`)
        
    }

}