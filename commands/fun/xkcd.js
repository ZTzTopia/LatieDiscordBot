module.exports = {
    name: "xkcd",
    aliases: [],
    description: "Fetches random or specific XKCD comics.",
    cooldown: [],
    guildOnly: false,
    usage: ['[latest|id]'],
    example: ['latest', '453']
};

const { MessageEmbed } = require('discord.js');
const got = require('got');
const config = require('../../config.json');
module.exports.run = async (bot, message, args) => {
    let id;
    if (args[0] === 'latest') {
        id = (await getLatest()).num;
    } else {
        id = parseInt(args[0]);
        if (isNaN(id)) {
            id = await getRandom();
        } else {
            const latest = await getLatest();
            const max = latest.num;
            if (id > max) {
                let embed = new MessageEmbed()
                    .setDescription(config.disagree + ' **' + message.author.tag + '** XkCd Only ' + max + ' Comics.')

                return message.channel.send({ embed: embed });
            } else {
                if (id < 1) {
                    let embed = new MessageEmbed()
                        .setDescription(config.disagree + ' **' + message.author.tag + '** XkCd Comics Not Found.')

                    return message.channel.send({ embed: embed });
                }
            }
        }
    }

    // Avoid the 404 page
    while (id === '404 Not Found') {
        id = await getRandom();
    }

    const info = await getInfo(id);
    let xkcd21 = new MessageEmbed()
        .setTitle(`[${id}] ${info.title}`)
        .setURL(`http://xkcd.com/${id}`)
        .setDescription(`**` + info.alt + `**` || `Nothing`)
        .addField(`Upload On:`, info.day + '-' + info.month + '-' + info.year || `None`)
        .setImage(info.img)
        .setFooter(`Powered by xkcd.com`)
        .setTimestamp();
    message.channel.send({ embed: xkcd21 });
}

async function getInfo(id) {
    return (await got(`http://xkcd.com/${id}/info.0.json`, { json: true })).body;
}

async function getLatest() {
    return (await got('http://xkcd.com/info.0.json', { json: true })).body;
}

async function getRandom() {
    const latest = await getLatest();
    const max = latest.num;

    return Math.floor(Math.random() * max);
}
