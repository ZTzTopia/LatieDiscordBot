const mongoose = require('mongoose'),
    config = require("../config.js");

const GuildSchema = new mongoose.Schema({
    gId: { type: Number }, // Id of the guild
    gPrefix: { type: String, default: config.prefix } // Custom prefix of the guild
});

module.exports = mongoose.model('Guild', GuildSchema);