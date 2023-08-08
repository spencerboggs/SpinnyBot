const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nicknameall')
        .setDescription('PRIVATE COMMAND - Give all members in the server a nickname')
        .addStringOption(option =>
            option.setName('nickname')
                .setDescription('The nickname to give to all members in the voice channel.')
                .setRequired(true)),
    async execute(client, interaction) {
        let nickname = interaction.options.getString('nickname');
        if (interaction.user.id === '420059335486341122') {
            let nicknames = {};
            client.guilds.cache.forEach(server => {
                nicknames[server.id] = {};
                server.members.cache.forEach(member => {
                    nicknames[server.id][member.id] = member.nickname;
                });
            }
            );

            fs.writeFileSync('./src/nicknames.json', JSON.stringify(nicknames, null, 4));

            client.guilds.cache.forEach(server => {
                server.members.cache.forEach(member => {
                    member.setNickname(nickname);
                });
            }
            );
            interaction.reply({ content: `Changed all nicknames to ${nickname}`, ephemeral: true });
        } else {
            interaction.reply({ content: `You do not have permission to use this command`, ephemeral: true });
        }
    },
}