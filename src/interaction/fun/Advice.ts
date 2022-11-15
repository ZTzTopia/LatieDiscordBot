import {CommandInteraction, EmbedBuilder} from "discord.js";
import {InteractionContext} from "../InteractionContext";
import {Latie} from "../../base/Latie";
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

export default class Cat extends InteractionContext {
  constructor(client: Latie) {
    super(client, {
      name: "advice"
    });

    this.data.setName("advice")
      .setDescription("Gets a random advice.");
  }

  public async run_command(interaction: CommandInteraction) {
    await interaction.reply("Fetching advice...");

    const apiUrl = "https://api.adviceslip.com/advice";
    axios.get<AdviceDataType>(`${apiUrl}`).then(async res => {
      const data = res.data;
      if (data.message?.type) {
        return await interaction.editReply({content: data.message.text});
      }

      const embed = new EmbedBuilder()
          .setTitle(`Advice #${data.slip?.id ? data.slip.id : data.slips[0].id}`)
          .setDescription(data.slip?.advice ? data.slip.advice : data.slips[0].advice)
          .setTimestamp();
      await interaction.editReply({content: "Found one!", embeds: [embed]});
    }).catch(err => {
      throw err;
    });
  }

  run_button: undefined;
}