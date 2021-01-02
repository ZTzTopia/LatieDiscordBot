module.exports = {
    name: "welcome",
    aliases: [],
    description: "Change guild welcome message.",
    cooldown: [],
    guildOnly: true,
    usage: ["<channel|id> <message>"],
    example: ["#welcome Welcome to the server ${user}"]
};

const help = require("../../module/help.js");
const errors = require("../../module/errors.js");
module.exports.run = async (bot, message, args, suffix, db) => {
    if (!message.member.permissions.has(["MANAGE_MESSAGES", "ADMINISTRATOR"]));

    if(suffix == "test")
        return bot.emit("guildMemberAdd", message.member);

    let welcome = {
        channelT: false,
        messageT: false,
        channel: null,
        message: null
    };

    const collector = message.channel.createMessageCollector((m) => m.author.id == message.author.id, { time: 120000 }); //2Minutes
    message.reply('Please enter a channel to log welcome message!');

    collector.on("collect", async (msg) => {
        if (!welcome.channelT) {
            welcome.channel = msg.content.replace(/\D/g, '');
            welcome.channelT = true;
            //if(channel.length < 2 || isNaN(channel))
                //return errors.noValidChannel(message);
            message.reply('Please enter a welcome message!');
        }
        else if (!welcome.messageT) {
            welcome.message = msg.content;
            welcome.messageT = true;
            /*if(channel.length < 2 || isNaN(channel))
                return errors.noValidChannel(message);*/
            db.query(`SELECT * FROM guildconfig WHERE gid = '${message.guild.id}'`, (err, result) => {
                if(err) throw err;

                let sql;
                if(result.length < 1) {
                    sql = `INSERT INTO guildconfig (gid, wid, welcomemsg) VALUES ('${message.guild.id}', '${welcome.channel}', '${welcome.message}')`;
                } else {
                    sql = `UPDATE guildconfig SET wid = '${welcome.channel}', welcomemsg = '${welcome.message}' WHERE gid = '${message.guild.id}'`;
                }
                db.query(sql);
            });
            message.reply('Welcome message update!');
            return collector.stop();
        }
    });

    collector.on("end", (collected, reason) => {
        if (reason == "time")
            return;
    });

    //message.channel.send(agree + ' Changed server prefix to `' + suffix + '`');
};
