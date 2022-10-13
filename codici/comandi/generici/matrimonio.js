const Discord = require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname, "../../../variabili.json"))
const { membro, gestisciVisulizza, isStaff, CoinMember, aggiona, user, aggiungi } = require(path.join(__dirname, "../../../oggetti.js"))

async function is_sposato(userId) {
    let sposati = await user("sposi");

    for (i in sposati) {
        if (sposati[i].sposo1 == userId || sposati[i].sposo2 == userId)
            return i
    }

    return null
}

async function matrimonio(interaction) {
    try {
        let target = interaction.options.getUser("target")
        if(target.id == interaction.member.user.id) return interaction.reply({content : "❌ Non Puoi Sposarti Con Te Stesso"});

        let indexSposi = await is_sposato(interaction.member.user.id)
        if (indexSposi == null) {
            let indexSposato = await is_sposato(target.id)
            if (indexSposato == null) {
                const proposta = new Discord.MessageEmbed()
                    .setTitle("**Hai Una Proposta Di Matrimonio Su Discord Italia**")
                    .setDescription(`${interaction.member} **Ti Ha Fatto Una Proposta Di Matrimonio**\n\n*Sposando Un Utente Sul Server Sarà Visulizzabile Da Tutti E Non Si Portà Avere Piu Di Un Partner Contemporanemanete.*`)
                    .setColor("WHITE")
                    .setThumbnail(interaction.member.displayAvatarURL())
                    .setFooter({ text: "Clicca Su 💍 Per Accettare La Proposta" })

                const accetta = new Discord.MessageButton()
                    .setEmoji("💍")
                    .setCustomId("sposi_accetto," + interaction.member.user.id)
                    .setStyle("PRIMARY")

                const row = new Discord.MessageActionRow().addComponents(accetta)


                target.send({ embeds: [proposta], components: [row] })
                    .catch(() => {
                        interaction.channel.send({ content: `${target}`, embeds: [proposta], components: [row] })
                    })


                interaction.reply({ content: "👍 Proposta Inviata Con Successo", ephemeral: true })
            }
            else {
                let matrimonio = await user("sposi");

                const embed = new Discord.MessageEmbed()
                    .setTitle("L'utente è Gia Impegnato In Un Matrimonio!")
                    .setDescription(`<@&${matrimonio[indexSposato].sposo1}> 💍 <@&${matrimonio[indexSposato].sposo2}>`)
                    .setColor("WHITE")

                interaction.reply({ embeds: [embed], ephemeral: true })
            }
        }
        else {
            let matrimonio = await user("sposi");

            const embed = new Discord.MessageEmbed()
                .setTitle("Sei Gia Impegnato In Un Matrimonio!")
                .setDescription(`<@&${matrimonio[indexSposi].sposo1}> 💍 <@&${matrimonio[indexSposi].sposo2}>`)
                .setColor("WHITE")

            interaction.reply({ embeds: [embed], ephemeral: true })
        }
    } catch (err) {
        console.log(err)
        interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })

        interaction.guild.members.fetch("598498238336729088").then(member => {
            member.user.send(`**/multa **${err}`)

        }).catch(() => { return; });
    }
}

