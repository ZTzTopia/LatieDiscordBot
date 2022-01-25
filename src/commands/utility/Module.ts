import { Message, MessageEmbed } from "discord.js";
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
			const embed = new MessageEmbed()
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
			const commandName = path.parse(file.toLowerCase()).name;
			const command = this.client.command.commands.get(commandName);
			commandList.push(command as CommandContext);
		});

		const embed = new MessageEmbed()
			.setTitle(`${args[0]}`)
			.setDescription(commandList.map(command => command.context.name).join("\n"));
		await message.channel.send({ embeds: [embed] });
    }
}