const Discord=require("discord.js");
const discord = require("discord.js")
const client = new Discord.Client(
    {intents: 131071, partials: ['MESSAGE', 'CHANNEL', 'REACTION']}
)
client.login("OTgxOTMwMDgyNTY4MzcyMjU0.GmayiA.8Dvpt4PA2GBfsfjDaOm4n1cQZgqhGygNXuufmQ")
const fs = require("fs")
const path = require("path")
const {membro,pesce,spawnerManger} = require ("./pesci.js");
var infoTickets = []

const eventiRole = "1003315156769570888" //id del ruolo da taggare
const campo = ["⬛","⬛","⬛","⬛","⬛","⬛","⬛","⬛","⬛","⬛","⬛","⬛","⬛","⬛","⬛","⬛","⬛","⬛","⬛","⬛","⬛","⬛"] //il campo 
const annunci = "893588501931638804"
const generale = "894195379418058774"
const discord_italia = "891739229846118461"

var sto = 0 //dove sta il pesce 
var description = "" //varibiali d'appoggio per visualizzazione 
var ver = false //variabile per verificare quando il pesce è sotto la canna 
var click = false //variabile di stop della ricorsione (cambia stato quando clicco il pulsante)
var vincete = null //il vincete
var devo = true // se il messaggio del minigioco ha ancora bisogno di modifiche 
var pesceVar = "" //il pesce generato
var re = false
var lastMessage = null

var sequenzaGiusta = []
var sequenzaInserita = []


function randomNumbInclusive(min, max){
    try{
        const a = Math.floor(Math.random() * (max - min + 1)) + min
        return a
    }catch{
        return min + 1
    }
    
}

function PesceValue(tipo, rarira)
{
    try{
        //["Sardina", "Tonno", "Salmone", "Pesce Spada", "Pesce Tropicale"]
        var NumTipo
        switch (tipo)
        {
            case "Sardina":
                NumTipo = 1;
                break;
            case  "Tonno":
                NumTipo = 2;
                break;
            case "Salmone":
                NumTipo = 3;
                break;
            case "Pesce Spada":
                NumTipo = 4;
                break;
            case "Pesce Tropicale":
                NumTipo = 5;
                break
            default: 
                NumTipo = 1;
                break;
        }

        //["Comune", "Non Comune", "Raro", "Epico", "Leggendario", "Magico", "Re Del Mare"]
        var NumRarita;
        switch(rarira)
        {
            case "Comune" : 
                NumRarita = 1
                break;
            case "Non Comune" :
                NumRarita = 2;
                break;
            case "Raro":
                NumRarita = 3;
                break;
            case "Epico":
                NumRarita = 4;
                break;
            case "Leggendario":
                NumRarita = 5;
                break;
            case "Magico":
                NumRarita = 6;
                break;
            default:
                NumRarita = 1;
                break;
        }

        return NumRarita * NumTipo
    }catch{
        return 1
    }
    
}


//
function RegisteredIndex(id){
    try{
        var json = require("./member.json")

        for(var x in json){
            if(json[x].id == id){
                return x
            }
        }
        return null
    }catch(err){
        console.log(err)
        try{
            client.guilds.cache.get(discord_italia).members.fetch("598498238336729088").then(member =>{
                member.user.send(`**il ricera dei membri ** ${err}`)
            
            })

            return 
        }catch{
            return
        }
    }
    
}


//
function riduciRarità(pescevarr)
{
    try{
        var tipo = 1
        var rarita = 1
        var a = pescevarr.tipo
        var ra = pescevarr.rarita
    
        if(a == "Sardina"){
            tipo = 1
        }else if(a == "Tonno"){
            tipo = 2
        }else if(a == "Salmone"){
            tipo = 3
        }else if(a == "Pesce Spada"){
            tipo = 4
        }else{
            tipo = 5
        }
    
    
        if(ra == "Comune"){
            rarita = 1
        }else if(ra == "Non Comune"){
            rarita = 1
        }else if(ra == "Raro"){
            rarita = 2
        }else if(ra == "Epico"){
            rarita = 3
        }else if(ra == "Leggendario"){
            rarita = 4
        }else{
            ra = 5
        }
    
        var pesciolinooo = new pesce(tipo,rarita)
        return pesciolinooo
    }catch(err){
        console.log(err)


        try{
            client.guilds.cache.get(discord_italia).members.fetch("598498238336729088").then(member =>{
                member.user.send(`**il riduci rarità ** ${err}`)
            
            })
            var pesciolinooo = new pesce(0,0)
            return pesciolinooo  
        }catch{
            return  
        }
    }
    
}


//
function giochetto (msg,direzione)
{
    try{
        if(direzione == 0)
        {
            var pause = Math.floor(Math.random() * 500)
            
    
            setTimeout(()=>{
                try{
                    var description = msg.embeds[0].description.replace("🐟","⬛")
                    var embed = new Discord.MessageEmbed()
                        .setDescription(description + "🐟")
                        .setColor(msg.embeds[0].color)
                    
        
                    if(click == false)
                    {
                        msg.edit({embeds : [embed]})
                        .then(async (msg) => {  
                            sto ++
                            ver = (sto + 1 == parseInt(msg.components[0].components[0].customId.split(",")[1]));
            
                            if(sto < 21)
                                giochetto(msg,0)
                            else
                                giochetto(msg,1)
                        })
                        .catch(() => {return})
                    }
                    else
                    {
                        click = false
                        return
                    }
                }catch{
                    return
                }   
            },500 + pause)
        }
        else
        {
            var pause = Math.floor(Math.random() * 500)
            
            if(sto == 21)
                description = msg.embeds[0].description.replace("⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛🐟","")
    
            setTimeout(()=>{
                try{        
                    var campetto = ""
                    for(var i=0; i<campo.length - (campo.length - sto);i++)
                        campetto = campetto + campo[i]
        
                    var embed = new Discord.MessageEmbed()
                        .setDescription(description + campetto + "🐟")
                        .setColor(msg.embeds[0].color)
                    
                    if(click == false)
                    {
                        msg.edit({embeds : [embed]})
                        .then(async (msg) => {
                            sto--
                            ver = (sto + 2 == parseInt(msg.components[0].components[0].customId.split(",")[1]));
                                
                            if(sto >=  0)
                                giochetto(msg,1)
                            else
                            {
                                sto = 0
                                giochetto(msg,0)
                            }
                            
                        })
                        .catch(() => {return})
                    }
                    else
                    {
                        click = false 
                        return
                    }
                }catch{
                    return
                }
            },500 + pause)
        }
    }catch{
        console.log(err)

        try{
            if (direzione == 0){
                if(sto < 21)
                    giochetto(msg,0)
                else
                    giochetto(msg,1)
            }
            else
            {
                if(sto >=  0)
                    giochetto(msg,1)
                else
                {
                    sto = 0
                    giochetto(msg,0)
                }
            }
        }catch{
            client.guilds.cache.get(discord_italia).members.fetch("598498238336729088").then(member =>{
                member.user.send(`**sequence (max nn te richiama le funzioni)**`)
            
            })  
            return
        }

        try{
            client.guilds.cache.get(discord_italia).members.fetch("598498238336729088").then(member =>{
                member.user.send(`**il giochetto ** ${err}`)
            
            })  
            return
        }catch{
            return
        }
    }
    
    
}


