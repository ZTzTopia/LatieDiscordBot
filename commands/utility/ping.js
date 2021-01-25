module.exports = {
    name: "ping",
    description: "Ping to our bot!",
    cooldown: [],
    guildOnly: false,
    usage: ["ping"],
    example: []
};

module.exports.run = async (client, message) => {
    const ping = await message.channel.send("**Calculating...**");
    setTimeout(function () {
        ping.edit("🏓 Pong 🏓. \n⏱ My latency is about " + (ping.createdTimestamp - message.createdTimestamp) + "ms. \n💗 My Heartbreaker is about " + client.ws.ping +" ms.");
    }, 500);
};
