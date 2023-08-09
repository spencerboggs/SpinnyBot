const { join } = require("path");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        includes: "mods crush",
    },
    async execute(client, msg, connection, joinChannel) {
        var words = msg.content.split(" ");
        var index = words.findIndex(word => word.toLowerCase() === "crush");
        words = words.slice(index + 1);
        var input = words.join(" ");
        msg.content = input;

        // find and replace skull
        if (msg.content.includes("skull")) {
            var skullIndex = msg.content.split(" ").findIndex(word => word.toLowerCase() === "skull");
            msg.content = msg.content.replace("skull", "");
        }

        // it could be detecrted as school, so check for that
        if (msg.content.includes("school")) {
            var schoolIndex = msg.content.split(" ").findIndex(word => word.toLowerCase() === "school");
            msg.content = msg.content.replace("school", "");
        }

        if (msg.content.split(" ")[0] === "everyone's" || msg.content.split(" ")[0] === "everyone") {
            for (var member of msg.member.voice.channel.members) {
                member[1].voice.disconnect();
            }
            return;
        }

        // if the word is 'my', then disconnect the user
        if (msg.content.split(" ")[0] === "my") {
            msg.member.voice.disconnect();
            return;
        }

        var arg = msg.content.split(" ").slice(0).join(" ");
        const path = join(__dirname, "..", "aliases.json");

        if (arg.toLowerCase() in require(path).aliases) {
            arg = require(path).aliases[arg.toLowerCase()];
        }

        let joinedArgs = msg.content.split(" ").slice(0).join("");
        if (joinedArgs.toLowerCase() in require(path).aliases) {
            arg = require(path).aliases[joinedArgs.toLowerCase()];
        }

        var user = msg.guild.members.cache.find(member => member.nickname === arg || member.displayName === arg || member.user.username === arg);
        if (user === undefined) {
            client.users.cache.get(msg.member.id).send(`**Could not find __${arg}__ in this server**\nIf you would like to create an alias for this user, use the slash command \`/alias <alias> ${arg}\``);
            return;
        }
        user.voice.disconnect();
    },
}