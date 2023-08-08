const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vctroll')
        .setDescription('PRIVATE COMMAND - Make Spinny Bot pretend to be a user in a voice channel')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to pretend to be.')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The voice channel to join.')
                .setRequired(false)),
    async execute(client, interaction) {
        let user = interaction.options.getUser('user');
        let voiceChannel = interaction.options.getChannel('channel');

        if (!voiceChannel) {
            voiceChannel = interaction.member.voice.channel;
        }

        if (!voiceChannel) {
            interaction.reply({ content: `You must provide a voice channel or be in one.`, ephemeral: true });
            return;
        }

        let nickname = user.username;
        if (user.nickname) {
            nickname = user.nickname;
        }
        console.log(nickname);

        let guild = client.guilds.cache.get(voiceChannel.guild.id);
        let bot = guild.members.cache.get(client.user.id);
        bot.setNickname(nickname);

        client.user.setAvatar(user.displayAvatarURL({ dynamic: true, size: 512 }));

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        interaction.reply({ content: `Joined ${voiceChannel.name} as ${nickname}`, ephemeral: true });

    },
}