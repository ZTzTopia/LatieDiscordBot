/*      __         __  _      ____        __ 
       / /  ____ _/ /_(_)__  / __ )____  / /_
      / /  / __ `/ __/ / _ \/ __  / __ \/ __/
     / /__/ /_/ / /_/ /  __/ /_/ / /_/ / /_  
    /_____|__,_/\__/_/\___/_____/\____/\__/ 
                                         
	Latie 2.0.0 By ZTzTopia
	Using Discord.js 12.5.3 and MongoDB for the database.

	Credits: AtlantaBot
*/


// .env
require('dotenv').config();

const { readdirSync } = require('fs'),
	mongoose = require('mongoose');

// Create Latie class
const Latie = require("./base/Latie"),
	client = new Latie();

client.on('disconnect', () => client.log.w('disconnect', 'Disconnected.'))
	.on('reconnecting', () => client.log.w('reconnecting', 'Reconnecting..'))
	.on('error', e => client.log.e('error', e))
	.on('warn', w => client.log.w('warn', w));

process.on("rejectionHandled", e => client.log.e('rejectionHandled', e))
	.on("unhandledRejection", e => client.log.e('unhandledRejection', e))
	.on("uncaughtException", e => client.log.e('uncaughtException', e));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_SRV || client.config.MongoDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

// Get MongoDB conection status
mongoose.connection.once('open', () => client.log.i('MongoDB', 'Connected.'))
	.on('error', (err) => client.log.e('MongoDB', err));

client.loadEvents('./events/');
client.loadCommands('./commands/');

// Bot login
client.login(process.env.BOT_TOKEN || client.config.token);