import {EventContext} from "../EventContext";

export default class Ready extends EventContext {
  public run() {
    const client = this.client;

    client.log.i("Ready", `
  - User: ${client.user?.username as string}#${client.user?.discriminator as string} <ID: ${client.user?.id as string}>
  - Prefix: ${client.config.prefix}
  - Users: ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}
  - Channels: ${client.channels.cache.size}
  - Guilds: ${client.guilds.cache.size}`);

    client.log.i("Ready", "Bot ready!");
  }
}