const Discord = require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname, "../../variabili.json"))
const { membro, gestisciVisulizza, isStaff, CoinMember, aggiona, user, aggiungi } = require(path.join(__dirname, "../../oggetti.js"))

function assistenza(interaction) {
    try {
        //aprire un ticket in assitenza per i custom role
        interaction.guild.channels.cache.get(variabili.assistenzaEconomo).createChannel(`${interaction.member.user.username} Ticket`, {
            type: "GUILD_TEXT",

            permissionOverwrites: [
                {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: interaction.member.user.id,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
                    deny: ["MANAGE_ROLES"]
                },
                {
                    id: variabili.Yakuza,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
                    deny: ["MANAGE_ROLES"]
                }
            ]
        })
            .then(channel => {
                channel.send(`<@&892868492267765840>, <@&${variabili.Yakuza}> , ${interaction.member}`).then(msg => msg.delete())

                const risposta = new Discord.MessageEmbed()
                    .setTitle("Ho Contattato L'assistenza")
                    .setDescription(`Parla Con Un Operatore In ⇨ ${channel} ⇦ Per Ricevere Il Tuo Ruolo `)

                interaction.reply({ embeds: [risposta], ephemeral: true })

                const embed = new Discord.MessageEmbed()
                    .setTitle("Assistenza Custom Role")
                    .setDescription(`${interaction.member} Ha Comprato Un Custom Role Tramite I Discord Italia Coin`)
                    .setColor("GREEN")

                const chiudi = new Discord.MessageButton()
                    .setCustomId("CR_close")
                    .setEmoji("🔒")
                    .setStyle("DANGER")
                    .setLabel("Chiudi Il Ticket")

                const row = new Discord.MessageActionRow()
                    .addComponents(chiudi)

                channel.send({ embeds: [embed], components: [row] })
            })
    } catch (err) {
        try {
            interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })
            interaction.guild.members.fetch("598498238336729088").then(member => {
                member.user.send(`**CR_assistenza **${err}`)
            })
            return
        } catch {
            return
        }
    }


}

function close(interaction) {

    try {
        if (interaction.member.permissions.has("ADMINISTRATOR") || interaction.member._roles.includes(variabili.Yakuza)) {
            interaction.reply({ content: "👍 Il Ticket Verrà Eliminato Tra 5 Secondi", ephemeral: true })
            setTimeout(() => {
                interaction.channel.delete()
            }, 1000 * 5)
        }
        else
            interaction.reply({ content: "❌ Solo Il Team Di Asssitenza Puo Chiudere Il Ticket" })
    } catch (err) {
        try {
            interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })
            interaction.guild.members.fetch("598498238336729088").then(member => {
                member.user.send(`**CR_close **${err}`)
            })
            return
        } catch {
            return
        }
    }

}

module.exports = { assistenza, close }