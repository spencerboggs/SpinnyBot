const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listcommands')
        .setDescription('List the current auto response commands')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user whose commands you want to list.')
                .setRequired(false)),
    async execute(client, interaction) {
        const obj = JSON.parse(fs.readFileSync(path.resolve('./src/commands.json')));

        try {
            var user = interaction.options.getUser('user');
        } catch (error) {
            var user = null;
        }

        if (!user) {
            var commands = [];
            for (var key in obj) {
                commands.push({ name: key, response: obj[key].res, author: obj[key].author });
            }
            var description = "";
            for (var i = 0; i < commands.length; i++) {
                description += "**" + commands[i].name + " - " + commands[i].response + "** - (" + commands[i].author + ")\n";
            }
            var embed = new Discord.EmbedBuilder()
                .setTitle('List of Commands')
                .setColor('#0099ff')
                .setTimestamp()
                .setFooter({ text: "Made by Spinny2005", iconURL: 'https://i.imgur.com/Sdr974L.png' })
            if (commands.length > 0) {
                embed.setDescription(description);
            } else {
                embed.setDescription('No commands found.');
            }
            interaction.reply({ embeds: [embed], ephemeral: false });
        } else {
            var commands = [];
            for (var key in obj) {
                if (obj[key].id === user.id) {
                    commands.push({ name: key, response: obj[key].res });
                }
            }
            var description = "";
            for (var i = 0; i < commands.length; i++) {
                description += "**" + commands[i].name + " - " + commands[i].response + "**\n";
            }
            var embed = new Discord.EmbedBuilder()
                .setTitle('List of Commands by ' + user.username)
                .setColor('#0099ff')
                .setTimestamp()
                .setFooter({ text: "Made by Spinny2005", iconURL: 'https://i.imgur.com/Sdr974L.png' })
            if (commands.length > 0) {
                embed.setDescription(description);
            } else {
                embed.setDescription('No commands found.');
            }
            interaction.reply({ embeds: [embed], ephemeral: false });
        }
    },
}