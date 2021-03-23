const Discord = require("discord.js")
module.exports ={
    name: 'clear',
    description: "this is a clear command!"
    ,aliases : ['clear'],
    run : async(client, message, args ) => {
        if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('You don´t have permission to use this command D:')
    
        if(!args[0]) return message.channel.send('Please specify an amount to clear (1-99)') 
        if(isNaN(args[0])) return message.channel.send('Only Numbers are allowed')
        if(parseInt(args[0])> 99) return message.channel.send('The max ammount of messages you can delete is 99')
        
        await message.channel.bulkDelete(parseInt(args[0])+ 1 )
             .catch(err => console.log(err))
             message.channel.send(`Deleted ${args[0]} messages!`).then(m => m.delete({ timeout: 3000 })) 
             
            
            
             
    
    }
}


