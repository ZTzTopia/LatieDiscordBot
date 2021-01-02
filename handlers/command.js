const { readdirSync } = require('fs');
const { modules } = require('../config.json');
module.exports = (client) => {
	let count = 0;
    const load = dirs => {
        const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'))
        for(let file of commands) {
            const command = require(`../commands/${dirs}/${file}`);
            client.commands.set(command.name, command);
            console.log(`Commands: ${command.name} Loaded!`);
            count++;
        }
    }
    modules.forEach(x => load(x));
    console.log(`${count} commands loaded!`);
}
