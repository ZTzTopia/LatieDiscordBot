/*      __         __  _      ____        __ 
       / /  ____ _/ /_(_)__  / __ )____  / /_
      / /  / __ `/ __/ / _ \/ __  / __ \/ __/
     / /__/ /_/ / /_/ /  __/ /_/ / /_/ / /_  
    /_____|___/\__/_/\___/_____/\____/\__/ 
                                         
	Latie 3.0.0 By ZTzTopia.
*/

import * as dotenv from "dotenv";
import { Latie } from "./base/Latie"
import mongoose from "mongoose";

dotenv.config();

import moment from "moment-timezone";
moment.locale("en");
moment.tz.setDefault("Asia/Jakarta");

function main(): void {
    const client = new Latie();

    client.login(process.env.BOT_TOKEN).then(() => {
        // Please create new database with name `discord-bot` without quote.
        mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER as string}:${process.env.MONGODB_PASSWORD as string}@${process.env.MONGODB_CLUSTER as string}.mongodb.net/discord-bot?retryWrites=true&w=majority`).then(async () => {
            client.log.i("Mongoose", "Connected to MongoDB.");
            await client.event.load("./events/");
            await client.command.load("./commands/");
        }).catch((e: Error) => client.log.e("Mongoose", e.message));
    }).catch((e: Error) => client.log.e("Bot", e.message));
}

main();
