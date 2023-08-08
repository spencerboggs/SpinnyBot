const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('PRIVATE COMMAND - Remove Spinny Bot 2.0 from your server'),
    async execute(client, interaction) {
        if (interaction.user.id === '420059335486341122') {
            interaction.reply({ content: `Leaving ${interaction.guild.name}`, ephemeral: true });
            interaction.guild.leave();
        } else {
            interaction.reply({ content: `You do not have permission to use this command`, ephemeral: true });
        }
    },
}