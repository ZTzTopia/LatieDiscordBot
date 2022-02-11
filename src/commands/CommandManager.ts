import { Collection } from "discord.js";
import { readdirSync, statSync } from "fs";
import path from "path";
import { Latie } from "../base/Latie";
import { CommandContext } from "./CommandContext";

interface Constructable<T> {
    new(...args: unknown[]) : T;
}

type CommandType = {
    default: Constructable<CommandContext>
}

export class CommandManager {
    private client: Latie;
    public commands: Collection<string, CommandContext>;
    private aliases: Collection<string, CommandContext>;

    public constructor(client: Latie) {
        this.client = client;
        this.commands = new Collection();
        this.aliases = new Collection();
    }

    public load(commandBasePath: string) : void;
    public load(commandPath: string, commandName: string) : void;
    public load(a1: string, a2?: string): void | string {
        if (!a2) {
            a1 = path.join(__dirname, "../", `${a1}/`);
            
            readdirSync(a1).forEach(dirs => {
                const dir = `${a1}${dirs}/`;
                if (statSync(dir).isDirectory()) {
                    readdirSync(dir).filter(d => d.endsWith('.js') || d.endsWith('.ts')).forEach(file => {
                        const commandName: string = file.split('.')[0];
                        this.load(`${dir}${file}`, commandName);
                    });
                }
            });
        }
        else {
            import(`${a1}`).then((Command: CommandType) => {
                const command = new Command.default(this.client);

                this.client.log.d('LoadCommand', `Loading command: ${a2}.`);
                this.commands.set(a2.toLowerCase(), command);

                delete require.cache[require.resolve(`${a1}`)];
            }).catch((reason: Error) => this.client.log.e("Event", reason.message));
        }
    }
}