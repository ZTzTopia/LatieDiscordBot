import { Message } from "discord.js";
import { Latie } from "../base/Latie";

interface ICommandContext {
    name: string;
	guildOnly?: boolean;
}

export abstract class CommandContext {
	client: Latie;
	context: ICommandContext;

	public constructor(client: Latie, context: ICommandContext) {
		this.client = client;
		this.context = context;
	}

	public abstract run(message: Message, args?: string[]): Promise<void>;
}