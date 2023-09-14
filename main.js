const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();
const {TOKEN} = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//sistema do node para percorrer pelas pastas do projeto 
const path = require('node:path');
const fs = require('node:fs');

//__dirname = nome do diretorio
const commandsPath = path.join(__dirname, "commands");
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

client.commands = new Collection()

for(const file of commandsFiles){
    const filePath = path.join(commandsPath, file);//pega os dados da pasta do comando
    const commands = require(filePath);

    if("data" in commands && "execute" in commands){
        client.commands.set(commands.data.name, commands);
    } else{
        console.log(`data ou execute auxentes no comando ${filePath}`);
    }
}

client.once(Events.ClientReady, (c) => {
    console.log(`pronto! login bem sucedido do ${c.user.tag}`);
})

client.login(TOKEN);

client.on(Events.InteractionCreate, async (interaction) => {
    if(interaction.isStringSelectMenu()){
        const selected = interaction.values[0]

        switch(selected){
            case "javascript": 
                await interaction.reply("Documentação do JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript");
                break;
            
            case "angular":
                await interaction.reply("Documentação do Angular: https://angular.io");
                break;

            case "react":
                await interaction.reply("Documentação do React: https://react.dev");
                break;
            
            case "discordjs":
                await interaction.reply("Documentação do Discord.js: https://discord.js.org");
                break;

            default:
                await interaction.reply("Opção inválida");
                break;
        }
    }

    if(!interaction.isChatInputCommand){
        return;
    }
    
    const command = interaction.client.commands.get(interaction.commandName);
    if(!command){
        console.error("o comando nao foi encontrado");
        return;
    }

    try{
        await command.execute(interaction);
    }
    catch(error){
        console.error(error);
        await interaction.reply(`o comando ${command} nao funcionou`)//informando ao usuário que o comando falhou.
    }
})