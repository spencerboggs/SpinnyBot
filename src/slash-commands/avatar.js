const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Display your avatar or another users avatar')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user whose avatar you want to display.')
                .setRequired(false)),
    async execute(client, interaction) {
        var user = interaction.options.getUser('user');
        if (!user) {
            user = interaction.user;
        }
        let avatarEmbed = new Discord.EmbedBuilder()
            .setTitle(`${user.username}'s Avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor("#FFFFFF")
        interaction.reply({ embeds: [avatarEmbed], ephemeral: false });
    },
}