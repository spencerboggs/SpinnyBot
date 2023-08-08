const { join } = require("path");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        includes: "leave",
    },
    async execute(client, msg, connection, joinChannel) {
        connection.destroy();
    },
}
