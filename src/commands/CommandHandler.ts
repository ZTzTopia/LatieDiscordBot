import { Guild, GuildMember, Message, TextChannel } from "discord.js";
import { IGuild } from "src/database/model/GuildModel";
import { Latie } from "../base/Latie";

export default class CommandHandler {
    static async handle(client: Latie, message: Message, guildData: IGuild) {
        const self = (message.guild as Guild).me as GuildMember;
        if (!self.permissions.has('SEND_MESSAGES') || !(message.channel as TextChannel).permissionsFor(self)?.has('SEND_MESSAGES')) {
            return;
        }

        const args = message.content.slice(guildData.prefix.length).split(/ +/);
        const commandName = args.shift()?.toLowerCase();
        const command = client.command.commands.get(commandName as string);
        if (!command) {
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