module.exports = {
    name: "stats",
    description: "Provides the bot\'s status.",
    cooldown: [],
    guildOnly: false,
    usage: ["stats"],
    example: []
};

const { MessageEmbed } = require('discord.js');
const os = require('os');
module.exports.run = async (client, message) => {
    var vals = {},
        date = new Date(client.uptime);

    vals.memory = Math.round((os.totalmem() - os.freemem()) / 1000000);
    vals.totalmem = Math.round(os.totalmem() / 1000000);
    vals.strDate = date.getUTCDate() - 1 + 'd ' + date.getUTCHours() + 'h ' + date.getUTCMinutes() + 'm ' + date.getUTCSeconds() + 's';
    vals.own = client.users.cache.get(require('../../config.json').ownerID[0]);
    vals.owner = `${vals.own.tag}`;

    const promises = [
        client.shard.fetchClientValues('guilds.cache.size'),
        client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')
    ];
    
    return Promise.all(promises)
        .then(results => {
            vals.guilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            vals.users = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
    
        vals.channels = client.channels.cache.size;

        var stats1 = new MessageEmbed()
            .setAuthor(client.user.username + ' Stats', client.user.avatarURL())
            .addField(':man_with_gua_pi_mao: Owner', vals.owner, true)
            .addField(':book: Library', 'discord.js (v' + require('discord.js').version + ')', true)
            .addField(':speaking_head: Servers', vals.guilds, true)
            .addField(':keyboard: Channels', vals.channels, true)
            .addField(':man: Users Served', vals.users, true)
            .addField(':clock1: Uptime', vals.strDate, true)
            .addField(':cd: Memory Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB/50 GB`)
            .addField(':floppy_disk: RAM Usage', `${vals.memory} MB/${vals.totalmem} MB`, true)
            .addField(":desktop: CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField(':watch: CPU Usage', `${(process.memoryUsage().heapUsed / 100 / 100 / 100).toFixed(1)} %`, true)
            .addField(':computer: Arch', `${os.arch}`, true)
            .addField(':keyboard: Platform', `${process.platform}`, true)
            .addField(':map: Host', `${os.hostname()} (${os.type()})`, true)
            .setTimestamp()
            .setFooter(`PID ${process.pid} | Cluster | Shard ${message.guild.shardID}`);

        message.channel.send({ embed: stats1 });
    });
}
