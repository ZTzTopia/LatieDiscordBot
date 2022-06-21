import { Message } from "discord.js";
import { CommandContext } from "../CommandContext";
import { Latie } from "../../base/Latie";

export default class Ping extends CommandContext {
	constructor (client: Latie) {
		super(client, {
			name: "ping"
		});
	}

	public async run(message: Message): Promise<void> {
		await message.channel.send("\\🏓 Pinging...").then(async (msg: Message) => {
			await msg.edit(`\\🏓 Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(this.client.ws.ping)}ms`);
		});
    }
}