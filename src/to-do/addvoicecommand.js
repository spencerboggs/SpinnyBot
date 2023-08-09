const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addvoicecommand')
        .setDescription('Add an auto response command')
        .addStringOption(option =>
            option.setName('phrase')
                .setDescription('The command phrase.')
                .setRequired(true)),
    async execute(client, interaction) {
        // we will get the key initially from the phrase value
        var phrase = interaction.options.getString('phrase');
        phrase = phrase.toLowerCase();
        const obj = JSON.parse(fs.readFileSync(path.resolve('./src/voice-commands.json')));
        // then we will prompt the user to send the mp3 file in the channel
        //interaction.reply({ content: `Please send the mp3 file for the command ${phrase} in this channel.`, ephemeral: true });
        // then we will wait for the user to send the mp3 file
        const filter = m => m.author.id === interaction.user.id;
        // create a collector for the message
        const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });
        collector.on('collect', m => {
            // check if the message has an attachment
            if (m.attachments.size > 0) {
                // check if its an mp3 file
                if (m.attachments.first().name.endsWith('.mp3')) {
                    // add the mp3 to the ./audio-clips folder
                    m.attachments.first().save(path.resolve(`./audio-clips/${phrase}.mp3`));
                    // add the key and value to the json file
                    // save the key as the phrase and the value as the file name
                    obj[phrase] = m.attachments.first().name;
                    interaction.reply({ content: `Added command ${phrase} with response ${m.attachments.first().url}`, ephemeral: true });
                }
                else {
                    interaction.reply({ content: `The file you provided is not a valid mp3 file. Please try again.`, ephemeral: true });
                }
            } else {
                interaction.reply({ content: `You did not provide a valid file. Please try again.`, ephemeral: true });
            }
            collector.stop();
        });
        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.reply({ content: `You did not provide a valid file. Please try again.`, ephemeral: true });
            }
        }
        );
        interaction.reply({ content: `Added command ${phrase}`, ephemeral: true });

    },
}