import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Latie } from "../../base/Latie";

interface ISlashCommandContext {
    name: string;
}

export abstract class SlashCommandContext {
	client: Latie;
	context: ISlashCommandContext;
	data: SlashCommandBuilder;

	public constructor(client: Latie, context: ISlashCommandContext) {
		this.client = client;
		this.context = context;
		this.data = new SlashCommandBuilder();
	}

	public abstract run(commandInteraction: CommandInteraction): void;
}