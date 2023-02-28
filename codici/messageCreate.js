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
    
                    /*var embed = new Discord.MessageEmbed()
                        .setTitle("NordVPN")
                        .setURL("https://go.nordvpn.net/aff_c?offer_id=615&aff_id=74241&url_id=14831")
                        .setDescription(
                            "**Serve una VPN? Apposto! NordVPN x Discord Italia!**\n\n"+
                            "*<a:manss:976501011302711457> Ogni Mese di NordVPN = 1 Mese di* <@&893851166239252530> *su Discord Italia!*\n"+
                            "*<a:manss:976501011302711457> Badge Esclusivo* <@&1002543691526836224>*!*\n"+
                            "*<a:manss:976501011302711457> Icona del Ruolo Esclusiva!*"
                        )
                        .setImage("https://www.informarea.it/wp-content/uploads/2020/09/recensione-nordVPN.jpg")
                        .setColor("#fdf9f9")*/
                    var embed = new Discord.MessageEmbed()
                        .setTitle("NordVPN")
                        .setURL("https://go.nordvpn.net/aff_c?offer_id=615&aff_id=74241&url_id=14831")
                        .setDescription(
                            "⇒ Ogni Mese di NordVPN = 1 Mese Di <@&893851166239252530> su Discord Italia!\n"+
                            "⇒ Badge Esclusivo <@&1002543691526836224>\n"+
                            "⇒ Icona del ruolo esclusiva!\n"+
                            "⇒ Colore Custom a vita!! disponibile tra i seguenti piani a pagamento <#902903643026636860>"
                        )
                        .setImage("https://www.html.it/app/uploads/2022/06/nordvpn_cover-1060x424.jpg")
                        .setColor(/*"#0E14CD"*/ "090FAB")
            
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
                if(variabili.ping){
                    variabili.ping = false
                    message.delete()
                    message.channel.send("🚨 La <@&911923177314201640> Sarà Presto Qui! 🚨").then(()=>{
                        setTimeout(() => {
                            variabili.ping = true
                            var data = JSON.stringify(variabili)
                            fs.writeFile(path.join(__dirname,"../variabili.json"), data,function(err, result) {
                                if(err) console.log('error', err);
                            });
                        },1000*60)
                    })
                }
                else{
                    message.channel.send("Non Taggare Cosi Spesso Lo Staff").then((msg)=>{
                        setTimeout(() => {
                            msg.delete()
                        },1000*30)
                    })
                }
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
        else if(message.content == "115"){
            try{
                if(variabili.ping){
                    variabili.ping = false
                    message.delete()

                    message.channel.send("<:helper:1026057751299899432> Presto Un <@&902956109915099176> Sarà Qui Per Aiutarti <:helper:1026057751299899432>").then(()=>{
                        setTimeout(() => {
                            variabili.ping = true
                            var data = JSON.stringify(variabili)
                            fs.writeFile(path.join(__dirname,"../variabili.json"), data,function(err, result) {
                                if(err) console.log('error', err);
                            });
                        },1000*60)
                    })
                }
                else{
                    message.channel.send("Non Taggare Cosi Spesso Lo Staff").then((msg)=>{
                        setTimeout(() => {
                            msg.delete()
                        },1000*30)
                    })
                }
            }
            catch{
                return
            }
        }
        else if(message.content == "112"){
            try{
                message.delete()

                message.channel.send("<@598498238336729088>, <@655816872091975770> Saranno Presto Qui")
            }catch{
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
            .setDescription("━━━━━━━━━━━━━━━━━\n\n" +
            "**Per Ricevere Assistenza ⇨ 📩\n\n"+
            "Per Segnalare Un Utente ⇨ 🚔\n\n"+
            "Per Assistenza Acquisti ⇨ 💳**\n\n" +
            "**Per Diventare Un Affiliato ⇨ 📸** " 
            +"\n\n━━━━━━━━━━━━━━━━━")
    
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
                new Discord.MessageButton()
                .setStyle("SECONDARY")
                .setEmoji("📸")
                .setLabel("Affiliazioni")
                .setCustomId("ticket:affiliazioni")
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
                    if(message.mentions.users.first().id == "445262123598086147"){
                        message.react("🪐")
                    }
                    else if(users._roles.includes("893851166239252530"/*"981694340009177119"*/)){
                        message.react("👑")
                    }
                    else if(users._roles.includes("893844096957952017")){
                        message.react("💎")
                    }
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
        else if(message.content == "di.profilo" && message.author.id == "598498238336729088")
        {
            message.delete()
            const genere = new Discord.MessageEmbed()
                .setTitle("Qual'è Il Tuo Genere?")
                .setDescription(
                    ":male_sign:▸ Genere Maschile\n\n"+
                    ":female_sign:▸ Genere Femminile\n\n"+
                    "<:nobinary:1003022326276829214>▸ Genere Non Binario\n\n"+
                    ":transgender_symbol:▸ Genere Transgender\n\n"+
                    ":rainbow:▸ Altro"
                )
                .setColor("#2f3136")
    
            const genereMenu = new Discord.MessageSelectMenu()
                .setCustomId("profilo:genere")
                .setMaxValues(1)
                .setMinValues(0)
                .setPlaceholder("Qual'è Il Tuo Genere?")
                .setOptions([
                    {
                        label : "Genere Maschile",
                        emoji : "♂️",
                        value : "896061685880729681"
                    },
                    {
                        label : "Genere Femminile",
                        emoji : "♀️",
                        value : "896062246491394068"
                    },
                    {
                        label : "Genere Non Binario",
                        emoji : "::nobinary:1003022326276829214",
                        value : "896062660708294686"
                    },
                    {
                        label : "Genere Transgender",
                        emoji : "⚧",
                        value : "896062507750404156"
                    },
                    {
                        label : "Altro",
                        emoji : "🌈",
                        value : "896063618452447293"
                    }
                ])
            
            const genereRow = new Discord.MessageActionRow()
                .addComponents(genereMenu)
                
            
            const pronomi = new Discord.MessageEmbed()
                .setTitle("Quali Sono I Tuoi Pronomi?")
                .setDescription(
                    ":blue_circle:▸ He/Him\n\n"   +
                    ":purple_circle:▸ She/Her\n\n"+   
                    ":white_circle:▸ They/Them\n\n"+   
                    ":green_circle:▸ Xe/Xem\n\n"  +
                    ":brown_circle:▸ Qualsiasi Pronome\n\n"+  
                    ":yellow_circle:▸ Chiedere i Pronomi"
                )
                .setColor("#2f3136")
            
            const pronomiMenu = new Discord.MessageSelectMenu()
                .setCustomId("profilo:pronomi")
                .setMaxValues(1)
                .setMinValues(0)
                .setPlaceholder("Quali Sono I Tuoi Pronomi?")
                .setOptions([
                    {
                        label : "He/Him",
                        emoji : "🔵",
                        value : "896067712164454451"
                    },
                    {
                        label : "She/Her",
                        emoji : "🟣",
                        value : "896064079779729409"
                    },
                    {
                        label : "They/Them",
                        emoji : "⚪",
                        value : "896067889730301982"
                    },
                    {
                        label : "Xe/Xem",
                        emoji : "🟢",
                        value : "896068244799115335"
                    },
                    {
                        label : "Qualsiasi Pronome",
                        emoji : "🟤",
                        value : "896068455659343952"
                    },
                    {
                        label : "Chiedere i Pronomi",
                        emoji : "🟡",
                        value : "896068523011489802"
                    },
                ])
    
            const pronomiRow = new Discord.MessageActionRow()
                .addComponents(pronomiMenu)
            
            const segno = new Discord.MessageEmbed()
                .setTitle("Qual'è Il Tuo Segno Zodiacale?")
                .setDescription(
                ":aries:▸ Ariete\n\n"+
                ":taurus:▸ Toro\n\n"+
                ":gemini:▸ Gemelli\n\n"+
                ":cancer:▸ Cancro\n\n"+
                ":leo:▸ Leone\n\n"+
                ":virgo:▸ Vergine\n\n"+
                ":libra:▸ Bilancia\n\n"+
                ":scorpius:▸ Scorpione\n\n"+
                ":sagittarius:▸ Sagittario\n\n"+
                ":capricorn:▸ Capricorno\n\n"+
                ":aquarius:▸ Aquario\n\n"+
                ":pisces:▸ Pesci"
            )
            .setColor("#2f3136")
    
            const segnoMenu = new Discord.MessageSelectMenu()
                .setCustomId("profilo:segno")
                .setMaxValues(1)
                .setMinValues(0)
                .setPlaceholder("Qual è Il Tuo Segno Zodiacale?")
                .setOptions([
                    {
                        label : "Ariete",
                        emoji : "♈",
                        value : "896069334781267989"
                    },
                    {
                        label : "Toro",
                        emoji : "♉",
                        value : "896069435394236416"
                    },
                    {
                        label : "Gemelli",
                        emoji : "♊",
                        value : "896069439148134420"
                    },
                    {
                        label : "Cancro",
                        emoji : "♋",
                        value : "896069441555689502"
                    },
                    {
                        label : "Leone",
                        emoji : "♌",
                        value : "896069442218393651"
                    },
                    {
                        label : "Vergine",
                        emoji : "♍",
                        value : "896069443212419092"
                    },
                    {
                        label : "Bilancia",
                        emoji : "♎",
                        value : "896069443753488434"
                    },
                    {
                        label : "Scorpione",
                        emoji : "♏",
                        value : "896069444416208937"
                    },
                    {
                        label : "Sagittario",
                        emoji : "♐",
                        value : "896069444768522261"
                    },
                    {
                        label : "Capricorno",
                        emoji : "♑",
                        value : "896069445523501086"
                    },
                    {
                        label : "Aquario",
                        emoji : "♒",
                        value : "896069446886629418"
                    },
                    {
                        label : "Pesci",
                        emoji : "♓",
                        value : "896069447377358848"
                    },
                ])
            
            const segnoRow = new Discord.MessageActionRow()
                .addComponents(segnoMenu)
            
            const social = new Discord.MessageEmbed()
                .setTitle("Quali Sono I Social Che Utilizzi Frequentemente?")
                .setDescription(
                    "<:discord:1003034808311623680>▸ Discord\n\n"+
                    "<:facebook:1003034809515397311>▸ Facebook\n\n"+
                    "<:insta:1003034810698170379>▸ Instagram\n\n"+
                    "<:reddit:1003027413061599332>▸ Reddit\n\n"+
                    "<:snaprtchat:1003027414319890502>▸ Snapchat\n\n"+
                    "<:tiktok:1003027415691436112>▸ Tiktok\n\n"+
                    "<:twitter:1003034811927117895>▸ Twitter\n\n"+
                    "🌟▸ Influencer"
                )
                .setColor("#2f3136")
    
            const socialMenu = new Discord.MessageSelectMenu()
                .setCustomId("profilo:social")
                .setMaxValues(8)
                .setMinValues(0)
                .setPlaceholder("Quali Sono I Social Che Utilizzi Frequentemente?")
                .setOptions([
                    /*
                        "<:discord:1003034808311623680>▸ Discord\n"+
                        "<:facebook:1003034809515397311>▸ Facebook\n"+
                        "<:insta:1003034810698170379>▸ Instagram\n"+
                        "<:reddit:1003027413061599332>▸ Reddit\n"+
                        "<:snaprtchat:1003027414319890502>▸ Snapchat\n"+
                        "<:tiktok:1003027415691436112>▸ Tiktok\n"+
                        "<:twitter:1003034811927117895>▸ Twitter"
                    */ 
                    {
                        label : "Discord",
                        emoji : "<:discord:1003034808311623680>",
                        value : "897375656470519829"
                    },
                    {
                        label : "Facebook",
                        emoji : "<:facebook:1003034809515397311>",
                        value : "897375649340207105"
                    },
                    {
                        label : "Instagram",
                        emoji : "<:insta:1003034810698170379>",
                        value : "897375543446614067"
                    },
                    {
                        label : "Reddit",
                        emoji : "<:reddit:1003027413061599332>",
                        value : "897375658659938346"
                    },
                    {
                        label : "Snapchat",
                        emoji : "<:snaprtchat:1003027414319890502>",
                        value : "897375653425467472"
                    },
                    {
                        label : "Tiktok",
                        emoji : "<:tiktok:1003027415691436112>",
                        value : "897375651865194556"
                    },
                    {
                        label : "Twitter",
                        emoji : "<:twitter:1003034811927117895>",
                        value : "897375655245774848"
                    },
                    {
                        label : "Influencer",
                        emoji : "🌟",
                        value : "1065312324535210024"
                    },
                ])
            const socialRow = new Discord.MessageActionRow()
                .addComponents(socialMenu)  
    
    
            const luogo = new Discord.MessageEmbed()
                .setTitle("Da Dove Vieni?")
                .setDescription(
                    "🔺▸ Nord Italia\n\n"+
                    "🟥▸ Centro Italia\n\n"+
                    "🔻▸ Sud Italia\n\n"+
                    "🌍▸ Altro"
                )
                .setColor("#2f3136")
    
            const luogoMenu = new Discord.MessageSelectMenu()
                .setCustomId("profilo:luogo")
                .setMaxValues(1)
                .setMinValues(0)
                .setPlaceholder("Da Dove Vieni?")
                .setOptions([
                    {
                        label : "Nord Italia",
                        emoji : "🔺",
                        value : "902922148006473758"
                    },
                    {
                        label : "Centro Italia",
                        emoji : "🟥",
                        value : "902922176066371614"
                    },
                    {
                        label : "Sud Italia",
                        emoji : "🔻",
                        value : "902922530795429999"
                    },
                    {
                        label : "Utente Straniero",
                        emoji : "🌍",
                        value : "902922905917218848"
                    }
                ])
            
            const luogoRow = new Discord.MessageActionRow()
                .addComponents(luogoMenu)  
    
            
    
            const sentimenti = new Discord.MessageEmbed()
                .setTitle("Qual è La Tua Situazione Sentimentale?")
                .setDescription(    
                    "💔▸ Single\n\n"+
                    "♥️▸ Occupato/a\n\n"+
                    "💘▸ Innamorato/a"
                )
                .setColor("#2f3136")
    
            const sentimentiMenu = new Discord.MessageSelectMenu()
                .setCustomId("profilo:sentimenti")
                .setMaxValues(1)
                .setMinValues(0)
                .setPlaceholder("Qual è La Tua Situazione Sentimentale?")
                .setOptions([
                    {
                        label : "Single",
                        emoji : "💔",
                        value : "955517944144752700"
                    },
                    {
                        label  : "Occupato/a",
                        emoji : "♥️",
                        value : "955517995537551412"
                    },
                    {
                        label  : "Innamorato/a",
                        emoji : "💘",
                        value : "955518000247754792"
                    }
                ])
    
            const sentimentiRow = new Discord.MessageActionRow()
                .addComponents(sentimentiMenu) 
    
            const notifiche = new Discord.MessageEmbed()
                .setTitle("Quali Notifiche Vuoi Attivare?")
                .setDescription(
                    "<:games:1003029580300423198>▸ Free games\n\n"+
                    "🧾▸ Text\n\n"+
                    "🔊▸ Vocal\n\n"+
                    "🥳▸ Eventi\n\n"+
                    "🪐▸ Update\n\n" +
                    //"<:MMINECRAFT:1003029581466456208>▸ Minecraft\n\n" +
                    //"🧠▸ Scacchi\n\n"+
                    "📰▸ Giornale\n\n"+
                    "⚔️▸ World Map\n\n"+
                    "📺▸ Promozioni\n\n"+
                    "📢▸ Gazzetta\n\n"+
                    "🔘▸ Criptovalute\n\n"+
                    "📕▸ Biblioteca"
                )
                .setColor("#2f3136")
            
    
            const notificheMenu = new Discord.MessageSelectMenu()
                .setCustomId("profilo:notifiche")
                .setMaxValues(10)
                .setMinValues(0)
                .setPlaceholder("Quali Notifiche Vuoi Attivare?")
                .setOptions([
                    {
                        label : "Free games",
                        emoji :"<:games:1003029580300423198>",
                        value : "898331041893343282"
                    },
                    {
                        label : "Text",
                        emoji :"🧾",
                        value : "944596815708307486"
                    },
                    {
                        label : "Vocal",
                        emoji :"🔊",
                        value : "944595871717265438"
                    },
                    {
                        label : "Eventi",
                        emoji :"🥳",
                        value : "904306184268419102"
                    },
                    {
                        label : "Update",
                        emoji :"🪐",
                        value : "916634967130378270"
                    },
                    /*{
                        label : "Minecraft",
                        emoji :"<:MMINECRAFT:1003029581466456208>",
                        value : "901367919458533376"
                    },*/
                    /*{
                        label : "Scacchi",
                        emoji :"🧠",
                        value : "902282134390198274"
                    },*/
                    {
                        label : "Giornale",
                        emoji :"📰",
                        value : "955518863573930094"
                    },
                    {
                        label : "World Map",
                        emoji :"⚔️",
                        value : "955518884310564994"
                    },
                    {
                        label : "Promozioni",
                        emoji :"📺",
                        value : "1002555397296627782"
                    },
                    {
                        label : "Gazzetta",
                        emoji : "📢",
                        value : "1028651951740682272"
                    },
                    {
                        label : "Criptovalute",
                        emoji : "🔘",
                        value : "1062070651487256608"
                    },
                    {
                        label : "Biblioteca",
                        emoji : "📕",
                        value : "1080134856568209498"
                    }
                ])
    
            const notificheRow = new Discord.MessageActionRow()
                .addComponents(notificheMenu) 
    
            const spazio = new Discord.MessageEmbed()
                .setTitle("ELIMINAMI")
    
            message.channel.send({embeds : [genere], components : [genereRow]})
            message.channel.send({embeds : [spazio]})
            message.channel.send({embeds : [pronomi] , components : [pronomiRow]})
            message.channel.send({embeds : [spazio]})
            message.channel.send({embeds : [segno], components : [segnoRow]})
            message.channel.send({embeds : [spazio]})
            message.channel.send({embeds : [social], components : [socialRow]})
            message.channel.send({embeds : [spazio]})
            message.channel.send({embeds : [luogo], components : [luogoRow]})
            message.channel.send({embeds : [spazio]})
            message.channel.send({embeds : [sentimenti], components : [sentimentiRow]})
            message.channel.send({embeds : [spazio]})
            message.channel.send({embeds : [notifiche], components : [notificheRow]})
        }
        else if(variabili.chatCuoricino.includes(message.channel.id) && !message.channel.isThread()){
            message.react("❤️");

            if(message.channel.id == variabili.presentazioni){
                /*interaction.member.roles.remove(interaction.guild.roles.cache.get(variabili.stella1))
                interaction.member.roles.add(interaction.guild.roles.cache.get(variabili.stella2))*/
                
                message.guild.members.cache.get(message.author.id).roles.remove(message.guild.roles.cache.get(variabili.stella2))
                message.guild.members.cache.get(message.author.id).roles.add(message.guild.roles.cache.get(variabili.stella3))
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