const Command = require('../../base/Command.js');

module.exports = class extends Command {
	constructor (client) {
		super(client, {
			name: 'reload',
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [],
			memberPermissions: [],
			botPermissions: [],
			nsfw: false,
			ownerOnly: true,
			cooldown: 3000
		});
	}

	async run (message, args) {
		const client = this.client;

		const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
		if (!command){
			message.channel.send("gagal tot");
			return;
		}

		let ret = await client.UnloadCommand(command.config.location, command.help.name);
		if (ret) {
			client.log.e(`Commands ${this.help.name}`, ret);
			message.channel.send(`error: \n` + '```' + `${ret}` + '```');
			return;
		}

		ret = await client.LoadCommand(command.config.location, command.help.name);
		if (ret) {
			client.log.e(`Commands ${this.help.name}`, ret);
			message.channel.send(`error: \n` + '```' + `${ret}` + '```');
			return;
		}

		message.channel.send("berhasil tot");
	}
}