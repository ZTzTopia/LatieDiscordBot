const { Client, RichEmbed } = require('discord.js');
const sampquery = require('samp-query');
//const client = new Client();
//const DBL = require("dblapi.js");
//const dbl = new DBL(process.env.DBL_TOKEN || DBLtoken, client);
const { readFileSync } = require('fs');
const { token, prefix, DBLtoken } = require('../../config.json');
module.exports = async (client, message) => {
    console.log(`\nStats:
		- User: ${client.user.username}#${client.user.discriminator} <ID: ${client.user.id}>
		- Prefix: ${prefix}
		- Users: ${client.users.filter(user => !user.bot).size}
		- Clients: ${client.users.filter(user => user.bot).size}
		- Channels: ${client.channels.size}
		- Guilds: ${client.guilds.size}`);
    client.user.setPresence({ game: { name: prefix + 'help | myprefix', type: 3 } });

    /*setInterval(() => {
        dbl.postStats(client.guilds.size);
    }, 180000)*/

    console.log('\nBot Ready!');

	var options = {
	    host: '52.188.214.60',
	    port: '7777'
	}

	var channel = client.channels.get('737810404675420252');
	if(channel)
	{
		channel.bulkDelete(100, true).catch(err => {
	        return errors.bulkE(message);
	    });
	  	var messages = await channel.send("Initialize server status..");
		setInterval(() => {
			sampquery(options, function (error, response) {
			    if(error) {
			        var status = new RichEmbed()
			       		.setTitle(":bar_chart: Server Stats")
			            .setDescription("Server sedang offline/maintenace")
			            .setFooter("Last updated")
			            .setTimestamp();
			        messages.edit({ embed: status });
			    } else {
			    	var status = new RichEmbed()
			        	.setTitle(":bar_chart: Server Stats")
			            .addField("Address", response.address)
				        .addField("Host Name", response.hostname)
				        .addField("Game Mode", response.gamemode)
				        .addField("Language", response.mapname)
				        .addField("Password", response.passworded)
				        .addField("Player Online", `${response.online}/${response.maxplayers}`)
				        .addField("Rules", `Map Name: ${response.rules.mapname}\nVersion: ${response.rules.version}\nWeather: ${response.rules.weather}\nWorld Time: ${response.rules.worldtime}\nWebsite: ${response.rules.weburl}`)
				        .addField("Players", `response.players.map((x,i) => ${i+1}. Id: ${x.id} | Name: ${x.name} | Level: ${x.score} | Ping: ${x.ping})`)
				        .setFooter("Last updated")
			            .setTimestamp();
			        messages.edit({ embed: status });
			        //console.log(response);
			    }
			});
		}, 5000);
	}
}