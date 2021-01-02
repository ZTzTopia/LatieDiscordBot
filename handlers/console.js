module.exports = (client, message) => {
    let y = process.openStdin()
    y.addListener('data', res => {
        let x = res.toString().trim().split(/ +/g);
        const troll = client.users.get('700241332421132328');
        troll.send(x.join(" "));
        console.log("");
    });
}
