import { Message } from "discord.js";
import { Latie } from "../base/Latie";

interface ICommandContext {
    name: string;
}

export abstract class CommandContext {
	client: Latie;

	public constructor(client: Latie, context: ICommandContext) {
		this.client = client;
	}

	public abstract run(message: Message, args: string[]): Promise<void>;
}