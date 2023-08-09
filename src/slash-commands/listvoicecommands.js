const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listvoicecommands')
        .setDescription('List the voice commands that are available'),
    async execute(client, interaction) {

        // list the keys and values from ./src/voice-commands.json
        // the json file is formatted like this:
        // {
        //     "key": "value",
        //     "key2": "value2"
        // }
        var voiceCommands = JSON.parse(fs.readFileSync(path.resolve('./src/voice-commands.json')));
        var voiceCommandList = [];
        // send the key and value like this "key: value"
        for (var key in voiceCommands) {
            voiceCommandList.push(`__${key}:__ ${voiceCommands[key]}`);
        }
        interaction.reply({ content: `**Voice commands:**\n${voiceCommandList.join('\n')}`, ephemeral: true });
    },
}