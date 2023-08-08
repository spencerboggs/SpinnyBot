const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blacklist')
        .setDescription('PRIVATE COMMAND - Blacklist a server from using Spinny Bot 2.0')
        .addStringOption(option =>
            option.setName('server-id')
                .setDescription('The id of the server to blacklist.')
                .setRequired(true)),
    async execute(client, interaction) {
        var serverId = interaction.options.getString('server-id');
        if (interaction.user.id === '420059335486341122') {
            const obj = JSON.parse(fs.readFileSync(path.resolve('./src/blacklist.json')));

            const guild = await client.guilds.fetch(serverId);
            if (!guild) {
                interaction.reply({ content: `Server ${serverId} does not exist`, ephemeral: true });
                return;
            }

            obj[guild.name] = { "id": serverId };
            fs.writeFileSync(path.resolve('./src/blacklist.json'), JSON.stringify(obj));
            interaction.reply({ content: `Blacklisted server ${guild.name}`, ephemeral: true });
            guild.leave();
        } else {
            interaction.reply({ content: `You do not have permission to use this command`, ephemeral: true });
        }
    },
}