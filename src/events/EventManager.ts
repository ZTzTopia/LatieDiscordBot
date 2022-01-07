import { readdirSync, statSync } from "fs";
import path from "path";
import { Latie } from "../base/Latie";

export class EventManager {
    client: Latie;

    public constructor(client: Latie) {
        this.client = client;
    }

    public async load(eventBasePath: string): Promise<void> {
        eventBasePath = path.join(__dirname, "../", `${eventBasePath}/`);

        readdirSync(eventBasePath).forEach(dirs => {
            const dir = `${eventBasePath}${dirs}`;
            if (statSync(dir).isDirectory()) {
                readdirSync(dir).filter(d => d.endsWith('.js') || d.endsWith('.ts')).forEach((file) => {
                    try {
                        const Event = require(`${dir}/${file}`).default;
                        const event = new Event(this.client);
                        const eventName: string = file.split('.')[0];

                        this.client.log.d('LoadEvent', `Loading event: ${eventName}.`);
                        this.client.on(eventName.charAt(0).toLowerCase() + eventName.slice(1), (...args) => event.run(...args));
            
                        delete require.cache[require.resolve(`${dir}/${file}`)];
                    } 
                    catch (e) {
                        this.client.log.e('Events', (e as Error).message);
                    }
                });
            }
        });
    }
}