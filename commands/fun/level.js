module.exports = {
    name: "level",
    aliases: [],
    description: "Get your level information in a server.",
    cooldown: [],
    guildOnly: true,
    usage: [],
    example: []
};

const { MessageEmbed } = require("discord.js");
module.exports.run = async (bot, message, args, suffix, db) => {
    var playerCalled = message.mentions.members.first() || message.guild.members.cache.get(args[0] || message.author.id);
    db.query(`SELECT * FROM xp WHERE gid = '${message.guild.id}' AND uid = '${playerCalled.id}'`, (err, result) => {
        if(err) {
          console.log(err);
        } else {
          if(result < 1) {
            message.channel.send("That user not have xp.")
          } else {
            let sql;
            let xp = result[0].xp;
            let level = result[0].level;
            let mathXp = result[0].mathXp;   
            let xpEmbed = new MessageEmbed()
              .addField('Level', `${level}`)
              .addField('Xp', `${xp}/${mathXp}`)
              .setFooter(playerCalled.user.tag, playerCalled.user.avatarURL)
              .setTimestamp();
            message.channel.send({ embed: xpEmbed });
          }
        }
    });
};
