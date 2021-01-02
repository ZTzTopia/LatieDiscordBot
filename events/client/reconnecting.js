module.exports = async (client, replayed) => {
    console.log(new Date());
    if (replayed) {
        console.log("Bot is resumming...");
    } else {
        console.log("Bot is reconnecting...");
    }
}