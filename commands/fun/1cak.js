module.exports = {
    name: "1cak",
    aliases: [],
    description: "Fetches random or specific 1cak memes.",
    cooldown: [],
    guildOnly: false,
    usage: ['[random|page|vote|trend|hot|legend]'],
    example: ['random', '1009826', 'vote', 'trend', 'hot', 'legend']
};

const { RichEmbed } = require('discord.js');
const unirest = require('unirest');
const config = require('../../config.json');
module.exports.run = async (bot, message, args) => {
	unirest.get('http://api-1cak.herokuapp.com/random')
    .end(result => {
        var onecak = result.body;
        console.log(result)
        var e = new RichEmbed()
            .setTitle(onecak.title + ' #' + onecak.id)
            .setImage(onecak.img)
            .setDescription(onecak.votes)
            .setFooter(`Powered by api-1cak.herokuapp.com`)
            .setTimestamp();
        message.channel.send({ embed: e });
    });
}
