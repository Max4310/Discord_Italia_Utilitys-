const Discord=require("discord.js");
const variabili = require("./variabili.json");
const client = new Discord.Client(
    {intents: 131071, partials: ['MESSAGE', 'CHANNEL', 'REACTION']}
)
client.login("OTgxOTMwMDgyNTY4MzcyMjU0.GgWB_s.cpbb4-1oG_so6-U9fdHe6KFjDzqeyXkbJtPV_k") //utility

//client.login("OTgwNzk2OTQ5NzM1Mjc2NTk0.Gpysym.aAzYr_nRux_Fulr4jN5S_0Epl_OYfzKoRhwLj8") //max prova bot
//client.login("OTkyNzY1NzA3OTgzMDExODkx.GJ94KQ.maWGrZddoqObYjE8Q3yWc57cgtgux55Vgmpq6A")

const fs = require("fs")
const path = require("path")

function sleep(s){
    var now = new Date().getTime();
    while(new Date().getTime() < now + (s*1000)){ /* non faccio niente */ } 
}

const {membro, gestisciVisulizza, isStaff , CoinMember ,aggiona,user,aggiungi} = require("./oggetti");
const { ifError } = require("assert");

var infoTickets = []

client.on("ready",()=>{   
    //GENERALI

    // /prefissi
    client.guilds.cache.get(variabili.discordItalia).commands.create({
        name: "prefissi",
        description: "mostra tutti i prefissi",
        options: null,
    })
    // /info
    client.guilds.cache.get(variabili.discordItalia).commands.create({
        name: "info",
        description: "member info",
        options: [{
            name: "member",
            type: "USER",
            description: "il membro",
            required: false
        }],
    })
    // /regole
    client.guilds.cache.get(variabili.discordItalia).commands.create({
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
    
    // /matrimonio
    client.guilds.cache.get(variabili.discordItalia).commands.create({
        name: "matrimonio",
        description: "fai una proposta di matrimonio ad un utente",
        options: [
            {
                name: "target",
                description: "la persona che si vuole sposare",
                required: true,
                type: "USER"
            }
        ]
    })
    // /divorzia
    client.guilds.cache.get(variabili.discordItalia).commands.create({
        name: "divorzia",
        description: "divorzia dal matrimonio",
        options: null
    })
    // /visualizzamatrimoni
    client.guilds.cache.get(variabili.discordItalia).commands.create({
        name: "visualizzamatrimoni",
        description: "vislizza il matrimonio di una persona",
        options: [
            {
                name: "target",
                description: "la persona che si vuole sposare",
                required: false,
                type: "USER"
            }
        ]

    })


    // STAFF

    // /pattuglie
    client.guilds.cache.get(variabili.discordItalia).commands.create({
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
    // /grado
    client.guilds.cache.get(variabili.discordItalia).commands.create({
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
    // /stella
    client.guilds.cache.get(variabili.discordItalia).commands.create({
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
    // /verifica
    client.guilds.cache.get(variabili.discordItalia).commands.create({
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
    // /delete
    client.guilds.cache.get(variabili.discordItalia).commands.create({
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
    // /mute
    client.guilds.cache.get(variabili.discordItalia).commands.create({
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


    //TICKET

    // /add
    client.guilds.cache.get(variabili.discordItalia).commands.create({ 
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
    // /remove
    client.guilds.cache.get(variabili.discordItalia).commands.create({ 
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
    // /close
    client.guilds.cache.get(variabili.discordItalia).commands.create({
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


    //DISCORD ITALIA COIN 

    // /dimetti
    client.guilds.cache.get(variabili.discordItalia).commands.create({
        name : "dimetti",
        description : "dimetti un utente",
        options : [
            {
                name : "target",
                description : "L'utente Da dimettere",
                type : "USER",
                required : true
            }
        ]
    })
    // /assumi
    client.guilds.cache.get(variabili.discordItalia).commands.create({
        name : "assumi",
        description : "assumi o promuovi un utente",
        options : [
            {
                name : "target",
                description : "L'utente Da Assumere/Promuovere",
                type : "USER",
                required : true
            }
        ]
    })
    // /coins
    client.guilds.cache.get(variabili.discordItalia).commands.create({
        name : "coins",
        description : "visualizza il profilo di un utente",
        options : [{
            name  : "target",
            description : "l'utente da visualizzare",
            type : "USER",
            required : false  
        }]
    })
    // /manage coin
    client.guilds.cache.get(variabili.discordItalia).commands.create({
        name : "managecoin",
        description : "modifica i soldi di un utente",
        options : [
            {
                name : "target",
                description : "l'utente a cui modificare i soldi",
                required : true,
                type : "USER"
            },
            {
                name : "azione",
                description : "modifica i soldi di un utente",
                required : true,
                type : "STRING",
                choices : [
                    {
                        name : "Aggiungi",
                        value : "+"
                    },
                    {
                        name : "Rimuovi",
                        value : "-"
                    },
                    {
                        name : "Resetta",
                        value : "0"
                    },
                    {
                        name : "Stoppa I Guadagni",
                        value : "stop"
                    },
                    {
                        name : "Abilita I Guadagni",
                        value : "on"
                    }
                ]
            },
            {
                name : "quantità",
                description : "il quantitativo di soldi da modificare",
                required : false,
                type : "INTEGER"
            }
        ]
    })
    // /abbonati
    client.guilds.cache.get(variabili.discordItalia).commands.create({
        name : "abbonati",
        description : "abbonati a uno dei nostri abbonamenti esclusivi",
        options : null
    })
    //annulla
    client.guilds.cache.get(variabili.discordItalia).commands.create({
        name : "annulla",
        description : "annualla un abbonamento",
        options : null
    })
    //multa
    client.guilds.cache.get(variabili.discordItalia).commands.create({
        name : "multa",
        description : "multa un utente",
        options : [{
            name : "target",
            description : "l'utete a cui sottrarre i soldi",
            type : "USER",
            required : true
        }]
    })


    //DATABASE VISULIZZA

    // /give
    client.guilds.cache.get(variabili.discordItalia).commands.create({
        name : "give",
        description : "dai un ruolo ad un utente",
        options : [
            {
                name : "target",
                description : "l'utente a cui aggiungere il ruolo",
                type : "USER",
                required : true
            },
            {
                name : "role",
                description : "il ruolo da aggiungere",
                type : "ROLE",
                required : true
            },
            {
                name : "fine",
                description : "sintassi: AAAA-MM-GG (es. 2022-08-08)",
                type : "STRING",
                required : false
            }
        ]
    })
    // /boost
    client.guilds.cache.get(variabili.discordItalia).commands.create({
        name : "boost",
        description : "visualizza i boost di un utente",
        options : [{
            name : "target",
            description : "l'utente target",
            type : "USER",
            required : false
        }]
    })
    // /warn
    client.guilds.cache.get(variabili.discordItalia).commands.create({
        name : "warn",
        description : "Assegna Un Warn Ad Un Utente",
        options :[
            {
                name : "target",
                description : "L'utente Da Warnare",
                required : true,
                type : "USER"
            },
            {
                name : "livello",
                description : "Il Livello Del Warn Da Assegnare",
                type : "STRING",
                choices : [
                    {
                        name : "⚠️ Warn Livello 1",
                        value : `${variabili.warn1}:7`
                    },
                    {
                        name : "⚠️ Warn Livello 2",
                        value : `${variabili.warn2}:14`
                    },
                    {
                        name : "⚠️ Warn Livello 3",
                        value : `${variabili.warn3}:21`
                    },
                    {
                        name : "⚠️ Warn Livello 4",
                        value : `${variabili.warn4}:28`
                    },
                    {
                        name : "👮 Rimuovi",
                        value : "leva"
                    }
                ],
                required : true
            }
        ] 

    })
    // /infowarn
    client.guilds.cache.get(variabili.discordItalia).commands.create({
        name : "infowarn",
        description : "visualizza il warn di un utente",
        options :[{
            name : "target",
            description : "la persona da visualizzare",
            required : false,
            type : "USER"
        }]
    })
    // /proprieta
    client.guilds.cache.get(variabili.discordItalia).commands.create({
        name : "proprieta",
        description : "visualizza le proprietà di un utente",
        options : [{
            name : "target",
            description : "persona di cui visualizzare le proprietà",
            type :  "USER",
            required : false 
        }]

    })
    // /inforole
    client.guilds.cache.get(variabili.discordItalia).commands.create({
        name : "inforole",
        description : "ottieni le informazioni dei temp role",
        options : [{
            name : "target",
            description : "l'utente target",
            type : "USER",
            required : false
        }],
    })

    
    

    
    try{
        const data = new Date
        const reset = require (path.join(__dirname,"/codici/reset.js"))
        reset.reset(client, data.getMonth()+1)

    }catch(err){
        console.log(err)
        return
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
    //console.log(interaction.member.roles.cache.some(role => role.id == variabili.Governo))
    
    
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

client.on("guildMemberUpdate", (old, nuovo) => {
    try{
        const guildMemberUpdate = require (path.join(__dirname,"/codici/guildMemberUpdate.js"))
        roleCount =  guildMemberUpdate.guildMemberUpdate(old,nuovo)
    }catch(err){
        console.log(err)
    }
})

//df

process.on("unhandledRejection", async (err) => {
    try{
        console.log(err)
        client.guilds.cache.get(variabili.discordItalia).members.fetch("598498238336729088").then(member => {
            member.user.send(`**Err **${err}`)
        }).catch((err) => {console.log(err)})
    }catch{
        return;
    }
    
})