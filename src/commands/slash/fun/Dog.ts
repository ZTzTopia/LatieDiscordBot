import { CommandInteraction, MessageEmbed } from "discord.js";
import { SlashCommandContext } from "../SlashCommandContext";
import { Latie } from "../../../base/Latie";
import axios from "axios";

type DogDataType = {
    message: string
}

export default class Dog extends SlashCommandContext {
	constructor (client: Latie) {
		super(client, {
			name: "dog"
		});

        this.data.setName("dog")
            .setDescription("Gets a random dog picture.");
	}

	public async run(commandInteraction: CommandInteraction) {
        await commandInteraction.reply("Fetching dog...");

        const apiUrl = "https://dog.ceo/api/breeds/image/random";
        axios.get<DogDataType>(`${apiUrl}`).then(async res => {
            const data = res.data;
            const embed = new MessageEmbed()
                .setDescription(`**[🐶 Woof!](${data.message})**`)
                .setImage(data.message)
                .setTimestamp();
            await commandInteraction.editReply({ content: "Found one!", embeds: [embed] });
        }).catch(err => {
            throw err;
        });
    }
}