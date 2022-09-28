const Discord = require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname, "../../../variabili.json"))
const { membro, gestisciVisulizza, isStaff, CoinMember, aggiona, user, aggiungi } = require(path.join(__dirname, "../../../oggetti.js"))


function managecoin(interaction) {

    try {
        var quantità = interaction.options.getInteger("quantità")
        var id = interaction.options.getUser("target").id
        var membr = interaction.guild.members.cache.get(id)

        switch (interaction.options.getString("azione")) {
            case "+":
                if (isStaff(membr) == true) {
                    if (quantità != null) {
                        var utente = new membro(id)
                        utente.add(quantità)
                        const embed = new Discord.MessageEmbed()
                            .setColor("GREEN")
                            .setDescription(`${quantità}£ Sono Stati Aggiunti A ${interaction.options.getUser("target")}`)
                            .setTitle("Soldi Aggiunti Correttamente")

                        interaction.reply({ embeds: [embed], ephemeral: true })

                        const economyLog = new Discord.MessageEmbed()
                            .setTitle("ECONOMY LOG")
                            .setDescription(`${interaction.member} ha aggiunto ${quantità} discord coin a ${membr}`)
                            .setColor("GREEN")
                            .setThumbnail({ url: "https://media.discordapp.net/attachments/962302556929945652/1007711772205121586/1486564172-finance-loan-money_81492.png" })

                        client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({ embeds: [economyLog] })

                        /* * * * * * * * * * *
                        *  il comando aggiunge una quantità di soldi (passati come quantità) di un utente passato come target
                        *
                        *  interaction.member = chi ha fatto il comando
                        *  utente = l'oggetto membro con tutte le info di discord italia coin 
                        *  membr = il membro target
                        *  quantità = quantità di soldi che sono stati levati
                        * * * * * * * * * * * */
                    }
                    else
                        interaction.reply({ content: "❌ Non Hai Specificato la Quantità", ephemeral: true })

                }
                else
                    interaction.reply({ content: "❌ L'utete Non è Staff", ephemeral: true })

                break;
            case "-":
                if (isStaff(membr) == true) {
                    var utente = new membro(id)
                    sleep(5)
                    CoinMember(id).then((user) => {
                        if (user == null) return interaction.reply({ content: "❌ L'utente Non Era Salvato Negli Archivi" })
                        if (user[0].soldi >= quantità) {
                            if (quantità != null) {
                                utente.remove(quantità)
                                const embed = new Discord.MessageEmbed()
                                    .setColor("GREEN")
                                    .setDescription(`${quantità}£ Sono Stati Rimossi A ${interaction.options.getCoinMember("target")}`)
                                    .setTitle("Soldi Rimossi Correttamente")
                                interaction.reply({ embeds: [embed], ephemeral: true })

                                const economyLog = new Discord.MessageEmbed()
                                    .setTitle("ECONOMY LOG")
                                    .setDescription(`${interaction.member} ha rimosso ${quantità} discord coin a ${membr}`)
                                    .setColor("RED")
                                    .setThumbnail({ url: "https://media.discordapp.net/attachments/962302556929945652/1007712884140277900/thief.png" })

                                client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({ embeds: [economyLog] })


                                /* * * * * * * * * * *
                                * il comando leva una quantità di soldi (passati come quantità) di un utente passato come target
                                *
                                * interaction.member = chi ha fatto il comando
                                * utente = l'oggetto membro con tutte le info di discord italia coin 
                                * membr = il membro target
                                * quantità = quantità di soldi che sono stati levati
                                * * * * * * * * * * * */
                            }
                            else
                                interaction.reply({ content: "❌ Non Hai Specificato la Quantità", ephemeral: true })

                        }
                        else
                            interaction.reply({ content: "❌ L'utente Non Ha Abbastanza Soldi", ephemeral: true })

                    })
                }
                break;
            case "0":
                if (isStaff(membr) == true) {
                    var utente = new membro(id)

                    CoinMember(id).then((u) => {
                        if (user == null) return interaction.reply({ content: "❌ L'utente Non Era Salvato Negli Archivi" })

                        utente.remove(u.soldi)

                        const embed = new Discord.MessageEmbed()
                            .setColor("GREEN")
                            .setDescription(`A ${interaction.options.getUser("target")} Sono Stati Resettati I Soldi`)
                            .setTitle("Soldi Rimossi Correttamente")

                        interaction.reply({ embeds: [embed], ephemeral: true })
                    })

                    const economyLog = new Discord.MessageEmbed()
                        .setTitle("ECONOMY LOG")
                        .setDescription(`${interaction.member} ha eseguito il comando di reset su ${membr}`)
                        .setColor("RED")
                        .setThumbnail({ url: "https://media.discordapp.net/attachments/962302556929945652/1007712281972457503/kisspng-vector-graphics-credit-card-debt-portable-network-contact-same-day-bankruptcy-714-913-6273-sa-5c0500d5582c74.8090259715438317653612.png" })

                    client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({ embeds: [economyLog] })



                    /* * * * * * * * * * 
                    * il comando resetta i soldi di un utente passato come target
                    *
                    * interaction.member = chi ha fatto il comando
                    * utente = l'oggetto membro con tutte le info di discord italia coin 
                    * membr = il membro target
                    * * * * * * * * * * */
                }
                else
                    interaction.reply({ content: "❌ L'utete Non è Staff", ephemeral: true })

                break;
            case "stop":
                CoinMember(id).then(Member => {
                    if (Member.warn == true) {
                        var embed = new Discord.MessageEmbed()
                            .setTitle("Errore")
                            .setDescription("I Guadagni Dell'utente Erano Gia Disabilitati")
                            .setColor("RED")
                    }
                    else {
                        var embed = new Discord.MessageEmbed()
                            .setTitle("Utente Modificato Corettamente")
                            .setDescription("I Guadagni Dell'utente Sono Stati Disabilitati")
                            .setColor("GREEN")

                        const economyLog = new Discord.MessageEmbed()
                            .setTitle("ECONOMY LOG")
                            .setDescription(`${interaction.member} ha utilizzato il comando STOP su ${membr}`)
                            .setColor("ORANGE")
                            .setThumbnail({ url: "" })

                        client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({ embeds: [economyLog] })

                        /* * * * * * * * * * 
                        * il comando stoppa i guadagni di un utente passato come target
                        *
                        * interaction.member = chi ha fatto il comando
                        * utente = l'oggetto membro con tutte le info di discord italia coin 
                        * membr = il membro target
                        * * * * * * * * * * */

                        Member.warn = true
                        aggiungi(membr)
                    }

                    interaction.reply({ embeds: [embed], ephemeral: true })
                })
                    .catch((err) => {
                        interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })
                        console.log(err)
                        return
                    })
                break;
            case "on":
                CoinMember(id).then(Member => {
                    if (Member.warn == false) {
                        var embed = new Discord.MessageEmbed()
                            .setTitle("Errore")
                            .setDescription("I Guadagni Dell'utente Erano Gia Abilitati")
                            .setColor("RED")
                    }
                    else {
                        var embed = new Discord.MessageEmbed()
                            .setTitle("Utente Modificato Corettamente")
                            .setDescription("I Guadagni Dell'utente Sono Stati Abilitati")
                            .setColor("GREEN")

                        const economyLog = new Discord.MessageEmbed()
                            .setTitle("ECONOMY LOG")
                            .setDescription(`${interaction.member} ha abilitato i guadagni di ${membr}`)
                            .setColor("GREEN")
                            .setThumbnail({ url: "https://media.discordapp.net/attachments/962302556929945652/1007711772205121586/1486564172-finance-loan-money_81492.png" })

                        client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({ embeds: [economyLog] })

                        /* * * * * * * * * * 
                        * il comando Abilita i guadagni di un utente passato come target
                        *
                        * interaction.member = chi ha fatto il comando
                        * utente = l'oggetto membro con tutte le info di discord italia coin 
                        * membr = il membro target
                        * * * * * * * * * * */

                        Member.warn = false
                        aggiungi(membr)
                    }

                    interaction.reply({ embeds: [embed], ephemeral: true })
                })
                    .catch((err) => {
                        interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })
                        console.log(err)
                        return
                    })
                break;
            default:
                interaction.reply({ content: "❌ Emm Cosa Volevi Fare? ", ephemeral: true })
        }
    }
    catch (err) {
        try {
            interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })
            interaction.guild.members.fetch("598498238336729088").then(member => {
                member.user.send(`**/managecoin **${err}`)

            })
            return
        } catch {
            return
        }
    }
}

module.exports = { managecoin }