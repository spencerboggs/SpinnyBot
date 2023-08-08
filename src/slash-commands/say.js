const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Make Spinny Bot say something')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to say.')
                .setRequired(true)),
    async execute(client, interaction) {
        let message = interaction.options.getString('message');
        interaction.deferReply({ ephemeral: true });
        interaction.channel.send({ content: message });
    },
}