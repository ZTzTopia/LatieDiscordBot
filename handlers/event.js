const { readdirSync } = require('fs');

module.exports = (client) => {
    let count = 0;
    const load = dirs => {
        const events = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
        for(let file of events) {
            const evt = require(`../events/${dirs}/${file}`);
            let eName = file.split('.')[0];
            client.on(eName, evt.bind(null, client));
            delete require.cache[require.resolve(`../events/${dirs}/${file}`)];
            console.log(`Events: ${eName} Loaded!`);
            count++;
        }
    }
    ['client', 'guild'].forEach(x => load(x));
    console.log(`${count} events loaded!`);
}
