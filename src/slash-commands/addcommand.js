const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addcommand')
        .setDescription('Add an auto response command')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the command.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('response')
                .setDescription('The response of the command.')
                .setRequired(true)),
    async execute(client, interaction) {
        var name = interaction.options.getString('name');
        name = name.toLowerCase();
        var response = interaction.options.getString('response');
        const obj = JSON.parse(fs.readFileSync(path.resolve('./src/commands.json')));

        if (obj[name]) {
            interaction.reply({ content: `Command '${name}' already exists. If you created this command please use /editcommand or /removecommand.\nTo list all of your commands use /listcommands @username`, ephemeral: true });
            return;
        }

        obj[name] = { "res": response, "author": interaction.user.username, "id": interaction.user.id };
        fs.writeFileSync(path.resolve('./src/commands.json'), JSON.stringify(obj));
        interaction.reply({ content: `Added command ${name} with response ${response}`, ephemeral: true });
    },
}