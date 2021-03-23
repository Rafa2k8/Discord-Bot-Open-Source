const Discord = require("discord.js")
module.exports = {
    name: "slowmode",
    category: "utility",
    description: "Set the slowmode for the channel!",
    run: async (bot, message, args) => {
        if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.channel.send('You don´t have permission to use this command D:')
      if (!args[0])
        return message.channel.send(
          `You did not specify the time in seconds you wish to set this channel's slow mode too!`
        );
      if (isNaN(args[0])) return message.channel.send(`That is not a number!`);
      
        bot.prefix + 9 + args[0]+ 1,
        message.channel.setRateLimitPerUser(args[0]);
        message.channel.send(
          `Set the slowmode of this channel to **${args[0]}**`
      );
    },
  };