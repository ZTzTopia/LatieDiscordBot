const { token } = require('../../config.json');
module.exports = async (client) => {
    console.log(new Date());
    console.log("Bot is disconnecting...");
    client.destroy().then(client.login(token));
}