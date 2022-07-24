const Discord=require("discord.js");
const client = new Discord.Client(
    {intents: 131071, partials: ['MESSAGE', 'CHANNEL', 'REACTION']}
)
client.login("OTgxOTMwMDgyNTY4MzcyMjU0.GmayiA.8Dvpt4PA2GBfsfjDaOm4n1cQZgqhGygNXuufmQ")
const fs = require("fs")
const path = require("path")

//ciaooo

client.on("ready",()=>{   
    try{
        const reset = require (path.join(__dirname,"/codici/reset.js"))
        console.log(reset)
        reset.reset()

        console.log("ciaooo")
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
        interactionCreate.menager(interaction,client)
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