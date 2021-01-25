module.exports = {
    name: "calculate",
    aliases: ['calc'],
    description: "Get a random biil.",
    cooldown: [],
    guildOnly: false,
    usage: ['<question>'],
    example: ['100 + 100']
};

const { MessageEmbed } = require("discord.js");
const math = require('math-expression-evaluator');
const help = require("../../module/help.js");
module.exports.run = async (bot, message, args) => {
    if (!args[0]) return help.help(message, 'calculator');

    const question = args.join(' ');

    let answer;
    try {
        answer = math.eval(question);
    } catch (e) {
        return message.channel.send(`Invalid math equation: ${question} 
    **Example**: \`calculate 100 + 100\`
        `)
    }

    let math2 = new MessageEmbed()
    math2.setColor(message.guild.me.displayColor)
        .addField('Equation:', `\n\`\`\`\n${question}\n\`\`\``)
        .addField('Answer:', `\n\`\`\`\n${answer}\n\`\`\``)

    message.channel.send({ embed: math2 });
}
