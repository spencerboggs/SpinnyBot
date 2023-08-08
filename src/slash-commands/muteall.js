const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('muteall')
        .setDescription('PRIVATE COMMAND - Mute all members in a voice channel'),
    async execute(client, interaction) {
        let voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            interaction.reply({ content: `You must be in a voice channel to use this command.`, ephemeral: true });
            return;
        }
        if (interaction.user.id === '420059335486341122') {
            voiceChannel.members.forEach(member => {
                if (member.user.id === '420059335486341122') {
                    return;
                }
                member.voice.setMute(true);
            });
            interaction.reply({ content: `Muted all members in ${voiceChannel.name}`, ephemeral: true });
        } else {
            interaction.reply({ content: `You do not have permission to use this command`, ephemeral: true });
        }
    },
}