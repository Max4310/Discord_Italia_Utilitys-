const Discord=require("discord.js");

const client = new Discord.Client(
    {intents: 131071, partials: ['MESSAGE', 'CHANNEL', 'REACTION']}
)
client.login("OTgxOTMwMDgyNTY4MzcyMjU0.GmayiA.8Dvpt4PA2GBfsfjDaOm4n1cQZgqhGygNXuufmQ")
const fs = require("fs")
const path = require("path")

var infoTickets = []



client.on("ready",()=>{   

    client.guilds.cache.get("891739229846118461").commands.create({
        name: "prefissi",
        description: "mostra tutti i prefissi",
        options: null,
    })
    client.guilds.cache.get("891739229846118461").commands.create({
        name: "info",
        description: "member info",
        options: [{
            name: "member",
            type: "USER",
            description: "il membro",
            required: false
        }],
    })
    client.guilds.cache.get("891739229846118461").commands.create({
        name : "pattuglie",
        description : "gestisci le pattuglie con questo comando",
        options : [
            {
                name : "target",
                type : "USER",
                description : "l'utente da gestire",
                required : true
            },
            {
                name : "azione", 
                type : "STRING",
                description : "Azione Da Eseguire",
                choices : [
                    {
                        name : "aggiungi",
                        value : "+"
                    },
                    {
                        name : "rimuovi",
                        value : "romano<33"
                    }
                ]
            },
            {
                name : "pattuglia",
                type : "INTEGER",
                description : "pattuglia da modificare",
                choices : [
                    {
                        name : "Pattuglia 1",
                        value : 0
                    },
                    {
                        name : "Pattuglia 2",
                        value : 1
                    },
                    {
                        name : "Pattuglia 3",
                        value : 2
                    },
                    {
                        name : "Pattuglia 4",
                        value : 3
                    },
                    {
                        name : "Pattuglia 5",
                        value : 4
                    },
                    {
                        name : "Pattuglia 6",
                        value : 5
                    },
                    {
                        name : "Pattuglia 7",
                        value : 6
                    }
                ]
            }
        ],
    })
    client.guilds.cache.get("891739229846118461").commands.create({
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
    })
    client.guilds.cache.get("891739229846118461").commands.create({
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
    })
    client.guilds.cache.get("891739229846118461").commands.create({
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
    })
    client.guilds.cache.get("891739229846118461").commands.create({
        name : "delete",
        description : "Elimina Un Messaggio In Presentazioni",
        options: [
            {
                name : "message",
                description : "Id messaggio da eliminare",
                type: "STRING",
                required : true
            },
            {
                name : "canale",
                description : "Il Del Messaggio",
                type : "STRING",
                required : true,
                choices : [
                    {
                        name : "Presentazioni",
                        value : "902903625586720798"
                    },
                    {
                        name : "Confession",
                        value : "917102837190770688"
                    },
                    {
                        name : "Recensioni",
                        value : "911622885389508678"
                    },
                    {
                        name : "Nuove Proposte",
                        value : "895331284954513468"
                    },
                    {
                        name : "Selfie",
                        value : "955487659449548820"
                    },
                    {
                        name : "Talent",
                        value : "902570996698083369"
                    },
                ]
            }
        ],
    })
    client.guilds.cache.get("891739229846118461").commands.create({
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
    })
    client.guilds.cache.get("891739229846118461").commands.create({
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
    })
    client.guilds.cache.get("891739229846118461").commands.create({ 
        name: "add",
        description: "Aggiunge un Utente al Ticket",
        options: [
            {
                name: "utente",
                type: "USER",
                description: "Utente da Aggiungere al Ticket",
                required: true
            }
        ]
    })
    client.guilds.cache.get("891739229846118461").commands.create({ 
        name: "remove",
        description: "Rimuove un Utente al Ticket",
        options: [
            {
                name: "utente",
                type: "USER",
                description: "Utente da Rimuovere dal Ticket",
                required: true
            }
        ]
    })
    client.guilds.cache.get("891739229846118461").commands.create({
        name: "close",
        description: "Chiude il Ticket",
        options: [
          {
              name: "reason",
              type: "STRING",
              description: "the reason",
              required: true
          }
        ]
    })
    
    try{
        const reset = require (path.join(__dirname,"/codici/reset.js"))
        reset.reset(client)
    }catch(err){
        console.log(err)
    }
    
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
        interactionCreate.menager(interaction,client,infoTickets)
    }catch(err){
        console.log(err)
    }
})


client.on("messageDelete", (message)=>{ //messageDelete.js
    try{
        const messageDelete = require (path.join(__dirname,"/codici/messageDelete.js"))
        messageDelete.menager(message,client)
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

client.on("guildMemberRemove", member => {
    //guildMemberRemove.js
    try{
        const guildMemberRemove = require (path.join(__dirname,"/codici/guildMemberRemove.js"))
        guildMemberRemove.menager(member,infoTickets)
    }catch(err){
        console.log(err)
    }
})