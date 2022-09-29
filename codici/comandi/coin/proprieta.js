const Discord = require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname, "../../../variabili.json"))
const { membro, gestisciVisulizza, isStaff, CoinMember, aggiona, user, aggiungi } = require(path.join(__dirname, "../../../oggetti.js"))



function proprieta(interaction) {

    try {
        var target = interaction.options.getUser("target")

        if (target == null || target == undefined)
            target = interaction.member.user

        user("proprietà").then(usersPropetis => {
            var x = usersPropetis.findIndex(proprieta => proprieta.id == target.id)

            if (x > -1) {
                var embed = new Discord.MessageEmbed()
                    .setTitle(`Proprietà Di ${target.tag}`)
                    .setColor("RANDOM")

                var fild = []
                if (usersPropetis[x].voc != null) {
                    fild.push({
                        name: "Casa",
                        value: `<#${usersPropetis[x].voc}>`,
                        inline: false
                    })
                }

                if (usersPropetis[x].testuale != null) {
                    fild.push({
                        name: "Chat Testuale",
                        value: `<#${usersPropetis[x].testuale}>`,
                        inline: false
                    })
                }

                if (usersPropetis[x].ruolo != null) {
                    var role = null
                    if (usersPropetis[x].ruolo.roleId != null)
                        role = usersPropetis[x].ruolo.roleId
                    else
                        role = usersPropetis[x].ruolo

                    fild.push({
                        name: "Custom Role",
                        value: `<@&${role}>`,
                        inline: false
                    })
                }

                embed.setFields(fild)
                interaction.reply({ embeds: [embed], ephemeral: true })
            }
            else
                interaction.reply({ content: `❌ ${target} Non Ha Proprietà`, ephemeral: true })
        }).catch(() => {
            interaction.reply({content : "❌ Nessuno Nel Server Ha Le Proprità", ephemeral: true})
        })
    } catch (err) {
        try{
            interaction.reply({content : "❌ Qualcosa è Andato Storto", ephemeral : true})
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send(`**/proprieta **${err}`)
            
            })  
            return 
        }catch{
            return
        }
    }
}

module.exports = {proprieta}