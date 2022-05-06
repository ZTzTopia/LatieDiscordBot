import { Interaction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { Latie } from "../../base/Latie";

interface ISlashCommandContext {
    name: string;
}

export abstract class SlashCommandContext {
	client: Latie;
	context: ISlashCommandContext;
	slashCommandBuilder: SlashCommandBuilder;

	public constructor(client: Latie, context: ISlashCommandContext) {
		this.client = client;
		this.context = context;
		this.slashCommandBuilder = new SlashCommandBuilder();
	}

	public abstract run(Interaction: Interaction, args?: string[]): void;
}