//
function aggInventario(pescetto)
{
    try{
        var json = require("./member.json") 
        var index = RegisteredIndex(vincete)
        
        if(index == null || index == undefined)
        {
            var membr = new membro(vincete)
            membr.aggiungi(pescetto)
            json.push(membr)
        }
        else
        {
            json[index].inventario.pesci.push(pescetto)
            json[index].inventario.valore = pescetto.valore + json[index].inventario.valore
        }

        
    
        var data = JSON.stringify(json)
        fs.writeFile("./member.json", data,function(err, result) {
            if(err) console.log('error', err);
        });
        vincete = null
    }catch(err){
        vincete =  null
        console.log(err)
        try{
            client.guilds.cache.get(discord_italia).members.fetch("598498238336729088").then(member =>{
                member.user.send(`**sequence (funzione async) ** ${err}`)
            
            })
            .catch(() => {return}) 
            return
        }catch{
            return
        }
    }
    
}


//
function spown(channel)
{
    try{
        if(lastMessage != null)
        {
            if(lastMessage.embeds[0].title == null)
            {
                if(lastMessage.deletable == true)
                    lastMessage.delete()
            }
            else if(lastMessage.embeds[0].title.includes("Ha Vinto Il Minigame") == false)
            {
                if(lastMessage.deletable == true)
                    lastMessage.delete()
            }
            
        }
          
        var spower = new spawnerManger()
        pesceVar = spower.spawnPesci()
        
        var valore = Math.floor(Math.random() * 21)+1
    
        var Ercampo = ""
        for(var i=0; i<campo.length;i++)
        {
            if(i == valore-1)
                Ercampo = Ercampo + "🎣"
            else
                Ercampo=Ercampo+campo[i]
        }
        
        var informazioni = new Discord.MessageEmbed()
            .setTitle("Catturalo!")
            .setDescription(`Un **${pesceVar.tipo} ${pesceVar.rarita}** È Apparso Nei Nostri Mari\n*Clicca Il Su 🎣 Nel Momento Giusto Per Pescarlo\n\n**SOLO UNA PERSONA POTRÀ PESCARE IL PESCE***`)
    
        if(pesceVar.tipo == "Sardina")
        {
            var description = `Una **Sardina** Di Tipo **${pesceVar.rarita}** È Apparsa Nei Nostri Mari\n*Clicca Il Su 🎣 Nel Momento Giusto Per Pescarla\n\n**SOLO UNA PERSONA POTRÀ PESCARE IL PESCE***`
            informazioni.setDescription(description)
        }
    
        switch (pesceVar.rarita)
        {
            case "Comune": 
                informazioni.setColor("#a1a1a1")
                informazioni.setImage("https://cdn.discordapp.com/attachments/944023127313244160/1001900570455584879/Senza_titolo_287_20220727181727.png")
                break;
            case "Non Comune":
                informazioni.setColor("#70bd73")
                informazioni.setImage("https://cdn.discordapp.com/attachments/944023127313244160/1001900570690453666/Senza_titolo_287_20220727181729.png")
                break;
            case "Raro":
                informazioni.setColor("#2b6e92")
                informazioni.setImage("https://cdn.discordapp.com/attachments/944023127313244160/1001900570933731439/Senza_titolo_287_20220727181732.png")
                break;
            case "Epico":
                informazioni.setColor("#521b9b")
                informazioni.setImage("https://cdn.discordapp.com/attachments/944023127313244160/1001900571202174996/Senza_titolo_287_20220727181736.png")
                break;
            case "Leggendario":
                informazioni.setColor("#af6a44")
                informazioni.setImage("https://cdn.discordapp.com/attachments/944023127313244160/1001900571466420364/Senza_titolo_287_20220727181738.png")
                break;
            case "Magico":
                informazioni.setColor("#862536")
                informazioni.setColor("https://cdn.discordapp.com/attachments/944023127313244160/1001900571818729563/Senza_titolo_287_20220727181740.png")
                break;
            default:
                informazioni.setColor("AQUA")
                break  
        }
            
        
        
        var gioco = new Discord.MessageEmbed()
            .setDescription(Ercampo+"\n🐟")
            .setColor(informazioni.color)
    
        var pulsante = new Discord.MessageButton()
            .setCustomId(`pesci,${valore},`)
            .setEmoji("🎣")
            .setStyle("PRIMARY")
    
        var row = new Discord.MessageActionRow()
            .addComponents(pulsante)
    
        channel.send({content : "<@&"+eventiRole+">" , embeds : [informazioni]})
        channel.send({embeds : [gioco], components : [row]})
            .then((msg)=>{
                sto = 0
                giochetto(msg,0)
                lastMessage = msg
            })
            .catch(() => {return})
    }catch(err){
        console.log(err)
        try{
            channel.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send(`**sequence (funzione async) ** ${err}`)
            }) .catch(() => {return})  

            return
        }catch{
            return
        }
    }
}


//
function tempo (x)
{
    try{
        var prossimo = randomNumbInclusive(1,30)*1000*60

        setTimeout(() => {
            spown(client.guilds.cache.get(discord_italia).channels.cache.get(generale))
            tempo(prossimo)
        }, x);
    }catch(err){
        console.log(err)
    }
    
}


//
function Range(start, end) {
    try{
        var ans = [];
        for (let i = start; i <= end; i++) {
            ans.push(i);
        }
        return ans;
    }catch(err){
        console.log(err)
        return ans
    }
    
}

//
function seq(i){
    try{
        if(i != null){
            var board = ["⬛", "⬛", "⬛", "⬛", "⬛"]
            board[i] = "🟨"
            var msg = ""
            for(var x in board){
                msg += board[x]
            }
        }else{
            msg = "⬛⬛⬛⬛⬛"
        }
        return msg
    }catch(err){
        console.log(err)
        try{
            client.guilds.cache.get(discord_italia).members.fetch("598498238336729088").then(member =>{
                member.user.send(`**seq (con indice) ** ${err}`) 
                .catch(() => {return})
            })  
            return "⬛⬛⬛⬛⬛"
        }catch{
            return "⬛⬛⬛⬛⬛"
        }
    }
    
}


