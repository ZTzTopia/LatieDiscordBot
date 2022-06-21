import { GuildMember, Message, TextChannel } from "discord.js";
import { Member } from "../../database/model/MemberModel";
import { EventContext } from "../EventContext";
import CommandHandler from "../../command/CommandHandler";

export default class MessageCreate extends EventContext {
    public async run(message: Message) {
        if (message.author.bot) {
            return;
        }
        
        if (!message.guild) {
            await CommandHandler.handle(this.client, message);
            return;
        }
        
        if (!message.member) {
            await message.guild.members.fetch(message.author.id);
        }

        const self = message.guild.me as GuildMember;
        if (!self.permissions.has('SEND_MESSAGES') || !(message.channel as TextChannel).permissionsFor(self)?.has('SEND_MESSAGES')) {
            return;
        }

        const guildData = await this.client.mongoose.fetchGuild(message.guild.id);
        const memberData = await this.client.mongoose.fetchMember(message.author.id, message.guild.id);

        await this.calculateExp(message, memberData);

        if (message.content.startsWith("myprefix") || message.content.match(new RegExp(`^<@!?${this.client.user?.id as string}>( |)$`))) {
            await message.channel.send(`My prefix for this guild is \`${guildData.prefix}\``);
        }

        await CommandHandler.handle(this.client, message, guildData);
    }

    private async calculateExp(message: Message, memberData: Member) {
        const minExp = 8;
        const maxExp = 16;
        memberData.exp += Math.floor(Math.random() * (maxExp - minExp + 1)) + minExp;

        const multiplier = 8.0;
        const base = 100.0;
        const neededExp = Math.round(Math.pow(multiplier * (memberData.level - 1), 2.0) + base);

        if (memberData.exp >= neededExp) {
            memberData.level += 1;
            memberData.exp -= neededExp;
            await message.channel.send(`Level up! ${memberData.level}`);
        }

        await this.client.mongoose.updateMember(message.author.id, message.guild?.id as string, memberData);
    }
}