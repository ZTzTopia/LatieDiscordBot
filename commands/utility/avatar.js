module.exports = {
    name: "avatar",
    aliases: [],
    description: "Gives you a member's avatar in a formats.",
    cooldown: [],
    guildOnly: false,
    usage: ['<user>'],
    example: ['Zentai#3301']
};

const { MessageEmbed } = require("discord.js");
module.exports.run = async (bot, message, args) => {
	var playerCalled = message.mentions.members.first() || message.guild.members.cache.get(args[0] || message.author.id);
    var ava = new MessageEmbed()
        .setAuthor(`${playerCalled.user.tag}`, playerCalled.user.avatarURL)
        .setTimestamp()

    if (playerCalled.user.avatarURL != null) {
        let jpg = playerCalled.user.avatarURL().replace('.png', '.jpg');
        ava.setImage(playerCalled.user.avatarURL())
            .addField(`${playerCalled.user.username} Avatar Link`, `[PNG](${playerCalled.user.avatarURL()}) | [JPG](${jpg})`, true);
    } else {
        ava.addField(`${playerCalled.user.username} Avatar Link`, `${playerCalled.user.username} Not have a avatar.`, true);
    }

    message.channel.send({ embed: ava });
}
