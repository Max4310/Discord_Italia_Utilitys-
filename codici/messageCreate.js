const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../variabili.json"))
const {membro, gestisciVisulizza, isStaff , CoinMember ,aggiona,user,aggiungi} = require(path.join(__dirname,"../oggetti.js"))

const fs = require("fs")


function menager (message) {
    try{
        if((message.content.toLocaleLowerCase().includes("security") == true ||
        message.content.toLocaleLowerCase().includes("cyber") == true||
        message.content.toLocaleLowerCase().includes("sicurezza") == true||
        message.content.toLocaleLowerCase().includes("privacy") == true||
        message.content.toLocaleLowerCase().includes("vpn") == true||
        message.content.toLocaleLowerCase().includes("internet") == true||
        message.content.toLocaleLowerCase().includes("web") == true||
        message.content.toLocaleLowerCase().includes("proteggi") == true||
        message.content.toLocaleLowerCase().includes("sponsor") == true||
        message.content.toLocaleLowerCase().includes("affiliazione") == true||
        message.content.toLocaleLowerCase().includes("password") == true||
        message.content.toLocaleLowerCase().includes("virus") == true ) && message.channelId == "894195379418058774")
        {
            try{
                if(variabili.vpn == true)
                {
                    variabili.vpn = false
    
                    var data = JSON.stringify(variabili)
                    fs.writeFile(path.join(__dirname,"../variabili.json"), data,function(err, result) {
                        if(err) console.log('error', err);
                    });
    
                    var embed = new Discord.MessageEmbed()
                        .setTitle("NordVPN")
                        .setURL("https://go.nordvpn.net/aff_c?offer_id=615&aff_id=74241&url_id=14831")
                        .setDescription(
                            "**Serve una VPN? Apposto! NordVPN x Discord Italia!**\n\n"+
                            "*<a:manss:976501011302711457> Ogni Mese di NordVPN = 1 Mese di* <@&893851166239252530> *su Discord Italia!*\n"+
                            "*<a:manss:976501011302711457> Badge Esclusivo* <@&1002543691526836224>*!*\n"+
                            "*<a:manss:976501011302711457> Icona del Ruolo Esclusiva!*"
                        )
                        .setImage("https://www.informarea.it/wp-content/uploads/2020/09/recensione-nordVPN.jpg")
                        .setColor("#fdf9f9")
            
                    message.reply({embeds : [embed], ephemeral : true})
                    .then(msg => {
                        setTimeout(() => {
                            variabili.vpn = true
                            var data = JSON.stringify(variabili)
                            fs.writeFile(path.join(__dirname,"../variabili.json"), data,function(err, result) {
                                if(err) console.log('error', err);
                            });
                        },1000*60*30)
                    })
                    .catch((err) => {
                        console.log(err)
                        return
                    })
                }    
            }catch(err){
                console.log(err)
                return
            }
        }
        else if(message.content=="113") //comando polizia
        {
            try{
                message.delete()
                message.channel.send("🚨 La <@&911923177314201640> Sarà Presto Qui! 🚨")
            }
            catch{
                return
            }
        }
        else if(message.content=="888" && message.channelId==variabili.RICCHI) //comano yakuza
        {
            try{
                message.delete()
    
                message.channel.send("💀 **ATTENZIONE!** La <@&970721741615824926> Sarà Presto Qui! 💀")
            }
            catch{
                return
            }
        }
        else if(message.content=="di.verifica" && message.author.id == "598498238336729088")
        {
            var emebed = new Discord.MessageEmbed()
                .setTitle("DISCORD ITALIA")
                .setDescription("───────────────────────────────────────\nClicca Sul Pulsante `🤖 Verifica` Per Entrare In **Discord Italia**\n\n*Richiedi <#893589753222545438> In Caso Di Problemi*")
                .setColor("DARK_BLUE")
            
            var button = new Discord.MessageButton()
                .setLabel("Verifica")
                .setEmoji("🤖")
                .setStyle("SUCCESS")
                .setCustomId("P_verifica")
            
            var riga = new Discord.MessageActionRow()
                .addComponents(button)
            message.channel.send({embeds: [emebed], components: [riga]})
            return
        }
        else if(message.content == "di.recensione" && message.author.id == "598498238336729088" && message.channelId == variabili.recensioni)
        {
            message.delete()
            const embed = new Discord.MessageEmbed()
                .setTitle(`**Crea La Tua Recensione**`)
                .setDescription(`*Clicca Su* \`💯\` *Per Creare Una Nuova Recensione Del Server*`)
                .setColor("#4958cf")
                .setImage("https://cdn.discordapp.com/attachments/656190569433006094/984461840291618836/unknown.png")
                
    
            var Nuova = new Discord.MessageButton()
                .setEmoji("💯")
                .setStyle("PRIMARY")
                .setCustomId("recensione")
                .setLabel("Recencisci")
    
            var recensione = new Discord.MessageActionRow()
                .addComponents(Nuova)
                
    
    
    
            message.channel.send ({ embeds : [embed], components : [recensione]})
        }
        else  if(message.content == "di.panel" && message.author.id == "598498238336729088")
        {
            const EmbedTicketTool = new Discord.MessageEmbed()
            .setTitle("Assistenza di Discord Italia")
            .setColor("#2f3136")
            .setDescription("━━━━━━━━━━━━━━━━━\n\n**Per Ricevere Assistenza ⇨ 📩\n\nPer Segnalare Un Utente ⇨ 🚔\n\nPer Assistenza Acquisti ⇨ 💳**\n\n━━━━━━━━━━━━━━━━━")
    
            const rorow = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setLabel("Assistenza")
                .setEmoji('📩')
                .setCustomId("assistenzanormale")
                .setStyle("DANGER"),
                new Discord.MessageButton()
                .setLabel("Ricorsi")
                .setEmoji('🚔')
                .setCustomId("ricorsi")
                .setStyle("PRIMARY"),
                new Discord.MessageButton()
                .setLabel("Acquisti")
                .setEmoji('💳')
                .setCustomId("acquisti")
                .setStyle("SUCCESS"),
            )
    
            message.delete()
            message.channel.send({embeds: [EmbedTicketTool], components: [rorow]})    
        }
        else if(message.mentions.users.first() && message.channelId == "894195379418058774")
        {
            try{
                if(message.mentions.repliedUser == null)
                {
                    var users = message.guild.members.cache.get(message.mentions.users.first().id)
                    if(users._roles.includes(/*"893851166239252530"*/"981694340009177119") || users._roles.includes("893844096957952017") )
                        message.react("👑")
                }
            }catch{
                return
            }
        }
        else if(variabili.channelsList.includes(message.channel.id) && !message.channel.isThread()){
            try{
                message.react("<:accettato:957650857439141978>")
                message.react("<:rifiutato:957650858181554226>")
                return
            }catch{
                return
            }
            
        }
        else if(message.content == "di.abbonamenti" && message.author.id == "598498238336729088")
        {
            var menu = new Discord.MessageSelectMenu()
                .setCustomId("abbonamentiMenu")
                .setMaxValues(1)
                .setMinValues(0)
                .setPlaceholder("Clicca Qui Per Aquistare Un Abbonamento")
                .setOptions([
                    {
                        label : "Gold",
                        description : "Acquista Un Gold Al Prezzo Di 25.000 £/m",
                        value : variabili.A_gold,
                        emoji : "🥇"
                    },
                    {
                        label : "Vip",
                        description : "Acquista Un Vip Al Prezzo Di 12.500 £/m",
                        value : variabili.A_vip,
                        emoji : "💎"
                    },
                    {
                        label : "Custom Role",
                        description : "Acquista Un Custom Role Al Prezzo Di 62.500 £/m",
                        value : variabili.A_customRole,
                        emoji : "🧸"
                    },
                    {
                        label : "Private Call",
                        description : "Acquista Le Private Call Al Prezzo Di 5.000 £/m",
                        value : variabili.A_private_call,
                        emoji : "📞"
                    },
                    {
                        label : "Colore Base",
                        description : "Acquista Un Colore Base Al Prezzo Di 4.000 £/m",
                        value : variabili.A_colore,
                        emoji : "🎨"
                    },
                    {
                        label : "Casa",
                        description : "Acquista Una Casa Al Prezzo Di 10.000 £/m",
                        value : variabili.A_casa,
                        emoji : "🏠",
                    },
                    {
                        label : "Chat Testuale",
                        description : "Acquista Un Chat Testuale Al Prezzo Di 12.000 £/m",
                        value : variabili.A_chatTestuale,
                        emoji : "📄"    
                    },
                    {
                        label : "Spoiler",
                        description : "Acquista L'accesso Agli Spoiler Delle Prossime Patch Al Prezzo Di 2.000 £/m",
                        value : variabili.A_spoiler,
                        emoji : "📢"
                    },
                    {
                        label : "Anteprima Patch",
                        description : "Acquesta L'anteprima Delle Patch Al Prezzo Di 1.500 £/m",
                        value : variabili.A_anteprima,
                        emoji : "💃"
                    },
                    {
                        label : "Colore Plus",
                        description : "Acquista Un Colore Plus Al Prezzo Di 6.000 £/m",
                        value : variabili.A_colorePlus,
                        emoji : "🪙"
                    },
                    {
                        label : "Canzone Dedicata",
                        description : "Acquista Una Canzone Esclusiva Al Prezzo Di 45.000 £",
                        value : variabili.A_canzone,
                        emoji : "🎤"
                    },
                    {
                        label : "Foto Geko Kizzi",
                        description : "Acquista Un Foto Del Geko Di Kizzi Al Prezzo Di 5.000 £",
                        value : variabili.A_geko,
                        emoji : "🦎"
                    }

                ])
            
            var embed = new Discord.MessageEmbed()
                .setTitle("Discord Italia Abbonamenti")
                .setDescription(
                    "**Gli Abbonamenti Sono Venduti Con Scadenze Mensili.\n Ogni Mese Verranno Rinnovati In Automatico**\n"+
                    "*(Ad Eccezione Di Alcune Piccole Chicce)*"
                )
                .setFields(
                    {
                        name : "**Abbonamento**",
                        inline : true,
                        value : 
                        "🥇 **Gold**\n"+
                        "💎 **Vip**\n"+
                        "🧸 **Custom Role** \n"+
                        "📞 **Private Call** \n"+
                        "🎨 **Colore Base**\n"+
                        "🏠 **Casa**\n"+
                        "📄 **Testuale**\n"+
                        "📢 **Accesso Agli Spoiler**\n"+
                        "💃 **Anteprima Patch**\n"+
                        "🪙 **Colore Plus**\n"+
                        "🎤 **Canzone Dedicata Da Max e Doffy**\n"+
                        "🦎 **Foto Del Geko Di Kizzi**"
                    },
                    {
                        name : "**Prezzo**",
                        inline : true,
                        value : 
                        "**25.000** *£ Al Mese* 🥇\n"+ 
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

            message.channel.send({embeds : [embed], components : [row]})
        }
        else if(message.type == "USER_PREMIUM_GUILD_SUBSCRIPTION")
        {
            user("boost").then((boosters) => {
                if(boosters != null)
                {
                    var x = boosters.findIndex(boost => boost.id == message.author.id)

                    if(x >- 1)
                    {
                        boosters[x].boost = boosters[x].boost + 1

                        if(boosters[x].boost >= 2)
                        {
                            message.member.roles.add(message.guild.roles.cache.get(variabili.vip))

                            CoinMember(message.author.id).then(member => {
                                var x = member.abbonamenti.findIndex(abbonamento => abbonamento.id == variabili.A_vip)

                                if(x > -1)
                                {
                                    var m = new membro(message.author.id)
                                    m.annulla(variabili.A_vip)
                                }
                            })
                            .catch((err) => {
                                console.log(err) 
                                return
                            })
                        }
                    }
                    else
                        boosters.push({
                            id : message.author.id,
                            boost : 1
                        })
                    
                    
                    aggiona(boosters, "boost")
                }   
                else
                {
                    var boost = {
                        id : message.author.id,
                        boost : 1
                    }

                    aggiona(boost, "boost")
                }
            })
            .catch((err) => {
                console.log(err) 
                return
            })
        }
        else if(message.content.split(",")[0] == "UTILITYRAN" && message.channelId == variabili.utilyXtebex && message.author.bot == true )
        {        
            if(message.content.split(",")[1] == "gold")
            {
                CoinMember(message.content.split(",")[2]).then(member => {
                    var x = member.abbonamenti.findIndex(abbonamento => abbonamento.id == variabili.A_gold)
                    
                    if(x > -1)
                    {
                        var m = new membro(message.content.split(",")[2])
                        m.annulla(variabili.A_gold)

                        user("proprietà").then(usersPropetis => {

                            var a = usersPropetis.findIndex((p) => p.id == message.member.user.id)

                            var embed = new Discord.MessageEmbed()
                                .setTitle("Acquistato Con Successo")
                                .setDescription(`Hai Acquistato Un Abbonamento Gold\n
                                **Chat Tesuale** <#${usersPropetis[a].testuale}>\n
                                **Chat Vocale** <#${usersPropetis[a].voc}>`)

                            message.guild.channels.cache.get(usersPropetis[a].testuale).send({content: `<@${message.content.split(",")[2]}>`, embeds : [embed]})
                        })
                        .catch((err) => {
                            console.log(err) 
                            return
                        })

                    }
                    else
                    {
                        user("proprietà").then(usersPropetis => {
                            var voc = false
                            var test = false
                            if(usersPropetis != null)
                            {
                                var a = usersPropetis.findIndex((p) => p.id == message.member.user.id)
        
                                if(a > -1)
                                {
                                    if(usersPropetis[a].voc != null)
                                        voc = true 
        
                                    if(usersPropetis[a].testuale != null)
                                        test = true
                                }
                            }
                            
                            if(test == false && voc == false)
                            {
                                message.guild.channels.cache.get(variabili.catogoriaRicchi).createChannel(`${message.member.user.username} House`,{
                                    type: "GUILD_VOICE",
        
                                    permissionOverwrites : [
                                        {
                                            id: message.guild.roles.everyone,
                                            deny: ['VIEW_CHANNEL'],
                                        },
                                        {
                                            id : message.content.split(",")[2],
                                            allow : ["VIEW_CHANNEL", "CONNECT", "MANAGE_ROLES" , "CREATE_INSTANT_INVITE" , "MUTE_MEMBERS", "MOVE_MEMBERS", "SPEAK","PRIORITY_SPEAKER","STREAM","DEAFEN_MEMBERS"]
                                        }
                                    ]
                                }).then((casa) => {
                                    message.guild.channels.cache.get(variabili.catogoriaRicchi).createChannel(`${message.member.user.username} Chat`,{
                                        type: "GUILD_TEXT",
        
                                        permissionOverwrites : [
                                            {
                                                id: message.guild.roles.everyone,
                                                deny: ['VIEW_CHANNEL'],
                                            },
                                            {
                                                id : message.content.split(",")[2],
                                                allow : ["VIEW_CHANNEL","SEND_MESSAGES","READ_MESSAGE_HISTORY"],
                                                deny : ["MANAGE_ROLES"]
                                            }
                                        ]
                                    }).then((chat) => {
                                        var embed = new Discord.MessageEmbed()
                                            .setTitle("Acquistato Con Successo")
                                            .setDescription(`Hai Acquistato Un Abbonamento Gold\n
                                            **Chat Tesuale** ${chat}\n
                                            **Chat Vocale** ${casa}`)
        
                                        chat.send({content: `<@${message.content.split(",")[2]}>`, embeds : [embed]})
        
                                        const pro = {
                                            id : message.content.split(",")[2],
                                            voc : casa.id,
                                            testuale : chat.id,
                                            ruolo : null
                                        }
        
                                        user("proprietà").then((proprieta) => {
                                            if(proprieta != null)
                                            {
                                                var a = proprieta.findIndex((p) => p.id == message.content.split(",")[2])
        
                                                if(a > -1)
                                                {
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
        
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                        return
                                    })
                                })
                                .catch((err) => {
                                    console.log(err)
                                    return
                                })
                            }
                            else if(test == false && voc == true)
                            {
                                message.guild.channels.cache.get(variabili.catogoriaRicchi).createChannel(`${message.member.user.username} Chat`,{
                                    type: "GUILD_TEXT",

                                    permissionOverwrites : [
                                        {
                                            id: message.guild.roles.everyone,
                                            deny: ['VIEW_CHANNEL'],
                                        },
                                        {
                                            id : message.content.split(",")[2],
                                            allow : ["VIEW_CHANNEL","SEND_MESSAGES","READ_MESSAGE_HISTORY"],
                                            deny : ["MANAGE_ROLES"]
                                        }
                                    ]
                                }).then((chat) => {
                                    var embed = new Discord.MessageEmbed()
                                        .setTitle("Acquistato Con Successo")
                                        .setDescription(`Hai Acquistato Un Abbonamento Gold\n
                                        **Chat Tesuale** ${chat}\n
                                        **Chat Vocale** <#${usersPropetis[a].voc}>`)

                                    chat.send({content: `<@${message.content.split(",")[2]}>`, embeds : [embed]})
                                    
                                    
                                    proprieta[a].testuale = chat.id
                                    aggiona(proprieta, "proprietà")
                                })
                                .catch((err) => {
                                    console.log(err)
                                    return
                                })
                            }
                            else if(voc == false && test == true)
                            {
                                message.guild.channels.cache.get(variabili.catogoriaRicchi).createChannel(`${message.member.user.username} House`,{
                                    type: "GUILD_VOICE",
        
                                    permissionOverwrites : [
                                        {
                                            id: message.guild.roles.everyone,
                                            deny: ['VIEW_CHANNEL'],
                                        },
                                        {
                                            id : message.content.split(",")[2],
                                            allow : ["VIEW_CHANNEL", "CONNECT", "MANAGE_ROLES" , "CREATE_INSTANT_INVITE" , "MUTE_MEMBERS", "MOVE_MEMBERS", "SPEAK","PRIORITY_SPEAKER","STREAM","DEAFEN_MEMBERS"]
                                        }
                                    ]
                                }).then((casa) => {
                                    var embed = new Discord.MessageEmbed()
                                        .setTitle("Acquistato Con Successo")
                                        .setDescription(`Hai Acquistato Un Abbonamento Gold\n
                                        **Chat Tesuale** <#${usersPropetis[a].testuale}>\n
                                        **Chat Vocale** ${casa}`)
        
                                    message.guild.channels.cache.get(usersPropetis[a].testuale).send.send({content: `<@${message.content.split(",")[2]}>`, embeds : [embed]})
                                })
                                .catch((err) => {
                                    console.log(err)
                                    return 
                                })
                            }
                            else
                            {
                                var embed = new Discord.MessageEmbed()
                                    .setTitle("Acquistato Con Successo")
                                    .setDescription(`Hai Acquistato Un Abbonamento Gold\n
                                    **Chat Tesuale** <#${usersPropetis[a].testuale}>\n
                                    **Chat Vocale** <#${usersPropetis[a].voc}>`)

                                message.guild.channels.cache.get(usersPropetis[a].testuale).send({content: `<@${message.content.split(",")[2]}>`, embeds : [embed]})
                            }

                        })
                    }
                    

                    
                })
                .catch((err) => {
                    console.log(err) 
                    return
                })
            }
            else if(message.content.split(",")[1] == "customRole")
            {
                message.guild.roles.create({
                    name : "Attesa Custom",
                    color : "ORANGE"
                }).then(role => {
                    message.guild.members.cache.get(message.content.split(",")[2]).roles.add(role)
                    var membrox = message.guild.members.cache.get(message.content.split(",")[2])

                    //gestisco il database
                    CoinMember(message.content.split(",")[2]).then((member) => {
                        user("proprietà").then(usersPropetis => {  
                            var x = member.abbonamenti.findIndex(abbonamento => abbonamento.id == variabili.customRole)
                            var y = usersPropetis.findIndex(user => user.id == message.content.split(",")[2])
                            if(member != null)
                            {
                                if(x > -1)
                                {
                                    var m = new membro(message.content.split(",")[2])
                                    m.annulla(variabili.customRole)

                                    //gli levo il vecchio custom role
                                    message.guild.members.cache.get(message.content.split(",")[2]).roles.remove(message.guild.roles.cache.get(usersPropetis[y].ruolo))
                                }

                                var data = new Date;
                                var data2 = new Date;
                                var temp = 1000*60*60*24*30
                                
                                data2.setTime(data.getTime() + temp)

                                var r = {
                                    id : message.content.split(",")[2],
                                    voc : null,
                                    testuale : null,
                                    ruolo : {
                                        roleId : role.id,
                                        fine : {
                                            giorno : data2.getDate(),
                                            mese : data2.getMonth()+1,
                                            anno : data2.getFullYear() 
                                        }
                                    }
                                }

                                if(y > -1)
                                {
                                    usersPropetis[y].ruolo = 
                                    {
                                        roleId : role.id,
                                        fine : {
                                            giorno : data2.getDate(),
                                            mese : data2.getMonth()+1,
                                            anno : data2.getFullYear() 
                                        }
                                    }
                                }
                                else
                                    usersPropetis.push(r)
                                
                                

                            }
                            else
                            {
                                var data = new Date;
                                var data2 = new Date;
                                var temp = 1000*60*60*24*30
                                
                                data2.setTime(data.getTime() + temp)

                                var r = {
                                    id : message.content.split(",")[2],
                                    voc : null,
                                    testuale : null,
                                    ruolo : {
                                        roleId : role.id,
                                        fine : {
                                            giorno : data2.getDate(),
                                            mese : data2.getMonth()+1,
                                            anno : data2.getFullYear() 
                                        }
                                    }
                                }

                                if(y > -1)
                                {
                                    usersPropetis[y].ruolo = 
                                    {
                                        roleId : role.id,
                                        fine : {
                                            giorno : data2.getDate(),
                                            mese : data2.getMonth()+1,
                                            anno : data2.getFullYear() 
                                        }
                                    }
                                }
                                else
                                    usersPropetis.push(r) 
                            }

                            aggiona(usersPropetis, "proprietà")
                        })
                    }).catch(err => {
                        console.log(err)
                        return
                    })

                    //creo il ticket per riscattare il ruolo
                    membrox.guild.channels.cache.get(variabili.assistenzaEconomo).createChannel(`${membrox.user.username} Ticket`,{
                        type : "GUILD_TEXT",
        
                        permissionOverwrites : [
                            {
                                id: membrox.guild.roles.everyone,
                                deny: ['VIEW_CHANNEL'],
                            },
                            {
                                id : membrox.user.id,
                                allow : ["VIEW_CHANNEL","SEND_MESSAGES","READ_MESSAGE_HISTORY"],
                                deny : ["MANAGE_ROLES"]
                            },
                            {
                                id : variabili.Yakuza,
                                allow : ["VIEW_CHANNEL","SEND_MESSAGES","READ_MESSAGE_HISTORY"],
                                deny : ["MANAGE_ROLES"]
                            }
                        ]
                    }).then(channel =>{
                        channel.send(`<@&892868492267765840>, <@&${variabili.Yakuza}> , ${membrox}`).then(msg => msg.delete())
        
                        const embed = new Discord.MessageEmbed()
                            .setTitle("Assistenza Custom Role")
                            .setDescription(`${membrox} Ha Acquistato Un Custom Role E Ora Lo Deve Personalizzare`)
                            .setColor("GREEN")
        
                        const chiudi = new Discord.MessageButton()
                            .setCustomId("CR_close")
                            .setEmoji("🔒")
                            .setStyle("DANGER")
                            .setLabel("Chiudi Il Ticket")
        
                        const row = new Discord.MessageActionRow()
                            .addComponents(chiudi)
        
                        channel.send({embeds : [embed], components : [row]})
                    }).catch(err => {
                        console.log(err)
                        return
                    })

                }).catch(err => {
                    console.log(err)
                    return
                })

            }
        }
        else if(message.content == "di.test" && message.author.id == "598498238336729088")
        {
            try{
                message.delete()
                message.channel.send("Sono on")
            }
            catch{
                return
            }
        }
        else if(message.channel.id == variabili.chatbot)
        {
            try{
                if(message.content.split(":")[0] == "UtilityRAN" && message.author.bot == true)
                {
                    const chatId = message.content.split(":")[1]
    
                    message.delete()
                    if(chatId != variabili.chatbot)
                    {
                        const chat = message.guild.channels.cache.get(chatId) 
    
                        const member =  message.guild.members.cache.get(message.author.id)
        
        
                        chat.permissionOverwrites.create(member,{
                            VIEW_CHANNEL: true,
                            SEND_MESSAGES: true,
                        })
        
        
                        setTimeout((chat, member) => {
                            chat.permissionOverwrites.create(member,{ 
                                VIEW_CHANNEL: false,
                                SEND_MESSAGES: false,
                            })
                        }, 1000*30, chat, member);
                    }
                }
            }catch{
                return
            }
            
        }
    }catch(err){
        console.log(err)
        return
    }    
}

/*
else if(message.content == "118")
{
    try{
    
        message.delete()
        message.channel.send("⚕️ I <@&993151916701929583> saranno presto qui' 『 🚑 🏥 』")
    }catch{
        return
    }
}*/

module.exports = {menager}