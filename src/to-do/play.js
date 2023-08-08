const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { createAudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a video from YouTube')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('The YouTube URL to play.')
                .setRequired(true)),
    async execute(client, interaction) {
        // get the voice channel the user is in
        const voiceChannel = interaction.member.voice.channel;
        // if the user is not in a voice channel, return
        if (!voiceChannel) {
            return interaction.reply({ content: 'You must be in a voice channel to use this command', ephemeral: true });
        }
        // join the voice channel
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        // play the audio if the link is valid
        const validLink = ytdl.validateURL(interaction.options.getString('url'));
        if (!validLink) {
            return interaction.reply({ content: 'Invalid YouTube URL', ephemeral: true });
        }

        const url = interaction.options.getString('url');
        const stream = ytdl(url, { filter: 'audioonly' });
        const resource = createAudioResource(stream);
        const player = createAudioPlayer();

        player.play(resource);
        connection.subscribe(player);
        interaction.reply({ content: `Playing ${url} in ${voiceChannel.name}`, ephemeral: true })

        // export the player so we can stop it later
        module.exports.player = player;
        module.exports.connection = connection;
        interaction.reply({ content: `This command is currently disabled`, ephemeral: true })
    },
}