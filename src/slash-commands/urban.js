const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const urban = require('urban');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('urban')
        .setDescription('Look up a word on Urban Dictionary')
        .addStringOption(option =>
            option.setName('word')
                .setDescription('The word you want to look up.')
                .setRequired(true)),
    async execute(client, interaction) {
        var search = interaction.options.getString('word');
        urban(search).first(res => {
            if (!res) {
                interaction.reply({ content: `No results found for ${search}`, ephemeral: true });
            } else {
                let { word, definition, example, thumbs_up, thumbs_down, permalink, author } = res;
                let urbanEmbed = new Discord.EmbedBuilder()
                    .setTitle(`Urban Dictionary | ${search}`)
                    .setTimestamp()
                    .setFooter({ text: `Written by ${author || "unknown"}` })
                    .setColor("#FFFFFF")
                    .addFields({ name: "Defenition", value: `${definition}` || "No definition" })
                    .addFields({ name: "Example", value: `${example}` || "No example" })
                    .addFields({ name: "Upvote", value: `${thumbs_up}` || 0, inline: true })
                    .addFields({ name: "Downvote", value: `${thumbs_down}` || 0, inline: true })
                    .addFields({ name: "Link", value: `[link to ${word}](${permalink || "https:www.urbandictionary.com/"})` })
                interaction.reply({ embeds: [urbanEmbed], ephemeral: false });
            }
        });
    },
}
