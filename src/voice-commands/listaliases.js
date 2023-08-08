const { join } = require("path");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        includes: "list aliases",
    },
    async execute(client, msg, connection, joinChannel) {
        var words = msg.content.split(" ");
        var index = words.indexOf("aliases");
        words = words.slice(index);
        var input = words.join(" ");
        msg.content = input;

        var arg = msg.content.split(" ").slice(1).join(" ");
        const path = join(__dirname, "..", "aliases.json");

        if (arg.toLowerCase() in require(path).aliases) {
            arg = require(path).aliases[arg.toLowerCase()];
        }

        let joinedArgs = msg.content.split(" ").slice(1).join("");
        if (joinedArgs.toLowerCase() in require(path).aliases) {
            arg = require(path).aliases[joinedArgs.toLowerCase()];
        }

        if (!(arg.toLowerCase() in require(path).aliases)) {
            client.users.cache.get(msg.member.id).send(`**Could not find __${arg}__ in this server**\nIf you would like to create an alias for this user, use the slash command \`/alias <alias> ${arg}\``);
            return;
        }

        arg = require(path).aliases[arg.toLowerCase()];
        var aliasList = "";
        for (var alias in require(path).aliases) {
            if (require(path).aliases[alias] === arg) {
                aliasList += `${alias}\n`;
            }
        }

        client.users.cache.get(msg.member.id).send(`**Aliases for ${arg}:**\n${aliasList}`);
    },
}
