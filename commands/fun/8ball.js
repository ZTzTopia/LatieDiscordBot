module.exports = {
    name: "8ball",
    aliases: ["8b", "ball"],
    description: "Get answer by question magic-8ball.",
    cooldown: [],
    guildOnly: false,
    usage: ['<question>'],
    example: ['Im awesome?']
};

const { RichEmbed } = require("discord.js");
const errors = require("../../module/errors.js");
const help = require("../../module/help.js");
module.exports.run = async (client, message, args) => {
    if (!args[0]) return help.help(message, '8ball');

    var predictions = [
        "It is certain",
        "It is decidedly so",
        "Without a doubt",
        "Yes definitely",
        "You may rely on it",
        "As I see it, yes",
        "Most likely",
        "Outlook good",
        "Yes",
        "Signs point to yes",
        "Reply hazy try again",
        "Ask again later",
        "Better not tell you now",
        "Cannot predict now",
        "Concentrate and ask again",
        "Don't count on it",
        "My reply is no",
        "No",
        "My sources say no",
        "Outlook not so good",
        "Very doubtful"
    ];

    let ball = new RichEmbed()
        .addField(":8ball: 8ball", "Shaking the ball...")
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp();

    var msg2 = await message.channel.send({ embed: ball });

    setTimeout(function () {
        msg2.delete();
        let ball2 = new RichEmbed()
            .addField(":8ball: 8ball", predictions[Math.floor(Math.random() * (predictions.length - 1) + 1)])
            .setFooter(message.author.tag, message.author.avatarURL)
            .setTimestamp();

        message.channel.send({ embed: ball2 });
    }, 800);
};
