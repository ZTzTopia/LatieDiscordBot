/*      __         __  _      ____        __ 
       / /  ____ _/ /_(_)__  / __ )____  / /_
      / /  / __ `/ __/ / _ \/ __  / __ \/ __/
     / /__/ /_/ / /_/ /  __/ /_/ / /_/ / /_  
    /_____|___/\__/_/\___/_____/\____/\__/ 
                                         
	Latie 3.0.0 By ZTzTopia.
*/

import "dotenv/config";
import { Latie } from "./base/Latie";

const client = new Latie();

// Please create new database with name `discord-bot` without quote.
client.mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER as string}:${process.env.MONGODB_PASSWORD as string}@${process.env.MONGODB_CLUSTER as string}.mongodb.net/discord-bot?retryWrites=true&w=majority`);
client.build("./commands/", "./events/");
