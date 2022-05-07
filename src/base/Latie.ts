import { Client, Intents } from "discord.js";
import { Config, config } from "../Config";
import { Logger } from "../utils/Logger";
import { EventManager } from "../events/EventManager";
import { CommandManager } from "../commands/normal/CommandManager";
import { SlashCommandManager } from "../commands/slash/SlashCommandManager";
import { Mongoose } from "../database/Mongoose";

export class Latie extends Client {
    config: Config;
	log: Logger;
	eventManager: EventManager;
	commandManager: CommandManager;
	slashCommandManager: SlashCommandManager;
	mongoose: Mongoose;

	public constructor() {
		super({
			allowedMentions: {
				parse: [ 
					"roles", 
					"users" 
				]
			},
			partials: [ "CHANNEL" ],
			presence: config.presence,
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.GUILD_VOICE_STATES,
				Intents.FLAGS.DIRECT_MESSAGES, 
				Intents.FLAGS.DIRECT_MESSAGE_TYPING
			]
		});

		this.config = config;
		this.log = new Logger();
		this.commandManager = new CommandManager(this);
		this.slashCommandManager = new SlashCommandManager(this);
		this.eventManager = new EventManager(this);
		this.mongoose = new Mongoose(this);
	}

	public async build(cmddir: string, slashcmddir: string, eventdir: string) {
		await this.commandManager.load(cmddir);
		await this.slashCommandManager.load(slashcmddir);
		await this.slashCommandManager.post();
		await this.eventManager.load(eventdir);
		await super.login(process.env.BOT_TOKEN).catch((e: Error) => this.log.e("Bot", e.message));
	}
}
