import { EventContext } from "../EventContext";

export default class Ready extends EventContext {
	public async run(): Promise<void> {
		const client = this.client;

		client.log.i('Ready', `
  - User: ${client.user?.username}#${client.user?.discriminator} <ID: ${client.user?.id}>
  - Prefix: ${client.config.prefix}
  - Users: ${client.guilds.cache.reduce((a: any, g: any) => a + g.memberCount, 0)}
  - Channels: ${client.channels.cache.size}
  - Guilds: ${client.guilds.cache.size}`);

		client.log.i('Ready', 'Bot ready!');
	}
}