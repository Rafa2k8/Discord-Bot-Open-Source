const Discord = require("discord.js")
  module.exports ={
        name:'say',
        description:"this makes the bot say something",

        run : async(client, message, args) => {
        const content = args.join(' ');
        message.channel.send(content);
        if(!content) return message.channel.send('Tell something that i can say!');
        message.delete();



    }
}