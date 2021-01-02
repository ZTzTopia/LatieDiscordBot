module.exports = {
    name: "bunny",
    aliases: [],
    description: "Gives a random cute bunny images.",
    cooldown: [],
    guildOnly: false,
    usage: [],
    example: []
};

var unirest = require('unirest');
const { RichEmbed } = require("discord.js");
module.exports.run = async (bot, message, args) => {
    unirest.get('https://api.bunnies.io/v2/loop/random/?media=webm,mp4')
        .end(result => {
            var bunny21 = new RichEmbed()
            .setTitle(`Bunny's #` + result.body.id)
            .setURL(`https://api.bunnies.io/v2/loop/` + result.body.id + `/?media=webm,mp4`)
            .setImage(result.body.media.poster)
            .setFooter(`Powered by api.bunnies.io`)
            .setTimestamp();
        message.channel.send({ embed: bunny21 });
    });
}
