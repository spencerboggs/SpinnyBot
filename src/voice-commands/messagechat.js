const { join } = require("path");
const { MessageEmbed } = require("discord.js");


module.exports = {
    data: {
        includes: "message chat",
    },
    async execute(client, msg, connection, joinChannel) {
        var words = msg.content.split(" ");
        var index = words.findIndex(word => word.toLowerCase() === "chat");
        words = words.slice(index + 1);
        var input = words.join(" ");
        msg.content = input;
        
        if (msg.content.includes("at")) {
            var atIndex = msg.content.split(" ").findIndex(word => word.toLowerCase() === "at");
            var at = msg.content.split(" ")[atIndex + 1];
            var role = msg.guild.roles.cache.find(role => role.name === at);
            if (role !== undefined) {
                msg.content = msg.content.replace(`at ${at}`, `${role}`);
            } 
        }

        joinChannel.send(`${msg.member.nickname ? msg.member.nickname : msg.member.user.username}: ${msg.content}`);
    },
}
