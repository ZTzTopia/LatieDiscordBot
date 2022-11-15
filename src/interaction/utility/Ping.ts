import {CommandInteraction} from "discord.js";
import {InteractionContext} from "../InteractionContext";
import {Latie} from "../../base/Latie";

export default class Ping extends InteractionContext {
  constructor(client: Latie) {
    super(client, {
      name: "ping"
    });

    this.data.setName("ping")
      .setDescription("Pings the bot.");
  }

  public async run_command(interaction: CommandInteraction): Promise<void> {
    const start = interaction.createdTimestamp;
    await interaction.reply(":ping_pong: Pinging...");
    const end = new Date().getTime() - start;
    await interaction.editReply(`:ping_pong: Pong! Latency is ${end}ms. API Latency is ${Math.round(this.client.ws.ping)}ms`);
  }

  run_button: undefined;
}