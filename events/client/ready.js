const { Client, RichEmbed } = require('discord.js');
const { prefix, DBLtoken } = require('../../config.json');
const sampquery = require('samp-query');
//const client = new Client();
//const DBL = require("dblapi.js");
//const dbl = new DBL(process.env.DBL_TOKEN || DBLtoken, client);
const { readFileSync } = require('fs');
module.exports = async (client, message) => {
	const promises = [
        client.shard.fetchClientValues('guilds.cache.size'),
        client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')
    ];
    
	return Promise.all(promises)
		.then(results => {
			var totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
			var totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
			
			console.log(`\nStats:
	- User: ${client.user.username}#${client.user.discriminator} <ID: ${client.user.id}>
	- Prefix: ${prefix}
	- Total Users: ${totalMembers}
	- Channels: ${client.channels.cache.size}
	- Guilds: ${totalGuilds}`);
			client.user.setActivity(prefix + 'help | myprefix', { type: 3 });

			/*setInterval(() => {
				dbl.postStats(client.guilds.size);
			}, 180000)*/

			console.log('\nBot Ready!');
	});
}