import { CommandInteraction } from "discord.js";
import { Latie } from "../../base/Latie";

export default class SlashCommandContext {
    static async handle(client: Latie, commandInteraction: CommandInteraction) {
        const command = client.slashCommandManager.commands.get(commandInteraction.commandName);
        if (!command) {
            return;
        }

        try {
            command.run(commandInteraction);
        } 
        catch (e) {
            client.log.e("CommandHandler", (e as Error).message);
            await commandInteraction.reply(`Error: \`${(e as Error).message}\``);
        }
    }
}