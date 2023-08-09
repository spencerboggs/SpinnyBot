const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listaliases')
        .setDescription('List the aliases for a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to list the aliases for')
                .setRequired(true)),
    async execute(client, interaction) {
        var user = interaction.options.getUser('user');
        var aliases = JSON.parse(fs.readFileSync(path.resolve('./src/aliases.json'))).aliases;
        
        if (user === undefined) {
            interaction.reply({ content: `Could not find user ${user}`, ephemeral: true });
            return;
        }
        
        var aliasList = [];
        for (var alias in aliases) {
            if (aliases[alias] === user.username) {
                aliasList.push(alias);
            }
        }
        
        if (aliasList.length === 0) {
            interaction.reply({ content: `No aliases found for ${user.username}`, ephemeral: true });
            return;
        }

        interaction.reply({ content: `**Aliases for ${user.username}:**\n${aliasList.join('\n')}`, ephemeral: true });
    },
}