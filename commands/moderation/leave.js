module.exports = {
    name: "leave",
    aliases: [],
    description: "Change guild leave message.",
    cooldown: [],
    guildOnly: true,
    usage: ["<channel|id> <message>"],
    example: ["#leave ${user} Leave the server."]
};

const help = require("../../module/help.js");
const errors = require("../../module/errors.js");
module.exports.run = async (bot, message, args, suffix, db) => {
    if (!message.member.permissions.has(["MANAGE_MESSAGES", "ADMINISTRATOR"]));

    if(suffix == "test")
        return bot.emit("guildMemberRemove", message.member);

    let leave = {
        channelT: false,
        messageT: false,
        channel: null,
        message: null
    };

    const collector = message.channel.createMessageCollector((m) => m.author.id == message.author.id, { time: 120000 }); //2Minutes
    message.reply('Please enter a channel to log leave message!');

    collector.on("collect", async (msg) => {
        if (!leave.channelT) {
            leave.channel = msg.content.replace(/\D/g, '');
            leave.channelT = true;
            //if(channel.length < 2 || isNaN(channel))
                //return errors.noValidChannel(message);
            message.reply('Please enter a leave message!');
        }
        else if (!leave.messageT) {
            leave.message = msg.content;
            leave.messageT = true;
            /*if(channel.length < 2 || isNaN(channel))
                return errors.noValidChannel(message);*/
            db.query(`SELECT * FROM guildconfig WHERE gid = '${message.guild.id}'`, (err, result) => {
                if(err) throw err;

                let sql;
                if(result.length < 1) {
                    sql = `INSERT INTO guildconfig (gid, lid, leavemsg) VALUES ('${leave.guild.id}', '${leave.channel}', '${leave.message}')`;
                } else {
                    sql = `UPDATE guildconfig SET lid = '${leave.channel}', leavemsg = '${leave.message}' WHERE gid = '${message.guild.id}'`;
                }
                db.query(sql);
            });
            message.reply('leave message update!');
            return collector.stop();
        }
    });

    collector.on("end", (collected, reason) => {
        if (reason == "time")
            return;
    });

    //message.channel.send(agree + ' Changed server prefix to `' + suffix + '`');
};
