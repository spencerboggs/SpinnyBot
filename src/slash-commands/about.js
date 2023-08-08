const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('About Spinny Bot 2.0'),
    async execute(client, interaction) {
        let aboutEmbed = new Discord.EmbedBuilder()
            .setTitle("**About Spinny Bot 2.0**")
            .setDescription("Spinny Bot 2.0 is a Discord bot created by Spinny2005.\n https://spencerboggs.github.io/Spinny-Bot-2.0/")
            .setFooter({ text: "Made by Spinny2005", iconURL: 'https://i.imgur.com/Sdr974L.png' })
            .setColor("#FFFFFF")
        interaction.reply({ embeds: [aboutEmbed], ephemeral: true });
    },
}