//Discord.js
const { ShardingManager } = require('discord.js');

//Config
const { token } = require('./config.json');

//node_modules
require('dotenv').config();

const manager = new ShardingManager('./bot.js', {
    token: process.env.BOT_TOKEN || token
});

manager.on('shardCreate', shard => console.log(`Shard ${shard.id} launched!`));
manager.spawn();