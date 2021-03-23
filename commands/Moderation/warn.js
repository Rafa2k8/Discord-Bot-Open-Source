const Discord = require('discord.js');

module.exports =  {
    name : 'warn',
    description : 'warns a member',
    
    run : async(client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You dont have permission to use that command!');

    let user = message.mentions.users.first();
    if(!user) return message.reply('Please metion a user to warn!');

    let member;

    try {
        member = await message.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(!member) return message.reply('They arent in the server!');

    let reason = args.splice(1).join(' ');
    if(!reason) return message.reply('You need to give a reason!');

    let channel = message.guild.channels.cache.find(c => c.name === 'potato');

    let log = new Discord.MessageEmbed()
    .setTitle('User Warned')
    .addField('User:', user, true)
    .addField('By:', message.author, true)
    .addField('Reason:', reason)
    message.channel.send(log).then(m => m.delete({ timeout: 5000 }))
    

   let embed = new Discord.MessageEmbed()
    .setTitle(`You were warned in ${message.guild.name}! `)
    .setDescription(reason);

    try {
        user.send(embed);
    } catch(err) {
        console.warn(err);
    }

    message.channel.send(`**${user}** has been warned by **${message.author}**!`).then(m => m.delete({ timeout: 5000 })) 
}}