const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('updates')
        .setDescription('Display the latest updates to the bot'),
    async execute(client, interaction) {
        const updates = require('../updates.json');
        const date = Object.keys(updates)[0];
        const categories = Object.keys(updates[date]);
        var added = "";
        var changed = "";
        var inProgress = "";
        for (var i = 0; i < categories.length; i++) {
            const features = Object.keys(updates[date][categories[i]]);
            const descriptions = Object.values(updates[date][categories[i]]);
            for (var j = 0; j < features.length; j++) {
                if (categories[i] === "Added") {
                    added += `__${features[j]}__ - ${descriptions[j]}\n`;
                } else if (categories[i] === "Changed") {
                    changed += `__${features[j]}__ - ${descriptions[j]}\n`;
                } else if (categories[i] === "In progress") {
                    inProgress += `__${features[j]}__ - ${descriptions[j]}\n`;
                }
            }
        }

        let embed = new Discord.EmbedBuilder()
            .setTitle(`Updates for ${date}`)
            .setFooter({ text: "Made by Spinny2005", iconURL: 'https://i.imgur.com/Sdr974L.png' })
            .setTimestamp()
            .setColor('#FFFFFF')
            .addFields({ name: "Added Features", value: `${added}` || "No added features" })
            .addFields({ name: "Changed", value: `${changed}` || "No changed features" })
            .addFields({ name: "In progress", value: `${inProgress}` || "No features in progress" });
        interaction.reply({ embeds: [embed], ephemeral: false });
    },
}
