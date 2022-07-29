import {
  ButtonInteraction,
  CommandInteraction,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder
} from "discord.js";
import {InteractionContext} from "../InteractionContext";
import {Latie} from "../../base/Latie";

export default class Rps extends InteractionContext {
  constructor(client: Latie) {
    super(client, {
      name: "rps"
    });

    this.data.setName("rps")
      .setDescription("Play a game of rock paper scissors with the bot.");
  }

  public async run_command(interaction: CommandInteraction) {
    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("rock")
          .setLabel("🪨")
          .setStyle(ButtonStyle.Secondary))
      .addComponents(
        new ButtonBuilder()
          .setCustomId("paper")
          .setLabel("📰")
          .setStyle(ButtonStyle.Secondary))
      .addComponents(
        new ButtonBuilder()
          .setCustomId("scissors")
          .setLabel("✂️")
          .setStyle(ButtonStyle.Secondary));

    const embed = new EmbedBuilder()
      .setDescription("Rock, Paper, Scissors!")
      .setTimestamp();

    await interaction.reply({embeds: [embed], components: [row]});
  }

  public async run_button(interaction: ButtonInteraction) {
    const choice = {
      "rock": "🪨",
      "paper": "📰",
      "scissors": "✂️"
    } as { [key: string]: string };

    const choiceId = interaction.customId;
    const botChoice = Object.keys(choice)[Math.floor(Math.random() * Object.keys(choice).length)];
    const winner = this.getWinner(choiceId, botChoice);

    const embed = new EmbedBuilder()
      .setDescription(`You chose ${choice[choiceId]}, the bot chose ${choice[botChoice]}. ${winner}`)
      .setTimestamp();

    await interaction.update({embeds: [embed], components: []});
  }

  private getWinner(choiceId: string, botChoice: string): string {
    if (choiceId === botChoice) {
      return "It's a tie!";
    } else if (choiceId === "rock") {
      return botChoice === "scissors" ? "You win!" : "You lose!";
    } else if (choiceId === "paper") {
      return botChoice === "rock" ? "You win!" : "You lose!";
    } else if (choiceId === "scissors") {
      return botChoice === "paper" ? "You win!" : "You lose!";
    }

    return "";
  }
}
