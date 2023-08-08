const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Suggest a feature for Spinny Bot 2.0')
        .addStringOption(option =>
            option.setName('suggestion')
                .setDescription('The suggestion to send.')
                .setRequired(true)),
    async execute(client, interaction) {
        // create a json object with the suggestion
        const suggestion = interaction.options.getString('suggestion');
        // make it { "Suggester.username": "suggestion" }
        const obj = {};
        obj[interaction.user.username] = suggestion;
        // send it to the suggestions.json file
        fs.writeFileSync(path.resolve('./src/suggestions.json'), JSON.stringify(obj));
        // send a message to the user saying that their suggestion was sent
        interaction.reply({ content: `Suggestion sent!`, ephemeral: true });

    },
}