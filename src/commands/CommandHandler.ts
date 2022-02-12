import { Message } from "discord.js";
import { Guild } from "src/database/model/GuildModel";
import { Latie } from "../base/Latie";

export default class CommandHandler {
    static async handle(client: Latie, message: Message, guildData?: Guild) {
        const prefix = (message.guild ? guildData?.prefix : client.config.prefix) as string;
        if (!message.content.startsWith(prefix) && message.content.length < prefix.length) {
            return;
        }

        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift()?.toLowerCase();
        const command = client.command.commands.get(commandName as string) || client.command.commands.find(command => command.context.aliases != null && command.context.aliases.includes(commandName as string));
        if (!command) {
            return;
        }

        if (!message.guild && command.context.guildOnly) {
            return;
        }

        try {
            command.run(message, args);
        } 
        catch (e) {
            client.log.e('CommandHandler', (e as Error).message);
            await message.channel.send(`Error: \`${(e as Error).message}\``);
        }
    }
}