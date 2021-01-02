/*
			Latie v0.1
				Developed By xZen78L

		Library: Discord.js
		Database: MySql
*/

//Discord.js
const { Client, Collection } = require('discord.js');

//Client
const client = new Client({ fetchAllMembers: true });

//Config token, prefix, ownerid, etc
const { token, prefix, ownerID } = require('./config.json');

//MySql
const db = require("./configdb.js");

//node_modules
require('dotenv').config();

db.query('CREATE TABLE IF NOT EXISTS `xp` (\
	`id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,\
	`gid` varchar(32) NOT NULL,\
	`uid` varchar(32) NOT NULL,\
	`xp` int(11) NOT NULL,\
	`level` int(11) NOT NULL,\
	`mathXp` int(11) NOT NULL);'
);

db.query('CREATE TABLE IF NOT EXISTS `guildconfig` (\
	`gid` varchar(32) NOT NULL PRIMARY KEY,\
	`prefix` varchar(3) NOT NULL,\
	`wid` varchar(64) NOT NULL,\
	`welcomemsg` varchar(1024) NOT NULL,\
	`lid` varchar(64) NOT NULL,\
	`leavemsg` varchar(1024) NOT NULL,\
	`levelupmsg` varchar(1024) NOT NULL,\
	`language` varchar(12) NOT NULL);'
);

//Handlers
['commands'].forEach(x => client[x] = new Collection());
['console', 'command', 'event'].forEach(x => require(`./handlers/${x}`)(client));

//Bot login
client.login(process.env.BOT_TOKEN || token);
