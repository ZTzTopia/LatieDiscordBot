const { Collection } = require('discord.js');
const config = require('../../config.json');
const fetch = require('node-fetch');
const db = require("../../configdb.js");
const cooldowns = new Collection();
module.exports = async (client, message) => {
    if (message.channel.type == "dm") {
        console.log('> ' + message.author.username + ' Chat: ' + message);
    } else {
        console.log('> ' + message.author.username + ' From ' + message.guild + ' Chat: ' + message);
    }
    
    if (message.author.bot) return;
    if (message.channel.type != "dm") {
        if (message.guild.members.get(client.user.id).hasPermission("SEND_MESSAGES")) return msgStart();
        if (message.guild.members.get(client.user.id).hasPermission("ADMINISTRATOR")) return msgStart();
    } else {
        msgStartDM()
    }

    function msgStart() {
        //Xp System
        if((Math.floor(Math.random() * (12 - 1 + 1)) + 1) >= 8) {
            function generateXp() {
                let min = 2;
                let max = 10;

                return Math.floor(Math.random() * (max - min + 1)) + min;   
            }

            db.query(`SELECT * FROM xp WHERE gid = '${message.guild.id}' AND uid = '${message.author.id}'`, (err, result) => {
                if(err) throw err;

                let sql;  
                if(result.length < 1) {
                    sql = `INSERT INTO xp (gid, uid, xp, level, mathXp) VALUES ('${message.guild.id}', '${message.author.id}', ${generateXp()}, 1, 200)`;
                } else {
                    let xp = result[0].xp + generateXp();
                    let level = result[0].level;
                    let mathXp = result[0].mathXp;
                    if (xp > mathXp) {
                        let newLevel = level + 1;
                        sql = `UPDATE xp SET xp = ${xp}, level = ${newLevel}, mathXp = ${mathXp + 100 * level} WHERE gid = '${message.guild.id}' AND uid = '${message.author.id}'`;
                        message.reply('You\'re now level `' + newLevel + '`!');
                    } else {
                        sql = `UPDATE xp SET xp = ${xp} WHERE gid = '${message.guild.id}' AND uid = '${message.author.id}'`;
                    }
                }
                db.query(sql);
            });
        }
        // End

        // Custom Prefix
        db.query(`SELECT * FROM guildconfig WHERE gid = '${message.guild.id}'`, (err, result) => {
            if(err) throw err;

            let prefix = config.prefix;
            if (result.length > 0 && result[0].prefix.length > 0) prefix = result[0].prefix;

            if (message.content.startsWith("myprefix"))
                message.channel.send('My prefix for this guild is `' + prefix + '`');

            if (!message.content.startsWith(prefix)) return;
            const suffix = message.content.substr(message.content.split(' ')[0].length + 1)
            const args = message.content.slice(prefix.length).split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            if (!command) return;

            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown.length === 0 ? '3' : command.cooldown) * 1000;

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
                }
            }
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

            command.run(client, message, args, suffix, db);
        });
        // End
    }

    function msgStartDM() {
        let prefix = config.prefix;

        if (!message.content.startsWith(prefix)) return;
        const suffix = message.content.substr(message.content.split(' ')[0].length + 1)
        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;
        if (command.guildOnly) return;

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown.length === 0 ? '3' : command.cooldown) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        command.run(client, message, args, suffix);
    }
}
