const { Message } = require ('discord.js')  
module.exports = {
    name : "nuke",
    description : "Nukes a channel",
    
    run: async(client,message, args) => {
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('You dont have permission to use that command!')
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.reply('I need manage channels permission.')

        await message.channel.clone().then((ch) => {
            ch.setParent(message.channel.parent.id);
            ch.setPosition(message.channel.position);
            message.channel.delete();

            ch.send('https://giphy.com/gifs/HhTXt43pk1I1W')
            ch.send('This channel has been nuked :D')
            
        })

    }

}