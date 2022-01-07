import { Message } from "discord.js";
import { Latie } from "../base/Latie";

export abstract class EventContext {
	client: Latie;

	public constructor(client: Latie) {
        this.client = client;
	}

	public abstract run(message: Message, args?: string[]): Promise<void>;
}