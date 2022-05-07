import { Collection } from "discord.js";
import { Routes } from "discord-api-types/v9";
import { REST } from "@discordjs/rest";
import { readdirSync, statSync } from "fs";
import path from "path";
import { config } from "../../Config";
import { Latie } from "../../base/Latie";
import { SlashCommandContext } from "./SlashCommandContext";

type Constructable<T> = {
    new(...args: unknown[]) : T;
}

type CommandType = {
    default: Constructable<SlashCommandContext>
}

export class SlashCommandManager {
    private client: Latie;
    public commands: Collection<string, SlashCommandContext>;

    public constructor(client: Latie) {
        this.client = client;
        this.commands = new Collection();
    }

    public async load(commandBasePath: string): Promise<void>;
    public async load(commandPath: string, unknown: string): Promise<void>;
    public async load(a1: string, a2?: string): Promise<void | string> {
        if (!a2) {
            a1 = path.join(__dirname, "../", `${a1}`);
            readdirSync(a1).forEach(dirs => {
                const dir = `${a1}/${dirs}`;
                if (statSync(dir).isDirectory()) {
                    readdirSync(dir).filter(d => d.endsWith(".js") || d.endsWith(".ts")).forEach(file => {
                        this.load(`${dir}/${file}`, "unknown").catch(console.error);
                    });
                }
            });
        }
        else {
            import(`${a1}`).then((Command: CommandType) => {
                const command = new Command.default(this.client);
                const commandName = command.context.name;

                this.client.log.d("LoadSlashCommand", `Loading command: ${commandName}.`);
                this.commands.set(commandName.toLowerCase(), command);

                delete require.cache[require.resolve(`${a1}`)];
            }).catch((reason: Error) => this.client.log.e("LoadSlashCommand", reason.message));
        }

        return Promise.resolve();
    }

    public async post() {
        if (this.commands.size == 0) {
            this.client.log.e("PostSlashCommand", "No slash commands loaded.");
            return;
        }

        const slashCommandsJSON: unknown[] = [];
        this.commands.forEach(command => {
            if (!command.data.name) {
                this.client.log.e("PostSlashCommand", `Command ${command.context.name} has no name.`);
                return;
            }

            slashCommandsJSON.push(command.data.toJSON());
        });

        if (slashCommandsJSON.length == 0) {
            this.client.log.e("PostSlashCommand", "No slash commands loaded.");
            return;
        }

        const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN as string);

        try {
            if (config.globalSlashCommands) {
                await rest.put(
                    Routes.applicationCommands(config.clientId),
                    { body: slashCommandsJSON },
                );
            }
            else {
                await rest.put(
                    Routes.applicationGuildCommands(config.clientId, config.guildId),
                    { body: slashCommandsJSON },
                );
            }
        }
        catch (error) {
            this.client.log.e("PostSlashCommand", error);
        }
	}
}