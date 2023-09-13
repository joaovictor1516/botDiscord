//esta pasta e usada apenas uma vez para a criacao de uma nova funcionalidade e para excuir a mesma.

const { REST, Routes } = require('discord.js'); 
const dotenv = require('dotenv');

dotenv.config();
const {TOKEN, CLIEND_ID, GUILD_ID} = process.env;

const path = require('node:path');
const fs = require('node:fs');
const commandsPath = path.join(__dirname, "commands");
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const commands = [];

for(const file of commandsFiles){
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

//instancia REST
const rest = new REST({version: "10"}).setToken(TOKEN);

(async () => {
    try{
        console.log(`resetando ${commands.length} comando(s)...`);

        //put
        const data = await rest.put(Routes.applicationGuildCommands(CLIEND_ID, GUILD_ID), {body: commands}) 
        //criando comandos para um servidor especifico, isto e importante para ter um maior controle nos testes do bot.

        console.log("comandos registrados com sucesso");
    }
    catch(error){
        console.error(error);
    }
})();