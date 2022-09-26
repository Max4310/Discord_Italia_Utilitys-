const Discord = require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname, "../../../variabili.json"))
const { membro, gestisciVisulizza, isStaff, CoinMember, aggiona, user, aggiungi } = require(path.join(__dirname, "../../../oggetti.js"))


function comando(interaction) {

    try{
        if (interaction.channelId == variabili.chatWarn) {
            if (interaction.member.permissions.has("ADMINISTRATOR")) {
                user("warn").then((warnati) => {
                    CoinMember(interaction.member.user.id).then(member => {
    
                        if (interaction.options.getString("livello") != "leva") {
                            var data = new Date;
                            var data2 = new Date;
                            var temp = 1000 * 60 * 60 * 24 * parseInt(interaction.options.getString("livello").split(":")[1])
    
                            data2.setTime(data.getTime() + temp)
    
                            const warn = {
                                memberId: interaction.options.getUser("target").id,
                                fine: {
                                    giorno: data2.getDate(),
                                    mese: data2.getMonth() + 1,
                                    anno: data2.getFullYear()
                                },
                                lvl: interaction.options.getString("livello").split(":")[0]
                            }
    
    
                            if (warnati == null) {
                                aggiona(warn, "warn")
    
                                const risposta = new Discord.MessageEmbed()
                                    .setTitle("Utente Warnato Con Successo")
                                    .setDescription(`${interaction.member} Ha Assegnato Un Warn A <@${warn.memberId}>`)
                                    .setFields([
                                        {
                                            name: "Warn",
                                            value: `<@&${warn.lvl}>`
                                        },
                                        {
                                            name: "Scadenza",
                                            value: `${warn.fine.giorno}/${warn.fine.mese}/${warn.fine.anno}`
                                        }
                                    ])
                                interaction.reply({ embeds: [risposta] })
                            }
                            else {
                                var x = warnati.findIndex((WarnUser) => WarnUser.memberId == interaction.options.getUser("target").id)
                                //console.log(x)
    
                                if (x > -1) {
                                    var salvo = warnati[x]
                                    warnati[x] = warn
    
                                    aggiona(warnati, "warn")
    
                                    const risposta = new Discord.MessageEmbed()
                                        .setTitle(`Warn Modificato Con Successo`)
                                        .setDescription(`${interaction.options.getUser("target")} Era Gia Stato Warnato Ora é Stato Modificato`)
                                        .setFields([
                                            {
                                                name: "Prima",
                                                value:
                                                    `<@&${salvo.lvl}>\n` +
                                                    `Scadenza: ${salvo.fine.giorno}/${salvo.fine.mese}/${salvo.fine.anno}`
                                            },
                                            {
                                                name: "Ora",
                                                value:
                                                    `<@&${warn.lvl}>\n` +
                                                    `Scadenza: ${warn.fine.giorno}/${warn.fine.mese}/${warn.fine.anno}`
                                            }
                                        ])
    
                                    interaction.reply({ embeds: [risposta] })
                                    interaction.guild.members.cache.get(salvo.memberId).roles.remove(interaction.guild.roles.cache.get(salvo.lvl))
                                }
                                else {
                                    warnati.push(warn)
    
                                    aggiona(warnati, "warn")
                                    const risposta = new Discord.MessageEmbed()
                                        .setTitle("Utente Warnato Con Successo")
                                        .setDescription(`${interaction.member} Ha Assegnato Un Warn A <@${warn.memberId}>`)
                                        .setFields([
                                            {
                                                name: "Warn",
                                                value: `<@&${warn.lvl}>`
                                            },
                                            {
                                                name: "Scadenza",
                                                value: `${warn.fine.giorno}/${warn.fine.mese}/${warn.fine.anno}`
                                            }
                                        ])
    
                                    interaction.reply({ embeds: [risposta] })
                                }
                            }
    
    
                            interaction.options.getUser("target").send(`⚠️ Hai Ricevuto Un Warn Su Discord Italia Esegui Il Comando \`/infowarn\` Per Le Informazioni\n👮Moderatore : ${interaction.member}\n\n*In Caso Di Richiamo Apra Un Ricorso Nella Chat Assistenza*`)
                            interaction.guild.members.cache.get(interaction.options.getUser("target").id).roles.add(interaction.guild.roles.cache.get(interaction.options.getString("livello").split(":")[0]))
    
                            if (member != null) {
                                member.warn = true
                                aggiungi(member)
                            }
                        }
                        else {
                            if (warnati != null) {
                                var x = warnati.findIndex((WarnUser) => WarnUser.memberId == interaction.options.getUser("target").id)
    
                                if (x > -1) {
                                    interaction.guild.members.cache.get(warnati[x].memberId).roles.remove(interaction.guild.roles.cache.get(warnati[x].lvl))
                                    warnati.splice(x, 1)
    
                                    if (member != null) {
                                        member.warn = false
                                        aggiungi(member)
                                    }
    
                                    aggiona(warnati, "warn")
    
                                    let embed = new Discord.MessageEmbed()
                                        .setTitle("Warn Rimosso Con Successo")
                                        .setDescription(`${interaction.member} Ha Rimosso Il Warn A ${interaction.options.getUser("target")}`)
    
                                    interaction.reply({ embeds: [embed] })
                                }
                                else
                                    interaction.reply({ content: "❌ L'utente Non Ha Warn", ephemeral: true })
    
                            }
                            else
                                interaction.reply({ content: "❌ L'utente Non Ha Warn", ephemeral: true })
                        }
    
                    }).catch(err => {
                        interaction.reply({ content: "❌ Qualcosa è Andato Storto Riprovare", ephemeral: true })
                        console.log(err)
                        return
                    })
    
    
                })
                    .catch(() => { interaction.reply({ content: "❌ Qualcosa è Andato Storto Riprovare", ephemeral: true }) })
    
    
            }
            else
                interaction.reply({ content: "❌ Non Hai L'autorizzazione Per Eseguire Questo Comando", ephemeral: true })
        }
        else
            interaction.reply({ content: `❌ **Non Sei Autirzzato In Questa Chat** Utilizza La Chat <#${variabili.chatWarn}>`, ephemeral: true })
    }
    catch(err){
        try{
            interaction.reply({content : "❌ Qualcosa è Andato Storto", ephemeral : true})
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send(`**/warn (comando) **${err}`)
            
            })  
            return 
        }catch{
            return
        }
    }
}


