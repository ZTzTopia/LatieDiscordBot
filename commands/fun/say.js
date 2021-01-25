module.exports = {
    name: "say",
    aliases: [],
    description: "Makes the bot repeat your message..",
    cooldown: [],
    guildOnly: false,
    usage: ['<message>'],
    example: ['Hello, World!']
};

module.exports.run = async (bot, message, args, suffix) => {
    if(!args[0]) return;

    message.delete();
	message.channel.send(suffix);
}