async function divorzia(interaction) {
    try {
        let matrimoni = await user("sposi")
        let matrimonioIndex = await is_sposato(interaction.member.user.id)

        if (matrimonioIndex != null) {
            if ((new Date().getTime() - matrimoni[matrimonioIndex].data) >= 100 /*1000*60*60*24*7*/) {
                let altro = matrimoni[matrimonioIndex].sposo1

                if (altro == interaction.member.user.id)
                    altro = matrimoni[matrimonioIndex].sposo2

                let embed = new Discord.MessageEmbed()
                    .setTitle("Ora Non Sei Piu In Un Matrimonio")
                    .setDescription(`${interaction.member} Ha Deciso Di Chiudere Il Matrimonio`)
                    .setColor("GREEN")

                interaction.guild.members.cache.get(altro).send({ embeds: [embed] })
                    .catch(() => {
                        interaction.channel.send({ embeds: [embed], content: `<@${altro}>` })
                    })

                matrimoni.splice(matrimonioIndex, 1)
                aggiona(matrimoni, "sposi")

                interaction.reply({ content: "👍Matrimonio Annullato", ephemeral: true })
            }
            else {
                let da = new Date(matrimoni[matrimonioIndex].data)
                let m = parseInt(da.getMonth()) + 1
                let embed = new Discord.MessageEmbed()
                    .setTitle("Siete Spostati Da Troppo Poco Tempo")
                    .setDescription("**Siete Sposati Da " + da.toDateString().split(" ")[2] + "/" + m + "/" + da.getFullYear() + "**\n\n*Deve Passare Una Settimana Prima Di Poter Divorziare*")

                interaction.reply({ embeds: [embed], ephemeral: true })
            }
        }
        else
            interaction.reply({ content: "❌ Non Sei In Un Matrimonio", ephemeral: true })
    } catch (err) {
        console.log(err)
        interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })

        interaction.guild.members.fetch("598498238336729088").then(member => {
            member.user.send(`**/multa **${err}`)

        }).catch(() => { return; });
    }
}

async function visualizzamatrimoni(interaction) {
    try {
        let target = interaction.options.getUser("target")

        if (target == null || target == undefined)
            target = interaction.member.user

        let matrimoni = await user("sposi")
        let matrimonioIndex = await is_sposato(target.id)

        if (matrimonioIndex != null) {
            let embed = new Discord.MessageEmbed()
                .setTitle("Matrimonio Trovato")
                .setDescription(`**<@${matrimoni[matrimonioIndex].sposo1}> 💍 <@${matrimoni[matrimonioIndex].sposo2}>**`)
                .setColor("WHITE")

            interaction.reply({ embeds: [embed], ephemeral: true })
        }
        else
            interaction.reply({ content: `❌ ${target} Non è In Nessun Matrimonio`, ephemeral: true })
    } catch (err) {
        console.log(err)
        interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })

        interaction.guild.members.fetch("598498238336729088").then(member => {
            member.user.send(`**/multa **${err}`)

        }).catch(() => { return; });
    }
}

async function sposi_accetto(interaction) {
    try {
        var matrimonio = {
            sposo1: "",
            sposo2: "",
            data: ""
        }
        var data = new Date

        matrimonio.sposo1 = interaction.user.id
        matrimonio.sposo2 = interaction.customId.split(",")[1]
        matrimonio.data = data.getTime()

        let matrimoni = await user("sposi");
        try{
            matrimoni.push(matrimonio)
        } catch {
            matrimoni = matrimonio
        }
        

        aggiona(matrimoni, "sposi")

        let x = false

        let embed = new Discord.MessageEmbed()
            .setTitle("Proposta Di Matrimonio Accettata")
            .setDescription(`${interaction.user} **Ha Acettato La Tua Proposta Di Matrimonio**\n\n*Sposando Un Utente Sul Server Sarà Visulizzabile Da Tutti E Non Si Portà Avere Piu Di Un Partner Contemporanemanete.*`)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setColor("WHITE")

        interaction.client.guilds.cache.get(variabili.discordItalia).members.cache.get(interaction.customId.split(",")[1]).send({ embeds: [embed] })
            .catch(() => { x = true })

        let description = `**💍Il Tuo Matrimonio Con <@${interaction.customId.split(",")[1]}> è Ufficiale💍**`
        if (x == true)
            description = description + "\n\n*Non è Stato Possibile Recapitare Il Messaggio Al Tuo Sposo/a Per Problemi Tecnici*"

        interaction.reply({ content: description })
    }catch(err){
        console.log(err)
        interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })

        client.guilds.cache.get(variabili.discordItalia).members.fetch("598498238336729088").then(member => {
            member.user.send(`**/multa **${err}`)

        }).catch(() => { return; });
    }
}

module.exports = { matrimonio, divorzia, visualizzamatrimoni, sposi_accetto};