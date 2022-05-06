import { Message, MessageEmbed } from "discord.js";
import { CommandContext } from "../CommandContext";
import { Latie } from "../../../base/Latie";

export default class Uptime extends CommandContext {
	constructor (client: Latie) {
		super(client, {
			name: "uptime"
		});
	}

	public async run(message: Message): Promise<void> {
		const date = new Date(this.client.uptime as number);
        const lastStarted = new Date(new Date().getTime() - (this.client.uptime as number));
        const days = date.getUTCDate() - 1;
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        const formatted = `${days > 0 ? `${days} days, ` : ""}${hours > 0 ? `${hours} hours, ` : ""}${minutes > 0 ? `${minutes} minutes, ` : ""}${seconds > 0 ? `${seconds} seconds ` : ""}`;

        const embed = new MessageEmbed()
            .setTitle("Uptime")
            .setDescription(`I have been online for ${formatted}`)
            .setFooter({
                text: `PID ${process.pid} | Shard ${message.guild?.shard.id as number} | Last started ${this.getTimeSince(lastStarted)}`
            });
        await message.channel.send({ embeds: [embed] });
    }

    private getDuration(timeAgoInSeconds: number) {
        const epochs = [
            [ "year", 31536000 ],
            [ "month", 2592000 ],
            [ "day", 86400 ],
            [ "hour", 3600 ],
            [ "minute", 60 ],
            [ "second", 1 ]
        ];

        for (const [name, seconds] of epochs) {
            const interval = Math.floor(timeAgoInSeconds / (seconds as number));
            if (interval >= 1) {
                return {
                    interval: interval,
                    epoch: name
                };
            }
        }
    }

    private getTimeSince(date: Date): string {
        const timeAgoInSeconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        const duration = this.getDuration(timeAgoInSeconds);
        if (!duration) {
            return "0 second ago";
        }

        const suffix = duration.interval === 1 ? "" : "s";
        return `${duration.interval} ${duration.epoch}${suffix} ago`;
    }
}