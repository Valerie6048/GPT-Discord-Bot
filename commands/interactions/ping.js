const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Shows the bot\'s latency."),

    async execute(client, interaction) {

        await interaction.deferReply();

        const embed = new Discord.EmbedBuilder()
            .setColor(config.MainColor)
            .setAuthor({
                name: `Pong!`,
                iconURL: client.user.displayAvatarURL({ size: 1024 })
            })
            .addFields(
                {
                    name: `📡 Ping:`,
                    value: `${client.ws.ping}ms`,
                    inline: true
                },
                {
                    name: `💾 Memory:`,
                    value: `${Math.round((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}MB`,
                    inline: true
                },
                {
                    name: `⏳ Uptime:`,
                    value: `<t:${Math.trunc(client.readyTimestamp / 1000)}:D> | <t:${Math.trunc(client.readyTimestamp / 1000)}:R>`,
                    inline: false
                },
            )
            .setFooter({
                text: `Commanded by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL({ size: 1024 })
            });

        return await interaction.editReply({ embeds: [embed] });

    },

};