module.exports = {
    name: 'help',
    aliases: ['commands'],
    description: 'List all of my commands or info about a specific command.',
    cooldown: [],
    guildOnly: false,
    usage: ['[command name]'],
    example: ['8ball', 'ping']
};

const { RichEmbed } = require('discord.js');
const config = require('../../config.json');
const help = require("../../module/help.js");
module.exports.run = async (client, message, args, suffix, db) => {
    const { commands } = message.client;

    if (!suffix) {
        db.query(`SELECT * FROM guildconfig WHERE gid = '${message.guild.id}'`, (err, result) => {
            if(err) throw err;

            let prefix = config.prefix;
            if (result.length > 0 && result[0].prefix.length > 0) prefix = result[0].prefix;
            const embed = new RichEmbed()
            embed.addField('Here your help request', 'If you want see my commands instead use ' + prefix + 'modules\nFor more help you can use ' + prefix + 'help [Command name]')
            message.channel.send({ embed: embed });
        });
    } else help.help(message, suffix);
}
