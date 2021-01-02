module.exports = {
    name: "uptime",
    description: "Tells you how long the I\'ve been running consistenly!",
    cooldown: [],
    guildOnly: false,
    usage: ["uptime"],
    example: []
};

var { RichEmbed } = require('discord.js');
module.exports.run = async (client, message) => {
    date = new Date(client.uptime);
    var timestamp = date.getUTCDate() - 1 + 'd ' + date.getUTCHours() + 'h ' + date.getUTCMinutes() + 'm ' + date.getUTCSeconds() + 's';
    var timestampUptime = new Date() - date;;

    var embed = new RichEmbed()
        .setTitle("Uptime")
        .setDescription(timestamp)
        .setTimestamp(timestampUptime)
        .setFooter(`PID ${process.pid} | Cluster | Shard `);
    message.channel.send({ embed: embed });
}