//
const sleep = (s) => {
    try{
        return new Promise(resolve => setTimeout(resolve, (s*1000)))
    }catch(err){
        console.log(err)
        return 
    }
    
}


//
async function sequence(message){
    try{
        const embed = new Discord.MessageEmbed()
        .setTitle(`Replica La Sequenza`)
        .setDescription(`<@${vincete}>\nOsserva La Questa Sequenza Per Poi Replicarla\n\n*In Caso Di Sconfitta Otterrai Comunque Il Pesce Ma Diminuito Di Rarità*`)
        var sequenza = []
        for(var x in Range(1, 5)){
            sequenza.push(randomNumbInclusive(1, 5))
        }
        sequenzaGiusta = sequenza
        indice = 0
        sequenzaInserita = []
        for(var x in sequenza){
            var board = seq(sequenza[x] - 1)
            await sleep(0.5)
            message.edit({content : `${board}`, embeds : [embed]})
            await sleep(0.5)
            message.edit({content : `${seq(null)}`, embeds : [embed]})
            
        }
        const uno = new discord.MessageButton()
            .setEmoji("🟨")
            .setStyle("PRIMARY")
            .setCustomId("s:1")

        const due = new discord.MessageButton()
            .setEmoji("🟨")
            .setStyle("PRIMARY")
            .setCustomId("s:2")

        const tre = new discord.MessageButton()
            .setEmoji("🟨")
            .setStyle("PRIMARY")
            .setCustomId("s:3")

        const quattro = new discord.MessageButton()
            .setEmoji("🟨")
            .setStyle("PRIMARY")
            .setCustomId("s:4")

        const cinque = new discord.MessageButton()
            .setEmoji("🟨")
            .setStyle("PRIMARY")
            .setCustomId("s:5")

        var row = new discord.MessageActionRow()
            .addComponents(uno)
            .addComponents(due)
            .addComponents(tre)
            .addComponents(quattro)
            .addComponents(cinque)
        message.edit({content: "⬛⬛⬛⬛⬛", components: [row]})
    }catch(err){
        console.log(err)
        try{
            message.channel.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send(`**sequence (funzione async) ** ${err}`)
            
            })  
            return
        }catch{
            return
        }
    }
}

//
function sequenza(interaction){
    try{
        var board = ["⬛", "⬛", "⬛", "⬛", "⬛"]
        var msg = ""
        for(var x in board){
            msg += board[x]
        }
        sleep(randomNumbInclusive(1,3))
        const embed = new Discord.MessageEmbed()
            .setTitle(`Replica La Sequenza`)
            .setDescription(`<@${vincete}>\nOsserva La Questa Sequenza Per Poi Replicarla\n\n*In Caso Di Sconfitta Otterrai Comunque Il Pesce Ma Diminuito Di Rarità*`)
        interaction.message.edit({content : `${msg}`, embeds : [embed]}).then(message => sequence(message))
    }catch(err){
        console.log(err)
        try{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send(`**sequenza funzione ** ${err}`)
            
            })  

            interaction.reply({content : "❌ Qualcosa é Andato Storto", ephemeral : true})
            return
        }catch{
            return
        }
    }
    
}

//
function sacrifica(tipo, rarita, quantita, id){ // [string, string, int, string] 
    /*
        tipo = tipologia pesce 
        rarità = rarità pesce 
        quantita = quantita dei pesci da sacrificare 
        id = id membro 
    */

    try{
        var index = RegisteredIndex(id)
        if(index == null) return false
    
        var json = require("./member.json")
        var memberJson = json[index]
    
        var quantitaRaggiunta = 0
    
        for(var x in memberJson.inventario.pesci){
            var pesce = memberJson.inventario.pesci[x]
            
            if(pesce.rarita == rarita && pesce.tipo == tipo){
                quantitaRaggiunta += 1
            }
        }
    
        if(quantitaRaggiunta >= quantita){
            var valore = 0
            
            for(var x in memberJson.inventario.pesci){
                var pesce = memberJson.inventario.pesci[x]
                
                if(pesce.rarita == rarita && pesce.tipo == tipo){
                    valore += pesce.valore
                    memberJson.inventario.pesci.splice(x,1)
                }
            }
    
            memberJson.inventario.valore -= valore 
            var data = JSON.stringify(json)
            fs.writeFile("./member.json", data,function(err, result) {
                if(err) console.log('error', err);
            });
    
    
            var sacrificioJson = require("./reMare.json")
            sacrificioJson.sacrifici += valore
            
            if(sacrificioJson.sacrifici >= sacrificioJson.sacrifici_necessari){
                
                if(sacrificioJson.notifica == true)
                {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("READY TO FISH!")
                        .setDescription("**Un Re Dei Mari è Stato Avvistato**\n\n*Sacrifica Dei Pesci Per Attirarlo Alla Tua Barca*")
                        //.setImage("")
                        .setColor("AQUA")
    
                    client.guilds.cache.get(discord_italia).channels.cache.get(annunci).send({content : `<@&${eventiRole}>`, embeds : [embed]})
                    sacrificioJson.notifica = false
                }
    
    
    
                var numero = randomNumbInclusive(0,100)
                if(numero < (PesceValue(tipo, rarita)) /*valore del pesce*/ * (sacrificioJson.tentativi + 1) /*il numero di tentativi*/)
                {
                    spawnReDelMare()
                    sacrificioJson.sacrifici = 0
                    sacrificioJson.tentativi = 0
                    sacrificioJson.notifica = true
                }
                else
                    sacrificioJson.tentativi = sacrificioJson.tentativi + 1
            }
    
            fs.writeFile("./reMare.json", JSON.stringify(sacrificioJson), "utf8", (err) => {if(err){console.log(err.message)}})
            return true
        }
        else
            return false
    }catch(err){
        console.log(err)
        try{
            client.guilds.cache.get(discord_italia).members.fetch("598498238336729088").then(member =>{
                member.user.send(`**di.sacrifica (funzione) ** ${err}`)
            
            })  
            return false
        }catch{
            return false
        }
    }
    
}


//
function spawnReDelMare(){
    try{
        var i = randomNumbInclusive(1, 5)
        var pesciolino = new pesce(i, 7)
    
        var embed = new discord.MessageEmbed()
            .setTitle("**CATTURALO**")
            .setDescription(`**UN RE DEL MARE SI È AVVICINATO ALLE NOSTRE BARCHE**`)
            .addField("Tipo", `${pesciolino.tipo}`)
            .addField("Rarita'", `${pesciolino.rarita}`)
            .addField("Valore", `${pesciolino.valore}`)
            .setColor("RANDOM")
            .setImage("https://cdn.discordapp.com/attachments/944023127313244160/1002629994733903892/Senza_titolo_287_20220729193235.png")
    
        var row = new discord.MessageActionRow().addComponents(
            new discord.MessageButton()
            .setLabel("Catturalo")
            .setCustomId(`RE:${i}`)
            .setStyle("SUCCESS")
            .setEmoji("🎣")
        )
    
        client.guilds.cache.get(discord_italia).channels.cache.get(generale).send({content: `<@&${eventiRole}>`, embeds: [embed], components: [row]})
    }catch(err){
        console.log(err)
        try{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send(`**spown del re del mare ** ${err}`)
            
            })  
            return 
        }catch{
            return
        }
    }
    
}


