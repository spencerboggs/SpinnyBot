const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Get one or all users\' info')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user whose info you want to display.')
                .setRequired(false)),
    async execute(client, interaction) {
        var user = interaction.options.getUser('user');
        if (!user) {
            let users = [];
            interaction.guild.members.fetch().then(members => {
                members.forEach(member => {
                    let username = member.user.username;
                    let id = member.user.id;
                    let avatar = member.user.displayAvatarURL({ dynamic: true, size: 512 });
                    let joinDate = member.joinedAt;
                    let registeredDate = member.user.createdAt;
                    let roles = member.roles.cache.map(role => role.name).join(' ');
                    roles = roles.replace('@everyone', '');
                    let userEmbed = new Discord.EmbedBuilder()
                        .setTitle(`${username}'s Info`)
                        .setThumbnail(avatar)
                        .setTimestamp()
                        .setFooter({ text: "Made by Spinny2005", iconURL: 'https://i.imgur.com/Sdr974L.png' })
                        .setColor("#FFFFFF")
                        .addFields({ name: 'Username', value: `${username}` || "Unknown", inline: true })
                        .addFields({ name: 'ID', value: `${id}` || "Unknown", inline: true })
                        .addFields({ name: 'Join Date', value: `${joinDate}` || "Unknown" })
                        .addFields({ name: 'Registered Date', value: `${registeredDate}` || "Unknown" })
                        .addFields({ name: 'Roles', value: `${roles}` || "None" })
                    users.push(userEmbed);
                });
                console.log(users.length);
                interaction.reply({ content: `Sending all users info in DMs`, ephemeral: true });

                for (let i = 0; i < users.length; i += 10) {
                    interaction.user.send({ embeds: users.slice(i, i + 10) });
                }
                interaction.user.send({ content: `All users info have been sent. ${users.length} users were found.`, ephemeral: true });
            });
        } else {
            let username = user.username;
            let id = user.id;
            let avatar = user.displayAvatarURL({ dynamic: true, size: 512 });
            let joinDate = interaction.guild.members.cache.get(user.id).joinedAt;
            let registeredDate = user.createdAt;
            let roles = interaction.guild.members.cache.get(user.id).roles.cache.map(role => `<@&${role.id}>`).join(' ');
            roles = roles.replace('<@&' + interaction.guild.id + '>', '');
            // then we create an embed for the user
            let userEmbed = new Discord.EmbedBuilder()
                .setTitle(`${username}'s Info`)
                .setThumbnail(avatar)
                .setTimestamp()
                .setFooter({ text: "Made by Spinny2005", iconURL: 'https://i.imgur.com/Sdr974L.png' })
                .setColor("#FFFFFF")
                .addFields({ name: 'Username', value: `${username}` || "Unknown", inline: true })
                .addFields({ name: 'ID', value: `${id}` || "Unknown", inline: true })
                .addFields({ name: 'Join Date', value: `${joinDate}` || "Unknown" })
                .addFields({ name: 'Registered Date', value: `${registeredDate}` || "Unknown" })
                .addFields({ name: 'Roles', value: `${roles}` || "None" })
            interaction.reply({ embeds: [userEmbed], ephemeral: true });
        }
    },
}