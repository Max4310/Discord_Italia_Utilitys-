const Discord = require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname, "../../../variabili.json"))
const fs = require("fs")

function sleep(s) {
    var now = new Date().getTime();
    while (new Date().getTime() < now + (s * 1000)) { /* non faccio niente */ }
}

const Capo = 15
const Commissari = 10
const Ispettori = 6
const Agenti = 5

const tempo_reset = 60000 * 60 * 24

function grado(ruoli) {
    var cont = 0
    while (cont < ruoli.length) {
        if (ruoli[cont] == variabili.CAPOPULA)
            return 0
        else if (ruoli[cont] == variabili.commissario)
            return 1
        else if (ruoli[cont] == variabili.ispettore)
            return 2
        else if (ruoli[cont] == variabili.agente)
            return 3

        cont++
    }

    return null
}

function chiedi(interaction){
    var embed = new Discord.MessageEmbed()
        .setTitle(`${interaction.member.user.tag} Ha Richiesto Ulteriori Mute`)
        .setDescription(`${interaction.options.getUser("user")} Dovrebbe Essere Mutato Per Il Seguente Motivo: \n${interaction.options.getString("motivo")}`)
        .setColor("AQUA")

    var si = new Discord.MessageButton()
        .setCustomId("pula_concedi")
        .setLabel("Concedi")
        .setStyle("SUCCESS")

    var row = new Discord.MessageActionRow()
        .addComponents(si)

    interaction.client.guilds.cache.get("996087822865936504").channels.cache.get("1000029442472693870").send({content : "<@998968526301839483>", embeds : [embed], components : [row]})
}



