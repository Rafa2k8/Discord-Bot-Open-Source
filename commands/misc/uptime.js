const Discord = require ('discord.js');

const { MessageEmbed } = require('discord.js');

module.exports= {

    name : "uptime",
    description : "Shows for how long the bot is online!",


    run: async(client, message, args) => {

        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime/  3600000) % 24;
        let minutes = Math.floor(client.uptime/ 60000) % 60;
         
        



        let upembed = new Discord.MessageEmbed()
        .setColor ("GREEN")
        .setTitle (`Im online for ${days} days, ${hours} hours and ${minutes} minutes`)
        
        message.channel.send(upembed)
        

    }
}