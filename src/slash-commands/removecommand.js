const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removecommand')
        .setDescription('Remove an auto response command')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the command.')
                .setRequired(true)),
    async execute(client, interaction) {
        var name = interaction.options.getString('name');
        name = name.toLowerCase();
        const obj = JSON.parse(fs.readFileSync(path.resolve('./src/commands.json')));

        if (obj[name] && obj[name].id === interaction.user.id) {
            delete obj[name];
            fs.writeFileSync(path.resolve('./src/commands.json'), JSON.stringify(obj));
            interaction.reply({ content: `Removed command ${name}`, ephemeral: true });
        } else {
            interaction.reply({ content: `Command '${name}' does not exist or you do not have permission to remove it.`, ephemeral: true });
        }
    },
}