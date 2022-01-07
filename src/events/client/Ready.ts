import { Latie } from "../../base/Latie";
import { IEvent } from "../../utils/Interfaces";

export default class Ready implements IEvent {
	client: Latie;

    public constructor(client: Latie) {
		this.client = client;
	}

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