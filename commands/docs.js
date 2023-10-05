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
                },

                {
                    label: "next.js",
                    description: "Documentação do framework NextJS",
                    value:'nextjs'
                },

                {
                    label: "discord.js",
                    description: "Documentação da biblioteca do Discord.js",
                    value: "discordjs"
                },

                {
                    label: "demais documentacoes",
                    description: "Demais documentações",
                    value: "devdocs"
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