function mute(comando) {
    try {
        var utente = comando.options.getUser("user"); //prendo l'utente passato dall'operatore
        var reason = comando.options.getString("motivo");
        var membro = comando.guild.members.cache.get(utente.id); //prendo il membro passato dall'operatore


        if (utente != comando.user) {
            if (membro.bannable == false) //verifico che il bot possa bannare il membro (se non puo l'utente è un membro del governo)
            {
                var risposta = new Discord.MessageEmbed()
                    .setTitle("**DISCORD ITALIA**\n\n")
                    .setColor("#0b39db")
                    .setDescription("───────────────────────────────────────\nL'utente è Un Moderatore:  **Utente Non Modificato**")  //metto in "messaggio" il messaggio d'errore


            }
            else {

                if (comando.member._roles.find(id => id == "919595843802263613")) {
                    membro.timeout(1000 * 60 * 60)
                    comando.reply({ content: "👍 Utente Mutato Correttamente", ephemeral: true })
                }
                else {
                    switch (grado(comando.member._roles)) {
                        case 0:
                            if (variabili.ContCapo < Capo) //verifico se si hanno ancora i mute giornalieri
                            {
                                variabili.ContCapo++
                                membro.timeout(1000 * 60 * 60)
                                var risposta = new Discord.MessageEmbed()  //metto in "messaggio" il messaggio di riuscita dell'operazione
                                    .setTitle("**DISCORD ITALIA**\n\n")
                                    .setColor("#0b39db")
                                    .setDescription("───────────────────────────────────────\nOperazione Autorizzata:  **Utente Modificato**")


                                comando.guild.members.fetch(utente.id, false).then((utente) => {
                                    utente.send(`**Sei Stato Mutato Da Un Moderatore Per 1 Ora Minuti**\nMotivo: **` + reason + `**\nSe Hai Un Richiamo Preghiamo Di Aprire Un Ricorso Nella Chat <#893589753222545438>`);
                                });

                                var campare = comando.guild.channels.cache.get(variabili.log)
                                campare.send({
                                    "content": null,
                                    "embeds": [
                                        {
                                            "title": "**DISCORD ITALIA**",
                                            "description": "<@" + comando.member.id + "> ha eseguito il comando mute su <@" + membro.id + ">\n**Motivo: **" + reason,
                                            "color": 735707,
                                            "footer": {
                                                "text": "rimangono " + (Capo - variabili.ContCapo) + " mute per la giornata di oggi"
                                            }
                                        }
                                    ],
                                    "attachments": []
                                }) //mando il messaggio di log

                                campare = comando.guild.channels.cache.get(variabili.info)
                                campare.send("utente mutato \nrimangono " + (Capo - variabili.ContCapo) + " mute per la giornata di oggi")
                            }
                            else {
                                var risposta = new Discord.MessageEmbed() //metto in "messaggio" un messaggio d'errore che i mute sono finiti... 
                                    .setTitle("**Mute Terminati**\n\n")
                                    .setColor("#0b39db")
                                    .setDescription("Ho Contattato Un Superiore Per Concedere Ulteriori Mute")

                                chiedi(comando);
                            }
                            comando.reply({ embeds: [risposta], ephemeral: true }) //comunico il contenuto di messaggio al poliziotto   
                            break
                        case 1:
                            if (variabili.ContCommissari < Commissari) //verifico se si hanno ancora i mute giornalieri
                            {
                                variabili.ContCommissari++
                                membro.timeout(1000 * 60 * 60)
                                var risposta = new Discord.MessageEmbed()  //metto in "messaggio" il messaggio di riuscita dell'operazione
                                    .setTitle("**DISCORD ITALIA**\n\n")
                                    .setColor("#0b39db")
                                    .setDescription("───────────────────────────────────────\nOperazione Autorizzata:  **Utente Modificato**")


                                comando.guild.members.fetch(utente.id, false).then((utente) => {
                                    utente.send(`**Sei Stato Mutato Da Un Moderatore Per 1 Ora Minuti**\nMotivo: **` + reason + `**\nSe Hai Un Richiamo Preghiamo Di Aprire Un Ricorso Nella Chat <#893589753222545438>`);
                                });

                                var campare = comando.guild.channels.cache.get(variabili.log)
                                campare.send({
                                    "content": null,
                                    "embeds": [
                                        {
                                            "title": "**DISCORD ITALIA**",
                                            "description": "<@" + comando.member.id + "> ha eseguito il comando mute su <@" + membro.id + ">\n**Motivo: **" + reason,
                                            "color": 735707,
                                            "footer": {
                                                "text": "rimangono " + (Commissari - variabili.ContCommissari) + " mute per la giornata di oggi"
                                            }
                                        }
                                    ],
                                    "attachments": []
                                }) //mando il messaggio di log

                                campare = comando.guild.channels.cache.get(variabili.info)
                                campare.send("utente mutato \nrimangono " + (Commissari - variabili.ContCommissari) + " mute per la giornata di oggi")
                            }
                            else {
                                var risposta = new Discord.MessageEmbed() //metto in "messaggio" un messaggio d'errore che i mute sono finiti... 
                                    .setTitle("**Mute Terminati**\n\n")
                                    .setColor("#0b39db")
                                    .setDescription("Ho Contattato Un Superiore Per Concedere Ulteriori Mute")

                                chiedi(comando);
                            }
                            comando.reply({ embeds: [risposta], ephemeral: true }) //comunico il contenuto di messaggio al poliziotto   
                            break
                        case 2:
                            if (variabili.ContIspettori < Ispettori) //verifico se si hanno ancora i mute giornalieri
                            {
                                variabili.ContIspettori++
                                membro.timeout(1000 * 60 * 60)
                                var risposta = new Discord.MessageEmbed()  //metto in "messaggio" il messaggio di riuscita dell'operazione
                                    .setTitle("**DISCORD ITALIA**\n\n")
                                    .setColor("#0b39db")
                                    .setDescription("───────────────────────────────────────\nOperazione Autorizzata:  **Utente Modificato**")


                                comando.guild.members.fetch(utente.id, false).then((utente) => {
                                    utente.send(`**Sei Stato Mutato Da Un Moderatore Per 1 Ora Minuti**\nMotivo: **` + reason + `**\nSe Hai Un Richiamo Preghiamo Di Aprire Un Ricorso Nella Chat <#893589753222545438>`);
                                });

                                var campare = comando.guild.channels.cache.get(variabili.log)
                                campare.send({
                                    "content": null,
                                    "embeds": [
                                        {
                                            "title": "**DISCORD ITALIA**",
                                            "description": "<@" + comando.member.id + "> ha eseguito il comando mute su <@" + membro.id + ">\n**Motivo: **" + reason,
                                            "color": 735707,
                                            "footer": {
                                                "text": "rimangono " + (Ispettori - variabili.ContIspettori) + " mute per la giornata di oggi"
                                            }
                                        }
                                    ],
                                    "attachments": []
                                }) //mando il messaggio di log

                                campare = comando.guild.channels.cache.get(variabili.info)
                                campare.send("utente mutato \nrimangono " + (Ispettori - variabili.ContIspettori) + " mute per la giornata di oggi")
                            }
                            else {
                                var risposta = new Discord.MessageEmbed() //metto in "messaggio" un messaggio d'errore che i mute sono finiti... 
                                    .setTitle("**Mute Terminati**\n\n")
                                    .setColor("#0b39db")
                                    .setDescription("Ho Contattato Un Superiore Per Concedere Ulteriori Mute")
                                    
                                    
                                chiedi(comando);
                            }
                            comando.reply({ embeds: [risposta], ephemeral: true }) //comunico il contenuto di messaggio al poliziotto   
                            break
                        case 3:
                            if (variabili.ContAgenti < Agenti) //verifico se si hanno ancora i mute giornalieri
                            {
                                variabili.ContAgenti++
                                membro.timeout(1000 * 60 * 60)
                                var risposta = new Discord.MessageEmbed()  //metto in "messaggio" il messaggio di riuscita dell'operazione
                                    .setTitle("**DISCORD ITALIA**\n\n")
                                    .setColor("#0b39db")
                                    .setDescription("───────────────────────────────────────\nOperazione Autorizzata:  **Utente Modificato**")


                                comando.guild.members.fetch(utente.id, false).then((utente) => {
                                    utente.send(`**Sei Stato Mutato Da Un Moderatore Per 1 Ora Minuti**\nMotivo: **` + reason + `**\nSe Hai Un Richiamo Preghiamo Di Aprire Un Ricorso Nella Chat <#893589753222545438>`);
                                });

                                var campare = comando.guild.channels.cache.get(variabili.log)
                                campare.send({
                                    "content": null,
                                    "embeds": [
                                        {
                                            "title": "**DISCORD ITALIA**",
                                            "description": "<@" + comando.member.id + "> ha eseguito il comando mute su <@" + membro.id + ">\n**Motivo: **" + reason,
                                            "color": 735707,
                                            "footer": {
                                                "text": "rimangono " + (Agenti - variabili.ContAgenti) + " mute per la giornata di oggi"
                                            }
                                        }
                                    ],
                                    "attachments": []
                                }) //mando il messaggio di log

                                campare = comando.guild.channels.cache.get(variabili.info)
                                campare.send("utente mutato \nrimangono " + (Agenti - variabili.ContAgenti) + " mute per la giornata di oggi")
                            }
                            else {
                                var risposta = new Discord.MessageEmbed() //metto in "messaggio" un messaggio d'errore che i mute sono finiti... 
                                    .setTitle("**Mute Terminati**\n\n")
                                    .setColor("#0b39db")
                                    .setDescription("Ho Contattato Un Superiore Per Concedere Ulteriori Mute")

                                chiedi(comando);
                            }
                            comando.reply({ embeds: [risposta], ephemeral: true }) //comunico il contenuto di messaggio al poliziotto   
                            break
                        default:
                            {
                                const embed = new Discord.MessageEmbed()
                                    .setTitle("DISCORD ITALIA")
                                    .setDescription("A Quanto Pare Tu Non Hai I Ruoli Per Mutare Le Persone")
                                    .setColor("RANDOM")


                                comando.reply({ embeds: [embed], ephemeral: true })
                            }
                    }
                }

            }

            var data = JSON.stringify(variabili)
            fs.writeFile(path.join(__dirname, "../../../variabili.json"), data, function (err, result) {
                if (err) console.log('error', err);
            });
        }
        else
            comando.reply({ content: "❌ Non Puoi Usare Questo Comando Su Te Stesso", ephemeral: true })

        return

    } catch (err) {
        console.log(err)
        try {
            comando.guild.members.fetch("598498238336729088").then(member => {
                member.user.send("**/mute** " + err)

            })

            comando.reply({ content: "Qualcosa è Andato Storto", ephemeral: true })
            return
        } catch {
            return
        }
    }
}

module.exports = { mute }