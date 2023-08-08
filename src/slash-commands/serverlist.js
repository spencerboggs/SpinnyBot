const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverlist')
        .setDescription('List the servers Spinny Bot 2.0 is in'),
    async execute(client, interaction) {
        let serverList = client.guilds.cache.map(guild => guild.name + " - " + guild.id).join('\n');
        interaction.reply({ content: `**Servers:**\n${serverList}`, ephemeral: true });
    },
}