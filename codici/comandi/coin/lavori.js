const Discord = require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname, "../../../variabili.json"))
const { membro, gestisciVisulizza, isStaff, CoinMember, aggiona, user, aggiungi } = require(path.join(__dirname, "../../../oggetti.js"))


function assumi(interaction) {
    try {
        let assumibili = []
        let user = interaction.options.getUser("target")


        /*{
            label : "Gold",
            description : "Acquista Un Gold Al Prezzo Di 25.000 £/m",
            value : variabili.A_gold,
            emoji : "🥇"
        }*/

        console.log(variabili.graficoSenior)

        if (interaction.guild.ownerId == interaction.member.user.id) {
            assumibili.push({
                label: "Governo",
                description: "Assumi Il Target Come Membro Del Governo",
                value: variabili.Governo,
                emoji: "👑"
            })
        }

        if (interaction.member.permissions.has("ADMINISTRATOR")) {
            assumibili.push({
                label: "Altri Ministeri",
                description: "Assumi Una persona Non Nel Tuo Ministero",
                value: "altro",
                emoji: "🔗"
            })
        }
        let ruoli = interaction.guild.members.cache.get(user.id)._roles
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
        let respClub = false

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

        //LA PA
        if (interaction.member._roles.find(role => role == variabili.M_pa)) {
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



            if (Helper == true) {
                assumibili.push({
                    label: "Helper Master",
                    description: "Promuovi Il Target A Helper Master",
                    value: variabili.HelperMaster,
                    emoji: "🆘"
                })
            }

            if (Developer == true) {
                assumibili.push({
                    label: "Developer Senior",
                    description: "Promuovi Il Target A Developer Senior",
                    value: variabili.DeveloperSenior,
                    emoji: "🔧"
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

            if (Helper == false && HelperMaster == false) {
                assumibili.push({
                    label: "Helper",
                    description: "Assumi Un Nuovo Helper",
                    value: variabili.Helper,
                    emoji: "🆘"
                })
            }
        }
        else if (interaction.member._roles.find(role => role == variabili.GestoreHelper)) {
            if (Helper == true) {
                assumibili.push({
                    label: "Helper Master",
                    description: "Promuovi Il Target A Helper Master",
                    value: variabili.HelperMaster,
                    emoji: "🆘"
                })
            }
            else {
                assumibili.push({
                    label: "Helper",
                    description: "Assumi Un Nuovo Helper",
                    value: variabili.Helper,
                    emoji: "🆘"
                })
            }


        }
        else if (interaction.member._roles.find(role => role == variabili.GestoreDeveloper)) {
            if (Developer == true) {
                assumibili.push({
                    label: "Developer Senior",
                    description: "Promuovi Il Target A Developer Senior",
                    value: variabili.DeveloperSenior,
                    emoji: "🔧"
                })
            }
            else {
                assumibili.push({
                    label: "Developer",
                    description: "Assumi Un Nuovo Developer",
                    value: variabili.Developer,
                    emoji: "🔧"
                })
            }
        }

        //guild.roles.cache.get(v.role).members.size per il menu di altro

        //GIUSTIZIA
        if (interaction.member._roles.find(role => role == variabili.M_giustizia)) {
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
            else if (commissario == true) {
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

        }
        else if (interaction.member._roles.find(role => role == variabili.CapoPolizia)) {
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

        //economia
        if (interaction.member._roles.find(role => role == variabili.M_economia)) {
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

        //innovazione
        if (interaction.member._roles.find(role => role == variabili.M_innovazione)) {
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

            if (grafico == false && graficoPlus == false){
                //assumi grafico
                assumibili.push({
                    label: "Grafico",
                    description: "Assumi Il Target Come Grafico",
                    value: variabili.Grafico,
                    emoji: "🎨"
                })
            }
            else if (grafico == true) {
                assumibili.push({
                    label: "Grafico Senior",
                    description: "Promuovi Il Target A Grafico Senior",
                    value: variabili.graficoSenior,
                    emoji: "👨‍🎨"
                })

            }
            else if (graficoPlus == true) {
                assumibili.push({
                    label: "Designer",
                    description: "Promuovi Il Target A Designer",
                    value: variabili.Designer,
                    emoji: "💡"
                })
            }


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


            if (giornalista == false && viceDirettore == false) {
                assumibili.push({
                    label: "Giornalista",
                    description: "Assumi Il Target Come Giornalista",
                    value: variabili.Giornalista,
                    emoji: "📰"
                })
            }
            else if (giornalista == true) {
                //vicedirettore

                assumibili.push({
                    label: "Vice Direttore",
                    description: "Assumi Il Target Come ViceDirettore",
                    value: variabili.ViceDirettore,
                    emoji: "🗞️"
                })
            }
            else if (viceDirettore == true) {
                //direttore
                assumibili.push({
                    label: "Direttore",
                    description: "Assumi Il Target Come Direttore",
                    value: variabili.C_innovazione,
                    emoji: "💡"
                })
            }
        }
        else if (interaction.member._roles.find(role => role.id == variabili.Designer)) {
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
        else if (interaction.member._roles.find(role => role.id == variabili.C_innovazione)) {
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

        //presidenza
        if (interaction.member._roles.find(role => role == variabili.M_presidenza)) {
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
        if (interaction.member._roles.find(role => role == variabili.M_community)) {
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
        if (interaction.member._roles.find(role => role == variabili.M_esteri)) {
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
                .setTitle(`Assumo ${user.tag}`)
                .setDescription("Seleziona L'incarico Da Assegnare All'utente")
                .setColor("RANDOM")

            let selectmenu = new Discord.MessageSelectMenu()
                .setCustomId(`Assumi,${user.id}`)
                .setMaxValues(1)
                .setMinValues(0)
                .setPlaceholder("Selezione L'incarico")
                .setOptions(assumibili)

            let row = new Discord.MessageActionRow()
                .addComponents(selectmenu)


            interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
        }
        else
            interaction.reply({ content: "❌ Sembra Che Tu Non Possa Assumere Questo Utente", ephemeral: true })

    } catch (err) {
        console.log(err)
        interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })

        interaction.guild.members.fetch("598498238336729088").then(member => {
            member.user.send(`**/assumi **${err}`)

        })
        return
    }
}

function dimetti(interaction) {
    try {
        let assumibili = []
        let user = interaction.options.getUser("target")


        /*{
            label : "Gold",
            description : "Acquista Un Gold Al Prezzo Di 25.000 £/m",
            value : variabili.A_gold,
            emoji : "🥇"
        }*/

        let ruoli = interaction.guild.members.cache.get(user.id)._roles
        let agente = false
        let ispettore = false
        let commissario = false
        let CapoPolizia = false

        let Helper = false
        let HelperMaster = false
        let Developer = false
        let DeveloperSenior = false
        let GestoreDeveloper = false
        let GestoreHelper = false

        let yakuza = false
        let boss = false
        let consigliereEconomo = false

        let club = false
        let grafico = false
        let graficoPlus = false
        let giornalista = false
        let viceDirettore = false
        let DirettoreInno = false;
        let desiner = false
        let respClub = false

        let supervisor = false
        let apprendista = false

        let direttore = false
        let animatore = false
        let rianomatore = false
        let consigleireCommunity = false

        let cameramen = false
        let esaminatore = false
        let creator = false
        let producer = false
        let consigliereEsteri = false

        let governo = false

        for (var i in ruoli) {
            if (ruoli[i] == variabili.Supervisor)
                supervisor = true

            if (ruoli[i] == variabili.Agente)
                agente = true
            if (ruoli[i] == variabili.Ispettore)
                ispettore = true
            if (ruoli[i] == variabili.Commissario)
                commissario = true
            if (ruoli[i] == variabili.CapoPolizia)
                CapoPolizia = true

            if (ruoli[i] == variabili.Helper)
                Helper = true
            if (ruoli[i] == variabili.HelperMaster)
                HelperMaster = true
            if (ruoli[i] == variabili.Developer)
                Developer = true
            if (ruoli[i] == variabili.DeveloperSenior)
                DeveloperSenior = true
            if (ruoli[i] == variabili.GestoreDeveloper)
                GestoreDeveloper = true
            if (ruoli[i] == variabili.GestoreHelper)
                GestoreHelper = true

            if (ruoli[i] == variabili.Yakuza)
                yakuza = true
            if (ruoli[i] == variabili.Boss)
                boss = true
            if (ruoli[i] == variabili.C_economo)
                consigliereEconomo = true

            if (ruoli[i] == variabili.CEO)
                club = true
            if (ruoli[i] == variabili.GestoreCEO)
                respClub = true
            if (ruoli[i] == variabili.Grafico)
                grafico = true
            if (ruoli[i] == variabili.graficoSenior)
                graficoPlus = true
            if (ruoli[i] == variabili.Designer)
                desiner == true
            if (ruoli[i] == variabili.Giornalista)
                giornalista = true
            if (ruoli[i] == variabili.ViceDirettore)
                viceDirettore = true
            if (ruoli[i] == variabili.C_innovazione)
                DirettoreInno = true


            if (ruoli[i] == variabili.Apprendista)
                apprendista = true

            if (ruoli[i] == variabili.Animatore)
                animatore = true
            if (ruoli[i] == variabili.Rianimatore)
                rianomatore = true
            if (ruoli[i] == variabili.EventMaster)
                direttore = true
            if (ruoli[i] == variabili.C_community)
                consigleireCommunity = true

            if (ruoli[i] == variabili.Cameraman)
                cameramen = true
            if (ruoli[i] == variabili.Esaminatore)
                esaminatore = true
            if (ruoli[i] == variabili.C_esteri)
                consigliereEsteri = true
            if (ruoli[i] == variabili.Creator)
                creator = true
            if (ruoli[i] == variabili.Producer)
                producer = true
            if (ruoli[i] == variabili.Governo)
                governo = true
        }

        //pa
        if (interaction.member._roles.find(role => role == variabili.M_pa)) {
            if (Helper == true) {
                assumibili.push({
                    label: "Helper",
                    description: "Rimuovi Il Target Dal Ruolo Di Helper",
                    value: variabili.Helper,
                    emoji: "🆘"
                })
            }

            if (HelperMaster == true) {
                assumibili.push({
                    label: "Helper Master",
                    description: "Rimuovi Il Target Dal Ruolo Di Helper Master",
                    value: variabili.HelperMaster,
                    emoji: "🧑‍🚒"
                })
            }

            if (Developer == true) {
                assumibili.push({
                    label: "Developer",
                    description: "Rimuovi Il Target Dal Ruolo Di Developer",
                    value: variabili.Developer,
                    emoji: "🔧"
                })
            }

            if (DeveloperSenior == true && GestoreDeveloper == false) {
                assumibili.push({
                    label: "Developer Senior",
                    description: "Rimuovi Il Target Dal Ruolo Di Developer Senior",
                    value: variabili.DeveloperSenior,
                    emoji: "🧑‍🔧"
                })
            }

            if (GestoreDeveloper == true) {
                assumibili.push({
                    label: "Gestore Developer",
                    description: "Rimuovi Il Target Dal Ruolo Di Gestore Developer",
                    value: variabili.GestoreDeveloper,
                    emoji: "⚙️"
                })
            }

            if (GestoreHelper == true) {
                assumibili.push({
                    label: "Gestore Helper",
                    description: "Rimuovi Il Target Dal Ruolo Di Gestore Helper",
                    value: variabili.GestoreHelper,
                    emoji: "🧑‍🚒"
                })
            }
        }
        else if (interaction.member._roles.find(role => role == variabili.GestoreHelper)) {
            if (Helper == true) {
                assumibili.push({
                    label: "Helper",
                    description: "Rimuovi Il Target Dal Ruolo Di Helper",
                    value: variabili.Helper,
                    emoji: "🆘"
                })
            }

            if (HelperMaster == true) {
                assumibili.push({
                    label: "Helper Master",
                    description: "Rimuovi Il Target Dal Ruolo Di Helper Master",
                    value: variabili.HelperMaster,
                    emoji: "🧑‍🚒"
                })
            }
        }
        else if (interaction.member._roles.find(role => role == variabili.GestoreDeveloper)) {
            if (Developer == true) {
                assumibili.push({
                    label: "Developer",
                    description: "Rimuovi Il Target Dal Ruolo Di Developer",
                    value: variabili.Developer,
                    emoji: "🔧"
                })
            }

            if (DeveloperSenior == true) {
                assumibili.push({
                    label: "Developer Senior",
                    description: "Rimuovi Il Target Dal Ruolo Di Developer Senior",
                    value: variabili.DeveloperSenior,
                    emoji: "🧑‍🔧"
                })
            }
        }

        //justice
        if (interaction.member._roles.find(role => role == variabili.M_giustizia)) {
            if (CapoPolizia == true) {
                assumibili.push({
                    label: "Capo Della Polizia",
                    description: "Rimuovi Il Target Dal Ruolo Di Capo Della Polizia",
                    value: variabili.CapoPolizia,
                    emoji: "👮"
                })
            }

            if (agente == true) {
                assumibili.push({
                    label: "Agente",
                    description: "Rimuovi Il Target Dal Ruolo Di Agente",
                    value: variabili.Agente,
                    emoji: "🚓"
                })
            }

            if (ispettore == true) {
                assumibili.push({
                    label: "Ispettore",
                    description: "Rimuovi Il Target Dal Ruolo Di Ispettore",
                    value: variabili.Ispettore,
                    emoji: "🚨"
                })
            }

            if (commissario == true) {
                assumibili.push({
                    label: "Commissario",
                    description: "Rimuovi Il Target Dal Ruolo Di Commissario",
                    value: variabili.commissario,
                    emoji: "👮"
                })
            }
        }
        else if (interaction.member._roles.find(role => role == variabili.CapoPolizia)) {
            if (agente == true) {
                assumibili.push({
                    label: "Agente",
                    description: "Rimuovi Il Target Dal Ruolo Di Agente",
                    value: variabili.Agente,
                    emoji: "🚓"
                })
            }

            if (ispettore == true) {
                assumibili.push({
                    label: "Ispettore",
                    description: "Rimuovi Il Target Dal Ruolo Di Ispettore",
                    value: variabili.Ispettore,
                    emoji: "🚨"
                })
            }

            if (commissario == true) {
                assumibili.push({
                    label: "Commissario",
                    description: "Rimuovi Il Target Dal Ruolo Di Commissario",
                    value: variabili.commissario,
                    emoji: "👮"
                })
            }
        }

        //economo
        if (interaction.member._roles.find(role => role == variabili.M_economia)) {
            if (yakuza == true) {
                assumibili.push({
                    label: "Yakuza",
                    description: "Rimuovi Il Target Dal Ruolo Di Yakuza",
                    value: variabili.Yakuza,
                    emoji: "🎴"
                })
            }

            if (boss == true) {
                assumibili.push({
                    label: "Boss",
                    description: "Rimuovi Il Target Dal Ruolo Di Boss",
                    value: variabili.Boss,
                    emoji: "🚬"
                })
            }

            if (consigliereEconomo == true) {
                assumibili.push({
                    label: "Consigliere",
                    description: "Rimuovi Il Target Dal Ruolo Di Consigliere",
                    value: variabili.Consigliere,
                    emoji: "💸"
                })
            }
        }

        //governo
        if (interaction.guild.ownerId == interaction.member.user.id && governo == true) {
            assumibili.push({
                label: "Governo",
                description: "Rimuovi Il Target Dal Ruolo Di Governo",
                value: variabili.Governo,
                emoji: "👑"
            })
        }

        //innovazione
        if (interaction.member._roles.find(role => role == variabili.M_innovazione)) {
            if (desiner == true) {
                assumibili.push({
                    label: "Desiner",
                    description: "Rimuovi Il Target Dal Ruolo Di Desiner",
                    value: variabili.Designer,
                    emoji: "🎨"
                })
            }
            if (grafico == true) {
                assumibili.push({
                    label: "Grafico",
                    description: "Rimuovi Il Target Dal Ruolo Di Grafico",
                    value: variabili.Grafico,
                    emoji: "🎨"
                })
            }
            if (club == true) {
                assumibili.push({
                    label: "Club",
                    description: "Rimuovi Il Target Dal Ruolo Di Club",
                    value: variabili.CEO,
                    emoji: "🧩"
                })
            }
            if (respClub == true) {
                assumibili.push({
                    label: "Responsabile Dei Club",
                    description: "Rimuovi Il Target Dal Ruolo Di Responsabile Dei Club",
                    value: variabili.GestoreCEO,
                    emoji: "🔑"
                })
            }
            if (DirettoreInno == true) {
                assumibili.push({
                    label: "Direttore",
                    description: "Rimuovi Il Target Dal Ruolo Di Direttore",
                    value: variabili.C_innovazione,
                    emoji: "💡"
                })
            }
            if (giornalista == true) {
                assumibili.push({
                    label: "Giornalista",
                    description: "Rimuovi Il Target Dal Ruolo Di Giornalista",
                    value: variabili.Giornalista,
                    emoji: "📰"
                })
            }
            if (viceDirettore == true) {
                assumibili.push({
                    label: "Vice Direttore",
                    description: "Assumi Il Target Come ViceDirettore",
                    value: variabili.ViceDirettore,
                    emoji: "🗞️"
                })
            }
            if (graficoPlus == true) {
                assumibili.push({
                    label: "Grafico Senior",
                    description: "Promuovi Il Target A Grafico Senior",
                    value: variabili.graficoSenior,
                    emoji: "👨‍🎨"
                })
            }
        }
        else if (interaction.member._roles.find(role => role.id == variabili.Designer)) {
            if (grafico == true) {
                assumibili.push({
                    label: "Grafico",
                    description: "Rimuovi Il Target Dal Ruolo Di Grafico",
                    value: variabili.Grafico,
                    emoji: "🎨"
                })
            }

            if (graficoPlus == true) {
                assumibili.push({
                    label: "Grafico Senior",
                    description: "Promuovi Il Target A Grafico Senior",
                    value: variabili.graficoSenior,
                    emoji: "👨‍🎨"
                })
            }
        }
        else if (interaction.member._roles.find(role => role.id == variabili.C_innovazione)) {
            if (giornalista == true) {
                assumibili.push({
                    label: "Giornalista",
                    description: "Rimuovi Il Target Dal Ruolo Di Giornalista",
                    value: variabili.Giornalista,
                    emoji: "📰"
                })
            }
            if (viceDirettore == true) {
                assumibili.push({
                    label: "Vice Direttore",
                    description: "Assumi Il Target Come ViceDirettore",
                    value: variabili.ViceDirettore,
                    emoji: "🗞️"
                })
            }
        }

        //presidenza
        if (interaction.member._roles.find(role => role == variabili.M_presidenza)) {
            if (supervisor == true) {
                assumibili.push({
                    label: "SuperVisor",
                    description: "Rimuovi Il Target Dal Ruolo Di SuperVisor",
                    value: variabili.Supervisor,
                    emoji: "🕵️‍♂️"
                })
            }

            if (apprendista == true) {
                assumibili.push({
                    label: "Apprendista",
                    description: "Rimuovi Il Target Dal Ruolo Di Apprendista",
                    value: variabili.Apprendista,
                    emoji: "🎓"
                })
            }
        }

        //community
        if (interaction.member._roles.find(role => role == variabili.M_community)) {
            if (rianomatore == true) {
                assumibili.push({
                    label: "Rianimatore",
                    description: "Rimuovi Il Target Dal Ruolo Di Rianimatore",
                    value: variabili.Rianimatore,
                    emoji: "🚑"
                })
            }

            if (animatore == true) {
                assumibili.push({
                    label: "Animatore",
                    description: "Rimuovi Il Target Dal Ruolo Di Animatore",
                    value: variabili.Animatore,
                    emoji: "🎬"
                })
            }

            if (direttore == true) {
                assumibili.push({
                    label: "Direttore",
                    description: "Rimuovi Il Target Dal Ruolo Di Direttore",
                    value: variabili.EventMaster,
                    emoji: "🎬"
                })
            }

            if (consigleireCommunity == true) {
                assumibili.push({
                    label: "Consigliere",
                    description: "Rimuovi Il Target Dal Ruolo Di Consigliere",
                    value: variabili.Consigliere,
                    emoji: "🌍"
                })
            }
        }

        //esteri
        if (interaction.member._roles.find(role => role == variabili.M_esteri)) {
            if (cameramen == true) {
                assumibili.push({
                    label: "Cameraman",
                    description: "Rimuovi Il Target Dal Ruolo Di Cameraman",
                    value: variabili.Cameraman,
                    emoji: "📷"
                })
            }

            if (esaminatore == true) {
                assumibili.push({
                    label: "Esaminatore",
                    description: "Rimuovi Il Target Dal Ruolo Di Esaminatore",
                    value: variabili.Esaminatore,
                    emoji: "🔍"
                })
            }

            if (consigliereEsteri == true) {
                assumibili.push({
                    label: "Consigliere",
                    description: "Rimuovi Il Target Dal Ruolo Di Consigliere",
                    value: variabili.Consigliere,
                    emoji: "✈️"
                })
            }

            if (creator == true) {
                assumibili.push({
                    label: "Creator",
                    description: "Rimuovi Il Target Dal Ruolo Di Creator",
                    value: variabili.Creator,
                    emoji: "🖥️"
                })
            }

            if (producer == true) {
                assumibili.push({
                    label: "Producer",
                    description: "Rimuovi Il Target Dal Ruolo Di Producer",
                    value: variabili.Producer,
                    emoji: "🎧"
                })
            }
        }

        if (assumibili.length > 0) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Assumo ${user.tag}`)
                .setDescription("Seleziona L'incarico Da Rimuovere All'utente")
                .setColor("RANDOM")

            let selectmenu = new Discord.MessageSelectMenu()
                .setCustomId(`Dimetti,${user.id}`)
                .setMaxValues(1)
                .setMinValues(0)
                .setPlaceholder("Selezione L'incarico")
                .setOptions(assumibili)

            let row = new Discord.MessageActionRow()
                .addComponents(selectmenu)


            interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
        }
        else
            interaction.reply({ content: "❌ Sembra Che Tu Non Possa Dimettere Questo Utente", ephemeral: true })
    } catch (err) {
        try {
            interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })
            interaction.guild.members.fetch("598498238336729088").then(member => {
                member.user.send(`**/dimetti **${err}`)

            })
            return
        } catch {
            return
        }
    }
}

module.exports = { assumi, dimetti }