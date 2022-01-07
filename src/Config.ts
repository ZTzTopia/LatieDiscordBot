import { PresenceData } from "discord.js";

export type Config = {
    /* Enable the debug */
    debug: boolean,
    /* The default prefix for the bot */
    prefix: string,
    /* Bot's owner id */
    owner: Array<string>,
    /* Set presence status */
    presence: PresenceData
};

export const config: Config = {
    debug: true,
    prefix: "~",
    owner: [ "483215020801392650", "XXXXXXXXXXX", "XXXXXXXXXXX" ],
    presence: {
        status: "online",
        afk: false
    }
};

config.presence.activities = [{ 
    name: config.prefix + "help",
    type: "LISTENING"
}];
