module.exports = {
    name: "advice",
    aliases: [],
    description: "Gives a random life advice.",
    cooldown: [],
    guildOnly: false,
    usage: [],
    example: []
};

var unirest = require('unirest');
const { RichEmbed } = require("discord.js");
module.exports.run = async (bot, message, args) => {
	unirest.get('https://api.adviceslip.com/advice')
    .end(result => {
        var advice = JSON.parse(result.body);
        var e = new RichEmbed()
            .setTitle('Advice slip #' + advice.slip.id)
            .setDescription(advice.slip.advice)
            .setFooter('Powered by adviceslip.com')
            .setTimestamp();
        message.channel.send({ embed: e });
    });
}
