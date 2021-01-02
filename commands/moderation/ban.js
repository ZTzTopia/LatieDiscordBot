module.exports = {
    name: "ban",
    aliases: ['b'],
    description: "Ban a user.",
    cooldown: [10],
    guildOnly: true,
    usage: ['<mention> <days> <reason>'],
    example: ['@Zentai Spam']
};

const { RichEmbed } = require("discord.js");
const errors = require("../../module/errors.js");
const help = require("../../module/help.js");
const config = require("../../config.json");
module.exports.run = async (client, message, args, suffix) => {
    if (!message.member.permissions.has(["BAN_MEMBERS", "ADMINISTRATOR"]))
        return errors.noPerms(message, "BAN_MEMBERS");

    let hasPermissonRole = message.guild.members.get(client.user.id).permissions.has(["BAN_MEMBERS", "ADMINISTRATOR"]);
    if (!hasPermissonRole) return errors.clientPerms(message, "BAN_MEMBERS");

    if (!suffix) return help.help(message, 'ban');

    var banned = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!banned) return errors.noUser(message, "ban members");

    if (banned.permissions.has(["BAN_MEMBERS", "ADMINISTRATOR"]))
        return errors.admin(message, "ban");

    if (!banned.bannable)
        return errors.highestMember(message, "ban members", "role");

    var user = client.users.get(banned.id);
    var guild = message.guild;
    var restime = args.slice(1).join(" ");
    var reason = args.slice(2).join(" ");
    if (isNaN(restime)) {
        var time = restime;
    } else {
        var reason = restime;
    }

    guild.ban(banned, { days: time, reason: reason }).catch(err => console.log(err));

    var ban = new RichEmbed()
        .setColor(message.guild.me.displayColor)
        .setDescription(config.agree + " **" + message.author.tag + "** has been successfullly banned from **" + guild.name + "**")
        .setFooter(client.author.tag)
        .setTimestamp();

    if (message.author.avatarURL != NULL) {
        ban.setFooter(client.author.tag, client.author.avatarURL)
    }

    message.channel.send({ embed: ban });

    var ban2 = new RichEmbed()
        .setColor(13632027)
        .setAuthor(user.tag, user.avatarURL)
        .addField("Member Banned", `**:hammer: ${user.tag} (${user.id}) was banned from the server.**`)
        .addField("Responsible Moderator", message.author.username)
        .addField("Reason", reason || "None")
        .setFooter(`${guild.name} | ${guild.members.size} members`)
        .setTimestamp();

    if (message.guild.iconURL != null) {
        ban2.setFooter(`${guild.name} | ${guild.members.size} members`, `${guild.iconURL}`);
    }

    try {
        var log = message.guild.channels.find("name", "mod-logs") || message.guild.channels.find("name", "modlogs");
        log.send({ embed: ban2 });
    } catch (e) {
        message.channel.send({ embed: ban2 });
    }
};