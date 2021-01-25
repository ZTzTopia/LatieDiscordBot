module.exports = {
    name: "country",
    aliases: [],
    description: "Gets information about a country. ",
    cooldown: [],
    guildOnly: false,
    usage: ['<countryName>'],
    example: ["Indonesia"]
};

const { MessageEmbed } = require("discord.js");
const unirest = require("unirest");
const errors = require("../../module/errors.js");
const help = require("../../module/help.js");
module.exports.run = async (bot, message, args, suffix) => {
    unirest.get("https://restcountries.eu/rest/v2/name/" + suffix + "?fullText=true")
        .end(result2 => {
            let res = result2.body;

            if (!res) return help.help(message, 'country');
            else if (res.status === 404) return errors.resStatus(message, "404");

            for (let i = 0; i < res.length; i++) {
                let country = new MessageEmbed();
                let capital = res[i].capital || "N/A";
                let code = res[i].alpha2Code || "N/A";
                let code2 = res[i].alpha3Code || "N/A";
                let Ccode = res[i].callingCodes || "N/A";
                country.setTitle(res[i].name)
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setDescription("Country Information")
                    .setThumbnail(bot.user.avatarURL)
                    .addField("Capital", capital, true)
                    .addField("Domain", code + ", " + code2, true)
                    .addField("Calling Code", "+" + Ccode, true)
                    .addField("Region", res[i].region || "N/A")
                    .addField("Subregion", res[i].subregion || "N/A")
                    .addField("Population", res[i].population || "N/A")
                    .addField("Area", res[i].area + " Square Kilometers" || "N/A")
                    .addField("Timezones", res[i].timezones.join(", ") || "N/A")
                    .addField("Borders", res[i].borders.join(", ") || "N/A", true)
                    .addField("Native Name", res[i].nativeName || "N/A", true)
                    .addField("Demonym", res[i].demonym || "N/A", true)
                    .addField("Alternate Names", res[i].altSpellings.join(", ") || "N/A")
                    .addField("Flag", res[i].flag || "N/A")
                    .setFooter("Powered by restcountries.eu")
                    .setTimestamp();

                message.channel.send({ embed: country });
            }
        });
};
