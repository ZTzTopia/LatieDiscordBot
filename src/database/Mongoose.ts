import { Collection } from "discord.js";
import { Latie } from "../base/Latie";
import { guildModel, Guild } from "./model/GuildModel";
import { memberModel, Member } from "./model/MemberModel";
import mongoose from "mongoose";

export class Mongoose {
    client: Latie;
    guildDataCache: Collection<string, Guild>;
    // TODO: fix this to use id and guildId.
    memberDataCache: Collection<{ id: string, guildId: string }, Member>;

    public constructor(client: Latie) {
        this.client = client;
        this.guildDataCache = new Collection();
        this.memberDataCache = new Collection();
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

    public async fetchMember(memberId: string, guildId: string): Promise<Member> {
        if (this.memberDataCache.has({ id: memberId, guildId: guildId })) {
            return this.memberDataCache.get({ id: memberId, guildId: guildId }) as Member;
        }

        let memberData = await memberModel.findOne({ id: memberId, guildId: guildId }).exec();
        if (!memberData) {
            memberData = new memberModel({
                id: memberId,
                guildId: guildId
            });

            await memberData.save()
        }

        this.memberDataCache.set({ id: memberId, guildId: guildId }, memberData);
        return memberData;
    }

    public async updateMember(memberId: string, guildId: string, memberData: Member): Promise<void> {
        await memberModel.findOneAndUpdate({ id: memberId, guildId: guildId }, memberData).exec();
        this.memberDataCache.set({ id: memberId, guildId: guildId }, memberData);
    }
}