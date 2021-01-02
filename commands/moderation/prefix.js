module.exports = {
  name: "prefix",
  aliases: [],
  description: "Change guild/server prefix.",
  cooldown: [20],
  guildOnly: true,
  usage: ["<prefix>"],
  example: ["!"]
};

const help = require("../../module/help.js");
const { agree } = require("../../config.json");

module.exports.run = async (bot, message, args, suffix, db) => {
  if (!message.member.permissions.has(["MANAGE_MESSAGES", "ADMINISTRATOR"]));
  if (!suffix) return help.help(message, 'prefix');

  if (suffix.length > 3)
    return message.channel.send('Your prefix is too long!');

  db.query(`SELECT * FROM guildconfig WHERE gid = '${message.guild.id}'`, (err, result) => {
    if(err) throw err;

    let sql;
    if(result.length < 1) {
        sql = `INSERT INTO guildconfig (gid, prefix) VALUES ('${message.guild.id}', '${suffix}')`;
    } else {
        let xp = result[0].xp;
        sql = `UPDATE guildconfig SET prefix = '${suffix}' WHERE gid = '${message.guild.id}'`;
    }
    db.query(sql);
  });

  message.channel.send(agree + ' Changed server prefix to `' + suffix + '`');
};
