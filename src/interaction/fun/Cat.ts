import { CommandInteraction, MessageEmbed } from "discord.js";
import { InteractionContext } from "../InteractionContext";
import { Latie } from "../../base/Latie";
import axios from "axios";

type CatDataType = [
    {
        url: string
    }
]

export default class Cat extends InteractionContext {
	constructor (client: Latie) {
		super(client, {
			name: "cat"
		});

        this.data.setName("cat")
            .setDescription("Gets a random cat picture.");
	}

	public async run_command(interaction: CommandInteraction) {
        await interaction.reply("Fetching cat...");

        const apiUrl = "https://api.thecatapi.com/v1/images/search";
        axios.get<CatDataType>(`${apiUrl}`).then(async res => {
            const data = res.data[0];
            const embed = new MessageEmbed()
                .setDescription(`**[🐱 Meowww..](${data.url})**`)
                .setImage(data.url)
                .setTimestamp();
            await interaction.editReply({ content: "Found one!", embeds: [embed] });
        }).catch(err => {
            throw err;
        });
    }

    run_button: undefined;
}