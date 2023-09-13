const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("Playlist para ficar ouvindo quando estou estudando"),
        
    async execute(interaction){
        await interaction.reply("https://open.spotify.com/playlist/2Udh4jFsazQsY0wmVZ4W1u?si=9196958c7878482d");
    }
}