const { SlashCommandBuilder } = require('@discordjs/builders');
const { Discord, Invite } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('generateinvite')
        .setDescription('Generate invites for servers this bot is in.')
        .addStringOption(option =>
            option.setName('server-id')
                .setDescription('The id of the server to generate an invite for.')
                .setRequired(true)),
    async execute(client, interaction) {
        var serverId = interaction.options.getString('server-id');
        var server = client.guilds.cache.get(serverId);
        if (server) {
            var firstChannel = server.channels.cache.first();
            var channel = server.channels.cache.get(firstChannel.id);
            let invite = await channel.createInvite({ maxAge: 0, maxUses: 0, unique: true });
            interaction.reply({ content: `Invite for ${server.name}: ${invite.url}`, ephemeral: false });
        } else {
            interaction.reply({ content: `I am not in a server with this id`, ephemeral: true });
        }
    },
}