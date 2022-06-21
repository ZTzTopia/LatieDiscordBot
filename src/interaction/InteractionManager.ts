import { Collection } from "discord.js";
import { Routes } from "discord-api-types/v9";
import { REST } from "@discordjs/rest";
import { readdirSync, statSync } from "fs";
import path from "path";
import { config } from "../Config";
import { Latie } from "../base/Latie";
import { InteractionContext } from "./InteractionContext";

type Constructable<T> = {
    new(...args: unknown[]) : T;
}

type Type = {
    default: Constructable<InteractionContext>
}

export class InteractionManager {
    private client: Latie;
    public interactions: Collection<string, InteractionContext>;

    public constructor(client: Latie) {
        this.client = client;
        this.interactions = new Collection();
    }

    public async load(interactionBasePath: string): Promise<void>;
    public async load(interactionPath: string, unknown: string): Promise<void>;
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
            import(`${a1}`).then((interaction: Type) => {
                const command = new interaction.default(this.client);
                const commandName = command.context.name;

                this.client.log.d("LoadInteraction", `Loading command: ${commandName}.`);
                this.interactions.set(commandName.toLowerCase(), command);

                delete require.cache[require.resolve(`${a1}`)];
            }).catch((reason: Error) => this.client.log.e("LoadInteraction", reason.message));
        }

        return Promise.resolve();
    }

    public async post() {
        if (this.interactions.size == 0) {
            this.client.log.e("PostInteraction", "No Interaction commands loaded.");
            return;
        }

        const InteractionsJSON: unknown[] = [];
        this.interactions.forEach(command => {
            if (!command.data.name) {
                this.client.log.e("PostInteraction", ` ${command.context.name} has no name.`);
                return;
            }

            InteractionsJSON.push(command.data.toJSON());
        });

        if (InteractionsJSON.length == 0) {
            this.client.log.e("PostInteraction", "No Interaction commands loaded.");
            return;
        }

        const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN as string);

        try {
            if (config.globalSlashCommands) {
                await rest.put(
                    Routes.applicationCommands(config.clientId),
                    { body: InteractionsJSON },
                );
            }
            else {
                await rest.put(
                    Routes.applicationGuildCommands(config.clientId, config.guildId),
                    { body: InteractionsJSON },
                );
            }
        }
        catch (error) {
            this.client.log.e("PostInteraction", error);
        }
	}
}