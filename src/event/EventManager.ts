import { Message, Interaction } from "discord.js";
import { readdirSync, statSync } from "fs";
import path from "path";
import { Latie } from "../base/Latie";
import { EventContext } from "./EventContext";

type Constructable<T> = {
    new(...args: unknown[]) : T;
}

type EventType = {
    default: Constructable<EventContext>
}

export class EventManager {
    client: Latie;

    public constructor(client: Latie) {
        this.client = client;
    }

    public async load(eventBasePath: string) {
        eventBasePath = path.join(__dirname, "../", `${eventBasePath}`);
        readdirSync(eventBasePath).forEach(dirs => {
            const dir = `${eventBasePath}/${dirs}`;
            if (statSync(dir).isDirectory()) {
                readdirSync(dir).filter(d => d.endsWith(".js") || d.endsWith(".ts")).forEach(file => {
                    import(`${dir}/${file}`).then((Event: EventType) => {
                        const event = new Event.default(this.client);
                        const eventName: string = file.split(".")[0];

                        this.client.log.d("LoadEvent", `Loading event: ${eventName}.`);
                        if (eventName.charAt(0).toLowerCase() != "interactionCreate") {
                            this.client.on(eventName.charAt(0).toLowerCase() + eventName.slice(1), (message: Message, ...args: string[]) => event.run(message, [...args]));
                        }
                        else {
                            this.client.on(eventName.charAt(0).toLowerCase() + eventName.slice(1), (interaction: Interaction, ...args: string[]) => event.run(interaction, [...args]));
                        }
                    
                        delete require.cache[require.resolve(`${dir}/${file}`)];
                    }).catch((reason: Error) => this.client.log.e("Event", reason.message));
                });
            }
        });

        return Promise.resolve();
    }
}