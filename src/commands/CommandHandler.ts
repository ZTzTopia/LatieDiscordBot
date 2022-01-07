import { Message } from "discord.js";
import { IGuild } from "src/database/model/GuildModel";
import { Latie } from "../base/Latie";

export default class CommandHandler {
    static async handle(client: Latie, message: Message, guildData?: IGuild) {
        const args = message.content.slice(message.guild ? guildData?.prefix.length : client.config.prefix.length).split(/ +/);
        const commandName = args.shift()?.toLowerCase();
        const command = client.command.commands.get(commandName as string);
        if (!command) {
            return;
        }

        if (!message.guild && command.context.guildOnly) {
            return;
        }

        try {
            await command.run(message, args);
        } 
        catch (e) {
            client.log.e('CommandHandler', (e as Error).message);
            message.channel.send(`Error: \`${(e as Error).message}\``);
        }
    }
}