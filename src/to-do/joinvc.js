const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { createAudioPlayer, createAudioResource } = require('@discordjs/voice');
// import the player from play.js
const { player, connection } = require('./play.js');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('join-vc')
        .setDescription('Make Spinny Bot 2.0 join your voice channel'),
    async execute(client, interaction) {
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({ content: 'You must be in a voice channel to use this command', ephemeral: true });
        }

        const voiceConnection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        interaction.reply({ content: `Joined ${voiceChannel.name}`, ephemeral: true })
    },
}