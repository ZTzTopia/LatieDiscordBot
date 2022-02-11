import { Collection } from "discord.js";
import { Latie } from "../base/Latie";
import { guildModel, Guild } from "./model/GuildModel";
import mongoose from "mongoose";

export class Mongoose {
    client: Latie;
    guildDataCache: Collection<string, Guild>;

    public constructor(client: Latie) {
        this.client = client;
        this.guildDataCache = new Collection();
    }

    public connect(mongooseconnectionstring: string) {
        mongoose
            .connect(mongooseconnectionstring)
            .then(() => this.client.log.i("Database", "Succesfuly connected!"))
            .catch((e: Error) => this.client.log.e("Database", e.message));
    }

    public async fetchGuild(guildId: string): Promise<Guild> {
        if (this.guildDataCache.has(guildId)) {
            return this.guildDataCache.get(guildId) as Guild;
        }

        let guildData = await guildModel.findOne({ id: guildId }).exec();
        if (!guildData) {
            guildData = new guildModel({
                id: guildId,
                prefix: this.client.config.prefix
            });

            await guildData.save()
        }

        this.guildDataCache.set(guildId, guildData);
        return guildData;
    }

    public async updateGuild(guildId: string, guildData: Guild): Promise<void> {
        await guildModel.findOneAndUpdate({ id: guildId }, guildData).exec();
        this.guildDataCache.set(guildId, guildData);
    }
}