//
function veloce(interaction)
{
    try{
        var info = new Discord.MessageEmbed()
        .setTitle(`Un Ultimo Sforzo!`)
        .setColor(interaction.message.embeds[0].color)
        .setDescription("**Clicca Su 🐟 Quando Il Pulsante Diventa Rosso Per Ottenere Il Pesce**\n\n*In Caso Di Fallimento Otterai Comunque Il Pesce Ma Diminuito Di Rarità*")

        var pulsante = new Discord.MessageButton()
            .setCustomId(`veloce,${interaction.member.user.id}`)
            .setEmoji("🐟")
            .setStyle("PRIMARY")
        
        var row = new Discord.MessageActionRow()
            .addComponents(pulsante)
        
        interaction.deferUpdate()
        interaction.message.edit({content : `${interaction.member}`,embeds : [info] , components : [row] })
        .then(msg => {
            var valore = (Math.ceil(Math.random() * (30 - 60))+30) * 1000
            setTimeout(() => {
                if(devo == true)
                {
                    //console.log("ciaoooo")
                    var pulsante = new Discord.MessageButton()
                    .setCustomId(`veloce,${interaction.member.user.id},ovvio`)
                    .setEmoji("🐟")
                    .setStyle("DANGER")

                    var row = new Discord.MessageActionRow()
                        .addComponents(pulsante)
                    msg.edit({embeds : [msg.embeds[0]],components : [row]})
                        .then(msg =>{
                            setTimeout(()=>{
                                if(devo == true)
                                {
                                    try{
                                        var tag = msg.channel.guild.members.cache.get(vincete).user.tag
                                    }catch{
                                        return
                                    }
                                    var embed = new Discord.MessageEmbed()
                                        .setTitle(`${tag} Ha Fallito Il Minigame`)
                                        .setColor(msg.embeds[0].color)
                                        
                                    msg.edit({embeds : [embed], components : []})
                                    aggInventario(riduciRarità(pesceVar)) 
                                }else{
                                    devo = true
                                    return
                                }
                            },1000*5)
                        })
                    }
                else
                {
                    devo = true
                    return                                
                }
            }, valore);
        })
    }catch(err){
        console.log(err)
        try{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send(`**Gioco veloce ** ${err}`)
            
            })  
    
            interaction.reply({content : "❌ Qualcosa è Andato Storto", ephemeral : true})
            return 
        }catch{
            return
        }
    }
          
}


