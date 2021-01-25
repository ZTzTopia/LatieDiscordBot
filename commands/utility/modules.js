module.exports = {
    name: 'modules',
    description: 'List all of my commands or info about a specific command.',
    cooldown: [],
    guildOnly: false,
    aliases: ["mdl"],
    usage: ['<modules name>'],
    example: ['fun', 'info']
};

const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const { prefix, modules } = require('../../config.json');
module.exports.run = async (client, message, args, suffix) => {
    var error = 0;

    if (!suffix) {
        let folders = "";
        for (var cmd in modules) {
            if (!folders.includes(modules[cmd])) {
                folders += `${modules[cmd]}\n`
            }
        }
        message.channel.send({ embed: { description: `**${folders}**` } })
    }

    if (suffix) {
        fs.readdir(`./commands/${suffix}`, (err, files) => {
            if (!files) return message.channel.send("Couldn't find that modules.");
        });

        for (i = 0; i < modules.length; i++) {
            if (suffix.toLowerCase() == modules[i].toLowerCase()) {
                fs.readdir(`./commands/${suffix}`, (err, files) => {
                    if (err) console.log(err);
                    let jsfile = files.filter(f => f.split(".").pop() === "js");
                    if (jsfile.length <= 0) {
                        message.channel.send("Couldn't find that modules.");
                    }

                    const embed = new MessageEmbed();
                    commandFound = 0
                    for (var cmd in jsfile) {
                        command = require(`../${suffix}/${jsfile[cmd]}`);
                        commandFound++
                        embed.addField(`${prefix}${command.name}`, `${command.description}`);
                    }
                    
                    embed.setDescription(commandFound + ' command found!')
                    message.channel.send({ embed: embed });
                });
            }
        }
    }
}
