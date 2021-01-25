const { Client } = require("discord.js");
const client = new Client();
const { prefix, disagree } = require("../config.json");
const fs = require("fs");
module.exports.noPerms = (message, perm) => {
    message.channel.send(disagree + ' **' + message.author.tag + '** You dont have Permissions `' + perm + '` to do that.');
}

module.exports.botPerms = (message, perm) => {
    message.channel.send(disagree + ' **' + message.author.tag + '** I dont have Permissions `' + perm + '` to do that.');
}

module.exports.noText = (message) => {
    message.channel.send(disagree + ' **' + message.author.tag + '** Please enter something. ');
}

module.exports.noUser = (message, cmd) => {
    message.channel.send(disagree + ' **' + message.author.tag + '** Please mention a user to ' + cmd + '.');
}

module.exports.noUser2 = (message, cmd) => {
    message.channel.send(disagree + ' **' + message.author.tag + '** You cant ' + cmd + ' yourself.');
}

module.exports.noRole = (message, cmd) => {
    message.channel.send(disagree + ' **' + message.author.tag + '** Please spesify a role to ' + cmd + '.');
}

module.exports.noChannel = (message, cmd) => {
    message.channel.send(disagree + ' **' + message.author.tag + '** Please spesify a channel to ' + cmd + '.');
}

module.exports.highestBot = (message, role) => {
    message.channel.send(disagree + ' **' + message.author.tag + '** My highest role is lower or the same than `' + role + '`, so you cannot assign it.');
}

module.exports.highestMember = (message, role) => {
    message.channel.send(disagree + ' **' + message.author.tag + '** Your highest role is lower or the same than `' + role + '`, so I cannot assign it.');
}

module.exports.hasBeen = (message) => {
    message.channel.send(disagree + ' **' + message.author.tag + '** They aleardy have that role, So I cannot assign it.');
}

module.exports.admin = (message) => {
    message.channel.send(disagree + ' **' + message.author.tag + '** That user is a mod/admin, I can\'t to do that.');
}

module.exports.resStatus = (message, code) => {
    message.channel.send(disagree + ' **' + message.author.tag + '** Error code ' + code + ', Your request cannot be found.');
}

module.exports.ownerBot = (message) => {
    message.channel.send(disagree + ' **' + message.author.tag + '** Only owner the bot can use this **Commands**.');
}

module.exports.noEmoji = (message) => {
    message.channel.send(disagree + ' **' + message.author.tag + '** There are not emojis on this server.');
}

module.exports.bulkE = (message) => {
    message.channel.send(disagree + ' **' + message.author.tag + '** I Can\'t delete message under 14 days or empty message.');
}

module.exports.isNaN = (message) => {
    message.channel.send(disagree + ' **' + message.author.tag + '** That doesn\'t seem to be a valid number.');
}

module.exports.minMax = (message, min, max) => {
    message.channel.send(disagree + ' **' + message.author.tag + '** You need to input a number between ' + min + ' and ' + max);
}

module.exports.noChannel = (message) => {
    message.channel.send(disagree + ' **' + message.author.tag + '** You need entered a channel.');
}

module.exports.noValidChannel = (message) => {
    message.channel.send(disagree + ' **' + message.author.tag + '** You need entered a valid channel');
}