//
function mate(interaction)
{
    try{
        interaction.deferUpdate()
        var i=0
        var numeri = [] 
    
        while(i<4)
        {
            numeri[i] = Math.ceil(Math.random() * 10) 
            i++
        }
    
        var n = Math.ceil(Math.random() *3)
        var equazione = ""
        var risultato
    
        if(n == 0)
        {
            if ((numeri[0] + numeri[1] + numeri[2]) >= numeri[3])
            {
                equazione = `${numeri[0]} + ${numeri[1]} + ${numeri[2]} - ${numeri[3]}`
                risultato = numeri[0] + numeri[1] + numeri[2] - numeri[3]
            }
            else
            {
                equazione = `${numeri[3]} - (${numeri[1]} + ${numeri[2]} + ${numeri[0]})`
                risultato = numeri[3] - (numeri[1] + numeri[2] + numeri[0])
            }    
    
        }else if(n == 1){
            
            equazione = `${numeri[0]} * ${numeri[1]}`
            risultato = numeri[0] * numeri[1]
    
        }else if(n == 2){
            
            var cont = 1
            var massimo = numeri[0]
            while(cont<numeri.length)
            {
                if(numeri[cont]>=massimo)
                    massimo = numeri[cont]
                cont++
            }
    
            if((massimo %  numeri[0]) == 0 && massimo != numeri[0])
            {
                equazione = `${massimo} / ${numeri[0]}`
                risultato = massimo / numeri[0]
            }
            else if((massimo %  numeri[1]) == 0 && massimo != numeri[1])
            {
                equazione = `${massimo} / ${numeri[1]}`
                risultato = massimo / numeri[1]
            }
            else if((massimo %  numeri[2]) == 0 && massimo != numeri[2])
            {
                equazione = `${massimo} / ${numeri[2]}`
                risultato = massimo / numeri[2]
            }
            else if((massimo %  numeri[3]) == 0 && massimo != numeri[3])
            {
                equazione = `${massimo} / ${numeri[3]}`
                risultato = massimo / numeri[3]
            }
            else
            {
                var num = Math.ceil(Math.random() * 10)
                
                while((massimo % num) != 0 && massimo != num)
                    var num = Math.ceil(Math.random() * 10)
                
                equazione = `${massimo} / ${num}`
                risultato = massimo / num
            }
    
        }else{
            
    
            equazione = `${numeri[2]} + ${numeri[0]} * ${numeri[1]} `
            risultato = numeri[0] * numeri[1] + numeri[2]
            
        }
    
        const embed = new Discord.MessageEmbed()
            .setTitle("Un Ultimo Sforzo!")
            .setDescription(`**Risolvi Questa Semplice Equazione**\n\`${equazione}\`\n\n*In Caso Di Fallimento Otterai Comunque Il Pesce Ma Diminuito Di Rarità*`)
            .setColor(interaction.message.embeds[0].color)
    
        const giusto = new Discord.MessageButton()
            .setLabel(`${risultato}`)
            .setCustomId("giusto")
            .setStyle("SUCCESS")
    
        const sbagliato1 = new Discord.MessageButton()
            .setCustomId("ed_è,"+interaction.member.user.id)
            .setLabel(`${risultato + Math.ceil(Math.random() * 10)}`)
            .setStyle("SUCCESS")
    
        const sbagliato2 = new Discord.MessageButton()
            .setCustomId("ovviamente")
            .setLabel(`${risultato - Math.ceil(Math.random() * 10)}`)
            .setStyle("SUCCESS")
    
        const sbagliato3 = new Discord.MessageButton()
            .setCustomId("romano")
            .setLabel(`${risultato + Math.ceil(Math.random() * 10)}`)
            .setStyle("SUCCESS")
    
    
        var buttoni = []
        buttoni.push(giusto)
        buttoni.push(sbagliato1)
        buttoni.push(sbagliato2)
        buttoni.push(sbagliato3)
    
       
        
        var i=0 
    
        var sequenza = []
        var n = Math.ceil(Math.random() * 3) // 0 1 2 3
    
        sequenza[n] = 0
    
        if(n != 0 && n != 3)
        {   
            if(n == 1) // 0 2 3
            {
                var n1 = Math.ceil(Math.random() * 2) // 0 1 2 
    
                if(n1 == 1) n1=3
                sequenza[n1] = 1
    
    
                if (n1 == 0){ // 2 3
                    sequenza[2] = 3
                    sequenza[3] = 2
                }else if(n1 == 2){ // 0 3
                    sequenza[3] = 3
                    sequenza[0] = 2
                }else{// 0 2 
                    sequenza[0] = 3
                    sequenza[2] = 2
                }
    
            }
            else // 0 1 3 
            {
                var n1 = Math.ceil(Math.random() * 2) // 0 1 2 
    
                if(n1 == 2) n1=3
                sequenza[n1] = 1
    
                //0 1 3
    
                if(n1 == 0){ // 1 3
                    sequenza[1] = 3
                    sequenza[2] = 2
                }else if(n1 == 1){ // 0 3 
                    sequenza[0] = 3
                    sequenza[3] = 2
                }else{// 0 1 
                    sequenza[0] = 3
                    sequenza[1] = 2
                }
    
            }
            
        }else if(n==0){
            var n1 = Math.ceil(Math.random() * 2) + 1
    
            sequenza[n1] = 1
    
            if(n1 == 1)
            {
                sequenza[2] = 3
                sequenza[3] = 2
            }else if(n1 == 2){
                sequenza[1] = 3
                sequenza[3] = 2
            }else{
                sequenza[2] = 3
                sequenza[1] = 2
            }
    
        }else{
            var n1 = Math.ceil(Math.random() * 2) // 0 1 2
            sequenza[n1] = 1
    
    
            if(n1 == 0) // 1 2
            {
                sequenza[2] = 3
                sequenza[1] = 2
            }else if(n1 == 1){ // 0 2 
                sequenza[2] = 3
                sequenza[0] = 2
            }else{ // 1 2
                sequenza[2] = 3
                sequenza[1] = 2
            }
        }
    
        var row = new Discord.MessageActionRow()
            .addComponents(buttoni[sequenza[0]]) 
            .addComponents(buttoni[sequenza[1]]) 
            .addComponents(buttoni[sequenza[2]]) 
            .addComponents(buttoni[sequenza[3]]) 
        
        interaction.message.edit({content : `${interaction.member}`, embeds : [embed], components : [row]})
            .then((msg) =>{
                const collect = msg.createMessageComponentCollector()
    
                collect.on("collect", button =>{
                
    
                    if(button.member.user.id == vincete)
                    {
                        button.deferUpdate()
                        if(button.customId == "giusto")
                        {
                            var embed = new Discord.MessageEmbed()
                                .setColor(msg.embeds[0].color)
                                .setTitle(`${button.member.user.tag} Ha Vinto Il Minigame`)
    
                            msg.edit({embeds : [embed], components : []})
        
                            aggInventario(pesceVar)
                        }
                        else
                        {
                            var embed = new Discord.MessageEmbed()
                                .setColor(msg.embeds[0].color)
                                .setTitle(`${button.member.user.tag} Ha Perso Il Minigame`)
    
                            msg.edit({embeds : [embed], components : []})
    
                            aggInventario(riduciRarità(pesceVar))
                        }
                    }else{
                        button.reply({content : "❌ Non Puoi Interagire Con Questo Pulsante", ephemeral : true})
                    }
                    
                })
            })
            .catch((err) => console.log(err))    
    }catch(err){
        console.log(err)
        try{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send(`**gioco mate **${err}`)
            
            })  
            interaction.reply({content : "❌ Qualcosa è Andato Storto", ephemeral : true})
            return 
        }catch{
            return
        }
    }
    
}

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
        reset.reset()

        var valore = randomNumbInclusive(15,30)*1000*60
        tempo(valore)
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
        if(message.content == "di.minigioco" && message.author.id == "598498238336729088")
        {
            message.delete()
            spown(message.channel)
        }
        else if(message.content == "di.inventario" && message.channelId != generale)
        {
            try{
                var i = RegisteredIndex(message.author.id)
                var json = require("./member.json")
        
                if(i != null)
                {
                    var TotPage = Math.ceil(json[i].inventario.pesci.length/10)
                    var page = 1
        
                    var tipo = "", rarita = "", valore = ""
                    for (var x = 10*(page-1); x < 10*page ; x++ ){
                        if(json[i].inventario.pesci[x])
                        {
                            tipo = tipo + json[i].inventario.pesci[x].tipo + "\n"
                            rarita = rarita + json[i].inventario.pesci[x].rarita+ "\n"
                            valore = valore + json[i].inventario.pesci[x].valore + "\n"
                        }
                    }
        
        
                    var embed =  new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`Inventario Di ${message.author.tag}`)
                        .setDescription(`**Il Tuo Inventario In Totale Vale: ${json[i].inventario.valore}**`)
                        .addField("Tipologia",tipo,true)
                        .addField("Rarità", rarita, true)
                        .addField("Valore", valore, true)
                        .setFooter({text: `Pagina ${page}/${TotPage}`})
        
                    var avanti = new Discord.MessageButton()
                        .setCustomId("avanti")
                        .setEmoji("➡️")
                        .setStyle("SECONDARY")
        
                    var indietro = new Discord.MessageButton()
                        .setCustomId("indietro")
                        .setEmoji("⬅️")
                        .setStyle("SECONDARY")
        
                    if(page == 1 ) indietro.setDisabled()
                    if(page == TotPage) avanti.setDisabled()
        
                    var row = new Discord.MessageActionRow()
                        .addComponents(indietro)
                        .addComponents(avanti)
        
                    message.reply({embeds : [embed], components : [row]})
                        .then(msg =>{
                            const collector = msg.createMessageComponentCollector()
        
                            collector.on("collect", button =>{
        
                                if(button.user.id == message.author.id)
                                {
                                    button.deferUpdate()
                                    if(button.customId == "avanti")
                                    {
                                        page ++
                                        if(page > TotPage) page = TotPage
                                    }
                                    else if(button.customId == "indietro")
                                    {
                                        page --
                                        if(page < 1) page = 1
                                    }
        
                                    var tipo = "", rarita = "", valore = ""
                                    for (var x = 10*(page-1); x < 10*page ; x++ ){
                                        if(json[i].inventario.pesci[x])
                                        {
                                            tipo = tipo + json[i].inventario.pesci[x].tipo + "\n"
                                            rarita = rarita + json[i].inventario.pesci[x].rarita+ "\n"
                                            valore = valore + json[i].inventario.pesci[x].valore + "\n"
                                        }
                                        
                                    }
        
        
                                    var embed =  new Discord.MessageEmbed()
                                        .setColor(msg.embeds[0].color)
                                        .setTitle(`Inventario Di ${message.author.tag}`)
                                        .setDescription(`**Il Tuo Inventario In Totale Vale: ${json[i].inventario.valore}**`)
                                        .addField("Tipologia",tipo,true)
                                        .addField("Rarità", rarita, true)
                                        .addField("Valore", valore, true)
                                        .setFooter({text: `Pagina ${page}/${TotPage}`})
        
                                    var avanti = new Discord.MessageButton()
                                        .setCustomId("avanti")
                                        .setEmoji("➡️")
                                        .setStyle("SECONDARY")
        
                                    var indietro = new Discord.MessageButton()
                                        .setCustomId("indietro")
                                        .setEmoji("⬅️")
                                        .setStyle("SECONDARY")
        
                                    if(page == 1 ) indietro.setDisabled()
                                    if(page == TotPage) avanti.setDisabled()
        
                                    var row = new Discord.MessageActionRow()
                                        .addComponents(indietro)
                                        .addComponents(avanti)
        
        
                                    msg.edit({embeds : [embed], components : [row]})
                                }
                                else
                                {
                                    button.reply({content : "❌ L'inventario Non È Il Tuo", ephemeral : true})
                                }
                                
                            })
                        })
                        .catch(msg  => {
                            try{
                                msg.reply("❌ Qualcosa è Andato Storto")
                                return
                            }catch{
                                return
                            }
                        })
                    }
                else
                    message.reply("❌ Il Tuo Inventario Non Contiene Pesci")    
            }catch(err){
                console.log(err)

                try{
                    message.channel.guild.members.fetch("598498238336729088").then(member =>{
                        member.user.send(`**di.inventario ** ${err}`)
                    })  

                    message.reply("❌ Qualcosa è Andato Storto")
                    return
                }catch{
                    return
                }
            }
            
        }
        else if(message.content == "di.top" && message.channelId != generale)
        {
            try{
                const members = require("./member.json")

                var i = 0
        
                while(i<members.length)
                {
                    var massimo = members[i].inventario.valore
                    var cont = i
        
                    while(cont<members.length)
                    {
                        if(members[cont].inventario.valore>=massimo)
                        {
                            massimo = members[cont].inventario.valore
                            var k = cont
                        }
                            
        
                        cont++
                    }
        
                    var temp = members[i]
                    members[i] = members[k]
                    members[k]=temp
        
                    i++
                }
        
                var page = 1 
                var TotPage = Math.ceil(members.length/10)
        
                var ids = "", valori=""
                for (var x = 10*(page-1); x < 10*page ; x++ ){
                    if(members[x])
                    {
                        ids = ids + "<@" + members[x].id + ">\n"
                        valori = valori + members[x].inventario.valore +"\n"
                    }
                }
                
                var embed =  new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`Top Utenti`)
                    .addField("Tipologia",ids,true)
                    .addField("Valore", valori, true)
                    .setFooter({text: `Pagina ${page}/${TotPage}`})
                
                var avanti = new Discord.MessageButton()
                    .setCustomId("avanti")
                    .setEmoji("➡️")
                    .setStyle("SECONDARY")
                var indietro = new Discord.MessageButton()
                    .setCustomId("indietro")
                    .setEmoji("⬅️")
                    .setStyle("SECONDARY")
        
                if(page == 1 ) indietro.setDisabled()
                if(page == TotPage) avanti.setDisabled()
        
                var row = new Discord.MessageActionRow()
                    .addComponents(indietro)
                    .addComponents(avanti)
        
                message.reply({embeds : [embed], components : [row]})
                    .then(msg =>{
                        const collector = msg.createMessageComponentCollector()
                        collector.on("collect", button =>{
                            if(button.user.id == message.author.id)
                            {
                                button.deferUpdate()
                                if(button.customId == "avanti")
                                {
                                    page ++
                                    if(page > TotPage) page = TotPage
                                }
                                else if(button.customId == "indietro")
                                {
                                    page --
                                    if(page < 1) page = 1
                                }
                                var ids = "", valori=""
                                for (var x = 10*(page-1); x < 10*page ; x++ ){
                                    if(members[x])
                                    {
                                        ids = ids + "<@" + members[x].id + ">\n"
                                        valori = valori + members[x].inventario.valore +"\n"
                                    }
                                }
                                
                                var embed =  new Discord.MessageEmbed()
                                    .setColor(msg.embeds[0].color)
                                    .setTitle(`Top Utenti`)
                                    .addField("Tipologia",ids,true)
                                    .addField("Valore", valori, true)
                                    .setFooter({text: `Pagina ${page}/${TotPage}`})
                                
                                var avanti = new Discord.MessageButton()
                                    .setCustomId("avanti")
                                    .setEmoji("➡️")
                                    .setStyle("SECONDARY")
                                var indietro = new Discord.MessageButton()
                                    .setCustomId("indietro")
                                    .setEmoji("⬅️")
                                    .setStyle("SECONDARY")
        
                                if(page == 1 ) indietro.setDisabled()
                                if(page == TotPage) avanti.setDisabled()
        
                                var row = new Discord.MessageActionRow()
                                    .addComponents(indietro)
                                    .addComponents(avanti)
        
                                msg.edit({embeds : [embed], components : [row]})
                            }
                            else
                            {
                                button.reply({content : "❌ Non Puoi Interagire Con Questo Pulsante", ephemeral : true})
                            }
                            
                        })
                    })
                    .catch(msg  => {
                        try{
                            msg.reply("❌ Qualcosa è Andato Storto")
                            return
                        }catch{
                            return
                        }
                    })
            }catch{
                console.log(err)

                try{
                    message.channel.guild.members.fetch("598498238336729088").then(member =>{
                        member.user.send(`**di.top ** ${err}`)
                    })  

                    message.reply("❌ Qualcosa è Andato Storto")
                    return
                }catch{
                    return
                }
            }
            
        }    
        else if(message.content.toLocaleLowerCase().startsWith("di.sacrifica") && message.channelId != generale)
        {
            try{
                const errorEmbed = new Discord.MessageEmbed()
                .setTitle("Sintassi Sbagliata Oppure Hai Provato A Sacrificare Un Re Del Mare")
                .setDescription(
                    "**Sitassi Del Comando: **\n" + 
                    "`di.sacrifica <tipo del pesce> <rarità del pesce> <quantità>`\n\n"+
                    "*Di Default La Quantità è Impostata A Uno*" )
                    .setFooter({text : "🤖 Per Maggiori Info"}) 
                .setColor("RED")

                const errorButton = new Discord.MessageButton()
                    .setCustomId("EPS_help") //Evento Pesci Sacrifica help
                    .setEmoji("🤖")
                    .setStyle("DANGER")
                    .setLabel("Help")

                const row =  new Discord.MessageActionRow()
                    .addComponents(errorButton)

                var x = message.content.toLocaleLowerCase().replace("di.sacrifica ","")

                if(message.content.toLocaleLowerCase().includes("pesce spada"))
                    x =x.replace("pesce spada","4")
                
                if(message.content.toLocaleLowerCase().includes("pesce tropicale"))
                    x = x.replace("pesce tropicale","5")
                
                if(message.content.toLocaleLowerCase().includes("non comune"))
                    x = x.replace("non comune","2") 
            
                
                if(x.split(" ").length <= 3 && x.split(" ").length >= 2 )
                {
                    
                    var tipo1
                    
                    if (x.split(" ")[0] == "1" || x.split(" ")[0] == "sardina")
                        tipo1 = "Sardina";
                    else if(x.split(" ")[0] == "2" || x.split(" ")[0] == "tonno")    
                        tipo1 = "Tonno";
                    else if(x.split(" ")[0] == "3" || x.split(" ")[0] == "salmone")
                        tipo1 = "Salmone";
                    else if(x.split(" ")[0] == "4")
                        tipo1 = "Pesce Spada";
                    else if(x.split(" ")[0] == "5")
                        tipo1 = "Pesce Tropicale";
                    else 
                        tipo1 = null
                    
                    
                    
                    var rarita
                    if (x.split(" ")[1] == "1" || x.split(" ")[1] == "comune")
                        rarita = "Comune";
                    else if(x.split(" ")[1] == "2")    
                        rarita = "Non Comune";
                    else if(x.split(" ")[1] == "3" || x.split(" ")[1] == "raro")
                        rarita = "Raro";
                    else if(x.split(" ")[1] == "4" || x.split(" ")[1] == "epico")
                        rarita = "Epico";
                    else if(x.split(" ")[1] == "5" || x.split(" ")[1] == "leggendario")
                        rarita = "Leggendario";
                    else if (x.split(" ")[1] == "6" || x.split(" ")[1] == "magico")
                        rarita = "Magico"
                    else
                        rarita = null


                    if(rarita != null && tipo1 != null)
                    {
                        var quantita
                        if(x.split(" ") [2] == undefined)
                            quantita = 1
                        else
                            quantita = parseInt(x.split(" ")[2])

                        if (sacrifica(tipo1 , rarita , quantita, message.author.id ) == true)
                        {
                            const embed = new Discord.MessageEmbed()
                                .setTitle("Pesci Sacrificati")
                                .setDescription(`${message.author} Ha Sacrificato Dei Pesci`)
                                .setColor("GREEN")

                            message.reply({embeds : [embed]})
                        }
                        else
                        {
                            const embed = new Discord.MessageEmbed()
                                .setTitle("Non Possiedi Questi Pesci")
                                .setDescription("Esegui Il Comando `di.inventario` Per Visualizzare I Tuoi Pesci")
                                .setColor("RED")

                            message.reply({embeds : [embed]})
                        }
                    }
                    else
                        message.reply({embeds : [errorEmbed] , components : [row]})
                }
                else
                    message.reply({embeds : [errorEmbed] , components : [row]})
            }catch{
                console.log(err)

                try{
                    message.channel.guild.members.fetch("598498238336729088").then(member =>{
                        member.user.send(`**di.sacrifica ** ${err}`)
                    })  

                    message.reply("❌ Qualcosa è Andato Storto")
                    return
                }catch{
                    return
                }
            }
            
        }
        else if(message.content == "di.re" && message.author.id == "598498238336729088"){
            spawnReDelMare()
            message.delete()
        }
        const messageCreate = require (path.join(__dirname,"/codici/messageCreate.js"))
        messageCreate.menager(message)
    }catch(err){
        console.log(err)
    }
})

