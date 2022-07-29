import {CommandInteraction, EmbedBuilder} from "discord.js";
import {InteractionContext} from "../InteractionContext";
import {Latie} from "../../base/Latie";
import axios from "axios";

type DogDataType = {
  message: string
}

export default class Dog extends InteractionContext {
  constructor(client: Latie) {
    super(client, {
      name: "dog"
    });

    this.data.setName("dog")
      .setDescription("Gets a random dog picture.");
  }

  public async run_command(interaction: CommandInteraction) {
    await interaction.reply("Fetching dog...");

    const apiUrl = "https://dog.ceo/api/breeds/image/random";
    axios.get<DogDataType>(`${apiUrl}`).then(async res => {
      const data = res.data;
      const embed = new EmbedBuilder()
        .setDescription(`**[🐶 Woof!](${data.message})**`)
        .setImage(data.message)
        .setTimestamp();

      await interaction.editReply({content: "Found one!", embeds: [embed]});
    }).catch(err => {
      throw err;
    });
  }

  run_button: undefined;
}