const { join } = require("path");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        includes: "disconnect",
    },
    async execute(client, msg, connection, joinChannel) {
        var words = msg.content.split(" ");
        var index = words.indexOf("disconnect");
        words = words.slice(index);
        var input = words.join(" ");
        msg.content = input;

        if (msg.content.split(" ")[1] === "all" && (msg.member.id === '420059335486341122' || msg.member.id === '303388836648452096' || msg.member.id === '704360116891418745')) {
            for (var member of msg.member.voice.channel.members) {
                member[1].voice.disconnect();
            }
            return;
        }

        if (msg.content.split(" ")[1] === "me") {
            msg.member.voice.disconnect();
            return;
        }

        var arg = msg.content.split(" ").slice(1).join(" ");
        const path = join(__dirname, "..", "aliases.json");

        if (arg.toLowerCase() in require(path).aliases) {
            arg = require(path).aliases[arg.toLowerCase()];
        }

        let joinedArgs = msg.content.split(" ").slice(1).join("");
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
