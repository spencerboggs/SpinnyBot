const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('agerank')
        .setDescription('Rank the ages of the oldest members of the server')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The amount of members to rank.')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('reverse')
                .setDescription('Reverse the order of the ranking.')
                .setRequired(false)),
    async execute(client, interaction) {
        var amount = interaction.options.getInteger('amount');
        if (!amount) {
            amount = 10;
        }

        if (amount > interaction.guild.memberCount) {
            amount = interaction.guild.memberCount;
        }

        var reverse = interaction.options.getBoolean('reverse');
        let members = interaction.guild.members.cache;
        let ages = [];
        for (let [snowflake, member] of members) {
            if (member.user.id === interaction.user.id) {
                ages.push(`**__${member.user.username}__** - ${member.user.createdAt.toDateString()}`);
                continue;
            }
            ages.push(`**${member.user.username}** - ${member.user.createdAt.toDateString()}`);
        }

        if (!reverse) {
            ages.sort((a, b) => {
                let aDate = new Date(a.split(' - ')[1]);
                let bDate = new Date(b.split(' - ')[1]);
                return aDate - bDate;
            });
        } else {
            ages.sort((a, b) => {
                let aDate = new Date(a.split(' - ')[1]);
                let bDate = new Date(b.split(' - ')[1]);
                return bDate - aDate;
            });
        }

        ages = ages.slice(0, amount);

        let ageRankEmbed = new Discord.EmbedBuilder()
            .setTitle(`Age Rank for ${interaction.guild.name}`)
            .setDescription(ages.join('\n'))
            .setFooter({ text: "Made by Spinny2005", iconURL: 'https://i.imgur.com/Sdr974L.png' })
            .setColor("#FFFFFF")
        interaction.reply({ embeds: [ageRankEmbed], ephemeral: false });
    },
}