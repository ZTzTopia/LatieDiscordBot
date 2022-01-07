import { Message } from "discord.js";
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
        
        if (message.guild && !message.author.bot) {
            if (!message.member) {
                await message.guild.members.fetch(message.author.id);
            }

            const guildData = await this.client.mongoose.fetchGuild(message.guild?.id);

            if (message.content.startsWith("myprefix") || message.content.match(new RegExp(`^<@!?${this.client.user?.id}>( |)$`))) {
                message.channel.send(`My prefix for this guild is \`${guildData.prefix}\``);
            }

            await CommandHandler.handle(this.client, message, guildData);
        }
    }
}