import { Collection } from "discord.js";
import { readdirSync, statSync } from "fs";
import path from "path";
import { Latie } from "../base/Latie";
import { CommandContext } from "./CommandContext";

export class CommandManager {
    private client: Latie;
    public commands: Collection<string, CommandContext>;
    private aliases: Collection<string, CommandContext>;

    public constructor(client: Latie) {
        this.client = client;
        this.commands = new Collection();
        this.aliases = new Collection();
    }

    public async load(commandBasePath: string) : Promise<void>;
    public async load(commandPath: string, commandName: string) : Promise<string>;
    public async load(a1: string, a2?: string): Promise<void | string> {
        if (!a2) {
            a1 = path.join(__dirname, "../", `${a1}/`);
            
            readdirSync(a1).forEach(dirs => {
                const dir = `${a1}${dirs}/`;
                if (statSync(dir).isDirectory()) {
                    readdirSync(dir).filter(d => d.endsWith('.js') || d.endsWith('.ts')).forEach(async (file) => {
                        const commandName: string = file.split('.')[0];
                        const e: string = await this.load(`${dir}${file}`, commandName);
                        if (e.length > 0) {
                            this.client.log.e('Commands', e);
                        }
                    });
                }
            });
        }
        else {
            this.client.log.d('LoadCommand', `Loading command: ${a2}.`);

            try {
                const Command = require(`${a1}`).default;
                const command = new Command(this.client);

                this.commands.set(a2.toLowerCase(), command);

                delete require.cache[require.resolve(`${a1}`)];
                return "";
            } 
            catch (e) {
                return (e as Error).message;
            }
        }
    }
}