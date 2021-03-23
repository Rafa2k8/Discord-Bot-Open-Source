const {Collection, Client, MessageEmbed, Message} = require('discord.js')
const blacklistedWords = ["nigga", "nigger", "and another here aswell"]
const fs = require('fs')
const client = new Client({
    disableEveryone: true
})
const config = require('./config.json')

const prefix = config.prefix

const token = config.token

client.commands = new Collection();

client.aliases = new Collection();

module.exports = client;



client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {

    require(`./handlers/${handler}`)(client);

}); 
client.on('ready', () => {
    console.log(`${client.user.username} ✅`)
})
client.on('message', async message => {
    if(message.author.bot) return;
    
    let confirm = false;

	var i;
	for (i = 0; i < blacklistedWords.length; i++) {
		if (message.content.toLowerCase().includes(blacklistedWords[i].toLowerCase()))
			confirm = true;

		if (confirm) {
			if (message.author.bot) return;
			if (message.author.id === client.user.id) return;

			message.delete();
			
			return message.channel.send(new MessageEmbed()
			.setAuthor(message.member.displayName, message.author.displayAvatarURL())
			.setDescription("You are not allowed to say that word, please refrain from doing that!")
			.setFooter(client.user.username)
			.setTimestamp()).then(m => m.delete({ timeout: 7000 }))
		}
	}
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
})
client.on('guildMemberAdd', async (member) => {
    const Channel =member.guild.channels.cache.get('Channel ID here')

        const embed = new Message.embed()
        .setColor('GREEN')
        .setTitle('New Member')
        .setDescription(`Welcome **${member.displayName}**, we now have ${member.guild.memberCount} members!`)
   
})
client.on('guildMemberRemove', async (member) => {
    const Channel =member.guild.channels.cache.get('Channel ID here')
    const embed = new Message.embed()
    .setColor('RED')
    .setTitle('A member left the server : (')
    .setDescription(`**${member.displayName}** has left ${member.guild.memberCount}, we now have  members!`)

})

const usersMap = new Map();
const LIMIT = 7;
const TIME = 7000;
const DIFF = 3000;

client.on('message', async(message) => {
    if(message.author.bot) return;
    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        console.log(difference);

        if(difference > DIFF) {
            clearTimeout(timer);
            console.log('Cleared Timeout');
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
                console.log('Removed from map.')
            }, TIME);
            usersMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
                let muterole = message.guild.roles.cache.find(role => role.name === 'muted');
                if(!muterole) {
                    try{
                        muterole = await message.guild.roles.create({
                            name : "muted",
                            permissions: []
                        })
                        message.guild.channels.cache.forEach(async (channel, id) => {
                            await channel.createOverwrite(muterole, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS : false
                            })
                        })
                    }catch (e) {
                        console.log(e)
                    }
                }
                
                message.member.roles.add(muterole)
                message.channel.send(`${message.author} You have been muted!`)
    
                setTimeout(() => {
                    message.member.roles.remove(muterole);
                    message.channel.send(`${message.author} You have been unmuted! Stop spamming!`);
                }, 60000);
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
            console.log('Removed from map.')
        }, TIME);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage : message,
            timer : fn
        });
    }
}),



client.login("Your bot token here");

