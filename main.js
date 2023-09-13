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
        console.log(`Data ou execute auxentes no comando ${filePath}`);
    }
}

client.once(Events.ClientReady, (c) => {
    console.log(`Pronto! login bem sucedido do ${c.user.tag}`);
})

client.login(TOKEN);

client.on(Events.InteractionCreate, (interaction) => {
    if(!interaction.isChatInputCommand){
        return;
    }
    console.log(interaction);
})