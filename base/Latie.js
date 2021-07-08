const { Client, Collection, Intents } = require('discord.js'),
    { readdirSync, statSync } = require('fs');

class Latie extends Client {
    constructor () {
		super({
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.GUILD_VOICE_STATES,
				Intents.FLAGS.DIRECT_MESSAGES
			],
			allowedMentions: {
				parse: ["users"]
			}
		});
        // Load config file
        this.config = require("../config.js");
        // Load logger file
        this.log = require("../module/logger.js");
        // Create new commands collection
        this.commands = new Collection();
        // Create new command aliases collection
        this.aliases = new Collection();
        // Create new cooldowns collection
        this.cooldowns = new Collection();

        // Create new database cache collection
        this.databaseCache = {};
		this.databaseCache.guildData = new Collection();

        // MongoDB Model
        this.GuildModel = require("../model/GuildModel.js");
    }

    async findOneOrCreateGuild({ id: guildId }) {
        let guildData = this.databaseCache.guildData.get(guildId);
		if (!guildData) {
			guildData = await this.GuildModel.findOne({ gId: guildId }).catch(e => {
                this.log.e('findOneOrCreateGuild -> findOne', e);
                return '';
            });

            if (!guildData) {
                guildData = new this.GuildModel({ gId: guildId });
                await guildData.save().catch(e => {
                    this.log.e('findOneOrCreateGuild -> save', e);
                    return '';
                });
            }
		}

        this.databaseCache.guildData.set(guildId, guildData);
        return guildData;
	}

    loadEvents(eventBasePath) {
        const directories = readdirSync(eventBasePath);
        directories.forEach(dirs => {
            const dir = `${eventBasePath}${dirs}/`;
            if (statSync(dir).isDirectory()) {
                readdirSync(dir).filter(d => d.endsWith('.js')).forEach((file) => {
                    try {
                        const event = new (require(`.${dir}/${file}`))(this);
                        this.log.d('LoadEvent', `Loading event file: ${file.split('.')[0]}.`);
            
                        this.on(file.split('.')[0], (...args) => event.run(...args));
            
                        delete require.cache[require.resolve(`.${dir}/${file}`)];
                    } catch (e) {
                        this.log.e('Events', e);
                    }
                });
            }
        });
    }

    loadCommands(commandBasePath) {
        const directories = readdirSync(commandBasePath);
        directories.forEach(dirs => {
            const dir = `${commandBasePath}${dirs}/`;
            if (statSync(dir).isDirectory()) {
                readdirSync(dir).filter(d => d.endsWith('.js')).forEach((file) => {
                    const ret = this.loadCommand(`${dir}${file}`, file.split('.')[0]);
                    if (ret) {
                        this.log.e('Commands', ret);
                    }
                });
            }
        });
    }

    loadCommand(commandPath, commandName) {
        this.log.d('LoadCommand', `Loading command file: ${commandName}.`);

		try {
			const command = new (require(`.${commandPath}`))(this);

			this.commands.set(command.help.name, command);

            command.config.location = commandPath;
			command.help.aliases.forEach((alias) => this.aliases.set(alias, command.help.name));

            delete require.cache[require.resolve(`.${commandPath}`)];
			return '';
		} catch (e) {
			return e;
		}
	}

	async unloadCommand(commandPath, commandName) {
        this.log.d('UnloadCommand', `Unloading command file: ${commandName}.`);

        try {
            let command;
            if (this.commands.has(commandName)) {
                command = this.commands.get(commandName);
            } else if (this.aliases.has(commandName)) {
                command = this.commands.get(this.aliases.get(commandName));
            }
            
            if (!command) {
                return `The command \`${commandName}\` does not exist.`;
            }

            return '';
        } catch (e) {
            return e;
        }
	}
}

module.exports = Latie;