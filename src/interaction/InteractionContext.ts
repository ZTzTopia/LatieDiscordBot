import {ButtonInteraction, CommandInteraction} from "discord.js";
import {SlashCommandBuilder} from "@discordjs/builders";
import {Latie} from "../base/Latie";

interface IInteractionContext {
  name: string;
}

export abstract class InteractionContext {
  client: Latie;
  context: IInteractionContext;
  data: SlashCommandBuilder;

  public constructor(client: Latie, context: IInteractionContext) {
    this.client = client;
    this.context = context;
    this.data = new SlashCommandBuilder();
  }

  public abstract run_command?(interaction: CommandInteraction): void;

  public abstract run_button?(interaction: ButtonInteraction): void;
}