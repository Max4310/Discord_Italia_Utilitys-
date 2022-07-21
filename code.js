const Discord=require("discord.js");
const client = new Discord.Client(
    {intents: 131071, partials: ['MESSAGE', 'CHANNEL', 'REACTION']}
)
client.login("OTgxOTMwMDgyNTY4MzcyMjU0.GmayiA.8Dvpt4PA2GBfsfjDaOm4n1cQZgqhGygNXuufmQ")
const fs = require("fs")

const path = require("path")

client.on("ready",()=>{
    //carico i /command in cache
    client.guilds.cache.forEach(guild=>{ 

        guild.commands.create({
           name : "grado",
           description : "sistema il grando di un utente",
           options : [
               {//argomento utente 
                   name : "target",
                   description : "utente a cui sistemare il grando",
                   type : "USER",
                   required : true
               }
           ],
           name : "stella" , 
           description : "dai la stella ad un utente",
           options : [
               {//utente
                   name : "target" ,
                   description : "utente a cui assegnare la stella",
                   type : "USER",
                   required : true
               }
           ],
           name : "verifica" ,
           description : "verifica un Utente",
           options: [
               { //argomento utente
                   name: "target", 
                   description: "L'utente Da Verificare",
                   type: "USER",
                   required: true
               },
           ],
           name : "delete",
           description : "Elimina Un Messaggio In Presentazioni",
           options: [
               {
                   name : "message",
                   description : "Id messaggio da eliminare",
                   type: "STRING",
                   required : true
               }
           ],
           name : "mute",
           description : "Muta Un Utente",
           options: [
               { //argomento utente
                   name: "user", 
                   description: "utente/bot da mutare",
                   type: "USER",
                   required: true
               },
               { //argomento reason
                    name: "motivo",
                    description: "motivo del mute",
                    type: "STRING",
                    required: true
               }
           ],
            name: "regole",
            description: "Mostra la Regola Richiesta",
            options: [
                {
                    name: "regola",
                    description: "Regola da visualizzare",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "Termini di Servizio e Linee Guida",
                            value: "reg0"
                        },
                        {
                            name: "Regola 1 - Dati Sensibili",
                            value: "reg1"
                        },
                        {
                            name: "Regola 2 - Bullismo",
                            value: "reg2"
                        },
                        {
                            name: "Regola 3 - Immagini Esplicite",
                            value: "reg3"
                        },
                        {
                            name: "Regola 4 - Spoiler",
                            value: "reg4"
                        },
                        {
                            name: "Regola 5 - Pubblicita'",
                            value: "reg5"
                        },
                        
                    ]   
                }
            ],
            
            name: "prefissi",
            description: "mostra tutti i prefissi",
            options: null,

            name: "info",
            description: "member info",
            options: [{
                name: "member",
                type: "USER",
                description: "il membro",
                required: false
            }],
            
            name: "prefissi",
            description: "mostra tutti i prefissi",
            options: null,
        })
    })

    console.log("bot online")
})

client.on("guildMemberAdd", (member) => { //guildMemberAdd.js
    try{
        const guildMemberAdd = require (path.join(__dirname,"/codici/guildMemberAdd.js"))
        guildMemberAdd.menager(member)
    }catch(err){
        console.log(err)
    }
    
})

client.on("messageCreate", message =>{ // messageCreate.js
    try{
        const messageCreate = require (path.join(__dirname,"/codici/messageCreate.js"))
        messageCreate.menager(message)
    }catch(err){
        console.log(err)
    }
})

client.on("interactionCreate", (interaction) => { //interactionCreate.js
    try{
        const interactionCreate = require (path.join(__dirname,"/codici/interactionCreate.js"))
        interactionCreate.menager(interaction)
    }catch(err){
        console.log(err)
    }
})

client.on("messageDelete", (message)=>{ //messageDelete.js
    try{
        const messageDelete = require (path.join(__dirname,"/codici/messageDelete.js"))
        messageDelete.menager(message)
    }catch(err){
        console.log(err)
    }
})

client.on('messageReactionAdd', (reaction, user) => { //messageReactionAdd.js
    try{
        const messageReactionAdd = require (path.join(__dirname,"/codici/messageReactionAdd.js"))
        messageReactionAdd.menager(reaction, user)
    }catch(err){
        console.log(err)
    }
});