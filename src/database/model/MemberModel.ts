import { model, Schema } from "mongoose";

export interface Member extends Document {
    id: string;
    guildId: string;
    exp: number;
    level: number;
} // Level of the user

const member = new Schema<Member>({
    id: { // Discord id of the user.
        type: String 
    },
    guildId: { // The guild discord id of this user.
        type: String
    },
    exp: { 
        type: Number, 
        default: 0 
    },
    level: { 
        type: Number, 
        default: 1
    }
})

export const memberModel = model<Member>('Member', member);