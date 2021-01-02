module.exports = {
    name: "addrole",
    aliases: ['setrole'],
    description: "Addrole to a user",
    cooldown: [],
    guildOnly: true,
    usage: ['<mention> <role>'],
    example: ['@ZTz#3994 Owner']
};

const { RichEmbed } = require("discord.js");
const errors = require("../../module/errors.js");
const help = require("../../module/help.js");
const config = require("../../config.json");
module.exports.run = async (client, message, args, suffix) => {
    if (!message.member.permissions.has(["MANAGE_ROLES", "ADMINISTRATOR"])) return errors.noPerms(message, "MANAGE_ROLES");

    let hasPermissonRole = message.guild.members.get(bot.user.id).permissions.has(["MANAGE_ROLES", "ADMINISTRATOR"]);
    if (!hasPermissonRole) return errors.botPerms(message, "MANAGE_ROLES");

    if (!suffix) return help.help(message, 'addrole');

    var rMember = message.mentions.members.first();
    if (!rMember) return errors.noUser(message, "set role");

    let role = args.slice(1).join(" ");
    if (!role) return errors.noRole(message, "set role");

    let gRole = message.guild.roles.find(`name`, role);
    if (!gRole) return errors.noRole(message, "set role");

    if (message.guild.members.get(bot.user.id).highestRole.comparePositionTo(gRole) < 1) return errors.highestBot(message, "set role", gRole.name);

    if (message.member.highestRole.comparePositionTo(gRole) < 1) return errors.highestMember(message, "set role", gRole.name);

    if (rMember.roles.has(gRole.id)) return errors.hasBeen(message);

    var user = bot.users.get(rMember.id);
    var guild = message.guild;

    rMember.addRole(gRole.id);

    var adrole = new RichEmbed()
        .setColor(message.guild.me.displayColor)
        .setDescription(config.agree + " **" + message.author.tag + "** Successfully added role **" + gRole.name + "** to user **" + user.tag + "**")
        .setFooter(client.author.tag)
        .setTimestamp();

    if (message.author.avatarURL != NULL) {
        adrole.setFooter(client.author.tag, client.author.avatarURL)
    }

    message.channel.send({ embed: adrole });

    var adrole2 = new RichEmbed()
        .setColor(0xffb200)
        .setAuthor(user.tag, user.avatarURL)
        .addField("Member added role", `**${user.tag} (${user.id}) was added role to ` + gRole.name + `**`)
        .addField("Responsible Moderator", message.author.username)
        .setFooter(`${guild.name} | ${guild.members.size} members`)
        .setTimestamp();

    if (message.guild.iconURL != null) {
        adrole2.setFooter(`${guild.name} | ${guild.members.size} members`, `${guild.iconURL}`);
    }

    try {
        var log = message.guild.channels.find("name", "mod-logs") || message.guild.channels.find("name", "modlogs");
        log.send({ embed: adrole2 });
    } catch (e) {
        message.channel.send({ embed: adrole2 });
    }
};
