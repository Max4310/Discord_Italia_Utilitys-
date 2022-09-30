const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../../variabili.json"))
function command(interaction) {
    try {
        var menu = new Discord.MessageSelectMenu()
            .setCustomId("abbonamentiMenu")
            .setMaxValues(1)
            .setMinValues(0)
            .setPlaceholder("Clicca Qui Per Aquistare Un Abbonamento")
            .setOptions([
                {
                    label: "Gold",
                    description: "Acquista Un Gold Al Prezzo Di 25.000 £/m",
                    value: variabili.A_gold,
                    emoji: "🥇"
                },
                {
                    label: "Vip",
                    description: "Acquista Un Vip Al Prezzo Di 12.500 £/m",
                    value: variabili.A_vip,
                    emoji: "💎"
                },
                {
                    label: "Custom Role",
                    description: "Acquista Un Custom Role Al Prezzo Di 62.500 £/m",
                    value: variabili.A_customRole,
                    emoji: "🧸"
                },
                {
                    label: "Private Call",
                    description: "Acquista Le Private Call Al Prezzo Di 5.000 £/m",
                    value: variabili.A_private_call,
                    emoji: "📞"
                },
                {
                    label: "Colore Base",
                    description: "Acquista Un Colore Base Al Prezzo Di 4.000 £/m",
                    value: variabili.A_colore,
                    emoji: "🎨"
                },
                {
                    label: "Casa",
                    description: "Acquista Una Casa Al Prezzo Di 10.000 £/m",
                    value: variabili.A_casa,
                    emoji: "🏠",
                },
                {
                    label: "Chat Testuale",
                    description: "Acquista Un Chat Testuale Al Prezzo Di 12.000 £/m",
                    value: variabili.A_chatTestuale,
                    emoji: "📄"
                },
                {
                    label: "Spoiler",
                    description: "Acquista L'accesso Agli Spoiler Delle Prossime Patch Al Prezzo Di 2.000 £/m",
                    value: variabili.A_spoiler,
                    emoji: "📢"
                },
                {
                    label: "Anteprima Patch",
                    description: "Acquesta L'anteprima Delle Patch Al Prezzo Di 1.500 £/m",
                    value: variabili.A_anteprima,
                    emoji: "💃"
                },
                {
                    label: "Colore Plus",
                    description: "Acquista Un Colore Plus Al Prezzo Di 6.000 £/m",
                    value: variabili.A_colorePlus,
                    emoji: "🪙"
                },
                {
                    label: "Canzone Dedicata",
                    description: "Acquista Una Canzone Esclusiva Al Prezzo Di 45.000 £",
                    value: variabili.A_canzone,
                    emoji: "🎤"
                },
                {
                    label: "Foto Geko Kizzi",
                    description: "Acquista Un Foto Del Geko Di Kizzi Al Prezzo Di 5.000 £",
                    value: variabili.A_geko,
                    emoji: "🦎"
                }

            ])

        var embed = new Discord.MessageEmbed()
            .setTitle("Discord Italia Abbonamenti")
            .setDescription(
                "**Gli Abbonamenti Sono Venduti Con Scadenze Mensili.\n Ogni Mese Verranno Rinnovati In Automatico**\n" +
                "*(Ad Eccezione Di Alcune Piccole Chicce)*"
            )
            .setFields(
                {
                    name: "**Abbonamento**",
                    inline: true,
                    value:
                        "🥇 **Gold**\n" +
                        "💎 **Vip**\n" +
                        "🧸 **Custom Role** \n" +
                        "📞 **Private Call** \n" +
                        "🎨 **Colore Base**\n" +
                        "🏠 **Casa**\n" +
                        "📄 **Testuale**\n" +
                        "📢 **Accesso Agli Spoiler**\n" +
                        "💃 **Anteprima Patch**\n" +
                        "🪙 **Colore Plus**\n" +
                        "🎤 **Canzone Dedicata Da Max e Doffy**\n" +
                        "🦎 **Foto Del Geko Di Kizzi**"
                },
                {
                    name: "**Prezzo**",
                    inline: true,
                    value:
                        "**25.000** *£ Al Mese* 🥇\n" +
                        "**12.500** *£ Al Mese* 💎\n" +
                        "**62.500** *£ Al Mese* 🧸\n" +
                        "**5.000** *£ Al Mese* 📞\n" +
                        "**4.000** *£ Al Mese* 🎨\n" +
                        "**10.000** *£ Al Mese* 🏠\n" +
                        "**12.000** *£ Al Mese* 📄\n" +
                        "**2.000** *£ Al Mese* 📢\n" +
                        "**1.500** *£ Al Mese* 💃\n" +
                        "**6.000** *£ Al Mese* 🪙\n" +
                        "**45.000** *£ Al Pezzo* 🎤\n" +
                        "**5.000** *£ Al Pezzo* 🦎\n"
                }
            )
            .setColor("GREEN")

        var row = new Discord.MessageActionRow()
            .addComponents(menu)
        //.addComponents(profilo)

        interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
    }catch(err){
        console.log(err)
        interaction.reply({content : "❌ Qualcosa è Andato Storto", ephemeral : true})
    }
    
}

module.exports = {command};