const { Collection } = require('discord.js');

module.exports = class {
    constructor(client) {
		this.client = client;
	}
    
    async run(message) {
        const client = this.client;
        const data = {};
        
        if (!message.guild) {
            console.log('> ' + message.author.username + ' Chat: ' + message.content);
        } else { 
            console.log('> ' + message.author.username + ' From ' + message.guild.name + ' Chat: ' + message.content);
        }

        if (message.guild) {
            // If the message author is a bot.
            if (message.author.bot) {
                return;
            }

            // If the member on a guild is invisible or not cached, fetch them.
            if (!message.member){
                await message.guild.members.fetch(message.author.id);
            }

            // If the bot not have send message permission. 
            if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGE')) {
                return;
            }

            data.guildData = await client.findOneOrCreateGuild({ id: message.guild.id });

            if (message.content.startsWith("myprefix") || 
                message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
                message.channel.send('My prefix for this guild is `' + data.guildData.gPrefix + '`');
            }

            if (!message.content.startsWith(data.guildData.gPrefix)) {
                return;
            }

            const args = message.content.slice(data.guildData.gPrefix.length).split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
            
            // The command does not exist.
            if (!command) {
                return;
            }

            if (command.config.ownerOnly && !client.config.owner.includes(message.author.id)) {
                return;
            }
        
            // var timeLeft = getCommandCooldown(message, command);
            // if (timeLeft > 0) {
            //     return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`); 
            // }

            // giveMessageAuthorXp(message);
        
            try {
                command.run(message, args);
            } catch (e) {
                client.log.e('message', e);
                message.channel.send(`error: \n` + '```' + `${e}` + '```');
            }
        }
    }
}

function getCommandCooldown(message, command) {
    // if (!client.cooldowns.has(command.name)) {
    //     client.cooldowns.set(command.name, new Collection());
    // }

    // const now = Date.now();
    // const timestamps = client.cooldowns.get(command.name);
    // const cooldownAmount = (command.cooldown.length === 0 ? '3' : command.cooldown) * 1000;

    // if (timestamps.has(message.author.id)) {
    //     const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    //     if (now < expirationTime) {
    //         const timeLeft = (expirationTime - now) / 1000;
    //         return timeLeft;
    //     }
    // }

    // timestamps.set(message.author.id, now);
    // setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    return 0;
}

function giveMessageAuthorXp(message) {
    // if((Math.floor(Math.random() * (12 - 1 + 1)) + 1) >= 8) 
    // {
    //     function generateXp() 
    //     {
    //         let min = 2;
    //         let max = 10;

    //         return Math.floor(Math.random() * (max - min + 1)) + min;   
    //     }

    //     db.query(`SELECT * FROM xp WHERE gid = '${message.guild.id}' AND uid = '${message.author.id}'`, (err, result) => {
    //         if(err) throw err;

    //         let sql;  
    //         if(result.length < 1)
    //             sql = `INSERT INTO xp (gid, uid, xp, level, mathXp) VALUES ('${message.guild.id}', '${message.author.id}', ${generateXp()}, 1, 200)`;
    //         else 
    //         {
    //             let xp = result[0].xp + generateXp();
    //             let level = result[0].level;
    //             let mathXp = result[0].mathXp;
    //             if(xp > mathXp) 
    //             {
    //                 let newLevel = level + 1;
    //                 sql = `UPDATE xp SET xp = ${xp}, level = ${newLevel}, mathXp = ${mathXp + 100 * level} WHERE gid = '${message.guild.id}' AND uid = '${message.author.id}'`;
    //                 message.reply('You\'re now level `' + newLevel + '`!');
    //             }
    //             else sql = `UPDATE xp SET xp = ${xp} WHERE gid = '${message.guild.id}' AND uid = '${message.author.id}'`;
    //         }

    //         db.query(sql);
    //     });
    // }
}