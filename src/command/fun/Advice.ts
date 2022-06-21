import { Message, MessageEmbed } from "discord.js";
import { CommandContext } from "../CommandContext";
import { Latie } from "../../base/Latie";
import axios from "axios";

type AdviceDataType = {
    message: {
        type: string,
        text: string
    },
    slip: {
        id: number,
        advice: string
    },
    slips: {
        id: number,
        advice: string,
        date: string
    }[]
}

export default class Advice extends CommandContext {
	constructor (client: Latie) {
		super(client, {
			name: "advice"
		});
	}

	public run(message: Message, args: string[]): void {
        let apiUrl = "https://api.adviceslip.com/advice";
        if (args[0]) {
            if (isNaN(parseInt(args[0]))) {
                apiUrl += `/search/${args[0]}`;
            }
            else {
                apiUrl += `/${args[0]}`;
            }
        }

		axios.get<AdviceDataType>(`${apiUrl}`).then(async res => {
            const data = res.data;
            if (data.message?.type) {
                await message.channel.send(data.message.text);
                return;
            }

            const embed = new MessageEmbed()
                .setTitle(`Advice #${data.slip?.id ? data.slip.id : data.slips[0].id}`)
                .setDescription(data.slip?.advice ? data.slip.advice : data.slips[0].advice)
                .setTimestamp();
            await message.channel.send({ embeds: [embed] });
        }).catch(err => {
            throw err;
        });
    }
}