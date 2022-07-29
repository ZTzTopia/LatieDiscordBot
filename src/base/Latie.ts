import {Client, GatewayIntentBits, Partials} from "discord.js";
import {Config, config} from "../Config";
import {Logger} from "../utils/Logger";
import {EventManager} from "../event/EventManager";
import {CommandManager} from "../command/CommandManager";
import {InteractionManager} from "../interaction/InteractionManager";
import {Mongoose} from "../database/Mongoose";

export class Latie extends Client {
	config: Config;
	log: Logger;
	eventManager: EventManager;
	commandManager: CommandManager;
	interactionManager: InteractionManager;
	mongoose: Mongoose;

	public constructor() {
		super({
			allowedMentions: {
				parse: [ 
					"roles", 
					"users" 
				]
			},
			partials: [ Partials.Channel ],
			presence: config.presence,
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildMessageReactions,
				GatewayIntentBits.GuildMessageTyping,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.DirectMessageReactions,
				GatewayIntentBits.DirectMessageTyping,
				GatewayIntentBits.MessageContent,
			]
		});

		this.config = config;
		this.log = new Logger();
		this.commandManager = new CommandManager(this);
		this.interactionManager = new InteractionManager(this);
		this.eventManager = new EventManager(this);
		this.mongoose = new Mongoose(this);
	}

	public async build(eventPath: string, commandPath: string, interactionPath: string) {
		await this.eventManager.load(eventPath);
		await this.commandManager.load(commandPath);
		await this.interactionManager.load(interactionPath);
		await this.interactionManager.post();
		await super.login(process.env.BOT_TOKEN).catch((e: Error) => this.log.e("Bot", e.message));
	}
}
