import { Model, model, Schema } from "mongoose";
import { config } from "../../Config";

export interface IGuild extends Document {
    id: string;
    prefix: string;
}

export const Guild = new Schema<IGuild>({
    id: { 
        type: String 
    },
    prefix: { 
        type: String, 
        default: config.prefix 
    }
})

export const GuildModel: Model<IGuild> = model<IGuild>('Guild', Guild);