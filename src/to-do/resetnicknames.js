const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resetnicknames')
        .setDescription('PRIVATE COMMAND - Reset all nicknames to their original values'),
    async execute(client, interaction) {
        if (interaction.user.id === '420059335486341122') {
            // Get the nicknames from the nicknames.json file located in the src folder
            let nicknames = require('../nicknames.json');
            // Set the nicknames to their original values
            client.guilds.cache.forEach(server => {
                server.members.cache.forEach(member => {
                    member.setNickname(nicknames[server.id][member.id]);
                });
            }
            );
            interaction.reply({ content: `Reset all nicknames`, ephemeral: true });
        } else {
            interaction.reply({ content: `You do not have permission to use this command`, ephemeral: true });
        }
    },
}