module.exports = {
    name: "reload",
    aliases: ["r"],
    description: "Reload a command.",
    cooldown: [],
    guildOnly: false,
    usage: ["<commands>", "all"],
    example: ["8ball", "all"]
};

const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { ownerID, modules } = require('../../config.json');
const errors = require('../../module/errors.js');
module.exports.run = async (client, message, args) => {
    if (!ownerID.includes(message.author.id)) return errors.ownerBot(message);
    if (!args[0] || args[0] === "all") {
        const load = dirs => {
            const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'))
            for (let file of commands) {
                const command = require(`../${dirs}/${file}`);
                delete require.cache[require.resolve(`../${dirs}/${file}`)];
                client.commands.delete(command);
                client.commands.set(command.name, command);
            }
        }
        modules.forEach(x => load(x));
        message.reply(`Reloaded all Commands!`);
    }
    else {
        const load = dirs => {
            const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'))
            for (let file of commands) {
                if(file === args[0] + ".js") 
                {
                    const command = require(`../${dirs}/${args[0]}`);
                    delete require.cache[require.resolve(`../${dirs}/${args[0]}`)];
                    client.commands.delete(command);
                    client.commands.set(command.name, command);
                }
            }
        }
        modules.forEach(x => load(x));
        message.reply(`Reloaded \`${args[0]}\` Commands!`);
    }
}
