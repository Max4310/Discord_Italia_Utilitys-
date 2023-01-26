const Discord = require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname, "../../variabili.json"))
const { membro, gestisciVisulizza, isStaff, CoinMember, aggiona, user, aggiungi } = require(path.join(__dirname, "../../oggetti.js"))

function assumi(interaction) {
    try {

        if (!interaction.values[0]) return interaction.deferUpdate()
        let roleid = interaction.values[0]
        let userTargetId = interaction.customId.split(",")[1]

        if (userTargetId == interaction.member.user.id && roleid != variabili.Governo) return interaction.reply({ content: "❌ Non Puoi Assumere Te Stesso", ephemeral: true })

        CoinMember(userTargetId).then(userx => {

            if (roleid != "altro") {
                if (userx != null) {
                    let y = userx.lavori.findIndex(lavoro => lavoro.id == roleid)
                    if (y > -1) return interaction.reply({ content: "❌ L'utente Gia Possiede Questo Lavoro\n**Probabilmente Non Ha I Permessi Sul Server o Svolge Questo Lavoro In Un Altro Ministero**", ephemeral: true })
                }
                else {
                    userx = new membro(userTargetId)
                }


                if (roleid == variabili.Consigliere) //consigliere generico
                {
                    interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.staff))
                    interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.staffAdmin))
                    interaction.guild.members.cache.get(userTargetId).roles.add(interaction.guild.roles.cache.get(variabili.Consigliere))

                    let ruoli = interaction.member._roles
                    let community = false
                    let economia = false
                    let esteri = false
                    let innovazione = false

                    for (var i in ruoli) {
                        if (ruoli[i] == variabili.M_community)
                            community = true
                        if (ruoli[i] == variabili.M_economia)
                            economia = true
                        if (ruoli[i] == variabili.M_esteri)
                            esteri = true
                    }


                    if (community == true) {
                        interaction.guild.members.cache.get(userTargetId).roles.add(variabili.C_community)
                        let m = new membro(userTargetId)
                        m.assumi(variabili.Consigliere)

                        let x = userx.lavori.findIndex(lavoro => lavoro.id == variabili.EventMaster)
                        let rimosso = "Il Target Non è Stato Rimosso Dal Grado di Direttore"

                        if (x > -1) {
                            interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.EventMaster))
                            rimosso = "Il Target è Stato Rimosso Dal Grado di Direttore"
                        }

                        let embed = new Discord.MessageEmbed()
                            .setTitle("Utente Promosso")
                            .setDescription(rimosso)
                            .setColor("RANDOM")
                        interaction.reply({ embeds: [embed], ephemeral: true })

                        let log = new Discord.MessageEmbed()
                            .setTitle("Utente Assunto")
                            .setDescription(`<@${userTargetId}> è Stato Assunto Come Consigliere Da ${interaction.member}`)
                            .setColor("GREEN")
                        interaction.guild.channels.cache.get(variabili.logCoin).send({ embeds: [log] })
                    }
                    else if (economia == true) {
                        interaction.guild.members.cache.get(userTargetId).roles.add(variabili.C_economo)
                        let m = new membro(userTargetId)
                        m.assumi(variabili.Consigliere)

                        let x = userx.lavori.findIndex(lavoro => lavoro.id == variabili.Boss)
                        let rimosso = "Il Target Non è Stato Rimosso Dal Grado di Boss"

                        if (x > -1) {
                            interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.Boss))
                            rimosso = "Il Target è Stato Rimosso Dal Grado di Boss"
                        }

                        let embed = new Discord.MessageEmbed()
                            .setTitle("Utente Promosso")
                            .setDescription(rimosso)
                            .setColor("RANDOM")
                        interaction.reply({ embeds: [embed], ephemeral: true })


                        let log = new Discord.MessageEmbed()
                            .setTitle("Utente Assunto")
                            .setDescription(`<@${userTargetId}> è Stato Assunto Come Consigliere Da ${interaction.member}`)
                            .setColor("GREEN")
                        interaction.guild.channels.cache.get(variabili.logCoin).send({ embeds: [log] })
                    }
                    else if (esteri == true) {
                        interaction.guild.members.cache.get(userTargetId).roles.add(variabili.C_esteri)
                        let m = new membro(userTargetId)
                        m.assumi(variabili.Consigliere)

                        let roles = interaction.guild.members.cache.get(userTargetId)._roles //qui cambia SICURO    

                        for (var i in roles) {
                            if (roles[i] == variabili.Esaminatore)
                                interaction.guild.members.cache.get(userTargetId).roles.remove(variabili.Esaminatore)
                            if (roles[i] == variabili.Producer)
                                interaction.guild.members.cache.get(userTargetId).roles.remove(variabili.Producer)
                        }


                        let embed = new Discord.MessageEmbed()
                            .setTitle("Utente Promosso")
                            .setColor("RANDOM")
                        interaction.reply({ embeds: [embed], ephemeral: true })

                        let log = new Discord.MessageEmbed()
                            .setTitle("Utente Assunto")
                            .setDescription(`<@${userTargetId}> è Stato Assunto Come Consigliere Da ${interaction.member}`)
                            .setColor("GREEN")
                        interaction.guild.channels.cache.get(variabili.logCoin).send({ embeds: [log] })
                    }
                    else {
                        interaction.guild.members.cache.get(userTargetId).roles.add(interaction.guild.roles.cache.get(variabili.staffAdmin))
                        interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.Consigliere))
                        interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })
                    }



                }
                else if (roleid == variabili.Governo) //governo
                {
                    interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.Consigliere))
                    interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.staff))
                    interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.staffAdmin))

                    let m = new membro(userTargetId)
                    m.assumi(roleid)

                    interaction.reply({ content: "👍 Ho Fatto Ora Devi Aggiungere Il Ruolo Governo", ephemeral: true })

                    let log = new Discord.MessageEmbed()
                        .setTitle("Utente Assuto")
                        .setDescription(`<@${userTargetId}> è Stato Assunto Come Governo Da ${interaction.member}`)
                        .setColor("GREEN")

                    interaction.guild.channels.cache.get(variabili.logCoin).send({ embeds: [log] })
                }
                else if (roleid == variabili.CapoPolizia || roleid == variabili.GestoreHelper || roleid == variabili.GestoreDeveloper || roleid == variabili.C_innovazione || roleid == variabili.Designer) //consigliere specifico
                {
                    interaction.guild.members.cache.get(userTargetId).roles.add(interaction.guild.roles.cache.get(variabili.Consigliere))
                    interaction.guild.members.cache.get(userTargetId).roles.add(interaction.guild.roles.cache.get(roleid))
                    interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.staff))
                    interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.staffAdmin))

                    let m = new membro(userTargetId)
                    m.assumi(roleid)

                    if (interaction.guild.roles.cache.get(roleid).members.size > 1) {

                        interaction.guild.roles.cache.get(roleid).members.forEach(membr => {
                            console.log(membr.user.id)
                            if (membr.user.id != userTargetId) {
                                membr.roles.remove(interaction.guild.roles.cache.get(roleid))
                                membr.roles.remove(interaction.guild.roles.cache.get(variabili.Consigliere))
                                var m = new membro(membr.user.id)
                                m.dimetti(roleid)
                            }
                        })
                    }

                    var sottostante = null
                    if (roleid == variabili.CapoPolizia) {
                        interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.Commissario))
                        sottostante = variabili.Commissario
                    }
                    else if (roleid == variabili.GestoreHelper) {
                        interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.HelperMaster))
                        sottostante = variabili.HelperMaster
                    }
                    else if (roleid == variabili.GestoreDeveloper) {

                        interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.DeveloperSenior))
                        sottostante = variabili.DeveloperSenior

                    }
                    else if(roleid == variabili.C_innovazione){
                        interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.C_innovazione))
                        sottostante = variabili.C_innovazione
                    }
                    else if(roleid == variabili.Designer){
                        interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.graficoSenior))
                        sottostante = variabili.graficoSenior
                    }


                    if(sottostante != null){
                        let x = userx.lavori.findIndex(lavoro => lavoro.id == sottostante)
                        if (x > -1){
                            userx.dimetti(sottostante)
                        }
                    }
                    

                    interaction.reply({ content: "👍 Utente Assuto Con Successo", ephemeral: true })

                    let log = new Discord.MessageEmbed()
                        .setTitle("Utente Assuto")
                        .setDescription(`<@${userTargetId}> è Stato Assunto Come Consigliere Da ${interaction.member}`)
                        .setColor("GREEN")

                    interaction.guild.channels.cache.get(variabili.logCoin).send({ embeds: [log] })
                }
                //staff admin     
                else if (roleid == variabili.HelperMaster || roleid == variabili.DeveloperSenior || roleid == variabili.Boss || roleid == variabili.Commissario || roleid == variabili.graficoSenior || roleid == variabili.GestoreCEO || roleid == variabili.EventMaster || roleid == variabili.Supervisor || roleid == variabili.Esaminatore || roleid == variabili.Producer || roleid == variabili.ViceDirettore) {
                    if (!interaction.guild.members.cache.get(userTargetId)._roles.find(role => role == variabili.Consigliere)) {
                        interaction.guild.members.cache.get(userTargetId).roles.add(interaction.guild.roles.cache.get(variabili.staffAdmin))
                        interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.staff))
                    }

                    interaction.guild.members.cache.get(userTargetId).roles.add(interaction.guild.roles.cache.get(roleid))

                    let m = new membro(userTargetId)
                    m.assumi(roleid)

                    let appoggio = null



                    switch (roleid) {
                        case variabili.HelperMaster:
                            appoggio = variabili.Helper;
                            break;
                        case variabili.DeveloperSenior:
                            appoggio = variabili.Developer;
                            break;
                        case variabili.Boss:
                            appoggio = variabili.Boss;
                            break;
                        case variabili.Commissario:
                            appoggio = variabili.Ispettore;
                            break;
                        case variabili.graficoSenior:
                            appoggio = variabili.Grafico;
                            break;
                        case variabili.GestoreCEO:
                            appoggio = variabili.CEO;
                            break;
                        case variabili.EventMaster:
                            appoggio = variabili.Animatore;
                            break;
                        case variabili.Supervisor:
                            appoggio = variabili.Apprendista;
                            break;
                        case variabili.Esaminatore:
                            appoggio = variabili.cameramen
                            break;
                        case variabili.Producer:
                            appoggio = variabili.Creator
                            break;
                        case variabili.ViceDirettore:
                            appoggio = variabili.Giornalista;
                            break;
                        default:
                            break;
                    }


                    if (appoggio != null) {
                        m.dimetti(appoggio)

                        if(appoggio != variabili.Helper){
                            interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(appoggio))
                        }
                        
                        interaction.reply({ content: "👍 Utente Assunto Con Successo", ephemeral: true })
                    }
                    else
                        interaction.reply({ content: "👎 Utente Assunto, Ma Non Dimesso Dalla Vecchia Carica", ephemeral: true })

                    let log = new Discord.MessageEmbed()
                        .setTitle("Utente Assuto")
                        .setDescription(`<@${userTargetId}> è Stato Promosso A <@&${roleid}> Da ${interaction.member}`)
                        .setColor("GREEN")

                    interaction.guild.channels.cache.get(variabili.logCoin).send({ embeds: [log] })

                }
                else //staff
                {
                    if (!interaction.guild.members.cache.get(userTargetId)._roles.find(role => role == variabili.Consigliere || role == variabili.staffAdmin))
                        interaction.guild.members.cache.get(userTargetId).roles.add(interaction.guild.roles.cache.get(variabili.staff))

                    interaction.guild.members.cache.get(userTargetId).roles.add(interaction.guild.roles.cache.get(roleid))
                    let m = new membro(userTargetId)
                    m.assumi(roleid)

                    if (roleid == variabili.Ispettore) {
                        interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.Agente))
                        m.dimetti(variabili.Agente)
                    }
                    else if(roleid == variabili.Agente){
                        interaction.guild.members.cache.get(userTargetId).roles.add(interaction.guild.roles.cache.get(variabili.pula))
                    }


                    interaction.reply({ content: "👍 Utente Assunto Con Successo", ephemeral: true })

                    let log = new Discord.MessageEmbed()
                        .setTitle("Utente Assuto")
                        .setDescription(`<@${userTargetId}> è Stato Assunto Come <@&${roleid}> Da ${interaction.member}`)
                        .setColor("GREEN")

                    interaction.guild.channels.cache.get(variabili.logCoin).send({ embeds: [log] })
                }
            }
            else {
                let assumibili = []
                let ruoli = interaction.guild.members.cache.get(userTargetId)._roles
                let agente = false
                let ispettore = false
                let commissario = false

                let Helper = false
                let HelperMaster = false
                let Developer = false
                let DeveloperSenior = false

                let yakuza = false
                let boss = false

                let club = false
                let grafico = false
                let graficoPlus = false
                let giornalista = false
                let viceDirettore = false
                let respClub

                let supervisor = false
                let apprendista = false

                let direttore = false
                let animatore = false
                let rianomatore = false

                let cameramen = false
                let esaminatore = false
                let creator = false
                let producer = false


                for (var i in ruoli) {
                    if (ruoli[i] == variabili.Supervisor)
                        supervisor = true
        
                    if (ruoli[i] == variabili.Agente)
                        agente = true
                    if (ruoli[i] == variabili.Ispettore)
                        ispettore = true
                    if (ruoli[i] == variabili.Commissario)
                        commissario = true
        
                    if (ruoli[i] == variabili.Helper)
                        Helper = true
                    if (ruoli[i] == variabili.HelperMaster)
                        HelperMaster = true
                    if (ruoli[i] == variabili.Developer)
                        Developer = true
                    if (ruoli[i] == variabili.DeveloperSenior)
                        DeveloperSenior = true
        
                    if (ruoli[i] == variabili.Yakuza)
                        yakuza = true
                    if (ruoli[i] == variabili.Boss)
                        boss = true
        
                    if (ruoli[i] == variabili.CEO)
                        club = true
                    if (ruoli[i] == variabili.Grafico)
                        grafico = true
                    if (ruoli[i] == variabili.graficoSenior)
                        graficoPlus = true
                    if(ruoli[i] == variabili.GestoreCEO)
                        respClub = true
                    
                        
                    if (ruoli[i] == variabili.Giornalista)
                        giornalista = true
                    if (ruoli[i] == variabili.ViceDirettore)
                        viceDirettore = true
                    if(ruoli[i] == variabili.GestoreCEO)
                        respClub = true
        
        
                    if (ruoli[i] == variabili.Apprendista)
                        apprendista = true
        
                    if (ruoli[i] == variabili.Animatore)
                        animatore = true
                    if (ruoli[i] == variabili.Rianimatore)
                        rianomatore = true
                    if (ruoli[i] == variabili.EventMaster)
                        direttore = true
        
                    if (ruoli[i] == variabili.Cameraman)
                        cameramen = true
                    if (ruoli[i] == variabili.Esaminatore)
                        esaminatore = true
                    if (ruoli[i] == variabili.Creator)
                        creator = true
                    if (ruoli[i] == variabili.Producer)
                        producer = true
                }

                //Pa
                if (interaction.guild.roles.cache.get(variabili.M_pa).members.size == 0) {
                    if (supervisor == true) {
                        assumibili.push({
                            label: "Gestore Helper",
                            description: "Promuovi Il Target A Gestore Helper",
                            value: variabili.GestoreHelper,
                            emoji: "🧑‍🚒"
                        })

                        assumibili.push({
                            label: "Gestore Developer",
                            description: "Promuovi Una Persona A Gestore Developer",
                            value: variabili.GestoreDeveloper,
                            emoji: "👨‍🔧"
                        })
                    }
                    else {
                        if (HelperMaster == true) {
                            assumibili.push({
                                label: "Gestore Helper",
                                description: "Promuovi Il Target A Gestore Helper",
                                value: variabili.GestoreHelper,
                                emoji: "🧑‍🚒"
                            })
                        }

                        if (DeveloperSenior == true) {
                            assumibili.push({
                                label: "Gestore Developer",
                                description: "Promuovi Una Persona A Gestore Developer",
                                value: variabili.GestoreDeveloper,
                                emoji: "👨‍🔧"
                            })
                        }
                    }

                    if (interaction.guild.roles.cache.get(variabili.GestoreDeveloper).members.size == 0) {
                        if (DeveloperSenior == true && GestoreDeveloper == false) {
                            assumibili.push({
                                label: "Developer Senior",
                                description: "Rimuovi Il Target Dal Ruolo Di Developer Senior",
                                value: variabili.DeveloperSenior,
                                emoji: "🧑‍🔧"
                            })
                        }

                        if (Developer == false && DeveloperSenior == false) {
                            assumibili.push({
                                label: "Developer",
                                description: "Assumi Un Nuovo Developer",
                                value: variabili.Developer,
                                emoji: "🔧"
                            })
                        }
                    }
                    else if (interaction.guild.roles.cache.get(variabili.GestoreHelper).members.size == 0) {
                        if (Helper == true) {
                            assumibili.push({
                                label: "Helper Master",
                                description: "Promuovi Il Target A Helper Master",
                                value: variabili.HelperMaster,
                                emoji: "🆘"
                            })
                        }

                        if (Helper == false && HelperMaster == false) {
                            assumibili.push({
                                label: "Helper",
                                description: "Assumi Un Nuovo Helper",
                                value: variabili.Helper,
                                emoji: "🆘"
                            })
                        }
                    }
                }

                //innovazione
                if (interaction.guild.roles.cache.get(variabili.M_innovazione).members.size == 0) {
                    //club
                    if (club == false && respClub == false) {
                        assumibili.push({
                            label: "Club",
                            description: "Assumi Il Target Come Club",
                            value: variabili.CEO,
                            emoji: "🧩"
                        })
                    }
                    else if(respClub == false && club == true){
                        assumibili.push({
                            label: "Responsabile Del Club",
                            description: "Promuovi Il Target A Responsabile Del Club",
                            value: variabili.GestoreCEO,
                            emoji: "🔑"
                        })
                    }


                    if (supervisor == true) {
                        assumibili.push({
                            label: "Designer",
                            description: "Promuovi Il Target A Designer",
                            value: variabili.Designer,
                            emoji: "💡"
                        })

                        assumibili.push({
                            label: "Direttore",
                            description: "Assumi Il Target Come Direttore",
                            value: variabili.C_innovazione,
                            emoji: "💡"
                        })
                    }
                    else {
                        if (graficoPlus == true) {
                            assumibili.push({
                                label: "Designer",
                                description: "Promuovi Il Target A Designer",
                                value: variabili.Designer,
                                emoji: "💡"
                            })
                        }

                        if (viceDirettore == true) {
                            //direttore
                            assumibili.push({
                                label: "Direttore",
                                description: "Assumi Il Target Come Direttore",
                                value: variabili.C_innovazione,
                                emoji: "💡"
                            })
                        }
                    }

                    if (interaction.guild.roles.cache.get(variabili.Designer).members.size == 0) {
                        if (grafico == false) {
                            //assumi grafico
                            assumibili.push({
                                label: "Grafico",
                                description: "Assumi Il Target Come Grafico",
                                value: variabili.Grafico,
                                emoji: "🎨"
                            })
                        }
                        else {
                            assumibili.push({
                                label: "Grafico Senior",
                                description: "Promuovi Il Target A Grafico Senior",
                                value: variabili.graficoSenior,
                                emoji: "👨‍🎨"
                            })

                        }
                    }
                    else if (interaction.guild.roles.cache.get(variabili.C_innovazione).members.size == 0) {
                        if (giornalista == false) {
                            assumibili.push({
                                label: "Giornalista",
                                description: "Assumi Il Target Come Giornalista",
                                value: variabili.Giornalista,
                                emoji: "📰"
                            })
                        }
                        else {
                            //vicedirettore
                            assumibili.push({
                                label: "Vice Direttore",
                                description: "Assumi Il Target Come ViceDirettore",
                                value: variabili.ViceDirettore,
                                emoji: "🗞️"
                            })
                        }
                    }
                }

                //giustizia 
                if (interaction.guild.roles.cache.get(variabili.M_giustizia).members.size == 0) {
                    if (commissario == true) {
                        //capo pula
                        assumibili.push({
                            label: "Capo Polizia",
                            description: "Promuovi Il Target A Capo Polizia",
                            value: variabili.CapoPolizia,
                            emoji: "🚨"
                        })
                    }

                    if (supervisor == true) {
                        assumibili.push({
                            label: "Capo Polizia",
                            description: "Promuovi Il Target A Capo Polizia",
                            value: variabili.CapoPolizia,
                            emoji: "🚨"
                        })
                    }

                    if (interaction.guild.roles.cache.get(variabili.CapoPolizia).members.size == 0) {
                        if (agente == false && ispettore == false && commissario == false) {
                            //agente
                            assumibili.push({
                                label: "Agente",
                                description: "Assumi Il Target Come Agente",
                                value: variabili.Agente,
                                emoji: "👮"
                            })
                        }
                        else if (agente == true) {
                            //ispettore
                            assumibili.push({
                                label: "Ispettore",
                                description: "Promuovi Il Target A Ispettore",
                                value: variabili.Ispettore,
                                emoji: "👮"
                            })
                        }
                        else if (ispettore == true) {
                            //commisario
                            assumibili.push({
                                label: "Commisario",
                                description: "Promuovi Il Target A Commisario",
                                value: variabili.Commissario,
                                emoji: "🚓"
                            })
                        }
                    }
                }

                //economia
                if (interaction.guild.roles.cache.get(variabili.M_economia).members.size == 0) {
                    if (Helper == true) {
                        assumibili.push({
                            label: "Yakuza",
                            description: "Assumi Il Target Come Yakuza",
                            value: variabili.Yakuza,
                            emoji: "🎴"
                        })
                    }
                    else if (yakuza == true) {
                        assumibili.push({
                            label: "Boss",
                            description: "Promuovi Il Target A Boss",
                            value: variabili.Boss,
                            emoji: "🚬"
                        })
                    }
                    else if (boss == true) {
                        assumibili.push({
                            label: "Consigliere",
                            description: "Promuovi Il Target A Consigliere",
                            value: variabili.Consigliere,
                            emoji: "💸"
                        })
                    }

                    if (supervisor == true) {
                        assumibili.push({
                            label: "Consigliere",
                            description: "Promuovi Il Target A Consigliere",
                            value: variabili.Consigliere,
                            emoji: "💸"
                        })
                    }
                }

                //presidenza
                if (interaction.guild.roles.cache.get(variabili.M_presidenza).members.size == 0) {
                    if (apprendista == false) {
                        assumibili.push({
                            label: "Apprendista",
                            description: "Assumi Il Target Come Apprendista",
                            value: variabili.Apprendista,
                            emoji: "🎓"
                        })
                    }
                    else {
                        assumibili.push({
                            label: "Supervisor",
                            description: "Promuovi Il Target A Supervisor",
                            value: variabili.Supervisor,
                            emoji: "🕵️‍♂️"
                        })
                    }
                }

                //community
                if (interaction.guild.roles.cache.get(variabili.M_community).members.size == 0) {
                    if (supervisor == true) {
                        assumibili.push({
                            label: "Consigliere",
                            description: "Promuovi Il Target A Consigliere",
                            value: variabili.Consigliere,
                            emoji: "🌍"
                        })
                    }

                    if (rianomatore == false) {
                        assumibili.push({
                            label: "Rianomatore",
                            description: "Assumi Il Target Come Rianimatore",
                            value: variabili.Rianimatore,
                            emoji: "🚑"
                        })
                    }

                    if (animatore == false && direttore == false) {
                        assumibili.push({
                            label: "Animatore",
                            description: "Assumi Il Target Come Animatore",
                            value: variabili.Animatore,
                            emoji: "🎬"
                        })
                    }
                    else if (animatore == true) {
                        assumibili.push({
                            label: "Direttore",
                            description: "Promuovi Il Target A Direttore",
                            value: variabili.EventMaster,
                            emoji: "🎬"
                        })
                    }
                    else if (direttore == true) {
                        assumibili.push({
                            label: "Consigliere",
                            description: "Promuovi Il Target A Consigliere",
                            value: variabili.Consigliere,
                            emoji: "🌍"
                        })
                    }
                }

                //esteri
                if (interaction.guild.roles.cache.get(variabili.M_esteri).members.size == 0) {
                    if (supervisor == true) {
                        assumibili.push({
                            label: "Consigliere",
                            description: "Promuovi Il Target A Consigliere",
                            value: variabili.Consigliere,
                            emoji: "✈️"
                        })
                    }

                    if (cameramen == false && esaminatore == false) {
                        assumibili.push({
                            label: "Cameraman",
                            description: "Assumi Il Target Come Cameraman",
                            value: variabili.Cameraman,
                            emoji: "📷"
                        })
                    }
                    else if (cameramen == true) {
                        assumibili.push({
                            label: "Esaminatore",
                            description: "Assumi Il Target Come Esaminatore",
                            value: variabili.Esaminatore,
                            emoji: "🔍"
                        })
                    }
                    else if (esaminatore == true) {
                        assumibili.push({
                            label: "Consigliere",
                            description: "Promuovi Il Target A Consigliere",
                            value: variabili.Consigliere,
                            emoji: "✈️"
                        })
                    }



                    if (creator == false && producer == false) {
                        assumibili.push({
                            label: "Creator",
                            description: "Assumi Il Target Come Creator",
                            value: variabili.Creator,
                            emoji: "🖥️"
                        })
                    }
                    else if (creator == true) {
                        assumibili.push({
                            label: "Producer",
                            description: "Promuovi Il Target A Producer",
                            value: variabili.Producer,
                            emoji: "🎧"
                        })
                    }
                    else if (producer == true) {
                        assumibili.push({
                            label: "Consigliere",
                            description: "Promuovi Il Target A Consigliere",
                            value: variabili.Consigliere,
                            emoji: "✈️"
                        })
                    }
                }

                if (assumibili.length > 0) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Altri Ministeri`)
                        .setDescription("Seleziona L'incarico Da Assegnare All'utente")
                        .setColor("RANDOM")

                    let selectmenu = new Discord.MessageSelectMenu()
                        .setCustomId(`Assumi,${userTargetId}`)
                        .setMaxValues(1)
                        .setMinValues(0)
                        .setPlaceholder("Selezione L'incarico")
                        .setOptions(assumibili)

                    let row = new Discord.MessageActionRow()
                        .addComponents(selectmenu)


                    interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
                }
                else
                    interaction.reply({ content: "❌ Sembra Che Tutti I Ministeri Hanno Qualcuno Che Puo Assumere", ephemeral: true })
            }
        }).catch((err) => {
            console.log(err)

            interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })
            return
        })
    } catch (err) {
        try {
            console.log(err)


            interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })
            interaction.guild.members.fetch("598498238336729088").then(member => {
                member.user.send(`**lavoro/assumi **${err}`)
            })
            return
        } catch {
            return
        }
    }
}

function dimetti(interaction) {
    try {

        //Gestici il dimetti da qui
        if (!interaction.values[0]) return interaction.deferUpdate()

        let roleid = interaction.values[0]
        let userTargetId = interaction.customId.split(",")[1]

        CoinMember(userTargetId).then(userx => {
            if (userx == null) userx = new membro(userTargetId)

            if (userTargetId == interaction.member.user.id && roleid != variabili.Governo) return interaction.reply({ content: "❌ Non Puoi Dimettere Te Stesso", ephemeral: true })
            let y = userx.lavori.findIndex(lavoro => lavoro.id == roleid)
            if (y == -1) return interaction.reply({ content: "❌ L'utente Non Possiede Questo Lavoro\n**Probabilmente Ha Solo I Permessi Sul Server**", ephemeral: true })

            interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(roleid))
            let m = new membro(userTargetId)
            m.dimetti(roleid)

            if (roleid == variabili.GestoreDeveloper || roleid == variabili.GestoreHelper || roleid == variabili.CapoPolizia || roleid == variabili.Designer || roleid == variabili.C_innovazione) {

                let x = false
                for (i in interaction.member._roles) {
                    if (interaction.member._roles[i] == variabili.GestoreDeveloper || interaction.member._roles[i] == variabili.GestoreHelper || interaction.member._roles[i] == variabili.CapoPolizia || interaction.member._roles[i] == variabili.Designer || interaction.member._roles[i] == variabili.C_innovazione) {
                        x = true;
                    }
                }

                if (x == false) {
                    interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.Consigliere))
                }
            }
            else if (roleid == variabili.Helper || roleid == variabili.Developer || roleid == variabili.Agente || roleid == variabili.Yakuza || roleid == variabili.CEO || roleid == variabili.Grafico || roleid == variabili.Rianimatore || roleid == variabili.Animatore || roleid == variabili.Apprendista || roleid == variabili.Cameraman || roleid == variabili.Creator || roleid == variabili.giornalista) {
                let x = false
                for (i in interaction.member._roles) {
                    if (interaction.member._roles[i] == variabili.Helper || interaction.member._roles[i] == variabili.Developer || interaction.member._roles[i] == variabili.Agente || interaction.member._roles[i] == variabili.Yakuza || interaction.member._roles[i] == variabili.CEO || interaction.member._roles[i] == variabili.Grafico || interaction.member._roles[i] == variabili.Rianimatore || interaction.member._roles[i] == variabili.Animatore || interaction.member._roles[i] == variabili.Apprendista || interaction.member._roles[i] == variabili.Cameraman || interaction.member._roles[i] == variabili.Creator || interaction.member._roles[i] == variabili.giornalista) {
                        x = true;
                    }
                }

                if (x == false) {
                    interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.staff))
                    interaction.guild.members.cache.get(userTargetId).roles.add(interaction.guild.roles.cache.get(variabili.exStaff))
                }
            }
            else if (roleid == variabili.HelperMaster || roleid == variabili.DeveloperSenior || roleid == variabili.commissario || roleid == variabili.Boss || roleid == variabili.GestoreCEO || roleid == variabili.graficoSenior || roleid == variabili.EventMaster || roleid == variabili.Supervisor || roleid == variabili.Esaminatore || roleid == variabili.Producer || roleid == variabili.viceDirettore) {
                let x = false
                for (i in interaction.member._roles) {
                    if (interaction.member._roles[i] == variabili.HelperMaster || interaction.member._roles[i] == variabili.DeveloperSenior || interaction.member._roles[i] == variabili.commissario || interaction.member._roles[i] == variabili.Boss || interaction.member._roles[i] == variabili.GestoreCEO || interaction.member._roles[i] == variabili.graficoSenior || rointeraction.member._roles[i] == variabili.EventMaster || interaction.member._roles[i] == variabili.Supervisor || interaction.member._roles[i] == variabili.Esaminatore || interaction.member._roles[i] == variabili.Producer || interaction.member._roles[i] == variabili.viceDirettore) {
                        x = true;
                    }
                }

                if (x == false) {
                    interaction.guild.members.cache.get(userTargetId).roles.remove(interaction.guild.roles.cache.get(variabili.staffAdmin))
                }
            }


            interaction.reply({ content: "👍 Comando Eseguito Con Successo", ephemeral: true })

            let log = new Discord.MessageEmbed()
                .setTitle("Utente Dimesso")
                .setDescription(`<@${userTargetId}> è Stato Dimesso Come <@&${roleid}> Da ${interaction.member}`)
                .setColor("DARK_GREEN")
            interaction.guild.channels.cache.get(variabili.logCoin).send({ embeds: [log] })



        }).catch(() => {
            interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })
            return
        })

    } catch (err) {
        console.log(err)

        interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })
        interaction.guild.members.fetch("598498238336729088").then(member => {
            member.user.send(`**lavoro/assumi **${err}`)
        })


    }
}

module.exports = { assumi, dimetti }