import { Collection } from "discord.js";
import { Latie } from "../base/Latie";
import { GuildModel, IGuild } from "./model/GuildModel";

export class Mongoose {
    client: Latie;
    guildDataCache: Collection<string, IGuild>;

    public constructor(client: Latie) {
        this.client = client;
        this.guildDataCache = new Collection();
    }

    public async fetchGuild(guildId: string): Promise<IGuild> {
        if (this.guildDataCache.has(guildId)) {
            return this.guildDataCache.get(guildId) as IGuild;
        }

        let guildData = await GuildModel.findOne({ id: guildId }).exec();
        if (!guildData) {
            guildData = new GuildModel({
                id: guildId,
                prefix: this.client.config.prefix
            });

            await guildData.save()
        }

        this.guildDataCache.set(guildId, guildData);
        return guildData;
    }

    public async updateGuild(guildId: string, guildData: IGuild): Promise<void> {
        await GuildModel.findOneAndUpdate({ id: guildId }, guildData).exec();
        this.guildDataCache.set(guildId, guildData);
    }
}