import { PresenceData } from "discord.js";

export type Config = {
    /* Enable the debug */
    debug: boolean,
    /* Bot client id */
    clientId: string,
    /* Make slash commands global */
    globalSlashCommands: boolean,
    /* The guild id to test slash commands */
    guildId: string,
    /* The default prefix for the bot */
    prefix: string,
    /* Bot's owner id */
    owner: string[],
    /* Set presence status */
    presence: PresenceData
};

export const config: Config = {
    debug: true,
    clientId: "643116930571436058",
    globalSlashCommands: false,
    guildId: "581087977019670538",
    prefix: "~",
    owner: [ 
        "483215020801392650", 
        "XXXXXXXXXXX", 
        "XXXXXXXXXXX"
    ],
    presence: {
        status: "online",
        afk: false
    }
};

config.presence.activities = [
    { 
        name: config.prefix + "help",
        type: "LISTENING"
    }
];
