import {Message, EmbedBuilder} from "discord.js";
import {CommandContext} from "../CommandContext";
import {Latie} from "../../base/Latie";
import os from "os"

export default class Stats extends CommandContext {
  constructor(client: Latie) {
    super(client, {
      name: "stats"
    });
  }

  public async run(message: Message): Promise<void> {
    const date = new Date(this.client.uptime as number);
    const days = date.getUTCDate() - 1;
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const formatted = `${days > 0 ? `${days} days, ` : ""}${hours > 0 ? `${hours} hours, ` : ""}${minutes > 0 ? `${minutes} minutes, ` : ""}${seconds > 0 ? `${seconds} seconds ` : ""}`;

    const embed = new EmbedBuilder()
      .setAuthor({name: this.client.user?.username as string, iconURL: this.client.user?.avatarURL() as string})
      .addFields({name: "Guilds", value: `${this.client.guilds.cache.size}`, inline: true})
      .addFields({
        name: "Users",
        value: `${this.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`,
        inline: true
      })
      .addFields({name: "Host Type", value: `${os.type()}`, inline: true})
      .addFields({name: "Load Avg", value: `${os.loadavg().join(", ")}`, inline: true})
      .addFields({
        name: "Free Mem",
        value: `${this.bytesToSize(os.totalmem() - os.freemem())} / ${this.bytesToSize(os.totalmem())}`,
        inline: true
      })
      .addFields({name: "Uptime", value: `${formatted}`, inline: true})
      .setFooter({
        text: `PID ${process.pid} | Shard ${message.guild?.shard.id as number}`
      })
      .setTimestamp();
    await message.channel.send({embeds: [embed]});
  }

  private bytesToSize(bytes: number, decimals = 3) {
    // https://stackoverflow.com/a/42408230/13257595
    const s = ~~(Math.log2(bytes) / 10);
    return (bytes / Math.pow(1024, s)).toFixed(decimals < 0 ? 0 : decimals) + " " + ("KMGTPEZY"[s - 1] || "") + "B";
  }
}