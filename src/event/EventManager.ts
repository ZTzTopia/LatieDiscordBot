import path from "path";
import {Message, Interaction} from "discord.js";
import {readdirSync, statSync} from "fs";
import {Latie} from "../base/Latie";
import {EventContext} from "./EventContext";

type Constructable<T> = {
  new(...args: unknown[]): T;
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
      if (!statSync(dir).isDirectory()) {
        return;
      }

      readdirSync(dir).filter(d => d.endsWith(".js") || d.endsWith(".ts")).forEach(file => {
        import(`${dir}/${file}`).then((Event: EventType) => {
          const event = new Event.default(this.client);
          const eventFileName = file.split(".")[0];
          const eventName = `${eventFileName.charAt(0).toLowerCase()}${eventFileName.slice(1)}`;

          this.client.log.d("LoadEvent", `Loading event: ${eventName}.`);

          switch (eventName) {
            case "ready":
              this.client.on(eventName, () => event.run());
              break;
            case "messageCreate":
              this.client.on(eventName, (message: Message, ...args: string[]) => event.run(message, [...args]));
              break;
            case "interactionCreate":
              this.client.on(eventName, (interaction: Interaction, ...args: string[]) => event.run(interaction, [...args]));
              break;

          }

          delete require.cache[require.resolve(`${dir}/${file}`)];
        }).catch((reason: Error) => this.client.log.e("Event", reason.message));
      });
    });

    return Promise.resolve();
  }
}
