const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Invite Spinny Bot to your server'),
    async execute(client, interaction) {
        let inviteEmbed = new Discord.EmbedBuilder()
            .setTitle("**Invite Spinny Bot 2.0**")
            .setURL('https://discord.com/api/oauth2/authorize?client_id=1076961852564701184&permissions=8&scope=bot')
            .setFooter({ text: "Made by Spinny2005", iconURL: 'https://i.imgur.com/Sdr974L.png' })
            .setColor("#FFFFFF")
        interaction.reply({ embeds: [inviteEmbed], ephemeral: true });
    },
}