import { CommandInteraction } from "discord.js";
import { SlashCommandContext } from "../SlashCommandContext";
import { Latie } from "../../../base/Latie";

export default class Ping extends SlashCommandContext {
	constructor (client: Latie) {
		super(client, {
			name: "ping"
		});

		this.data.setName("ping")
			.setDescription("Pings the bot.");
	}

	public async run(commandInteraction: CommandInteraction): Promise<void> {
		const start = commandInteraction.createdTimestamp;
		await commandInteraction.reply("\\🏓 Pinging...");
		const end = new Date().getTime() - start;
		await commandInteraction.editReply(`\\🏓 Pong! Latency is ${end}ms. API Latency is ${Math.round(this.client.ws.ping)}ms`);
    }
}