function info(interaction) {

    try{
        if (interaction.options.getUser("target") == undefined || interaction.options.getUser("target") == null)
        var target = interaction.member.user.id
        else
            var target = interaction.options.getUser("target").id

        user("warn").then(warnati => {
            if (warnati == null) return interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })

            var warnMember = warnati.find(warn => warn.memberId == target)

            if (warnMember == undefined || warnMember == null) return interaction.reply({ content: "❌ L'utente Non Ha Warn", ephemeral: true })

            const risposta = new Discord.MessageEmbed()
                .setTitle("Discord Italia Utility")
                .setFields([
                    {
                        name: "Membro",
                        value: `<@${warnMember.memberId}>`
                    },
                    {
                        name: "Warn",
                        value: `<@&${warnMember.lvl}>`
                    },
                    {
                        name: "Scadenza",
                        value: `${warnMember.fine.giorno}/${warnMember.fine.mese}/${warnMember.fine.anno}`
                    }
                ])

            interaction.reply({ embeds: [risposta], ephemeral: true })
        }).catch(err => {
            console.log(err)
            return
        })
    }catch(err){
        try{
            interaction.reply({content : "❌ Qualcosa è Andato Storto", ephemeral : true})
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send(`**/infowarn **${err}`)
            
            })  
            return 
        }catch{
            return
        }
    }

}

module.exports = {comando, info}
