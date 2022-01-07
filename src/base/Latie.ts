import { Client, Intents } from "discord.js";
import { Config, config } from "../Config";
import { Logger } from "../utils/Logger";
import { EventManager } from "../events/EventManager";
import { CommandManager } from "../commands/CommandManager";
import { Mongoose } from "../database/Mongoose";

export class Latie extends Client {
    config: Config;
	log: Logger;
	event: EventManager;
	command: CommandManager;
	mongoose: Mongoose;

    public constructor() {
		super({
			allowedMentions: {
				parse: [ "roles", "users" ]
			},
			presence: config.presence,
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.GUILD_VOICE_STATES,
				Intents.FLAGS.DIRECT_MESSAGES
			]
		});

        // Load config file
        this.config = config;
		
		// Load logger file
        this.log = new Logger();

		// Load events
		this.event = new EventManager(this);

		// Load commands
		this.command = new CommandManager(this);

		// Load mongoose
		this.mongoose = new Mongoose(this);
    }
}
