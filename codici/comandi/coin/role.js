const Discord = require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname, "../../../variabili.json"))
const { membro, gestisciVisulizza, isStaff, CoinMember, aggiona, user, aggiungi } = require(path.join(__dirname, "../../../oggetti.js"))


function give(interaction) {

    try {
        var userx = interaction.options.getUser("target")
        var role = interaction.options.getRole("role")
        var dataFine = interaction.options.getString("fine")

        if (role.id == variabili.gold)
            interaction.guild.channels.cache.get(variabili.utilyXtebex).send(`UTILITYRAN,gold,${userx.id}`)

        if (dataFine != null && dataFine != undefined) {
            var err = false
            var gg = parseInt(dataFine.split("-")[2])
            var mm = parseInt(dataFine.split("-")[1])
            var aa = parseInt(dataFine.split("-")[0])

            var data = new Date
            var giorno = data.getDate()
            var mese = data.getMonth() + 1
            var anno = data.getFullYear()

            if (mm <= 0 || mm > 12)
                err = true

            if (gg <= 0 || gg > 31)
                err = true

            if (err == false) {
                if (aa >= anno && aa < anno + 10) {
                    if (aa == anno) {
                        if (mese <= mm) {
                            if (mese == mm) {
                                if (gg >= giorno)
                                    err = true
                            }
                        }
                        else
                            err = true
                    }
                }
                else
                    err = true
            }

            if (err == false) {

                user("role").then(userRoles => {
                    var userRole = {
                        member: userx.id,
                        roles: [
                            {
                                role: role.id,
                                fine: {
                                    giorno: gg,
                                    mese: mm,
                                    anno: aa
                                }
                            }
                        ]
                    }

                    if (userRoles != null) {
                        var x = userRoles.findIndex(m => m.member == userx.id)

                        if (x > -1) {
                            var y = userRoles[x].roles.findIndex(ruol => ruol.role == role.id)

                            if (y > -1) {
                                let vecchio = userRoles[x].roles[y].fine
                                userRoles[x].roles[y].fine = {
                                    giorno: gg,
                                    mese: mm,
                                    anno: aa
                                }

                                var embed = new Discord.MessageEmbed()
                                    .setTitle(`Ruolo Modificato Con Successo`)
                                    .setDescription(`l'utente Gia possedeva ${role} Ho Modificato La Scadenza`)
                                    .setFields([
                                        {
                                            name: "Prima",
                                            value: `${vecchio.giorno}/${vecchio.mese}/${vecchio.anno}`
                                        },
                                        {
                                            name: "Ora",
                                            value: `${gg}/${mm}/${aa}`
                                        }
                                    ])
                                    .setColor("ORANGE")

                                interaction.reply({ embeds: [embed], ephemeral: true })
                            }
                            else {
                                interaction.guild.members.cache.get(userx.id).roles.add(interaction.guild.roles.cache.get(role.id))
                                userRoles[x].roles.push({
                                    role: role.id,
                                    fine: {
                                        giorno: gg,
                                        mese: mm,
                                        anno: aa
                                    }
                                })

                                var embed = new Discord.MessageEmbed()
                                    .setTitle(`Ruolo Aggiunto Con Successo`)
                                    .setDescription(`${role} è Stato Aggiunto A ${userx}`)
                                    .setFields([
                                        {
                                            name: "Scadenza",
                                            value: `${gg}/${mm}/${aa}`
                                        }
                                    ])
                                    .setColor("ORANGE")

                                interaction.reply({ embeds: [embed], ephemeral: true })
                            }
                        }
                        else {
                            interaction.guild.members.cache.get(userx.id).roles.add(interaction.guild.roles.cache.get(role.id))
                            userRoles.push(userRole)

                            var embed = new Discord.MessageEmbed()
                                .setTitle(`Ruolo Aggiunto Con Successo`)
                                .setDescription(`${role} è Stato Aggiunto A ${userx}`)
                                .setFields([
                                    {
                                        name: "Scadenza",
                                        value: `${gg}/${mm}/${aa}`
                                    }
                                ])
                                .setColor("ORANGE")

                            interaction.reply({ embeds: [embed], ephemeral: true })
                        }


                        aggiona(userRoles, "role")
                    }
                    else {
                        aggiona(userRole, "role")
                        interaction.guild.members.cache.get(userx.id).roles.add(interaction.guild.roles.cache.get(role.id))

                        var embed = new Discord.MessageEmbed()
                            .setTitle(`Ruolo Aggiunto Con Successo`)
                            .setDescription(`${role} è Stato Aggiunto A ${userx}`)
                            .setFields([
                                {
                                    name: "Scadenza",
                                    value: `${gg}/${mm}/${aa}`
                                }
                            ])
                            .setColor("ORANGE")

                        interaction.reply({ embeds: [embed], ephemeral: true })
                    }
                })
            }
            else
                interaction.reply({ content: "❌ Data Non Valida", ephemeral: true })
        }
        else {
            interaction.guild.members.cache.get(userx.id).roles.add(interaction.guild.roles.cache.get(role.id))
            var embed = new Discord.MessageEmbed()
                .setTitle("Ruolo Assegnato Con Successo")
                .setDescription(`${role} è stato assegnato a ${userx}`)
                .setColor("RANDOM")

            interaction.reply({ embeds: [embed], ephemeral: true })
        }
    } catch (err) {
        try {
            interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })
            interaction.guild.members.fetch("598498238336729088").then(member => {
                member.user.send(`**/give **${err}`)

            })
            return
        } catch {
            return
        }
    }

}

function info(interaction) {
    try {
        var target = interaction.options.getUser("target")

        if (target == null || target == undefined)
            target = interaction.member.user

        user("role").then(userRoles => {
            var x = userRoles.findIndex(userRole => userRole.member == target.id)

            if (x > -1) {
                var embed = new Discord.MessageEmbed()
                    .setTitle(`Temp Role Di ${target.tag}`)
                    .setColor("RANDOM")

                var files = []

                for (var i in userRoles[x].roles) {
                    files.push({
                        name: `Ruolo:`,
                        value: `<@&${userRoles[x].roles[i].role}>\nScadenza: ${userRoles[x].roles[i].fine.giorno}/${userRoles[x].roles[i].fine.mese}/${userRoles[x].roles[i].fine.anno}`
                    })
                }

                embed.setFields(files)

                interaction.reply({ embeds: [embed], ephemeral: true })
            }
            else
                interaction.reply({ content: `❌     ${target} Non Ha Temp Role`, ephemeral: true })
        })
    } catch (err) {
        try {
            interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })
            interaction.guild.members.fetch("598498238336729088").then(member => {
                member.user.send(`**/inforole **${err}`)

            })
            return
        } catch {
            return
        }
    }


}

module.exports = { give, info }