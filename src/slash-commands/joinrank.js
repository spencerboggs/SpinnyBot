const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joinrank')
        .setDescription('Rank the join dates of the members of the server')
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
        let joins = [];
        for (let [snowflake, member] of members) {
            if (member.user.id === interaction.user.id) {
                joins.push(`**__${member.user.username}__** - ${member.joinedAt.toDateString()}`);
                continue;
            }
            joins.push(`**${member.user.username}** - ${member.joinedAt.toDateString()}`);
        }

        if (!reverse) {
            joins.sort((a, b) => {
                let aDate = new Date(a.split(' - ')[1]);
                let bDate = new Date(b.split(' - ')[1]);
                return aDate - bDate;
            });
        } else {
            joins.sort((a, b) => {
                let aDate = new Date(a.split(' - ')[1]);
                let bDate = new Date(b.split(' - ')[1]);
                return bDate - aDate;
            });
        }

        joins = joins.slice(0, amount);

        let ageRankEmbed = new Discord.EmbedBuilder()
            .setTitle(`Join Rank for ${interaction.guild.name}`)
            .setDescription(joins.join('\n'))
            .setFooter({ text: "Made by Spinny2005", iconURL: 'https://i.imgur.com/Sdr974L.png' })
            .setColor("#FFFFFF")
        interaction.reply({ embeds: [ageRankEmbed], ephemeral: false });
    },
}