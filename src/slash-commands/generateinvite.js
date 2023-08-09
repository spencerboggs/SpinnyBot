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
        const server = client.guilds.cache.get(serverId);
        if (!server) {
            interaction.reply({ content: `Could not find server with id ${serverId}`, ephemeral: true });
            return;
        }
        const channels = await server.channels.fetch();
        const channelIds = channels.map(channel => channel.id);
        var invite;
        for (var channelId of channelIds) {
            try {
                invite = await client.channels.cache.get(channelId).createInvite({ maxAge: 0, maxUses: 0 });
                break;
            } catch (error) {
                continue;
            }
        }
        interaction.reply({ content: `Invite for ${server.name}: ${invite}`, ephemeral: true });
    },
}