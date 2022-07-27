const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../../variabili.json"))
const fs = require("fs");
const internal = require("stream");

function sleep(s){
    var now = new Date().getTime();
    while(new Date().getTime() < now + (s*1000)){ /* non faccio niente */ } 
}

function pattuglia(id)
{
    const pattuglie = require(path.join(__dirname,"../../../pattuglie.json"))
                                
    for(var cont=0;cont<pattuglie.length;cont++)
    {
        if(pattuglie[cont].includes(id))
            return (cont+1)   
    } 

    return null
}


const Capo= 15 
const Commissari = 10
const Ispettori = 6
const Agenti = 5

const tempo_reset = 60000*60*24

function grado (ruoli)
{
    var cont = 0
    while(cont < ruoli.length)
    {
        if ( ruoli[cont] == variabili.CAPOPULA)
            return 0
        else if(ruoli[cont] == variabili.commissario)
            return 1
        else if(ruoli[cont] == variabili.ispettore)
            return 2
        else if(ruoli[cont] == variabili.agente)
            return 3

        cont ++
    }

    return null
}

function mute (comando){
    try{
        var utente= comando.options.getUser("user"); 
        var reason= comando.options.getString("motivo");
        var membro = comando.guild.members.cache.get(utente.id); 
        
        if(membro.bannable==false) 
        {
            var risposta = new Discord.MessageEmbed()
                .setTitle("OPERAZIONE NON AUTORIZZATA")
                .setColor("RED")
                .setDescription("L'utente Da Modificare è Un Pezzo Grosso Non Lo Posso Mutare")  

            comando.reply({embeds : [risposta], ephemeral : true})
        }
        else
        {   
            switch (grado(comando.member._roles))
            {
                case 0:
                    if(variabili.ContCapo < Capo) //verifico se si hanno ancora i mute giornalieri
                    {
                        variabili.ContCapo++
                        membro.timeout(1000 * 60 * 60)

                        var data = JSON.stringify(variabili)
                        fs.writeFile(path.join(__dirname,"../../../variabili.json"), data,function(err, result) {
                            if(err) console.log('error', err);
                        });

                        var risposta = new Discord.MessageEmbed()  //metto in "messaggio" il messaggio di riuscita dell'operazione
                            .setTitle("OPERAZIONE AUTORIZZATA")
                            .setColor("GREEN")
                            .setDescription(`**${membro} è Stato Correttamente Mutato Per Un 1 Ora**\n\n
                            Sono Disponibili ${Capo-variabili.ContCapo} Mute Per La Giornata Di Oggi`)

                        try{
                            comando.guild.members.fetch(utente.id, false).then((utente) => {
                                utente.send(`**Sei Stato Mutato Da Un Moderatore Per 1 Ora Minuti**\nMotivo: **`+reason+`**\nSe Hai Un Richiamo Preghiamo Di Aprire Un Ricorso Nella Chat <#893589753222545438>`); 
                            });
                        }catch{
                            risposta.setFooter({text : "Non è Stato Possibile Informare L'utente Mutato"})
                        }
                        
                        var log = new Discord.MessageEmbed()
                            .setTitle(`${comando.member.user.tag} Ha Eseguito Il Comando Mute`)
                            .setDescription(
                            `**Target** : ${membro}\n
                            **Motivo** ${reason}`)
                            .setFooter({text : `Rimangono ${Capo-variabili.ContCapo} Per I Capi Della Polizia Nella Giornata Di Oggi`})
                            .setColor("YELLOW")

                        comando.guild.channels.cache.get(variabili.log).send({embeds : [log]})

                        var notifica = new Discord.MessageEmbed()
                            .setTitle(`${comando.member.user.tag} Ha Eseguito Il Comando Mute`)
                            .setDescription(
                            `**Target** : ${membro}\n
                            **Motivo** ${reason}`)
                            .setColor("BLUE")
                        
                        switch(pattuglia(comando.member.user.id))
                        {
                            case 1:
                                var p = "996088525827100795"
                                break;
                            case 2:
                                var p = "996088571167506493"
                                break;
                            case 3:
                                var p = "996088615711015022"
                                break;
                            case 4:
                                var p = "996088669364568147"
                                break;
                            case 5:
                                var p = "996088708900073482"
                                break;
                            case 6:
                                var p = "996088752504057906"
                                break;
                            case 7:
                                var p = "1000029442472693870"
                                break;
                            default:
                                var p = "1000029286088069230"
                                break;
                        }
                        client.guilds.cache.get("996087822865936504").channels.cache.get(p).send({embeds : [notifica]})
                    }
                    else
                    {
                        var risposta = new Discord.MessageEmbed()
                        .setTitle("OPERAZIONE NON AUTORIZZATA")
                        .setColor("RED")
                        .setDescription("Sono Terminati I Mute Per La Giornata Di Oggi")
                    }


                    comando.reply({embeds:[risposta], ephemeral: true})  
                    break
                case 1:
                    if(variabili.ContCommissari < Commissari) //verifico se si hanno ancora i mute giornalieri
                    {
                        variabili.ContCommissari++
                        membro.timeout(1000 * 60 * 60)

                        var data = JSON.stringify(variabili)
                        fs.writeFile(path.join(__dirname,"../../../variabili.json"), data,function(err, result) {
                            if(err) console.log('error', err);
                        });
                        var risposta = new Discord.MessageEmbed()  //metto in "messaggio" il messaggio di riuscita dell'operazione
                            .setTitle("OPERAZIONE AUTORIZZATA")
                            .setColor("GREEN")
                            .setDescription(`**${membro} è Stato Correttamente Mutato Per Un 1 Ora**\n\n
                            Sono Disponibili ${Commissari-variabili.ContCommissari} Mute Per La Giornata Di Oggi`)

                        try{
                            comando.guild.members.fetch(utente.id, false).then((utente) => {
                                utente.send(`**Sei Stato Mutato Da Un Moderatore Per 1 Ora Minuti**\nMotivo: **`+reason+`**\nSe Hai Un Richiamo Preghiamo Di Aprire Un Ricorso Nella Chat <#893589753222545438>`); 
                            });
                        }catch{
                            risposta.setFooter({text : "Non è Stato Possibile Informare L'utente Mutato"})
                        }
                        
                        var log = new Discord.MessageEmbed()
                            .setTitle(`${comando.member.user.tag} Ha Eseguito Il Comando Mute`)
                            .setDescription(
                            `**Target** : ${membro}\n
                            **Motivo** ${reason}`)
                            .setFooter({text : `Rimangono ${Commissari-variabili.ContCommissari} Per I Commissari Della Polizia Nella Giornata Di Oggi`})
                            .setColor("YELLOW")

                        comando.guild.channels.cache.get(variabili.log).send({embeds : [log]})

                        var notifica = new Discord.MessageEmbed()
                            .setTitle(`${comando.member.user.tag} Ha Eseguito Il Comando Mute`)
                            .setDescription(
                            `**Target** : ${membro}\n
                            **Motivo** ${reason}`)
                            .setColor("BLUE")
                        
                        switch(pattuglia(comando.member.user.id))
                        {
                            case 1:
                                var p = "996088525827100795"
                                break;
                            case 2:
                                var p = "996088571167506493"
                                break;
                            case 3:
                                var p = "996088615711015022"
                                break;
                            case 4:
                                var p = "996088669364568147"
                                break;
                            case 5:
                                var p = "996088708900073482"
                                break;
                            case 6:
                                var p = "996088752504057906"
                                break;
                            case 7:
                                var p = "1000029442472693870"
                                break;
                            default:
                                var p = "1000029286088069230"
                                break;
                        }
                        client.guilds.cache.get("996087822865936504").channels.cache.get(p).send({embeds : [notifica]})
                    }
                    else
                    {
                        var risposta = new Discord.MessageEmbed()
                        .setTitle("OPERAZIONE NON AUTORIZZATA")
                        .setColor("RED")
                        .setDescription("Sono Terminati I Mute Per La Giornata Di Oggi Contatta Un Superiore")
                    }
                    comando.reply({embeds:[risposta], ephemeral: true})  
                    
                    break
                case 2:
                    if(variabili.ContIspettori < Ispettori) //verifico se si hanno ancora i mute giornalieri
                    {
                        variabili.ContIspettori++
                        membro.timeout(1000 * 60 * 60)
                        var data = JSON.stringify(variabili)
                        fs.writeFile(path.join(__dirname,"../../../variabili.json"), data,function(err, result) {
                            if(err) console.log('error', err);
                        });


                        var risposta = new Discord.MessageEmbed()  //metto in "messaggio" il messaggio di riuscita dell'operazione
                        .setTitle("OPERAZIONE AUTORIZZATA")
                        .setColor("GREEN")
                        .setDescription(`**${membro} è Stato Correttamente Mutato Per Un 1 Ora**\n\n
                        Sono Disponibili ${Ispettori-variabili.ContIspettori} Mute Per La Giornata Di Oggi`)

                    try{
                        comando.guild.members.fetch(utente.id, false).then((utente) => {
                            utente.send(`**Sei Stato Mutato Da Un Moderatore Per 1 Ora Minuti**\nMotivo: **`+reason+`**\nSe Hai Un Richiamo Preghiamo Di Aprire Un Ricorso Nella Chat <#893589753222545438>`); 
                        });
                    }catch{
                        risposta.setFooter({text : "Non è Stato Possibile Informare L'utente Mutato"})
                    }
                    
                    var log = new Discord.MessageEmbed()
                        .setTitle(`${comando.member.user.tag} Ha Eseguito Il Comando Mute`)
                        .setDescription(
                        `**Target** : ${membro}\n
                        **Motivo** ${reason}`)
                        .setFooter({text : `Rimangono ${Ispettori-variabili.ContIspettori} Per I Commissari Della Polizia Nella Giornata Di Oggi`})
                        .setColor("YELLOW")

                    comando.guild.channels.cache.get(variabili.log).send({embeds : [log]})

                    var notifica = new Discord.MessageEmbed()
                        .setTitle(`${comando.member.user.tag} Ha Eseguito Il Comando Mute`)
                        .setDescription(
                        `**Target** : ${membro}\n
                        **Motivo** ${reason}`)
                        .setColor("BLUE")
                    
                    switch(pattuglia(comando.member.user.id))
                    {
                        case 1:
                            var p = "996088525827100795"
                            break;
                        case 2:
                            var p = "996088571167506493"
                            break;
                        case 3:
                            var p = "996088615711015022"
                            break;
                        case 4:
                            var p = "996088669364568147"
                            break;
                        case 5:
                            var p = "996088708900073482"
                            break;
                        case 6:
                            var p = "996088752504057906"
                            break;
                        case 7:
                            var p = "1000029442472693870"
                            break;
                        default:
                            var p = "1000029286088069230"
                            break;
                    }
                    client.guilds.cache.get("996087822865936504").channels.cache.get(p).send({embeds : [notifica]})
                }
                else
                {
                    var risposta = new Discord.MessageEmbed()
                    .setTitle("OPERAZIONE NON AUTORIZZATA")
                    .setColor("RED")
                    .setDescription("Sono Terminati I Mute Per La Giornata Di Oggi Contatta Un Superiore")
                }
                comando.reply({embeds:[risposta], ephemeral: true})  
                
                break
                case 3:
                    if(variabili.ContAgenti < Agenti) //verifico se si hanno ancora i mute giornalieri
                    {
                        variabili.ContAgenti++
                        membro.timeout(1000 * 60 * 60)
                        
                        var data = JSON.stringify(variabili)
                        fs.writeFile(path.join(__dirname,"../../../variabili.json"), data,function(err, result) {
                            if(err) console.log('error', err);
                        });
                        
                        var risposta = new Discord.MessageEmbed()  //metto in "messaggio" il messaggio di riuscita dell'operazione
                        .setTitle("OPERAZIONE AUTORIZZATA")
                        .setColor("GREEN")
                        .setDescription(`**${membro} è Stato Correttamente Mutato Per Un 1 Ora**\n\n
                        Sono Disponibili ${Agenti-variabili.ContAgenti} Mute Per La Giornata Di Oggi`)

                    try{
                        comando.guild.members.fetch(utente.id, false).then((utente) => {
                            utente.send(`**Sei Stato Mutato Da Un Moderatore Per 1 Ora Minuti**\nMotivo: **`+reason+`**\nSe Hai Un Richiamo Preghiamo Di Aprire Un Ricorso Nella Chat <#893589753222545438>`); 
                        });
                    }catch{
                        risposta.setFooter({text : "Non è Stato Possibile Informare L'utente Mutato"})
                    }
                    
                    var log = new Discord.MessageEmbed()
                        .setTitle(`${comando.member.user.tag} Ha Eseguito Il Comando Mute`)
                        .setDescription(
                        `**Target** : ${membro}\n
                        **Motivo** ${reason}`)
                        .setFooter({text : `Rimangono ${Agenti-variabili.ContAgenti} Per I Commissari Della Polizia Nella Giornata Di Oggi`})
                        .setColor("YELLOW")

                    comando.guild.channels.cache.get(variabili.log).send({embeds : [log]})

                    var notifica = new Discord.MessageEmbed()
                        .setTitle(`${comando.member.user.tag} Ha Eseguito Il Comando Mute`)
                        .setDescription(
                        `**Target** : ${membro}\n
                        **Motivo** ${reason}`)
                        .setColor("BLUE")
                    
                    switch(pattuglia(comando.member.user.id))
                    {
                        case 1:
                            var p = "996088525827100795"
                            break;
                        case 2:
                            var p = "996088571167506493"
                            break;
                        case 3:
                            var p = "996088615711015022"
                            break;
                        case 4:
                            var p = "996088669364568147"
                            break;
                        case 5:
                            var p = "996088708900073482"
                            break;
                        case 6:
                            var p = "996088752504057906"
                            break;
                        case 7:
                            var p = "1000029442472693870"
                            break;
                        default:
                            var p = "1000029286088069230"
                            break;
                    }
                    client.guilds.cache.get("996087822865936504").channels.cache.get(p).send({embeds : [notifica]})
                }
                else
                {
                    var risposta = new Discord.MessageEmbed()
                    .setTitle("OPERAZIONE NON AUTORIZZATA")
                    .setColor("RED")
                    .setDescription("Sono Terminati I Mute Per La Giornata Di Oggi Contatta Un Superiore")
                }
                comando.reply({embeds:[risposta], ephemeral: true})  
                
                break
                default : 
                    comando.reply({content : "❌ Non Sei Nel Corpo Di Polizia", ephemeral : true})
            }
        }

        if(variabili.inizio_nute==false)
        {
            variabili.inizio_nute=true 
            
            setTimeout((x)=>{
                x.ContCapo = 0,
                x.ContCommissari = 0,
                x.ContIspettori = 0,
                x.ContAgenti = 0
                x.inizio_nute = false

                console.log("mute ripristinato")

                var data = JSON.stringify(x)
                fs.writeFile(path.join(__dirname,"../../../variabili.json"), data,function(err, result) {
                    if(err) console.log('error', err);
                });
            }, 86400*1000, variabili)
        }

        var data = JSON.stringify(variabili)
        fs.writeFile(path.join(__dirname,"../../../variabili.json"), data,function(err, result) {
            if(err) console.log('error', err);
        });
        return
        
    }catch (err){
        console.log(err)
        try{
            comando.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("**/mute** \n"+err)
            
            })  
    
            comando.reply({content : "❌ Qualcosa è Andato Storto", ephemeral : true})
            return
        }catch{
            return
        }
    }
}

module.exports = {mute}