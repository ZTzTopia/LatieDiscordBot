const { Client, MessageEmbed } = require("discord.js");
const client = new Client();
const config = require("../config.json");
const db = require("../configdb.js");
module.exports.help = (message, name) => {
    db.query(`SELECT * FROM guildconfig WHERE gid = '${message.guild.id}'`, (err, result) => {
        if(err) throw err;

        let prefix = config.prefix;
        if (result.length > 0 && result[0].prefix.length > 0) prefix = result[0].prefix;

        const { commands } = message.client;
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        const aliases = [];
        if (command.aliases.length !== 0) {
            for (let i = 0; i < command.aliases.length; i++) {
                aliases.push(`${prefix}${command.aliases[i]}`);
            }
        }

        const usage = [];
        if (command.usage.length !== 0) {
            for (let i = 0; i < command.usage.length; i++) {
                usage.push(`${prefix}${command.name} ${command.usage[i]}`);
            }
        }

        const example = [];
        if (command.example.length !== 0) {
            for (let i = 0; i < command.example.length; i++) {
                example.push(`${prefix}${command.name} ${command.example[i]}`);
            }
        }

        var help = new MessageEmbed()
            .setAuthor(`${prefix}${command.aliases.length === 0 ? command.name : `${command.name} / `} ${aliases.join(' / ')}`)
            .addField("Description", command.description)
            .addField("Cooldown", command.cooldown.length === 0 ? '3' : command.cooldown)
            .addField("Usage", command.usage.length === 0 ? 'N/A' : usage.join('\n'))
            .addField("Example", command.example.length === 0 ? 'N/A' : example.join('\n'))
            .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
            .setTimestamp();
        message.channel.send({ embed: help });
    });
}
