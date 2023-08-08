const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('alias')
        .setDescription('Create an alias for a user to use with voice commands')
        .addStringOption(option =>
            option.setName('alias')
                .setDescription('The alias to create')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to create the alias for')
                .setRequired(true)),
    async execute(client, interaction) {
        // get the alias and user
        var alias = interaction.options.getString('alias');
        var user = interaction.options.getUser('user');

        if (user === undefined) {
            interaction.reply({ content: `Could not find user ${user}`, ephemeral: true });
            return;
        }

        const obj = JSON.parse(fs.readFileSync(path.resolve('./src/aliases.json')));
        obj.aliases[alias.toLowerCase()] = user.username;
        fs.writeFileSync(path.resolve('./src/aliases.json'), JSON.stringify(obj));

        interaction.reply({ content: `Created alias ${alias} for ${user.username}`, ephemeral: true });
    },
}