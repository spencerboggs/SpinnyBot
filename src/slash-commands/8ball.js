const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask the magic 8 ball a question')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question you want to ask the magic 8 ball.')
                .setRequired(true)),
    async execute(client, interaction) {
        var question = interaction.options.getString('question');
        var eightBall = ["It is Certain", "It is decidedly so", "Without a doubt", "Yes- Definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy, try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Dont count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];
        var randomResponse = Math.floor(Math.random() * eightBall.length)
        randomResponse = eightBall[randomResponse]
        interaction.reply({
            content: "Question: " + question + "\nResponse: " + randomResponse, ephemeral: false
        });
    },
}