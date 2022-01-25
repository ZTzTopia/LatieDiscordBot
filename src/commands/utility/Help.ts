import { Message, MessageEmbed } from "discord.js";
import { CommandContext } from "../CommandContext";
import { Latie } from "../../base/Latie";

export default class Help extends CommandContext {
	constructor (client: Latie) {
		super(client, {
			name: "help",
            description: 'List all of my commands or info about a specific command.'
		});
	}

	public async run(message: Message, args: string[]): Promise<void> {
		if (!args[0]) {
            const embed = new MessageEmbed()
                .setDescription(`If you want see my commands instead use \`modules\`\nFor more help you can use \`help <command name>\``)
                .setTimestamp();
            await message.channel.send({ embeds: [embed] });
            return;
		}

		const command = this.client.command.commands.get(args[0].toLowerCase());
        if (!command) {
            await message.channel.send("Command not found");
            return;
        }

        const embed = new MessageEmbed()
            .setTitle(`Command: ${command.context.name}`)
            .setDescription(command.context.description ? command.context.description : "No description available.")
            .setTimestamp();
        await message.channel.send({ embeds: [embed] });
    }
}