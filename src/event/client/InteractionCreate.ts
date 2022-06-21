import { Interaction } from "discord.js";
import { EventContext } from "../EventContext";
import InteractionHandler from "../../interaction/InteractionHandler";

export default class InteractionCreate extends EventContext {
    public async run(interaction: Interaction) {
        const client = this.client;
        await InteractionHandler.handle(client, interaction);
    }
}