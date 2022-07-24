const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../../variabili.json"))
const fs = require("fs")

function sleep(s){
    var now = new Date().getTime();
    while(new Date().getTime() < now + (s*1000)){ /* non faccio niente */ } 
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
        console.log("ciaooo")
        var utente= comando.options.getUser("user"); //prendo l'utente passato dall'operatore
        var reason= comando.options.getString("motivo");
        var membro = comando.guild.members.cache.get(utente.id); //prendo il membro passato dall'operatore

        if(membro.bannable==false) //verifico che il bot possa bannare il membro (se non puo l'utente è un membro del governo)
        {
            var risposta = new Discord.MessageEmbed()
                .setTitle("**DISCORD ITALIA**\n\n")
                .setColor("#0b39db")
                .setDescription("───────────────────────────────────────\nL'utente è Un Moderatore:  **Utente Non Modificato**")  //metto in "messaggio" il messaggio d'errore

            
        }
        else
        {
            if(variabili.inizio_nute==false) //verifico che sia il primo mute della giornata
            {
                variabili.inizio_nute=true //dico di non entrare piu qui dentro perche gia c'è stato un altro mute
                
                var data = JSON.stringify(variabili)
                fs.writeFile(path.join(__dirname,"../../../variabili.json"), data,function(err, result) {
                    if(err) console.log('error', err);
                });

                sleep(86400)
                
                variabili.ContCapo = 0,
                variabili.ContCommissari = 0,
                variabili.ContIspettori = 0,
                variabili.ContAgenti = 0
                variabili.inizio_nute = false

                var data = JSON.stringify(variabili)
                fs.writeFile(path.join(__dirname,"../../../variabili.json"), data,function(err, result) {
                    if(err) console.log('error', err);
                });
            }

            switch (grado(comando.member._roles))
            {
                case 0:
                    if(variabili.ContCapo < Capo) //verifico se si hanno ancora i mute giornalieri
                    {
                        variabili.ContCapo++
                        membro.timeout(1000 * 60 * 60)
                        var risposta = new Discord.MessageEmbed()  //metto in "messaggio" il messaggio di riuscita dell'operazione
                            .setTitle("**DISCORD ITALIA**\n\n")
                            .setColor("#0b39db")
                            .setDescription("───────────────────────────────────────\nOperazione Autorizzata:  **Utente Modificato**")
                        
                        
                        comando.guild.members.fetch(utente.id, false).then((utente) => {
                            utente.send(`**Sei Stato Mutato Da Un Moderatore Per 1 Ora Minuti**\nMotivo: **`+reason+`**\nSe Hai Un Richiamo Preghiamo Di Aprire Un Ricorso Nella Chat <#893589753222545438>`); 
                        });

                        var campare=comando.guild.channels.cache.get(variabili.log)
                        campare.send({
                            "content": null,
                            "embeds": [
                            {
                                "title": "**DISCORD ITALIA**",
                                "description": "<@"+comando.member.id+"> ha eseguito il comando mute su <@"+membro.id+">\n**Motivo: **"+ reason,
                                "color": 735707,
                                "footer": {
                                "text": "rimangono "+ (Capo - variabili.ContCapo) +" mute per la giornata di oggi"
                                }
                            }
                            ],
                            "attachments": []
                        }) //mando il messaggio di log
                        
                        campare=comando.guild.channels.cache.get(variabili.info)
                        campare.send("utente mutato \nrimangono "+(Capo - variabili.ContCapo)+" mute per la giornata di oggi") 
                    }
                    else
                    {
                        var risposta = new Discord.MessageEmbed() //metto in "messaggio" un messaggio d'errore che i mute sono finiti... 
                        .setTitle("**DISCORD ITALIA**\n\n")
                        .setColor("#0b39db")
                        .setDescription("───────────────────────────────────────\nOperazione Non Autorizzata:  **Sono Finiti I Mute**")
                    }
                    comando.reply({embeds:[risposta], ephemeral: true}) //comunico il contenuto di messaggio al poliziotto   
                    break
                case 1:
                    if(variabili.ContCommissari < Commissari) //verifico se si hanno ancora i mute giornalieri
                    {
                        variabili.ContCommissari++
                        membro.timeout(1000 * 60 * 60)
                        var risposta = new Discord.MessageEmbed()  //metto in "messaggio" il messaggio di riuscita dell'operazione
                            .setTitle("**DISCORD ITALIA**\n\n")
                            .setColor("#0b39db")
                            .setDescription("───────────────────────────────────────\nOperazione Autorizzata:  **Utente Modificato**")
                        
                        
                        comando.guild.members.fetch(utente.id, false).then((utente) => {
                            utente.send(`**Sei Stato Mutato Da Un Moderatore Per 1 Ora Minuti**\nMotivo: **`+reason+`**\nSe Hai Un Richiamo Preghiamo Di Aprire Un Ricorso Nella Chat <#893589753222545438>`); 
                        });

                        var campare=comando.guild.channels.cache.get(variabili.log)
                        campare.send({
                            "content": null,
                            "embeds": [
                            {
                                "title": "**DISCORD ITALIA**",
                                "description": "<@"+comando.member.id+"> ha eseguito il comando mute su <@"+membro.id+">\n**Motivo: **"+ reason,
                                "color": 735707,
                                "footer": {
                                "text": "rimangono "+ (Commissari - variabili.ContCommissari) +" mute per la giornata di oggi"
                                }
                            }
                            ],
                            "attachments": []
                        }) //mando il messaggio di log
                        
                        campare=comando.guild.channels.cache.get(variabili.info)
                        campare.send("utente mutato \nrimangono "+(Commissari - variabili.ContCommissari)+" mute per la giornata di oggi") 
                    }
                    else
                    {
                        var risposta = new Discord.MessageEmbed() //metto in "messaggio" un messaggio d'errore che i mute sono finiti... 
                        .setTitle("**DISCORD ITALIA**\n\n")
                        .setColor("#0b39db")
                        .setDescription("───────────────────────────────────────\nOperazione Non Autorizzata:  **Sono Finiti I Mute**")
                    }
                    comando.reply({embeds:[risposta], ephemeral: true}) //comunico il contenuto di messaggio al poliziotto   
                    break
                case 2:
                    if(variabili.ContIspettori < Ispettori) //verifico se si hanno ancora i mute giornalieri
                    {
                        variabili.ContIspettori++
                        membro.timeout(1000 * 60 * 60)
                        var risposta = new Discord.MessageEmbed()  //metto in "messaggio" il messaggio di riuscita dell'operazione
                            .setTitle("**DISCORD ITALIA**\n\n")
                            .setColor("#0b39db")
                            .setDescription("───────────────────────────────────────\nOperazione Autorizzata:  **Utente Modificato**")
                        
                        
                        comando.guild.members.fetch(utente.id, false).then((utente) => {
                            utente.send(`**Sei Stato Mutato Da Un Moderatore Per 1 Ora Minuti**\nMotivo: **`+reason+`**\nSe Hai Un Richiamo Preghiamo Di Aprire Un Ricorso Nella Chat <#893589753222545438>`); 
                        });

                        var campare=comando.guild.channels.cache.get(variabili.log)
                        campare.send({
                            "content": null,
                            "embeds": [
                            {
                                "title": "**DISCORD ITALIA**",
                                "description": "<@"+comando.member.id+"> ha eseguito il comando mute su <@"+membro.id+">\n**Motivo: **"+ reason,
                                "color": 735707,
                                "footer": {
                                "text": "rimangono "+ (Ispettori-variabili.ContIspettori) +" mute per la giornata di oggi"
                                }
                            }
                            ],
                            "attachments": []
                        }) //mando il messaggio di log
                        
                        campare=comando.guild.channels.cache.get(variabili.info)
                        campare.send("utente mutato \nrimangono "+(Ispettori-variabili.ContIspettori)+" mute per la giornata di oggi") 
                    }
                    else
                    {
                        var risposta = new Discord.MessageEmbed() //metto in "messaggio" un messaggio d'errore che i mute sono finiti... 
                        .setTitle("**DISCORD ITALIA**\n\n")
                        .setColor("#0b39db")
                        .setDescription("───────────────────────────────────────\nOperazione Non Autorizzata:  **Sono Finiti I Mute**")
                    }
                    comando.reply({embeds:[risposta], ephemeral: true}) //comunico il contenuto di messaggio al poliziotto   
                    break
                case 3:
                    if(variabili.ContAgenti < Agenti) //verifico se si hanno ancora i mute giornalieri
                    {
                        variabili.ContAgenti++
                        membro.timeout(1000 * 60 * 60)
                        var risposta = new Discord.MessageEmbed()  //metto in "messaggio" il messaggio di riuscita dell'operazione
                            .setTitle("**DISCORD ITALIA**\n\n")
                            .setColor("#0b39db")
                            .setDescription("───────────────────────────────────────\nOperazione Autorizzata:  **Utente Modificato**")
                        
                        
                        comando.guild.members.fetch(utente.id, false).then((utente) => {
                            utente.send(`**Sei Stato Mutato Da Un Moderatore Per 1 Ora Minuti**\nMotivo: **`+reason+`**\nSe Hai Un Richiamo Preghiamo Di Aprire Un Ricorso Nella Chat <#893589753222545438>`); 
                        });

                        var campare=comando.guild.channels.cache.get(variabili.log)
                        campare.send({
                            "content": null,
                            "embeds": [
                            {
                                "title": "**DISCORD ITALIA**",
                                "description": "<@"+comando.member.id+"> ha eseguito il comando mute su <@"+membro.id+">\n**Motivo: **"+ reason,
                                "color": 735707,
                                "footer": {
                                "text": "rimangono "+ (Agenti - variabili.ContAgenti) +" mute per la giornata di oggi"
                                }
                            }
                            ],
                            "attachments": []
                        }) //mando il messaggio di log
                        
                        campare=comando.guild.channels.cache.get(variabili.info)
                        campare.send("utente mutato \nrimangono "+(Agenti - variabili.ContAgenti)+" mute per la giornata di oggi") 
                    }
                    else
                    {
                        var risposta = new Discord.MessageEmbed() //metto in "messaggio" un messaggio d'errore che i mute sono finiti... 
                        .setTitle("**DISCORD ITALIA**\n\n")
                        .setColor("#0b39db")
                        .setDescription("───────────────────────────────────────\nOperazione Non Autorizzata:  **Sono Finiti I Mute**")
                    }
                    comando.reply({embeds:[risposta], ephemeral: true}) //comunico il contenuto di messaggio al poliziotto   
                    break
                default : 
                {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("DISCORD ITALIA")
                        .setDescription("A Quanto Pare Tu Non Hai I Ruoli Per Mutare Le Persone")
                        .setColor("RANDOM")


                    comando.reply({embeds : [embed], ephemeral : true})
                }
            }
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
                member.user.send("max /mute ha fallito cabbo fai")
            
            })  
    
            comando.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
            return
        }catch{
            return
        }
    }
}

module.exports = {mute}