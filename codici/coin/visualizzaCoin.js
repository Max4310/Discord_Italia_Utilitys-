const Discord = require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname, "../../variabili.json"))
const { membro, gestisciVisulizza, isStaff, CoinMember, aggiona, user, aggiungi } = require(path.join(__dirname, "../../oggetti.js"))


function abbonamenti(interaction) {
    CoinMember(interaction.customId.split(",")[1]).then((utenteCoin) => {
        if (utenteCoin.abbonamentiPrezzo > 0) {
            let utente = interaction.guild.members.cache.get(utenteCoin.id)
            var description = ""
            var prezzo = ""
            var fine = ""
            for (var i = 0; i < utenteCoin.abbonamenti.length; i++) {
                fine = fine + utenteCoin.abbonamenti[i].fine.giorno + "/" + utenteCoin.abbonamenti[i].fine.mese + "/" + utenteCoin.abbonamenti[i].fine.anno + "\n"
                description = description + utenteCoin.abbonamenti[i].nome + "\n"
                prezzo = prezzo + utenteCoin.abbonamenti[i].prezzo + "£\n"
            }

            var abbonamenti = new Discord.MessageEmbed()
                .setTitle(`Abbonamenti Di ${utente.user.tag}`)
                .setColor(interaction.message.embeds[0].color)
                .setThumbnail(utente.user.displayAvatarURL())
                .setDescription(`Spendi **${utenteCoin.abbonamentiPrezzo}£** Al Mese Per Gli Abbonamenti`)
                .setFields(
                    {
                        name: "Abbonamento",
                        value: description,
                        inline: true
                    },
                    {
                        name: "Scadenza",
                        value: fine,
                        inline: true
                    },
                    {
                        name: "Prezzo",
                        value: prezzo,
                        inline: true
                    }
                )


            interaction.reply({ embeds: [abbonamenti], ephemeral: true })

        }
        else
            interaction.reply({ content: "❌ <@" + utenteCoin.id + "> Non Ha Nessun Abbonamento", ephemeral: true })
    }).catch(() => interaction.reply({ content: "❌ Qualcosa è Andato Storto" }))
    return
}

function lavori(interaction) {
    CoinMember(interaction.customId.split(",")[1]).then((utenteCoin) => {
        if (utenteCoin.stipendioTot > 0) {
            let utente = interaction.guild.members.cache.get(utenteCoin.id)
            var description = ""
            var prezzo = ""
            for (var i = 0; i < utenteCoin.lavori.length; i++) {
                description = description + "<@&" + utenteCoin.lavori[i].id + ">\n"
                prezzo = prezzo + utenteCoin.lavori[i].paga + "£\n"
            }

            var abbonamenti = new Discord.MessageEmbed()
                .setTitle(`Lavori Di ${utente.user.tag}`)
                .setColor(interaction.message.embeds[0].color)
                .setThumbnail(utente.user.displayAvatarURL())
                .setDescription(`Guadagni **${utenteCoin.stipendioTot}£** Al Mese Dai Tuoi Lavori`)
                .setFields(
                    {
                        name: "Lavori: ",
                        value: description,
                        inline: true
                    },
                    {
                        name: "Paghe: ",
                        value: prezzo,
                        inline: true
                    }
                )


            interaction.reply({ embeds: [abbonamenti], ephemeral: true })

        }
        else
            interaction.reply({ content: "❌ <@" + utenteCoin.id + "> Non Ha Nessun Lavoro", ephemeral: true })

    }).catch(() => interaction.reply({ content: "❌ Qualcosa è Andato Storto" }))
    return
}

function comandi(interaction) {
    const emebed = new Discord.MessageEmbed()
        .setTitle(`Comandi Discord Italia Coin`)
        .setColor("GREEN")
        .setDescription(
            "**Visualizza Gli:** <#1001643547834982490>\n" +
            "[Aquista I Discord Italia Coin](https://discorditalia.tebex.io/category/1952772)\n\n" +
            "\`/coins\`" + " *Visualizza Il Profilo Di Un Altro Utente.*\n" +
            "\`/proprieta\`" + " *Visualizza Le Proprietà Di Un Utente.*\n" +
            "\`/givecoin\`" + " *Dai Una Parte Di Denaro Ad Un Altro Utente.*\n" +
            "\`/annulla\` *Annulla Un Tuo Abbonamento*"
        )

    interaction.reply({ embeds: [emebed], ephemeral: true })
    return
}


module.exports = {abbonamenti,lavori,comandi}