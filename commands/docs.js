const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId("select")
            .setPlaceholder("Nenhma opção selecionada")
            .addOptions(
                {
                label: "javascript",
                description: "Documentação da linguagem JavaScript",
                value: "javascript"
                },
                
                {
                    label: "angular",
                    description: "Documentação do framework Angular",
                    value: "angular"
                },

                {
                    label: "react",
                    description: "Documentação do framework React",
                    value: "react"
                }
            )
    )

module.exports = {
    data: new SlashCommandBuilder()
        .setName("docs")
        .setDescription("Mostra a documentação de algumas tecnologias"),
        
    async execute(interaction){
        await interaction.reply({ content: "Selecione uma opção", components: [row] });
    }
}