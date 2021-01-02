module.exports = async (client, err) => {
    console.log(new Date());
    console.log(err);
    console.log(err.Error);
    console.log(err.errno);
    client.destroy().then(client.login(token));
}