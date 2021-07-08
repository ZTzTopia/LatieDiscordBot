module.exports = class {
    constructor(client) {
		this.client = client;
	}

	async run() {
		const client = this.client;

		client.log.i('Ready', `
  - User: ${client.user.username}#${client.user.discriminator} <ID: ${client.user.id}>
  - Prefix: ${client.config.prefix}
  - Users: ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}
  - Channels: ${client.channels.cache.size}
  - Guilds: ${client.guilds.cache.size}`);

		client.user.setActivity(client.config.prefix + 'help | myprefix', { type: 3 });

		client.log.i('Ready', 'Bot ready!');
	}
}