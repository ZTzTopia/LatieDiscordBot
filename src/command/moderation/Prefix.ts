import {Message, PermissionFlagsBits} from "discord.js";
import {CommandContext} from "../CommandContext";
import {Latie} from "../../base/Latie";
import {Guild} from "src/database/model/GuildModel";

export default class Prefix extends CommandContext {
  constructor(client: Latie) {
    super(client, {
      name: "prefix",
      guildOnly: true
    });
  }

  public async run(message: Message, args: string[]): Promise<void> {
    if (!message.member?.permissions.has(PermissionFlagsBits.ManageGuild)) {
      await message.channel.send(`You don't have permission to use this command.`);
      return;
    }

    if (!args[0]) {
      await message.channel.send("You need to specify a new prefix.");
      return;
    }

    await this.client.mongoose.updateGuild(message.guild?.id as string, {
      prefix: args[0]
    } as Guild);
    await message.channel.send(`Guild prefix updated to \`${args[0]}\``);
  }
}