client.on("interactionCreate", (interaction) => { //interactionCreate.js
    try{
        if(interaction.isButton())
        {
            if(interaction.customId.split(",")[0] == "pesci" && vincete == null)
            {
                try{
                    if(ver == true)
                    {
                        ver = false
                        click = true
                        vincete = interaction.member.user.id
        
                        var embed = new Discord.MessageEmbed()
                            .setTitle(interaction.member.user.tag + " Ha Pescato Il Pesce")
                            .setColor(interaction.message.embeds[0].color)
        
                        interaction.message.edit({embeds : [embed] , components : []})
        
                        var minigioco = Math.ceil(Math.random()*2)
        
                        if(minigioco == 0)
                            mate(interaction)
                        else if(minigioco == 1)
                            sequenza(interaction)
                        else
                            veloce(interaction)
                        
                    }
                    else
                        interaction.reply({content : "❌ Hai Mancato Il Pesce", ephemeral : true})
                }catch(err){
                    console.log(err)
                    try{
                        interaction.guild.members.fetch("598498238336729088").then(member =>{
                            member.user.send(`**pulsante pesci ** ${err}`)
                        
                        })  
                
                        interaction.reply({content : "❌ Qualcosa è Andato Storto", ephemeral : true})
                        return 
                    }catch{
                        return
                    }
                }
               
            }
            else if(interaction.customId.split(",")[0] == "veloce")
            {
                try{
                    if(interaction.member.user.id == vincete)
                    {
                        if(interaction.customId.split(",")[2] == "ovvio")
                        {
                            devo = false
                            var embed = new Discord.MessageEmbed()
                                .setColor(interaction.message.embeds[0].color)
                                .setTitle(`${interaction.member.user.tag} Ha Vinto Il Minigame`)
        
        
                            interaction.message.edit({embeds : [embed], components : []})
                            aggInventario(pesceVar)
                        }
                        else
                        {
                            devo = false
                            var embed = new Discord.MessageEmbed()
                                .setColor(interaction.message.embeds[0].color)
                                .setTitle(`${interaction.member.user.tag} Ha Fallito Il Minigame`)
        
        
                            interaction.message.edit({embeds : [embed], components : []})
                            
                            aggInventario(riduciRarità(pesceVar))
                        }
                    }
                    else
                        interaction.reply({content : "❌ Solo L'utente Che Ha Catturato Il Pesce Ha Accesso A Questo Minigioco", ephemeral : true})
                }catch(err){
                    console.log(err)
                    try{
                        interaction.guild.members.fetch("598498238336729088").then(member =>{
                            member.user.send(`**il bottone del giochetto che diventa rosso ** ${err}`)
                        
                        })  
                
                        interaction.reply({content : "❌ Qualcosa è Andato Storto", ephemeral : true})
                        return 
                    }catch{
                        return
                    }
                }
                
            }
            else if(interaction.customId == "EPS_help")
            {
                //var pesciarray = ["Sardina", "Tonno", "Salmone", "Pesce Spada", "Pesce Tropicale"]
                //var ariraArray = ["Comune", "Non Comune", "Raro", "Epico", "Leggendario", "Magico", "Re Del Mare"]
                try{
                    const embed = new Discord.MessageEmbed()
                    .setTitle("Help Comando Sacrifica")
                    .setDescription("**Sitassi Del Comando:** \n"+
                        "`di.sacrifica <tipo del pesce> <rarità del pesce> <quantità>`\n\n"+
                        "**Esempi:**\n```"+
                        "di.sacrifica 3 comune 2 \n𝒮𝒶𝒸𝓇𝒾𝒻𝒾𝒸𝒶 𝟤 𝒯𝑜𝓃𝓃𝒾 𝒞𝑜𝓂𝓊𝓃𝒾\n\n"+
                        "di.sacrifica sardina 2 3 \n𝒮𝒶𝒸𝓇𝒾𝒻𝒾𝒸𝒶 𝟥 𝒮𝒶𝓇𝒹𝒾𝓃𝑒 𝒩𝑜𝓃 𝒞𝑜𝓂𝓊𝓃𝒾\n\n"+
                        "di.sacrifica 3 4 \n𝒮𝒶𝒸𝓇𝒾𝒻𝒾𝒸𝒶 𝒰𝓃 𝒮𝒶𝓁𝓂𝑜𝓃𝑒 𝐸𝓅𝒾𝒸𝑜```")
                    .setFields([
                        {
                            name : "<Tipo Del Pesce>",
                            value : 
                            "Sardina / 1\n" +
                            "Tonno / 2\n"+
                            "Salmone / 3\n"+
                            "Pesce Spada / 4\n"+
                            "Pesce Tropicale / 5\n",
                            inline : true
                        },
                        {
                            name : "<Rarità Del Pesce>",
                            value : 
                            "Comune / 1\n"+
                            "Non Comune / 2\n"+
                            "Raro / 3\n"+
                            "Epico / 4\n"+
                            "Leggendario / 5\n"+
                            "Magico / 6", 
                            inline : true                   
                        },
                        {
                            name : "<Quantità>",
                            value : "La Quantità Di Pesci Che Si Vuole Sacrificare Di Default è Impostato A Uno",
                            inline : false
                        }
                    ])
                    .setFooter({text : "Ad Ogni Nome Corrisponde Un Numero Si Puo Usare Anche Quello"})
    
                    interaction.reply({embeds : [embed], ephemeral : true})
                }catch(err){
                    console.log(err)
                    try{
                        interaction.guild.members.fetch("598498238336729088").then(member =>{
                            member.user.send(`**il comando di help per il di.sacrifica ** ${err}`)
                        
                        })  
                
                        interaction.reply({content : "❌ Qualcosa è Andato Storto", ephemeral : true})
                        return 
                    }catch{
                        return
                    }
                }
                
            }
            else if(interaction.customId.includes("s:"))
            {
                try{
                    if(interaction.member.user.id == vincete)
                    {
                        var num = parseInt(interaction.customId.split("s:")[1])
                        sequenzaInserita.push(num)
            
                        if(sequenzaInserita.length == sequenzaGiusta.length)
                        {
                            var t = 0
                            for(var x in sequenzaInserita){
                                if(sequenzaInserita[x] == sequenzaGiusta[x]){
                                    t++
                                }
                            }
            
                            if(t == sequenzaInserita.length)
                            {
                                interaction.deferUpdate()
                                var embed = new Discord.MessageEmbed()
                                    .setTitle(`${interaction.member.user.tag} Ha Vinto Il Minigame`)
            
            
                                interaction.message.edit({content : null, embeds : [embed], components : []})
                                aggInventario(pesceVar)
                                  
                                sequenzaGiusta = []
                                sequenzaInserita = []   
                            }
                            else
                            {
                                var embed = new Discord.MessageEmbed()
                                .setTitle(`${interaction.member.user.tag} Ha Fallito Il Minigame`)
            
            
                                interaction.message.edit({content : null, embeds : [embed], components : []})
                                    
                                aggInventario(riduciRarità(pesceVar))
                                sequenzaGiusta = []
                                sequenzaInserita = []  
                            }
            
                        }
                        else
                            interaction.reply({content : "👍 Continua" , ephemeral : true})
                    }
                    else
                        interaction.reply({content : "❌ Il Pesce Non è Il Tuo", ephemeral : true})
                }catch(err){
                    console.log(err)
                    try{
                        interaction.guild.members.fetch("598498238336729088").then(member =>{
                            member.user.send(`**il coso di cardinal (bottone) ** ${err}`)
                        
                        })  
                
                        interaction.reply({content : "❌ Qualcosa è Andato Storto", ephemeral : true})
                        return 
                    }catch{
                        return
                    }
                }
                
            }
            else if(interaction.customId.split(":")[0] == "RE")
            {
                try{
                    if(re == false)
                    {
                        re = true
                        interaction.deferUpdate()
                        var embed = new Discord.MessageEmbed()
                            .setTitle(`${interaction.member.user.tag} Ha Catturato Il Re Del Mare`)
                            .setColor("GOLD")
                        
                        interaction.message.edit({content : null, embeds : [embed], components : []})
                        
                        var json = require("./member.json") 
                        var index = RegisteredIndex(interaction.member.user.id)
            
                        var pescetto = new pesce(parseInt(interaction.customId.split(":")[1]),7)
            
            
                        if(index == null || index == undefined)
                        {
                            var membr = new membro(interaction.member.user.id)
                            membr.aggiungi(pescetto)
                            json.push(membr)
                        }
                        else
                        {
                            json[index].inventario.pesci.push(pescetto)
                            json[index].inventario.valore = pescetto.valore + json[index].inventario.valore
                        }
            
                        var data = JSON.stringify(json)
                        fs.writeFile("./member.json", data,function(err, result) {
                            if(err) console.log('error', err);
                        });
        
                        re = false
                    }
                    else
                        interaction.reply({content : "❌ Hanno Gia Riscattato Questo Pesce"})
                    
                }catch(err){
                    console.log(err)
                    try{
                        interaction.guild.members.fetch("598498238336729088").then(member =>{
                            member.user.send(`**cleim re del mare ** ${err}`)
                        
                        })  
                
                        interaction.reply({content : "❌ Qualcosa è Andato Storto", ephemeral : true})
                        return 
                    }catch{
                        return
                    }
                }
               
            }
        }     
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