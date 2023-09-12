const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Checa a velocidade de resposta do bot"),
        
    async execute(interaction){
        await interaction.reply("Pong!");
    }
}