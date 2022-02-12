import { model, Schema } from "mongoose";
import { config } from "../../Config";

export interface Guild extends Document {
    id: string;
    prefix: string;
}

const guild = new Schema<Guild>({
    id: { // Guild id.
        type: String 
    },
    prefix: { // Guild bot prefix.
        type: String, 
        default: config.prefix 
    }
})

export const guildModel = model<Guild>('Guild', guild);