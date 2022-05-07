/*      __         __  _      ____        __ 
       / /  ____ _/ /_(_)__  / __ )____  / /_
      / /  / __ `/ __/ / _ \/ __  / __ \/ __/
     / /__/ /_/ / /_/ /  __/ /_/ / /_/ / /_  
    /_____|___/\__/_/\___/_____/\____/\__/ 
                                         
	Latie 3.1.0 By ZTzTopia.
*/

import "dotenv/config";
import { Latie } from "./base/Latie";

const Client = new Latie();

// Please create new database with name `discordBot` without quote.
let usingSrv = true;
let usingAuthentication = false;
if (process.env.MONGODB_PORT as string) {
    usingSrv = false;
}

if (process.env.MONGODB_USER as string) {
    usingAuthentication = true;
}

(async () => {
    await Client.mongoose.connect(`mongodb${usingSrv ? "srv" : ""}://${usingAuthentication ? (process.env.MONGODB_USER as string) + ":" + (process.env.MONGODB_PASSWORD as string) + "@" : ""}${process.env.MONGODB_URL as string}${usingSrv ? "" : ":" + (process.env.MONGODB_PORT as string)}/discordBot?retryWrites=true&w=majority`);
    await Client.build("./normal/", "./slash/", "./events/");
})().catch(console.error);
