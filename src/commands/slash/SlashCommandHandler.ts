import { CommandInteraction } from "discord.js";
import { Latie } from "../../base/Latie";

export default class SlashCommandContext {
    static async handle(client: Latie, interaction: CommandInteraction) {
        const command = client.slashCommandManager.commands.get(interaction.commandName);
        if (!command) {
            return;
        }

        try {
            command.run(interaction);
        } 
        catch (e) {
            client.log.e('CommandHandler', (e as Error).message);
            await interaction.reply(`Error: \`${(e as Error).message}\``);
        }
    }
}