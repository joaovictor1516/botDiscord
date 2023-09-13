const { SlashCommandBuilder } = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
        .setName("git")
        .setDescription("Relembrar os comandos do git"),
        
    async execute(interaction){
        await interaction.reply("Pong!");
    }
}