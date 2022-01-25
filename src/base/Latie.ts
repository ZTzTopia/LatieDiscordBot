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
        parse: ["roles", "users"],
      },
      partials: ["CHANNEL"],
      presence: config.presence,
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_TYPING],
    });

    this.config = config;
    this.log = new Logger();
    this.event = new EventManager(this);
    this.command = new CommandManager(this);
    this.mongoose = new Mongoose(this);
  }

  public build(cmddir: string, eventdir: string) {
    super.login(process.env.BOT_TOKEN);
    this.command.load(cmddir);
    this.event.load(eventdir);
  }
}
