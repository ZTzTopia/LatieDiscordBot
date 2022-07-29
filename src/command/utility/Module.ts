import { Message, EmbedBuilder } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import { CommandContext } from "../CommandContext";
import { Latie } from "../../base/Latie";

export default class Module extends CommandContext {
	constructor (client: Latie) {
		super(client, {
			name: "module"
		});
	}

	public async run(message: Message, args: string[]): Promise<void> {
		const modules = readdirSync(path.join(__dirname, "../")).filter(file => !file.endsWith(".ts"));

		if (!args[0]) {
			const embed = new EmbedBuilder()
				.setTitle("Modules")
				.setDescription(modules.join("\n"));
			await message.channel.send({ embeds: [embed] });
			return;
		}

		if (!modules.includes(args[0])) {
			await message.channel.send("Module not found");
			return;
		}
		
		const files = readdirSync(path.join(__dirname, `../${args[0]}`));
		
		const commandList: CommandContext[] = [];
		files.forEach(file => {
			const commandFileName = path.parse(file).name;
			const command = this.client.commandManager.commands.get(commandFileName.toLowerCase());
			commandList.push(command as CommandContext);
		});

		if (commandList.length === 0) {
			await message.channel.send("No commands found");
			return;
		}

		const guildData = await this.client.mongoose.fetchGuild(message.guild?.id as string);
		const embed = new EmbedBuilder()
			.setTitle(`${args[0]}`)
			.setDescription(commandList.map(command => command ? `${guildData.prefix}${command.context.name}` : "").join("\n"))
			.setTimestamp();
		await message.channel.send({ embeds: [embed] });
    }
}