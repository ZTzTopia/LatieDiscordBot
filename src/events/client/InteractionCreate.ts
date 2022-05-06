import { Interaction } from "discord.js";
import { EventContext } from "../EventContext";
import SlashCommandHandler from "../../commands/slash/SlashCommandHandler";

export default class InteractionCreate extends EventContext {
    public async run(interaction: Interaction) {
        const client = this.client;
        
        if (interaction.isCommand()) {
            await SlashCommandHandler.handle(client, interaction);
        }
    }
}