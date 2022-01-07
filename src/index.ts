/*      __         __  _      ____        __ 
       / /  ____ _/ /_(_)__  / __ )____  / /_
      / /  / __ `/ __/ / _ \/ __  / __ \/ __/
     / /__/ /_/ / /_/ /  __/ /_/ / /_/ / /_  
    /_____|___/\__/_/\___/_____/\____/\__/ 
                                         
	Latie 3.0.0 By ZTzTopia.
*/

import dotenv from "dotenv";
import { Latie } from "./base/Latie"
import mongoose from "mongoose";

dotenv.config();

import moment from "moment-timezone";
moment.locale("en");
moment.tz.setDefault("Asia/Jakarta");

async function main(): Promise<void> {
    const client = new Latie();

    // Please create new database with name `discord-bot` without quote.
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/discord-bot?retryWrites=true&w=majority`).then(() => {
        client.log.i("Mongoose", "Connected to MongoDB.");
		client.event.load("./events/");
        client.command.load("./commands/");
    }).catch((e: Error) => client.log.e("Mongoose", e.message));

    client.login(process.env.BOT_TOKEN);
}

main();
