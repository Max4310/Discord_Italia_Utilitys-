const Discord = require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname, "../../variabili.json"))
const { membro, gestisciVisulizza, isStaff, CoinMember, aggiona, user, aggiungi } = require(path.join(__dirname, "../../oggetti.js"))

function abbonamenti(interaction) {
    try {
        if (!interaction.values[0]) return interaction.deferUpdate()


        var utenteCoin = new membro(interaction.member.user.id)
        if (interaction.values[0] == variabili.A_canzone || interaction.values[0] == variabili.A_geko) {
            if (interaction.values[0] == variabili.A_canzone) {
                CoinMember(interaction.member.user.id).then((u) => {
                    if (u == null) return interaction.reply({ content: "❌ Qualcosa è Andato Storto Riprovare", ephemeral: true })
                    if (u.soldi >= variabili.P_canzone) {
                        utenteCoin.remove(variabili.P_canzone)

                        var links = []
                        var numero = Math.ceil(Math.random() * links.length-1) 
                        const embed = new Discord.MessageEmbed()
                            .setTitle("Acquistato Con Successo")
                            .setThumbnail(interaction.member.user.displayAvatarURL())
                            .setDescription(`${variabili.P_canzone}£ Sono Stati Prelevati Dal Tuo Conto Per L'acquisto Di Questa Canzone\n\n`)
                            .setColor("RANDOM")

                       
                        interaction.reply({ embeds: [embed], files: [canzone], ephemeral: true })
                    }
                    else
                        interaction.reply({ content: "❌ Non Hai Soldi A Sufficienza", ephemeral: true })
                })
            }
            else {
                CoinMember(interaction.member.user.id).then((u) => {
                    if (u == null) return interaction.reply({ content: "❌ Qualcosa è Andato Storto Riprovare", ephemeral: true })
                    if (u.soldi >= variabili.P_geko) {
                        var links = ["https://cdn.discordapp.com/attachments/982787176771227658/1001935070967373965/1.jpg",
                            "https://cdn.discordapp.com/attachments/982787176771227658/1001935081394425957/2.jpg",
                            "https://cdn.discordapp.com/attachments/982787176771227658/1001935103943004270/3.jpg",
                            "https://cdn.discordapp.com/attachments/982787176771227658/1001935114009329734/4.jpg",
                            "https://cdn.discordapp.com/attachments/982787176771227658/1001935120434995210/5.jpg",
                            "https://cdn.discordapp.com/attachments/982787176771227658/1001935127871496313/6.jpg",
                            "https://cdn.discordapp.com/attachments/982787176771227658/1001935145424658522/7.jpg",
                            "https://cdn.discordapp.com/attachments/982787176771227658/1001935156636025023/8.jpg"]

                        utenteCoin.remove(variabili.P_geko)

                        var numero = Math.ceil(Math.random() * 7)

                        const embed = new Discord.MessageEmbed()
                            .setTitle("Acquistato Con Successo")
                            .setThumbnail(interaction.member.user.displayAvatarURL())
                            .setDescription(`${variabili.P_geko}£ Sono Stati Prelevati Dal Tuo Conto Per L'acquisto Di Questa Foto`)
                            .setColor("RANDOM")
                            .setImage(links[numero])

                        interaction.reply({ embeds: [embed], ephemeral: true })
                    }
                    else
                        interaction.reply({ content: "❌ Non Hai Soldi A Sufficienza", ephemeral: true })
                })
            }
        }
        else {
            switch (interaction.values[0]) {
                case variabili.A_gold: //gold
                    CoinMember(interaction.member.user.id).then((u) => {
                        if (u == null) return interaction.reply({ content: "❌ Qualcosa è Andato Storto Riprovare", ephemeral: true })
                        var i = 0;
                        var ver = true;

                        while (i < u.abbonamenti.length && ver == true) {
                            if (u.abbonamenti[i].id == variabili.A_gold)
                                ver = false
                            i++
                        }

                        if (u.soldi >= variabili.P_gold && ver == true) {
                            user("proprietà").then(usersPropetis => {
                                var voc = false
                                var test = false
                                if (usersPropetis != null) {
                                    var a = usersPropetis.findIndex((p) => p.id == interaction.member.user.id)

                                    if (a > -1) {
                                        if (usersPropetis[a].voc != null)
                                            voc = true

                                        if (usersPropetis[a].testuale != null)
                                            test = true
                                    }
                                }

                                var goldx = interaction.guild.roles.cache.get(variabili.gold)

                                if (test == false && voc == false && interaction.member._roles.includes(variabili.gold) == false) {
                                    utenteCoin.remove(variabili.P_gold)
                                    utenteCoin.aquista(variabili.A_gold)
                                    interaction.member.roles.add(goldx)
                                    interaction.guild.channels.cache.get(variabili.catogoriaRicchi).createChannel(`${interaction.member.user.username} House`, {
                                        type: "GUILD_VOICE",

                                        permissionOverwrites: [
                                            {
                                                id: interaction.guild.roles.everyone,
                                                deny: ['VIEW_CHANNEL'],
                                            },
                                            {
                                                id: interaction.member.user.id,
                                                allow: ["VIEW_CHANNEL", "CONNECT", "MANAGE_ROLES", "CREATE_INSTANT_INVITE", "MUTE_MEMBERS", "MOVE_MEMBERS", "SPEAK", "PRIORITY_SPEAKER", "STREAM", "DEAFEN_MEMBERS"]
                                            }
                                        ]
                                    }).then((casa) => {
                                        interaction.guild.channels.cache.get(variabili.catogoriaRicchi).createChannel(`${interaction.member.user.username} Chat`, {
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
                                                }
                                            ]
                                        }).then((chat) => {
                                            var embed = new Discord.MessageEmbed()
                                                .setTitle("Acquistato Con Successo")
                                                .setThumbnail(interaction.member.user.displayAvatarURL())
                                                .setDescription(`Hai Acquistato Un Abbonamento Gold Al Prezzo Di **${variabili.P_gold}£**\n
                                                **Chat Tesuale** ${chat}\n
                                                **Chat Vocale** ${casa}`)

                                            interaction.reply({ embeds: [embed], ephemeral: true })

                                            const pro = {
                                                id: interaction.member.user.id,
                                                voc: casa.id,
                                                testuale: chat.id,
                                                ruolo: null
                                            }

                                            user("proprietà").then((proprieta) => {
                                                if (proprieta != null) {
                                                    var a = proprieta.findIndex((p) => p.id == interaction.member.user.id)

                                                    if (a > -1) {
                                                        proprieta[a].voc = casa.id
                                                        proprieta[a].testuale = chat.id
                                                    }
                                                    else
                                                        proprieta.push(pro)

                                                    aggiona(proprieta, "proprietà")
                                                }
                                                else
                                                    aggiona(pro, "proprietà")
                                            })

                                            const economyLog = new Discord.MessageEmbed()
                                                .setTitle("ECONOMY LOG")
                                                .setDescription(`${interaction.member} ha comprato l'abbonamento Gold`)
                                                .setColor("GREEN")
                                                .setThumbnail({ url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png" })

                                            client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({ embeds: [economyLog] })

                                            /* * * * * * * * * 
                                            * un utente ha comprato il gold
                                            *
                                            * interaction.member = mebro 
                                            * * * * * * * * * */

                                        })
                                            .catch((err) => {
                                                interaction.reply({ content: "❌ Qualcosa é Andato Storto", ephemeral: true })
                                                console.log(err)
                                                return
                                            })
                                    })
                                        .catch((err) => {
                                            interaction.reply({ content: "❌ Qualcosa é Andato Storto", ephemeral: true })
                                            console.log(err)
                                            return
                                        })
                                }
                                else {
                                    const embed = new Discord.MessageEmbed()
                                        .setTitle("Acquisto Fallito")
                                        .setDescription("A Quanto Pare Gia Possiedi La Totalità O Una Parte Dei Vantaggi Di Questo Abbonamento")
                                        .setFooter({ text: "Contatta L'assitenza In Caso Di Problemi" })
                                        .setColor("RED")

                                    interaction.reply({ embeds: [embed], ephemeral: true })
                                }
                            })


                        }
                        else
                            interaction.reply({ content: "❌ Non Hai Soldi A Sufficienza o Possiedi Gia Questo Abbonamento", ephemeral: true })
                    })


                    break;
                case variabili.A_vip: //vip
                    CoinMember(interaction.member.user.id).then((u) => {
                        if (u == null) return interaction.reply({ content: "❌ Qualcosa è Andato Storto Riprovare", ephemeral: true })
                        var i = 0;
                        var ver = true;

                        while (i < u.abbonamenti.length && ver == true) {
                            if (u.abbonamenti[i].id == variabili.A_vip)
                                ver = false
                            i++
                        }

                        if (u.soldi >= variabili.P_vip && ver == true) {
                            if (interaction.member._roles.includes(variabili.vip) == false) {
                                utenteCoin.remove(variabili.P_vip)
                                utenteCoin.aquista(variabili.A_vip)
                                interaction.member.roles.add(interaction.guild.roles.cache.get(variabili.vip))

                                var embed = new Discord.MessageEmbed()
                                    .setTitle("Acquistato Con Successo")
                                    .setThumbnail(interaction.member.user.displayAvatarURL())
                                    .setDescription(`Hai Acquistato Un Abbonamento Vip Al Prezzo Di **${variabili.P_vip}£**`)

                                interaction.reply({ embeds: [embed], ephemeral: true })

                                const economyLog = new Discord.MessageEmbed()
                                    .setTitle("ECONOMY LOG")
                                    .setDescription(`${interaction.member} ha comprato l'abbonamento VIP`)
                                    .setColor("GREEN")
                                    .setThumbnail({ url: "https://media.discordapp.net/attachments/962302556929945652/1007718599210844180/1f48e.png" })

                                client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({ embeds: [economyLog] })

                                /* * * * * * * * * 
                                * un utente ha comprato il vip
                                *
                                * interaction.member = mebro 
                                * * * * * * * * * */
                            }
                            else
                                interaction.reply({ content: "❌ Gia Possiedi Il Ruolo Vip", ephemeral: true })
                        }
                        else
                            interaction.reply({ content: "❌ Non Hai Soldi A Sufficienza o Possiedi Gia Questo Abbonamento", ephemeral: true })
                    })

                    break;
                case variabili.A_customRole: //customRole
                    CoinMember(interaction.member.user.id).then((u) => {
                        if (u == null) return interaction.reply({ content: "❌ Qualcosa è Andato Storto Riprovare", ephemeral: true })
                        var i = 0;
                        var ver = true;

                        while (i < u.abbonamenti.length && ver == true) {
                            if (u.abbonamenti[i].id == variabili.A_customRole)
                                ver = false
                            i++
                        }

                        if (u.soldi >= variabili.P_customRole && ver == true) {
                            user("proprietà").then(usersPropetis => {
                                var r = false

                                if (usersPropetis != null) {
                                    var a = usersPropetis.findIndex((p) => p.id == interaction.member.user.id)

                                    if (a > -1) {
                                        if (usersPropetis[a].ruolo != null)
                                            r = true
                                    }
                                }

                                if (r == false) {
                                    utenteCoin.remove(variabili.P_customRole)
                                    utenteCoin.aquista(variabili.A_customRole)

                                    interaction.guild.roles.create({
                                        name: "Attesa Custom",
                                        color: "ORANGE",
                                    }).then((role) => {
                                        interaction.member.roles.add(role)

                                        var embed = new Discord.MessageEmbed()
                                            .setThumbnail(interaction.member.user.displayAvatarURL())
                                            .setTitle("Acquistato Con Successo")
                                            .setDescription("Clicca Sul Pulsante Qui Sotto Per Riscattare !")

                                        var button = new Discord.MessageButton()
                                            .setCustomId("CR_assistenza")
                                            .setEmoji("🧸")
                                            .setStyle("SUCCESS")

                                        var row = new Discord.MessageActionRow()
                                            .addComponents(button)

                                        interaction.member.roles.add(interaction.guild.roles.cache.get(variabili.customRole))

                                        interaction.reply({ embeds: [embed], components: [row], ephemeral: true })

                                        const pro = {
                                            id: interaction.member.user.id,
                                            voc: null,
                                            testuale: null,
                                            ruolo: role.id
                                        }

                                        user("proprietà").then((proprieta) => {
                                            if (proprieta != null) {
                                                var a = proprieta.findIndex((p) => p.id == interaction.member.user.id)

                                                if (a > -1)
                                                    proprieta[a].ruolo = role.id
                                                else
                                                    proprieta.push(pro)

                                                aggiona(proprieta, "proprietà")
                                            }
                                            else
                                                aggiona(pro, "proprietà")
                                        })
                                            .catch(err => {
                                                //interaction.reply({content : "❌ Qualcosa é Andato Storto", ephemeral : true})
                                                console.log(err)
                                                return
                                            })
                                    })
                                        .catch(err => {
                                            interaction.reply({ content: "❌ Qualcosa é Andato Storto", ephemeral: true })
                                            console.log(err)
                                            return
                                        })
                                }
                                else {
                                    var embed = new Discord.MessageEmbed()
                                        .setTitle("L'acquisto è Fallito")
                                        .setDescription("Gia Possiedi Un Custom Role")
                                        .setFooter({ text: "Contatta L'assistenza In Caso Di Problemi" })
                                        .setColor("RED")


                                    interaction.reply({ embeds: [embed], ephemeral: true })
                                }



                                const economyLog = new Discord.MessageEmbed()
                                    .setTitle("ECONOMY LOG")
                                    .setDescription(`${interaction.member} ha comprato un Custom Role`)
                                    .setColor("GREEN")
                                    .setThumbnail({ url: "https://media.discordapp.net/attachments/962302556929945652/1007719129899356232/pngwing.com.png?width=668&height=668" })

                                client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({ embeds: [economyLog] })


                                /* * * * * * * * * 
                                * un utente ha comprato il custom role
                                *
                                * interaction.member = mebro 
                                * * * * * * * * * */
                            }).catch((err) => {
                                console.log(err)
                                return
                            })

                        }
                        else
                            interaction.reply({ content: "❌ Non Hai Soldi A Sufficienza o Possiedi Gia Questo Abbonamento", ephemeral: true })
                    })
                    break;
                case variabili.A_private_call: //privateCall
                    CoinMember(interaction.member.user.id).then((u) => {
                        if (u == null) return interaction.reply({ content: "❌ Qualcosa è Andato Storto Riprovare", ephemeral: true })
                        var i = 0;
                        var ver = true;

                        while (i < u.abbonamenti.length && ver == true) {
                            if (u.abbonamenti[i].id == variabili.A_private_call)
                                ver = false
                            i++
                        }

                        if (u.soldi >= variabili.P_private_call && ver == true) {
                            utenteCoin.remove(variabili.P_private_call)
                            utenteCoin.aquista(variabili.A_private_call)

                            interaction.guild.channels.cache.get(variabili.VC_chiamata).permissionOverwrites.edit(interaction.member.user.id,
                                {
                                    VIEW_CHANNEL: true,
                                    CONNECT: true,
                                    MANAGE_ROLES: false,
                                    CREATE_INSTANT_INVITE: false,
                                    MUTE_MEMBERS: false,
                                    MOVE_MEMBERS: false,
                                    SPEAK: false,
                                    PRIORITY_SPEAKER: false,
                                    STREAM: false,
                                    DEAFEN_MEMBERS: false,
                                    SEND_MESSAGES: false,
                                    READ_MESSAGE_HISTORY: false,
                                    MANAGE_CHANNELS: false,
                                    MENTION_EVERYONE: false,
                                    ADD_REACTIONS: false,
                                    USE_EXTERNAL_EMOJIS: false,
                                    USE_EXTERNAL_STICKERS: false,
                                    MANAGE_MESSAGES: false,
                                    EMBED_LINKS: false,
                                    ATTACH_FILES: false
                                })

                            interaction.guild.channels.cache.get(variabili.VC_pannello).permissionOverwrites.edit(interaction.member.user.id,
                                {
                                    VIEW_CHANNEL: true,
                                    MANAGE_ROLES: false,
                                    CREATE_INSTANT_INVITE: false,
                                    SEND_MESSAGES: false,
                                    READ_MESSAGE_HISTORY: true,
                                    MANAGE_THREADS: false,
                                    MANAGE_CHANNELS: false,
                                    USE_PUBLIC_THREADS: false,
                                    USE_PRIVATE_THREADS: false,
                                    CREATE_PUBLIC_THREADS: false,
                                    CREATE_PRIVATE_THREADS: false,
                                    SEND_MESSAGES_IN_THREADS: false,
                                    MENTION_EVERYONE: false,
                                    MANAGE_WEBHOOKS: false,
                                    ADD_REACTIONS: false,
                                    USE_EXTERNAL_EMOJIS: false,
                                    USE_EXTERNAL_STICKERS: false,
                                    MANAGE_MESSAGES: false,
                                    EMBED_LINKS: false,
                                    ATTACH_FILES: false,
                                    SEND_TTS_MESSAGES: false,
                                    USE_APPLICATION_COMMANDS: false
                                })

                            const embed = new Discord.MessageEmbed()
                                .setTitle("Acquistato Con Successo")
                                .setDescription(`Hai Acquistato Le Chiamate Private Al Prezzo Di **${variabili.P_private_call}£**\nConsulta Le Chat <#${variabili.VC_pannello}>, <#${variabili.VC_chiamata}>`)
                                .setThumbnail(interaction.member.user.displayAvatarURL())

                            interaction.reply({ embeds: [embed], ephemeral: true })

                            const economyLog = new Discord.MessageEmbed()
                                .setTitle("ECONOMY LOG")
                                .setDescription(`${interction.member} ha acquistato una chiamata privata`)
                                .setColor("GREEN")
                                .setThumbnail({ url: "https://media.discordapp.net/attachments/962302556929945652/1007719814887915580/94916.png" })

                            client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({ embeds: [economyLog] })

                            /* * * * * * * * * 
                            * un utente ha comprato le chiamate private (quelle per i vip) 
                            *
                            * interaction.member = mebro 
                            * * * * * * * * * */
                        }
                        else
                            interaction.reply({ content: "❌ Non Hai Soldi A Sufficienza o Possiedi Gia Questo Abbonamento", ephemeral: true })
                    })
                    break;
                case variabili.A_colore: //colore normale
                    CoinMember(interaction.member.user.id).then((u) => {
                        if (u == null) return interaction.reply({ content: "❌ Qualcosa è Andato Storto Riprovare", ephemeral: true })
                        var i = 0;
                        var ver = true;

                        while (i < u.abbonamenti.length && ver == true) {
                            if (u.abbonamenti[i].id == variabili.A_colore)
                                ver = false
                            i++
                        }

                        if (u.soldi >= variabili.P_colore && ver == true) {
                            utenteCoin.remove(variabili.P_colore)
                            utenteCoin.aquista(variabili.A_colore)

                            interaction.guild.channels.cache.get(variabili.C_colori).permissionOverwrites.edit(interaction.member.user.id,
                                {
                                    VIEW_CHANNEL: true,
                                    MANAGE_ROLES: false,
                                    CREATE_INSTANT_INVITE: false,
                                    SEND_MESSAGES: false,
                                    READ_MESSAGE_HISTORY: true,
                                    MANAGE_THREADS: false,
                                    MANAGE_CHANNELS: false,
                                    USE_PUBLIC_THREADS: false,
                                    USE_PRIVATE_THREADS: false,
                                    CREATE_PUBLIC_THREADS: false,
                                    CREATE_PRIVATE_THREADS: false,
                                    SEND_MESSAGES_IN_THREADS: false,
                                    MENTION_EVERYONE: false,
                                    MANAGE_WEBHOOKS: false,
                                    ADD_REACTIONS: false,
                                    USE_EXTERNAL_EMOJIS: false,
                                    USE_EXTERNAL_STICKERS: false,
                                    MANAGE_MESSAGES: false,
                                    EMBED_LINKS: false,
                                    ATTACH_FILES: false,
                                    SEND_TTS_MESSAGES: false,
                                    USE_APPLICATION_COMMANDS: false
                                })

                            const embed = new Discord.MessageEmbed()
                                .setTitle("Acquistato Con Successo")
                                .setDescription(`Hai Acquistato L'accesso Ai Colori Al Prezzo Di **${variabili.P_colore}£**\nConsulta La Chat <#${variabili.C_colori}>`)
                                .setThumbnail(interaction.member.user.displayAvatarURL())

                            interaction.reply({ embeds: [embed], ephemeral: true })

                            const economyLog = new Discord.MessageEmbed()
                                .setTitle("ECONOMY LOG")
                                .setDescription(`${interaction.member} ha acquistato l'accesso ai colori standard`)
                                .setColor("GREEN")
                                .setThumbnail({ url: "https://images.emojiterra.com/google/android-pie/512px/1f3a8.png" })

                            client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({ embeds: [economyLog] })

                            /* * * * * * * * * 
                            * un utente ha comprato l'accesso ai colori standard
                            *
                            * interaction.member = mebro 
                            * * * * * * * * * */
                        }
                        else
                            interaction.reply({ content: "❌ Non Hai Soldi A Sufficienza o Possiedi Gia Questo Abbonamento", ephemeral: true })

                    })


                    break;
                case variabili.A_casa: //chat priavata
                    CoinMember(interaction.member.user.id).then((u) => {
                        if (u == null) return interaction.reply({ content: "❌ Qualcosa è Andato Storto Riprovare", ephemeral: true })
                        var i = 0;
                        var ver = true;

                        while (i < u.abbonamenti.length && ver == true) {
                            if (u.abbonamenti[i].id == variabili.A_casa)
                                ver = false
                            i++
                        }

                        if (u.soldi >= variabili.P_casa && ver == true) {
                            user("proprietà").then(usersPropetis => {
                                var voc = false
                                if (usersPropetis != null) {
                                    var a = usersPropetis.findIndex((p) => p.id == interaction.member.user.id)

                                    if (a > -1) {
                                        if (usersPropetis[a].voc != null)
                                            voc = true
                                    }
                                }

                                if (voc == false) {
                                    utenteCoin.remove(variabili.P_casa)
                                    utenteCoin.aquista(variabili.A_casa)
                                    interaction.guild.channels.cache.get(variabili.catogoriaRicchi).createChannel(`${interaction.member.user.username} House`, {
                                        type: "GUILD_VOICE",

                                        permissionOverwrites: [
                                            {
                                                id: interaction.guild.roles.everyone,
                                                deny: ['VIEW_CHANNEL'],
                                            },
                                            {
                                                id: interaction.member.user.id,
                                                allow: ["VIEW_CHANNEL", "CONNECT", "MANAGE_ROLES", "CREATE_INSTANT_INVITE", "MUTE_MEMBERS", "MOVE_MEMBERS", "SPEAK", "PRIORITY_SPEAKER", "STREAM", "DEAFEN_MEMBERS"]
                                            }
                                        ]
                                    }).then((casa) => {
                                        const embed = new Discord.MessageEmbed()
                                            .setTitle("Acquistato Con Successo")
                                            .setDescription(`Hai Acquistato Una Casa Al Prezzo Di **${variabili.P_casa}£**\nConsulta La Chat ${casa}`)
                                            .setThumbnail(interaction.member.user.displayAvatarURL())

                                        interaction.reply({ embeds: [embed], ephemeral: true })

                                        const pro = {
                                            id: interaction.member.user.id,
                                            voc: casa.id,
                                            testuale: null,
                                            ruolo: null
                                        }

                                        user("proprietà").then((proprieta) => {
                                            if (proprieta != null) {
                                                var a = proprieta.findIndex((p) => p.id == interaction.member.user.id)

                                                if (a > -1)
                                                    proprieta[a].voc = casa.id
                                                else
                                                    proprieta.push(pro)

                                                aggiona(proprieta, "proprietà")
                                            }
                                            else
                                                aggiona(pro, "proprietà")
                                        })


                                        const economyLog = new Discord.MessageEmbed()
                                            .setTitle("ECONOMY LOG")
                                            .setDescription(`${interaction.member} ha acquistato l'accesso ai colori standard`)
                                            .setColor("GREEN")
                                            .setThumbnail({ url: "https://images.emojiterra.com/google/android-pie/512px/1f3a8.png" })

                                        client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({ embeds: [economyLog] })

                                        /* * * * * * * * * 
                                        * un utente ha comprato l'accesso ai colori standard
                                        *
                                        * interaction.member = mebro 
                                        * * * * * * * * * */
                                    })
                                        .catch(err => {
                                            interaction.reply({ content: "❌ Qualcosa é Andato Storto", ephemeral: true })
                                            console.log(err)
                                            return
                                        })
                                }
                                else {
                                    const embed = new Discord.MessageEmbed()
                                        .setTitle("Acquisto Fallito")
                                        .setDescription("A Quanto Pare Gia Possiedi Una Casa")
                                        .setFooter({ text: "Contatta L'assitenza In Caso Di Problemi" })
                                        .setColor("RED")

                                    interaction.reply({ embeds: [embed], ephemeral: true })
                                }
                            })
                                .catch(err => {
                                    interaction.reply({ content: "❌ Qualcosa é Andato Storto", ephemeral: true })
                                    console.log(err)
                                    return
                                })

                        }
                        else
                            interaction.reply({ content: "❌ Non Hai Soldi A Sufficienza o Possiedi Gia Questo Abbonamento", ephemeral: true })

                    })

                    break;
                case variabili.A_chatTestuale: //testuale privata
                    CoinMember(interaction.member.user.id).then((u) => {
                        if (u == null) return interaction.reply({ content: "❌ Qualcosa è Andato Storto Riprovare", ephemeral: true })
                        var i = 0;
                        var ver = true;

                        while (i < u.abbonamenti.length && ver == true) {
                            if (u.abbonamenti[i].id == variabili.A_gold)
                                ver = false
                            i++
                        }

                        if (u.soldi >= variabili.P_chatTestuale && ver == true) {
                            user("proprietà").then(usersPropetis => {
                                var test = false
                                if (usersPropetis != null) {
                                    var a = usersPropetis.findIndex((p) => p.id == interaction.member.user.id)

                                    if (a > -1) {
                                        if (usersPropetis[a].testuale != null)
                                            test = true
                                    }
                                }

                                if (test == false) {
                                    utenteCoin.remove(variabili.P_chatTestuale)
                                    utenteCoin.aquista(variabili.A_chatTestuale)

                                    interaction.guild.channels.cache.get(variabili.catogoriaRicchi).createChannel(`${interaction.member.user.username} Chat`, {
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
                                            }
                                        ]
                                    }).then((chat) => {

                                        var embed = new Discord.MessageEmbed()
                                            .setTitle("Acquistato Con Successo")
                                            .setThumbnail(interaction.member.user.displayAvatarURL())
                                            .setDescription(`Hai Acquistato Una Chat Testuale Al Prezzo Di **${variabili.P_chatTestuale}£**\n
                                                **Chat Tesuale** ${chat}\n`)

                                        interaction.reply({ embeds: [embed], ephemeral: true })

                                        const pro = {
                                            id: interaction.member.user.id,
                                            voc: null,
                                            testuale: chat.id,
                                            ruolo: null
                                        }

                                        user("proprietà").then((proprieta) => {
                                            if (proprieta != null) {
                                                var a = proprieta.findIndex((p) => p.id == interaction.member.user.id)

                                                if (a > -1)
                                                    proprieta[a].testuale = chat.id
                                                else
                                                    proprieta.push(pro)

                                                aggiona(proprieta, "proprietà")
                                            }
                                            else
                                                aggiona(pro, "proprietà")
                                        })

                                        const economyLog = new Discord.MessageEmbed()
                                            .setTitle("ECONOMY LOG")
                                            .setDescription(`${interaction.member} ha acquistato una chat testuale`)
                                            .setColor("GREEN")
                                            .setThumbnail({ url: "https://media.discordapp.net/attachments/962302556929945652/1007719814627864626/Pngtreevector_message_icon_3989732.png?width=668&height=668" })

                                        client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({ embeds: [economyLog] })

                                        /* * * * * * * * * 
                                        * un utente ha comprato una chat tesuale
                                        *
                                        * interaction.member = mebro 
                                        * * * * * * * * * */
                                    })
                                        .catch((err) => {
                                            interaction.reply({ content: "❌ Qualcosa é Andato Storto", ephemeral: true })
                                            console.log(err)
                                            return
                                        })
                                }
                                else {
                                    const embed = new Discord.MessageEmbed()
                                        .setTitle("Acquisto Fallito")
                                        .setDescription("A Quanto Pare Gia Possiedi Una Chat Privata")
                                        .setFooter({ text: "Contatta L'assitenza In Caso Di Problemi" })
                                        .setColor("RED")

                                    interaction.reply({ embeds: [embed], ephemeral: true })
                                }
                            })
                        }
                        else
                            interaction.reply({ content: "❌ Non Hai Soldi A Sufficienza o Possiedi Gia Questo Abbonamento", ephemeral: true })
                    })

                    break;
                case variabili.A_spoiler: //accesso agli spoiler
                    CoinMember(interaction.member.user.id).then((u) => {
                        if (u == null) return interaction.reply({ content: "❌ Qualcosa è Andato Storto Riprovare", ephemeral: true })
                        var i = 0;
                        var ver = true;

                        while (i < u.abbonamenti.length && ver == true) {
                            if (u.abbonamenti[i].id == variabili.A_spoiler)
                                ver = false
                            i++
                        }

                        if (u.soldi >= variabili.P_spoiler && ver == true) {
                            utenteCoin.remove(variabili.P_spoiler)
                            utenteCoin.aquista(variabili.A_spoiler)

                            interaction.guild.channels.cache.get(variabili.C_spoiler).permissionOverwrites.edit(interaction.member.user.id,
                                {
                                    VIEW_CHANNEL: true,
                                    MANAGE_ROLES: false,
                                    CREATE_INSTANT_INVITE: false,
                                    SEND_MESSAGES: false,
                                    READ_MESSAGE_HISTORY: true,
                                    MANAGE_THREADS: false,
                                    MANAGE_CHANNELS: false,
                                    USE_PUBLIC_THREADS: false,
                                    USE_PRIVATE_THREADS: false,
                                    CREATE_PUBLIC_THREADS: false,
                                    CREATE_PRIVATE_THREADS: false,
                                    SEND_MESSAGES_IN_THREADS: false,
                                    MENTION_EVERYONE: false,
                                    MANAGE_WEBHOOKS: false,
                                    ADD_REACTIONS: false,
                                    USE_EXTERNAL_EMOJIS: false,
                                    USE_EXTERNAL_STICKERS: false,
                                    MANAGE_MESSAGES: false,
                                    EMBED_LINKS: false,
                                    ATTACH_FILES: false,
                                    SEND_TTS_MESSAGES: false,
                                    USE_APPLICATION_COMMANDS: false
                                })

                            const embed = new Discord.MessageEmbed()
                                .setTitle("Acquistato Con Successo")
                                .setDescription(`Hai Acquistato L'accesso Agli Spoiler Al Prezzo Di **${variabili.P_spoiler}£**\nConsulta La Chat <#${variabili.C_spoiler}>`)
                                .setThumbnail(interaction.member.user.displayAvatarURL())

                            interaction.reply({ embeds: [embed], ephemeral: true })

                            const economyLog = new Discord.MessageEmbed()
                                .setTitle("ECONOMY LOG")
                                .setDescription(`${interaction.member} ha acquistato l'accesso agli spoiler`)
                                .setColor("GREEN")
                                .setThumbnail({ url: "https://media.discordapp.net/attachments/962302556929945652/1007720746216345670/Annunci-Mostre-Scambio-depoca-icon-300x300.png" })

                            client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({ embeds: [economyLog] })

                            /* * * * * * * * * 
                            * un utente ha comprato l'accesso agli spoiler
                            *
                            * interaction.member = mebro 
                            * * * * * * * * * */
                        }
                        else
                            interaction.reply({ content: "❌ Non Hai Soldi A Sufficienza o Possiedi Gia Questo Abbonamento", ephemeral: true })

                    })
                    break;
                case variabili.A_anteprima: //accesso all'ateprima
                    CoinMember(interaction.member.user.id).then((u) => {
                        if (u == null) return interaction.reply({ content: "❌ Qualcosa è Andato Storto Riprovare", ephemeral: true })
                        var i = 0;
                        var ver = true;

                        while (i < u.abbonamenti.length && ver == true) {
                            if (u.abbonamenti[i].id == variabili.A_anteprima)
                                ver = false
                            i++
                        }

                        if (u.soldi >= variabili.P_anteprima && ver == true) {
                            utenteCoin.remove(variabili.P_anteprima)
                            utenteCoin.aquista(variabili.A_anteprima)

                            interaction.guild.channels.cache.get(variabili.C_anteprima).permissionOverwrites.edit(interaction.member.user.id,
                                {
                                    VIEW_CHANNEL: true,
                                    MANAGE_ROLES: false,
                                    CREATE_INSTANT_INVITE: false,
                                    SEND_MESSAGES: false,
                                    READ_MESSAGE_HISTORY: true,
                                    MANAGE_THREADS: false,
                                    MANAGE_CHANNELS: false,
                                    USE_PUBLIC_THREADS: false,
                                    USE_PRIVATE_THREADS: false,
                                    CREATE_PUBLIC_THREADS: false,
                                    CREATE_PRIVATE_THREADS: false,
                                    SEND_MESSAGES_IN_THREADS: false,
                                    MENTION_EVERYONE: false,
                                    MANAGE_WEBHOOKS: false,
                                    ADD_REACTIONS: false,
                                    USE_EXTERNAL_EMOJIS: false,
                                    USE_EXTERNAL_STICKERS: false,
                                    MANAGE_MESSAGES: false,
                                    EMBED_LINKS: false,
                                    ATTACH_FILES: false,
                                    SEND_TTS_MESSAGES: false,
                                    USE_APPLICATION_COMMANDS: false
                                })

                            const embed = new Discord.MessageEmbed()
                                .setTitle("Acquistato Con Successo")
                                .setDescription(`Hai Acquistato L'accesso Alle Anteprima Delle Patch Al Prezzo Di **${variabili.P_anteprima}£**\nConsulta La Chat <#${variabili.C_anteprima}>`)
                                .setThumbnail(interaction.member.user.displayAvatarURL())

                            interaction.reply({ embeds: [embed], ephemeral: true })

                            const economyLog = new Discord.MessageEmbed()
                                .setTitle("ECONOMY LOG")
                                .setDescription(`${interaction.member} ha comprato l'accesso al'anteprima patch`)
                                .setColor("GREEN")
                                .setThumbnail({ url: "https://media.discordapp.net/attachments/962302556929945652/1007720746216345670/Annunci-Mostre-Scambio-depoca-icon-300x300.png" })

                            client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({ embeds: [economyLog] })

                            /* * * * * * * * * 
                            * un utente ha comprato l'accesso alle anteprime
                            *
                            * interaction.member = mebro 
                            * * * * * * * * * */
                        }
                        else
                            interaction.reply({ content: "❌ Non Hai Soldi A Sufficienza o Possiedi Gia Questo Abbonamento", ephemeral: true })

                    })
                    break;
                case variabili.A_colorePlus: //colori plus  
                    CoinMember(interaction.member.user.id).then((u) => {
                        if (u == null) return interaction.reply({ content: "❌ Qualcosa è Andato Storto Riprovare", ephemeral: true })
                        var i = 0;
                        var ver = true;

                        while (i < u.abbonamenti.length && ver == true) {
                            if (u.abbonamenti[i].id == variabili.A_colorePlus)
                                ver = false
                            i++
                        }

                        if (u.soldi >= variabili.P_colorePlus && ver == true) {
                            utenteCoin.remove(variabili.P_colorePlus)
                            utenteCoin.aquista(variabili.A_colorePlus)

                            const embed = new Discord.MessageEmbed()
                                .setTitle("Acquistato Con Successo")
                                .setDescription(`Hai Acquistato Un Colore Speciale Al Prezzo Di **${variabili.P_colorePlus}£**\n
                                    \n\n**SCEGLI IL COLORE**\n
                                    🤍<@&${variabili.R_origami}>\n
                                    🖤<@&${variabili.R_shinigami}>\n 
                                    💛<@&${variabili.R_buddha}>`)
                                .setThumbnail(interaction.member.user.displayAvatarURL())

                            const origami = new Discord.MessageButton()
                                .setCustomId("CP_origami")
                                .setEmoji("🤍")
                                .setStyle("SECONDARY")

                            const buddha = new Discord.MessageButton()
                                .setCustomId("CP_buddha")
                                .setEmoji("💛")
                                .setStyle("SECONDARY")

                            const shinigami = new Discord.MessageButton()
                                .setCustomId("CP_shinigami")
                                .setEmoji("🖤")
                                .setStyle("SECONDARY")

                            const row = new Discord.MessageActionRow()
                                .addComponents(origami)
                                .addComponents(shinigami)
                                .addComponents(buddha)

                            interaction.reply({ embeds: [embed], components: [row], ephemeral: true })


                            const economyLog = new Discord.MessageEmbed()
                                .setTitle("ECONOMY LOG")
                                .setDescription(`${interaction.member} ha comprato un colore+`)
                                .setColor("GREEN")
                                .setThumbnail({ url: "https://images-ext-1.discordapp.net/external/y-tsG7kt0S6YBFpd8hzMHRFHWkyvoliznGSatTDFCkM/https/images.emojiterra.com/google/android-pie/512px/1f3a8.png" })

                            client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({ embeds: [economyLog] })

                            /* * * * * * * * * 
                            * un utente ha comprato un colore plus
                            *
                            * interaction.member = mebro 
                            * * * * * * * * * */
                        }
                        else
                            interaction.reply({ content: "❌ Non Hai Soldi A Sufficienza o Possiedi Gia Questo Abbonamento", ephemeral: true })

                    })


                    break;
                default:
                    interaction.reply({ content: "❌ Selezionare Un Abbonamento", ephemeral: true })
            }
        }
    } catch (err) {
        try {
            interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })
            interaction.guild.members.fetch("598498238336729088").then(member => {
                
            })
            return
        } catch {
            return
        }
    }
}

module.exports = {abbonamenti}