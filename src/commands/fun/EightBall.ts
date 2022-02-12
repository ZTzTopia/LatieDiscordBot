import { Message, MessageEmbed } from "discord.js";
import { CommandContext } from "../CommandContext";
import { Latie } from "../../base/Latie";

export default class EightBall extends CommandContext {
	constructor (client: Latie) {
		super(client, {
			name: "8ball",
			aliases: [ "eightball" ]
		});
	}

	public async run(message: Message, args: string[]): Promise<void> {
		if (!args[0]) {
			await message.channel.send("No arguments sir.");
			return;
		}
		
		const responses = [
			"It is certain.",
			"It is decidedly so.",
			"Without a doubt.",
			"Yes definitely.",
			"You may rely on it.",
			"As I see it, yes.",
			"Most likely.",
			"Yes.",
			"Signs point to yes.",
			"Reply hazy, try again.",
			"Ask again later.",
			"Better not tell you now.",
			"Cannot predict now.",
			"Concentrate and ask again.",
			"Don't count on it.",
			"My reply is no.",
			"My sources say no.",
			"Outlook not so good.",
			"Very doubtful."
		]

		const response = responses[Math.floor(Math.random() * responses.length)];
		const embed = new MessageEmbed()
			.setTitle("8ball")
			.setDescription(response)
			.setTimestamp();
		await message.channel.send({ embeds: [embed] });
    }
}