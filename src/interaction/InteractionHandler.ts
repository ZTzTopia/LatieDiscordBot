import { Interaction, MessageInteraction } from "discord.js";
import { Latie } from "../base/Latie";

export default class InteractionContext {
    static async handle(client: Latie, interaction: Interaction) {
        if (interaction.isCommand()) {
            const interaction_ = client.interactionManager.interactions.get(interaction.commandName);
            try {
                if (interaction_ && interaction_.run_command) {
                    interaction_.run_command(interaction);
                }
                else {
                    await interaction.reply({ content: "This interaction command not implemented." });
                }
            }
            catch (e) {
                client.log.e("InteractionHandler", (e as Error).message);
                await interaction.reply({ content: `Error: \`${(e as Error).message}\`` });
            }
        }
        else if (interaction.isButton()) {
            const interaction_ = client.interactionManager.interactions.get((<MessageInteraction>interaction.message.interaction).commandName);
            try {
                if (interaction_ && interaction_.run_button) {
                    interaction_.run_button(interaction);
                }
                else {
                    await interaction.update({ content: "This interaction button not implemented.", components: [] });
                }
            }
            catch (e) {
                client.log.e("InteractionHandler", (e as Error).message);
                await interaction.update({ content: `Error: \`${(e as Error).message}\``, components: [] });
            }
        }
    }
}