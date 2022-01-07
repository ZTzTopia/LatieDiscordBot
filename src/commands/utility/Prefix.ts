import { Message } from "discord.js";
import { CommandContext } from "../CommandContext";
import { Latie } from "../../base/Latie";
import { IGuild } from "src/database/model/GuildModel";

export default class Prefix extends CommandContext {
	constructor (client: Latie) {
		super(client, {
			name: "prefix",
			guildOnly: true
		});
	}

	public async run(message: Message, args: string[]): Promise<void> {
		if (!args[0]) {
			await message.channel.send("You need to specify a new prefix.");
			return;
		}

		await this.client.mongoose.updateGuild(message.guild?.id as string, {
			prefix: args[0]
		} as IGuild);
		await message.channel.send(`Guild prefix updated to \`${args[0]}\``);
    }
}