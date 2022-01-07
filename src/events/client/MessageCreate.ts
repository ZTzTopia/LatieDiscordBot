import { Guild, GuildMember, Message, TextChannel } from "discord.js";
import { Latie } from "../../base/Latie";
import CommandHandler from "../../commands/CommandHandler";
import { IEvent } from "../../utils/Interfaces";

export default class MessageCreate implements IEvent {
    client: Latie;

    constructor(client: Latie) {
		this.client = client;
	}
    
    async run(args: any) {
        const message: Message = args;
        
        if (!message.author.bot) {
            if (message.guild) {
                if (!message.member) {
                    await message.guild.members.fetch(message.author.id);
                }

                const self = (message.guild as Guild).me as GuildMember;
                if (!self.permissions.has('SEND_MESSAGES') || !(message.channel as TextChannel).permissionsFor(self)?.has('SEND_MESSAGES')) {
                    return;
                }

                const guildData = await this.client.mongoose.fetchGuild(message.guild?.id);

                if (message.content.startsWith("myprefix") || message.content.match(new RegExp(`^<@!?${this.client.user?.id}>( |)$`))) {
                    message.channel.send(`My prefix for this guild is \`${guildData.prefix}\``);
                }

                await CommandHandler.handle(this.client, message, guildData);
            }
            else {
                console.log("lol");
                await CommandHandler.handle(this.client, message);
            }
        }
    }
}