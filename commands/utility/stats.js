module.exports = {
    name: "stats",
    description: "Provides the bot\'s status.",
    cooldown: [],
    guildOnly: false,
    usage: ["stats"],
    example: []
};

const Discord = require('discord.js');
const os = require('os');
const osu = require('os-utils');
module.exports.run = async (client, message) => {
    var vals = {},
        date = new Date(client.uptime);

    vals.memory = Math.round((os.totalmem() - os.freemem()) / 1000000);
    vals.totalmem = Math.round(os.totalmem() / 1000000);
    vals.strDate = date.getUTCDate() - 1 + 'd ' + date.getUTCHours() + 'h ' + date.getUTCMinutes() + 'm ' + date.getUTCSeconds() + 's';
    vals.own = client.users.get(require('../../config.json').ownerID[0]);
    vals.owner = `${o.tag}`;

    vals.guilds = client.guilds.size;
    vals.channels = client.channels.size;
    vals.users = client.users.size;
    sendStats(vals);

    function sendStats(vals2) {
        var stats1 = new Discord.RichEmbed()
            .setAuthor(client.user.username + ' Stats', client.user.avatarURL)
            .addField(':man_with_gua_pi_mao: Owner', vals2.owner, true)
            .addField(':book: Library', 'discord.js (v' + require('discord.js').version + ')', true)
            .addField(':speaking_head: Servers', vals2.guilds, true)
            .addField(':keyboard: Channels', vals2.channels, true)
            .addField(':man: Users Served', vals2.users, true)
            .addField(':clock1: Uptime', vals2.strDate, true)
            .addField(':cd: Memory Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB/50 GB`)
            .addField(':floppy_disk: RAM Usage', `${vals2.memory} MB/${vals2.totalmem} MB`, true)
            .addField(":desktop: CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField(':watch: CPU Usage', `${(process.memoryUsage().heapUsed / 100 / 100 / 100).toFixed(1)} %`, true)
            .addField(':computer: Arch', `${os.arch}`, true)
            .addField(':keyboard: Platform', `${process.platform}`, true)
            .addField(':map: Host', `${os.hostname()} (${os.type()})`, true)
            .setTimestamp()
            .setFooter(`PID ${process.pid} | Cluster | Shard `);

        message.channel.send({ embed: stats1 });
    }
}
