module.exports = {
    name: "prune",
    aliases: [],
    description: "Bulk delete message.",
    cooldown: [],
    guildOnly: true,
    usage: ["<message>"],
    example: ["99"]
};

const errors = require("../../module/errors.js");
const config = require("../../config.json");
module.exports.run = async (client, message, args, suffix) => {
    const amount = parseInt(suffix) + 1;
    if (!message.member.permissions.has(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return errors.noPerms(message, "MANAGE_MESSAGE");

    if (isNaN(amount)) return errors.isNaN(message);
    if (amount < 1 || amount > 100) return errors.minMax(message, '1', '99');

    message.channel.bulkDelete(amount, true).catch(err => {
        return errors.bulkE(message);
    });
};