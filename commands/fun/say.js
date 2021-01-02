module.exports = {
    name: "say",
    aliases: [],
    description: "Makes the bot repeat your message..",
    cooldown: [],
    guildOnly: false,
    usage: ['<message>'],
    example: ['Hello, World!']
};

const { RichEmbed } = require('discord.js');
module.exports.run = async (bot, message, args, suffix) => {
    message.delete();
	message.channel.send(suffix);
}
