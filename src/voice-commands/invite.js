const { join } = require("path");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        includes: "invite",
    },
    async execute(client, msg, connection, joinChannel) {
        var words = msg.content.split(" ");
        var index = words.indexOf("invite");
        words = words.slice(index);
        var input = words.join(" ");
        msg.content = input;


        if (msg.content.split(" ")[1] === "all" || msg.content.split(" ")[1] === "everyone") {
            var everyoneRole = msg.guild.roles.cache.find(role => role.name === "@everyone");
            joinChannel.send(`${everyoneRole} - ${msg.member} wants you to join ${msg.member.voice.channel}`);
        }

        var arg = msg.content.split(" ").slice(1).join(" ");

        // if the word is the name of a role, then ping the role
        var role = msg.guild.roles.cache.find(role => role.name === arg);
        if (role !== undefined) {
            joinChannel.send(`${role} - ${msg.member} wants you to join ${msg.member.voice.channel}`);
            return;
        }

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
        joinChannel.send(`${user} - ${msg.member} wants you to join ${msg.member.voice.channel}`);
    },
}
