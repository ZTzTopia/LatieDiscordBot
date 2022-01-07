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
        await message.channel.send("Pong!");
    }
}