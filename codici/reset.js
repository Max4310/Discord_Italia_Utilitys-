const path = require("path")
const variabili = require(path.join(__dirname,"../variabili.json"))
const fs = require("fs")
const Discord = require("discord.js")
const { membro, gestisciVisulizza, isStaff, CoinMember, aggiona, user, aggiungi } = require(path.join(__dirname, "../oggetti.js"))



function reset (client, mese)
{
    try{
        var data = new Date
        var mese2 = data.getMonth()+1
        var giorno = data.getDate()
        var anno = data.getFullYear()

        /*var mese2 = 3333
        var giorno = 3333
        var anno = 3333*/


        //controllo i warn
        user("warn").then(warnati => {
            if(warnati == null) return

            var n = warnati.length-1
            for(var i=n ; i>=0 ; i--)
            {   
                if(warnati[i].fine.giorno <= giorno && warnati[i].fine.mese <= mese2 && warnati[i].fine.anno <= anno)
                {
                    //gli levo il warn
                    client.guilds.cache.get(variabili.discordItalia).members.cache.get(warnati[i].memberId).roles.remove(client.guilds.cache.get(variabili.discordItalia).roles.cache.get(warnati[i].lvl))
                    warnati.splice(i,1)
                    
                    aggiona(warnati, "warn")
                }
            }
        })
        .catch((err) => {
            try{
                var embed = new Discord.MessageEmbed()
                .setTitle("WARN ERROR")
                .setDescription(err)
                .setColor("RED")

                client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.errLog).send({embeds : [embed]})
                return
            }catch{
                return
            }
        })

        //contollo gli abbonamenti
        user("coinMember").then(members => {
            if(members == null) return
            for(var i in members)
            {   
                if(members[i].abbonamenti.length > 0)
                {
                    var m = new membro(members[i].id)
                    var n = members[i].abbonamenti.length-1
                    for(var j=n ; j>=0 ; j--)
                    {
                        if(members[i].abbonamenti[j].fine.giorno <= giorno && members[i].abbonamenti[j].fine.mese <= mese2 && members[i].abbonamenti[j].fine.anno <= anno)
                        {   
                            //console.log(members[i].abbonamenti[j])
                            if(members[i].abbonamenti[j].prezzo > members[i].soldi)
                            {
                                // nn puo pagare devo rimuovere l'abbonamento
                                m.annulla(members[i].abbonamenti[j].id)
                                switch(members[i].abbonamenti[j].id)
                                {                                
                                    case variabili.A_gold: //gold
                                        //gli levo gold
                                        client.guilds.cache.get(variabili.discordItalia).members.cache.get(members[i].id).roles.remove(client.guilds.cache.get(variabili.discordItalia).roles.cache.get(variabili.gold)) 
                                        //gestisci le proprietà del gold quando viene modifcato il ruolo gold cosi che è piu generico

                                        client.guilds.cache.get(variabili.discordItalia).members.fetch(members[i].id).then(userx => {
                                            var embed = new Discord.MessageEmbed()
                                                .setTitle("Abbonamento Non Rinnovato")
                                                .setDescription("Sembra Che Tu Non Abbia Discord Italia Coin A Sufficienza Per Permetterti L'abbonamento Gold")
                                                .setFooter({text : "Contatta L'assistenza In Caso Di Problemi"})
                                            
                                            userx.send({embeds : [embed]})
                                        })
                                        .catch((err) => console.log(err))

                                        break;
                                    case variabili.A_vip: //vip

                                        //gli rimuovo il ruolo vip        
                                        client.guilds.cache.get(variabili.discordItalia).members.cache.get(members[i].id).roles.remove(client.guilds.cache.get(variabili.discordItalia).roles.cache.get(variabili.vip))

                                        client.guilds.cache.get(variabili.discordItalia).members.fetch(members[i].id).then(userx => {
                                            var embed = new Discord.MessageEmbed()
                                                .setTitle("Abbonamento Non Rinnovato")
                                                .setDescription("Sembra Che Tu Non Abbia Discord Italia Coin A Sufficienza Per Permetterti L'abbonamento Vip")
                                                .setFooter({text : "Contatta L'assistenza In Caso Di Problemi"})
                                            
                                            userx.send({embeds : [embed]})
                                        })
                                        .catch((err) => console.log(err))

                                        const economyLog1 = new Discord.MessageEmbed()
                                            .setTitle("ECONOMY LOG")
                                            .setDescription(`<@${members[i].id}> non ha Rinnovato il suo abbonamento VIP`)
                                            .setColor("RED")
                                            .setThumbnail({url : "https://media.discordapp.net/attachments/962302556929945652/1007675222171861022/NoVip.png?width=668&height=668"})
                                            
                                        client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({embeds : [economyLog1]})

                                        /* * * * * * * * * 
                                        * un utente non ha piu l'abbonamento vip
                                        *
                                        * members[i].id = l'id del membro
                                        *  client.guilds.cache.get(variabili.discordItalia) = guild
                                        * * * * * * * * * */

                                        break;
                                    case variabili.A_customRole: //customRole
                                        user("proprietà").then(usersPropetis => {
                                            if(usersPropetis == null) return 
                                            var a = usersPropetis.findIndex((p) => p.id == members[i].id)

                                            if(a > -1)
                                            {
                                                client.guilds.cache.get(variabili.discordItalia).members.cache.get(usersPropetis[a].id).roles.remove(client.guilds.cache.get(variabili.discordItalia).roles.cache.get(usersPropetis[a].ruolo))
                                                usersPropetis[a].ruolo = null

                                                var embed = new Discord.MessageEmbed()
                                                    .setTitle("Abbonamento Non Rinnovato")
                                                    .setDescription("Sembra Che Tu Non Abbia Discord Italia Coin A Sufficienza Per Permetterti Il Custom Role")
                                                    .setFooter({text : "Contatta L'assistenza In Caso Di Problemi"})

                                                client.guilds.cache.get(variabili.discordItalia).members.cache.get(usersPropetis[a].id).send({embeds : [embed]})

                                                const economyLog = new Discord.MessageEmbed()
                                                .setTitle("ECONOMY LOG")
                                                .setDescription(`<@${members[i].id}> non ha Rinnovato il suo Abbonamento Custom Role`)
                                                .setColor("RED")
                                                .setThumbnail({url : "https://media.discordapp.net/attachments/962302556929945652/1007676207040573530/NoCustomRole.png?width=668&height=668"})
                                                
                                                client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({embeds : [economyLog]})

                                                /* * * * * * * * * 
                                                * un utente non ha piu il custom role
                                                *
                                                * members[i].id = l'id del membro
                                                *  client.guilds.cache.get(variabili.discordItalia) = guild
                                                * * * * * * * * * */
                                            }
                                            else
                                            {
                                                const economyLog = new Discord.MessageEmbed()
                                                .setTitle("ECONOMY LOG")
                                                .setDescription(`Impossibile aggiornare i ruoli per <@${members[i].id}>`)
                                                .setColor("YELLOW")
                                                .setFooter({text : "Type: Custom Role"})
                                                
                                                client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({embeds : [economyLog]})

                                                //ERRORE

                                                /* * * * * * * * * * 
                                                * MESSAGGIO ERRORE DOVEVO LEVARE IL CUSTOM ROLE PERO NN HA TROVATO IL MEMBRO
                                                * 
                                                * 
                                                * members[i].id = l'id del membro
                                                * client.guilds.cache.get(variabili.discordItalia) = guild
                                                * * * * * * * * * * */
                                            }

                                            aggiona(usersPropetis , "proprietà")
                                        }).catch(() => {return})
                                    
                                        break;
                                    case variabili.A_private_call: //privateCall

                                        client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.VC_chiamata).permissionOverwrites.edit(members[i].id,
                                            {
                                                VIEW_CHANNEL : false, 
                                                CONNECT : false, 
                                                MANAGE_ROLES : false, 
                                                CREATE_INSTANT_INVITE : false, 
                                                MUTE_MEMBERS : false, 
                                                MOVE_MEMBERS : false, 
                                                SPEAK : false,
                                                PRIORITY_SPEAKER : false,
                                                STREAM : false,
                                                DEAFEN_MEMBERS : false,
                                                SEND_MESSAGES : false,
                                                READ_MESSAGE_HISTORY : false,
                                                MANAGE_CHANNELS : false,
                                                MENTION_EVERYONE : false,
                                                ADD_REACTIONS : false, 
                                                USE_EXTERNAL_EMOJIS : false,
                                                USE_EXTERNAL_STICKERS : false, 
                                                MANAGE_MESSAGES : false,
                                                EMBED_LINKS : false,
                                                ATTACH_FILES : false
                                            }

                                        )
                                        client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.VC_pannello).permissionOverwrites.edit(members[i].id,
                                        {
                                            VIEW_CHANNEL : false, 
                                            MANAGE_ROLES : false, 
                                            CREATE_INSTANT_INVITE : false, 
                                            SEND_MESSAGES : false,
                                            READ_MESSAGE_HISTORY : false,
                                            MANAGE_THREADS : false,
                                            MANAGE_CHANNELS : false,
                                            USE_PUBLIC_THREADS : false,
                                            USE_PRIVATE_THREADS : false,
                                            CREATE_PUBLIC_THREADS : false,
                                            CREATE_PRIVATE_THREADS : false,
                                            SEND_MESSAGES_IN_THREADS : false,
                                            MENTION_EVERYONE : false,
                                            MANAGE_WEBHOOKS : false,
                                            ADD_REACTIONS : false, 
                                            USE_EXTERNAL_EMOJIS : false,
                                            USE_EXTERNAL_STICKERS : false, 
                                            MANAGE_MESSAGES : false,
                                            EMBED_LINKS : false,
                                            ATTACH_FILES : false,
                                            SEND_TTS_MESSAGES:false,
                                            USE_APPLICATION_COMMANDS:false
                                        })
                                        
                                        client.guilds.cache.get(variabili.discordItalia).members.fetch(members[i].id).then(userx => {
                                            var embed = new Discord.MessageEmbed()
                                                .setTitle("Abbonamento Non Rinnovato")
                                                .setDescription("Sembra Che Tu Non Abbia Discord Italia Coin A Sufficienza Per Permetterti Le Chiamate Private")
                                                .setFooter({text : "Contatta L'assistenza In Caso Di Problemi"})
                                            
                                            userx.send({embeds : [embed]})
                                        })
                                        .catch((err) => console.log(err))

                                        const economyLog2 = new Discord.MessageEmbed()
                                            .setTitle("ECONOMY LOG")
                                            .setDescription(`<@${members[i].id}> non ha più ACcesso alle Chiamate Private`)
                                            .setColor("RED")
                                            .setThumbnail({url : "https://media.discordapp.net/attachments/962302556929945652/1007692719298195636/NoCall.png?width=668&height=668"})
                                        
                                        client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({embeds : [economyLog2]})

                                        /* * * * * * * * * 
                                        * un utente nn ha piu acceso alle chiamate private  
                                        *
                                        * members[i].id = l'id del membro
                                        * client.guilds.cache.get(variabili.discordItalia) = guild 
                                        * * * * * * * * * */
                            
                                        break;
                                    case variabili.A_colore: //colore normale
                                        client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.C_colori).permissionOverwrites.edit(members[i].id,
                                        {
                                            VIEW_CHANNEL : false, 
                                            MANAGE_ROLES : false, 
                                            CREATE_INSTANT_INVITE : false, 
                                            SEND_MESSAGES : false,
                                            READ_MESSAGE_HISTORY : false,
                                            MANAGE_THREADS : false,
                                            MANAGE_CHANNELS : false,
                                            USE_PUBLIC_THREADS : false,
                                            USE_PRIVATE_THREADS : false,
                                            CREATE_PUBLIC_THREADS : false,
                                            CREATE_PRIVATE_THREADS : false,
                                            SEND_MESSAGES_IN_THREADS : false,
                                            MENTION_EVERYONE : false,
                                            MANAGE_WEBHOOKS : false,
                                            ADD_REACTIONS : false, 
                                            USE_EXTERNAL_EMOJIS : false,
                                            USE_EXTERNAL_STICKERS : false, 
                                            MANAGE_MESSAGES : false,
                                            EMBED_LINKS : false,
                                            ATTACH_FILES : false,
                                            SEND_TTS_MESSAGES:false,
                                            USE_APPLICATION_COMMANDS:false
                                        })

                                        //rimuovi tutti i colori
                                        var colorix = variabili.R_colori
                                        var membrox = client.guilds.cache.get(variabili.discordItalia).members.cache.get(members[i].id)

                                        for(var i in colorix)
                                        {
                                            if(membrox._roles.includes(colorix[i]))
                                                membrox.roles.remove(membrox.guild.roles.cache.get(colorix[i]))
                                        }

                                        var embed = new Discord.MessageEmbed()
                                            .setTitle("Abbonamento Non Rinnovato")
                                            .setDescription("Sembra Che Tu Non Abbia Discord Italia Coin A Sufficienza Per Permetterti I Colori")
                                            .setFooter({text : "Contatta L'assistenza In Caso Di Problemi"})
                                        
                                        membrox.send({embeds: [embed]})

                                        const economyLog3 = new Discord.MessageEmbed()
                                        .setTitle("ECONOMY LOG")
                                        .setDescription(`<@${members[i].id}> non ha più accesso ai colori+`)
                                        .setColor("RED")
                                        .setThumbnail({url : "https://media.discordapp.net/attachments/962302556929945652/1007694354288222218/NoColor.png?width=667&height=667"})
                                        
                                        client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({embeds : [economyLog3]})

                                        /* * * * * * * * * 
                                        * un utente non ha piu accesso ai colori "speciali" 
                                        *
                                        * membrox = membro
                                        * * * * * * * * * */
                                        break;
                                    case variabili.A_casa: //chat priavata
                                    user("proprietà").then(usersPropetis => {
                                        if(usersPropetis == null) return 

                                        var a = usersPropetis.findIndex((p) => p.id == members[i].id)

                                        if(a > -1)
                                        {
                                            client.guilds.cache.get(variabili.discordItalia).channels.cache.get(usersPropetis[a].voc).delete()
                                            usersPropetis[a].voc = null

                                            client.guilds.cache.get(variabili.discordItalia).members.fetch(usersPropetis[a].id).then(u => {
                                                var embed = new Discord.MessageEmbed()
                                                    .setTitle("Abbonamento Non Rinnovato")
                                                    .setDescription("Sembra Che Tu Non Abbia Discord Italia Coin A Sufficienza Per Permetterti Una Casa")
                                                    .setFooter({text : "Contatta L'assistenza In Caso Di Problemi"})
                                                
                                                u.send({embeds : [embed]})
                                            })
                                            .then((err) => {
                                                console.log(err)
                                                return
                                            })

                                            const economyLog = new Discord.MessageEmbed()
                                            .setTitle("ECONOMY LOG")
                                            .setDescription(`<@${members[i].id}> non ha più una casa <a:blip:925747119975989288>`)
                                            .setColor("RED")
                                            .setThumbnail({url : "https://media.discordapp.net/attachments/962302556929945652/1007695110089228399/NoHome.png?width=667&height=667"})
                                            
                                            client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({embeds : [economyLog]})

                                            /* * * * * * * * * 
                                            * un utente non ha piu la casa
                                            *
                                            * members[i].id = l'id del membro
                                            *  client.guilds.cache.get(variabili.discordItalia) = guild
                                            * * * * * * * * * */
                                        }
                                        else
                                        {
                                            const economyLog = new Discord.MessageEmbed()
                                                .setTitle("ECONOMY LOG")
                                                .setDescription(`Errore imprevisto -> <@${members[i].id}>`)
                                                .setColor("YELLOW")
                                                .setFooter({text : "Type: Casa"})
                                            
                                            client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({embeds : [economyLog]})

                                            //ERRORE

                                            /* * * * * * * * * * 
                                            * MESSAGGIO ERRORE DOVEVO LEVARE LA CASA PERO NN HA TROVATO IL MEMBRO
                                            * 
                                            * 
                                            * members[i].id = l'id del membro
                                            * client.guilds.cache.get(variabili.discordItalia) = guild
                                            * * * * * * * * * * */
                                        }
                                        aggiona(usersPropetis , "proprietà")
                                    })
                                    .catch((err) => console.log(err))
                                    break;
                                    case variabili.A_chatTestuale: //testuale privata
                                    user("proprietà").then(usersPropetis => {
                                        if(usersPropetis == null) return 

                                        var a = usersPropetis.findIndex((p) => p.id == members[i].id)

                                        if(a > -1)
                                        {
                                            client.guilds.cache.get(variabili.discordItalia).channels.cache.get(usersPropetis[a].testuale).delete()
                                            usersPropetis[a].testuale = null

                                            client.guilds.cache.get(variabili.discordItalia).members.fetch(usersPropetis[a].id).then(u => {
                                                var embed = new Discord.MessageEmbed()
                                                    .setTitle("Abbonamento Non Rinnovato")
                                                    .setDescription("Sembra Che Tu Non Abbia Discord Italia Coin A Sufficienza Per Permetterti Una Chat Tesuale Privata")
                                                    .setFooter({text : "Contatta L'assistenza In Caso Di Problemi"})
                                                
                                                u.send({embeds : [embed]})
                                            })
                                            .then((err) => {
                                                console.log(err)
                                                return
                                            })

                                            const economyLog = new Discord.MessageEmbed()
                                            .setTitle("ECONOMY LOG")
                                            .setDescription(`<@${members[i].id}> non ha più un canale testuale privato`)
                                            .setColor("RED")
                                            .setThumbnail({url : "https://media.discordapp.net/attachments/962302556929945652/1007697369632079892/NoText.png?width=668&height=668"})
                                            
                                            client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({embeds : [economyLog]})

                                            /* * * * * * * * * 
                                            * un utente non ha piu la testuale
                                            *
                                            * members[i].id = l'id del membro
                                            *  client.guilds.cache.get(variabili.discordItalia) = guild
                                            * * * * * * * * * */
                                        }
                                        else
                                        {
                                            const economyLog = new Discord.MessageEmbed()
                                            .setTitle("ECONOMY LOG")
                                            .setDescription(`Errore imprevisto -> <@${members[i].id}>`)
                                            .setColor("YELLOW")
                                            .setFooter({text : "Type: Text Channel"})
                                            
                                            client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({embeds : [economyLog]})

                                            //ERRORE

                                            /* * * * * * * * * * 
                                            * MESSAGGIO ERRORE DOVEVO LEVARE LA CHAT TESUALE PERO NN HA TROVATO IL MEMBRO
                                            * 
                                            * 
                                            * members[i].id = l'id del membro
                                            * client.guilds.cache.get(variabili.discordItalia) = guild
                                            * * * * * * * * * * */
                                        }
                                        aggiona(usersPropetis , "proprietà")
                                    })
                                    .catch((err) => console.log(err))
                                    
                                        break;
                                    case variabili.A_spoiler: //accesso agli spoiler                    
                                        client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.C_spoiler).permissionOverwrites.edit(members[i].id,
                                        {
                                            VIEW_CHANNEL : false, 
                                            MANAGE_ROLES : false, 
                                            CREATE_INSTANT_INVITE : false, 
                                            SEND_MESSAGES : false,
                                            READ_MESSAGE_HISTORY : false,
                                            MANAGE_THREADS : false,
                                            MANAGE_CHANNELS : false,
                                            USE_PUBLIC_THREADS : false,
                                            USE_PRIVATE_THREADS : false,
                                            CREATE_PUBLIC_THREADS : false,
                                            CREATE_PRIVATE_THREADS : false,
                                            SEND_MESSAGES_IN_THREADS : false,
                                            MENTION_EVERYONE : false,
                                            MANAGE_WEBHOOKS : false,
                                            ADD_REACTIONS : false, 
                                            USE_EXTERNAL_EMOJIS : false,
                                            USE_EXTERNAL_STICKERS : false, 
                                            MANAGE_MESSAGES : false,
                                            EMBED_LINKS : false,
                                            ATTACH_FILES : false,
                                            SEND_TTS_MESSAGES:false,
                                            USE_APPLICATION_COMMANDS:false
                                        })

                                        client.guilds.cache.get(variabili.discordItalia).members.fetch(members[i].id).then(userx => {
                                            var embed = new Discord.MessageEmbed()
                                                .setTitle("Abbonamento Non Rinnovato")
                                                .setDescription("Sembra Che Tu Non Abbia Discord Italia Coin A Sufficienza Per Permetterti L'accesso Agli Spoiler")
                                                .setFooter({text : "Contatta L'assistenza In Caso Di Problemi"})
                                            
                                            userx.send({embeds : [embed]})
                                        })
                                        .catch((err) => console.log(err))

                                        const economyLog4 = new Discord.MessageEmbed()
                                            .setTitle("ECONOMY LOG")
                                            .setDescription(`<@${members[i].id}> non ha più accesso agli spoiler`)
                                            .setColor("RED")
                                            .setThumbnail({url : "https://media.discordapp.net/attachments/962302556929945652/1007698934908592200/NoSpoiler.png?width=668&height=668"})
                                        
                                        client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({embeds : [economyLog4]})

                                        /* * * * * * * * * 
                                        * un utente non ha piu accessoagli spoiler
                                        *
                                        * members[i].id = l'id del membro
                                        * client.guilds.cache.get(variabili.discordItalia) = guild 
                                        * * * * * * * * * */
                                        break;
                                    case variabili.A_anteprima: //accesso all'ateprima
                                        client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.C_anteprima).permissionOverwrites.edit(members[i].id,
                                        {
                                            VIEW_CHANNEL : false, 
                                            MANAGE_ROLES : false, 
                                            CREATE_INSTANT_INVITE : false, 
                                            SEND_MESSAGES : false,
                                            READ_MESSAGE_HISTORY : false,
                                            MANAGE_THREADS : false,
                                            MANAGE_CHANNELS : false,
                                            USE_PUBLIC_THREADS : false,
                                            USE_PRIVATE_THREADS : false,
                                            CREATE_PUBLIC_THREADS : false,
                                            CREATE_PRIVATE_THREADS : false,
                                            SEND_MESSAGES_IN_THREADS : false,
                                            MENTION_EVERYONE : false,
                                            MANAGE_WEBHOOKS : false,
                                            ADD_REACTIONS : false, 
                                            USE_EXTERNAL_EMOJIS : false,
                                            USE_EXTERNAL_STICKERS : false, 
                                            MANAGE_MESSAGES : false,
                                            EMBED_LINKS : false,
                                            ATTACH_FILES : false,
                                            SEND_TTS_MESSAGES:false,
                                            USE_APPLICATION_COMMANDS:false
                                        })

                                        client.guilds.cache.get(variabili.discordItalia).members.fetch(members[i].id).then(userx => {
                                            var embed = new Discord.MessageEmbed()
                                                .setTitle("Abbonamento Non Rinnovato")
                                                .setDescription("Sembra Che Tu Non Abbia Discord Italia Coin A Sufficienza Per Permetterti L'accesso All'Anteprima Delle Patch")
                                                .setFooter({text : "Contatta L'assistenza In Caso Di Problemi"})
                                            
                                            userx.send({embeds : [embed]})
                                        })
                                        .catch((err) => console.log(err))

                                        const economyLog5 = new Discord.MessageEmbed()
                                            .setTitle("ECONOMY LOG")
                                            .setDescription(`<@${members[i].id}> non ha più accesso all'anteprima patch`)
                                            .setColor("RED")
                                            .setThumbnail({url : "https://media.discordapp.net/attachments/962302556929945652/1007698934908592200/NoSpoiler.png?width=668&height=668"})
                                        
                                        client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({embeds : [economyLog5]})

                                        /* * * * * * * * * 
                                        * un utente non ha piu accesso all'anteprima delle patch
                                        *
                                        * members[i].id = l'id del membro
                                        * client.guilds.cache.get(variabili.discordItalia) = guild 
                                        * * * * * * * * * */
                                        break;
                                    case variabili.A_colorePlus: //colori plus  
                                        
                                        const colori = [variabili.R_buddha, variabili.R_origami, variabili.R_shinigami]
                                        var membrox = client.guilds.cache.get(variabili.discordItalia).members.cache.get(members[i].id)
                                        
                                        for(var i=0;i<membrox._roles.length;i++)
                                        {
                                            if(colori.includes(membrox._roles[i]))
                                                membrox.roles.remove(membrox.guild.roles.cache.get(membrox._roles[i]))   
                                        }

                                        
                                        var embed = new Discord.MessageEmbed()
                                            .setTitle("Abbonamento Non Rinnovato")
                                            .setDescription("Sembra Che Tu Non Abbia Discord Italia Coin A Sufficienza Per Permetterti I Colori Plus")
                                            .setFooter({text : "Contatta L'assistenza In Caso Di Problemi"})
                                        
                                        membrox.send({embeds: [embed]})
                                        
                                        const economyLog = new Discord.MessageEmbed()
                                            .setTitle("ECONOMY LOG")
                                            .setDescription(`${membrox} non ha più accesso ai colori sgravi`)
                                            .setColor("RED")
                                            .setThumbnail({url : "https://media.discordapp.net/attachments/962302556929945652/1007694354288222218/NoColor.png?width=667&height=667"})
                                        
                                        client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({embeds : [economyLog]})

                                        /* * * * * * * * * 
                                        * un utente non ha piu accesso ai colori QUELLI SGRAVI 
                                        *
                                        * membrox = membro
                                        * * * * * * * * * */
                                        
                                        break;
                                    default:
                                        break;
                                }
                            }
                            else
                            {
                                try{
                                    var id = members[i].abbonamenti[j].id
                                    m.remove(members[i].abbonamenti[j].prezzo)
                                    m.annulla(id)
                                    m.aquista(id)
                                }catch(err){
                                    var embed = new Discord.MessageEmbed()
                                    .setTitle("ABBONAMENTI RINNOVO ERROR")
                                    .setDescription(members[i] + "\n" + err)
                                    .setColor("RED")

                                    client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.errLog).send({embeds : [embed]})
                                    return
                                }
                                
                            }
                                
                        }
                    }
                }
            }
        })
        .catch((err) => {
            try{
                var embed = new Discord.MessageEmbed()
                .setTitle("ABBONAMENTI ERROR")
                .setDescription(err)
                .setColor("RED")

                client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.errLog).send({embeds : [embed]})
                return
            }catch{
                return
            }
        })



        //è cambiato il mese gestisco gli stipendi
        if(giorno == 1)
        {
            console.log("sono dentro")

            user("coinMember").then(members =>{
                if (members == null) return

                for(var i in members)
                {
                    if(members[i].warn == true)
                    {
                        var ver = false
                        var j = 0
                        var m = client.guilds.cache.get(variabili.discordItalia).members.cache.get(members[i].id)

                        while(j < m._roles.length && ver == false)
                        {
                            if(m._roles[j] == variabili.warn1 || m._roles[j] == variabili.warn2 || m._roles[j] == variabili.warn3 || m._roles[j] == variabili.warn4)
                                ver = true
        
                            j++
                        }

                        members[i].warn = ver
                    }
                    else
                        members[i].soldi = members[i].soldi + members[i].stipendioTot 
                        
                    
                }

                aggiona(members,"coinMember")
            })
            .catch((err) => {
                try{
                    var embed = new Discord.MessageEmbed()
                    .setTitle("STIPENDI ERROR")
                    .setDescription(err)
                    .setColor("RED")
        
                    client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.errLog).send({embeds : [embed]})
                    return
                }catch{
                    return
                }
            })
        }
        
        //controlla se devo levare dei custom role
        user("proprietà").then(usersPropetis => {
            if(usersPropetis == null) return

            for(var i in usersPropetis)
            {
                if(usersPropetis[i].ruolo != null)
                {
                    if(usersPropetis[i].ruolo.roleId != null && usersPropetis[i].ruolo.roleId != undefined)
                    {
                        if(usersPropetis[i].ruolo.fine.giorno <= giorno && usersPropetis[i].ruolo.fine.mese <= mese2 && usersPropetis[i].ruolo.fine.anno <= anno)
                        {
                            var member = client.guilds.cache.get(variabili.discordItalia).members.cache.get(usersPropetis[i].id)
                            member.roles.remove(client.guilds.cache.get(variabili.discordItalia).roles.cache.get(usersPropetis[i].ruolo.roleId))


                            if(usersPropetis[i].voc == null &&  usersPropetis[i].testuale == null)
                                usersPropetis.splice(i,1)
                            else
                                usersPropetis[i].ruolo = null
                            
                            aggiona(usersPropetis,"proprietà")

                            const economyLog = new Discord.MessageEmbed()
                                .setTitle("ECONOMY LOG")
                                .setDescription(`A <@${usersPropetis[i].id}> è scaduto il ruolo <@${usersPropetis.ruolo.roleId}>`)
                                .setColor("ORANGE")
                                .setThumbnail({url : "https://media.discordapp.net/attachments/962302556929945652/1007676207040573530/NoCustomRole.png?width=668&height=668"})
                            
                            client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({embeds : [economyLog]})

                            //LOG: SCADUTO IL CUSTOM ROLE 
                            /*usersPropetis[i].ruolo.roleId role 
                            * usersPropetis[i].id id membro
                            *  * * * * * * */
                        }
                    }
                }
            }
        })
        .catch((err) => {
            try{
                var embed = new Discord.MessageEmbed()
                .setTitle("PROPRIETA' ERROR")
                .setDescription(err)
                .setColor("RED")

                client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.errLog).send({embeds : [embed]})
                return
            }catch{
                return
            }
        })

        //controlla i temp role
        user("role").then(tempRoles => {
            if(tempRoles == null) return
            
            for(var i in tempRoles)
            {
                var n = tempRoles[i].roles.length-1
                for(var j=n ; j>=0 ; j--)
                {
                    if(tempRoles[i].roles[j].fine.giorno <= giorno && tempRoles[i].roles[j].fine.mese <= mese2 && tempRoles[i].roles[j].fine.anno <= anno)
                    {
                        client.guilds.cache.get(variabili.discordItalia).members.cache.get(tempRoles[i].member).roles.remove(client.guilds.cache.get(variabili.discordItalia).roles.cache.get(tempRoles[i].roles[j].role))
                        tempRoles[i].roles.splice(j, 1)

                        if(tempRoles[i].roles.length == 0)
                            tempRoles.splice(i,1)

                        aggiona(tempRoles, "role")
                    }
                }
            }
        })
        .catch((err) => {
            try{
                var embed = new Discord.MessageEmbed()
                .setTitle("TEMPROLE ERROR")
                .setDescription(err)
                .setColor("RED")

                client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.errLog).send({embeds : [embed]})
                return
            }catch{
                return
            }
        })

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
            
        client.guilds.cache.get("891739229846118461").channels.cache.get("894195379418058774").send({embeds : [embed]})

        variabili.inizio_nute = false
        variabili.entroDelete = true
        variabili.ContCapo = 0
        variabili.ContCommissari = 0
        variabili.ContIspettori = 0
        variabili.ContAgenti = 0
        variabili.ContDelete = 0
        variabili.vpn=false

        
        setTimeout(() => {
            variabili.vpn = true
            var data = JSON.stringify(variabili)
            fs.writeFile(path.join(__dirname,"../variabili.json"), data,function(err, result) {
                if(err) console.log('error', err);
            });
        },1000*60*30)

    
        var data = JSON.stringify(variabili)
        fs.writeFile(path.join(__dirname,"../variabili.json"), data,function(err, result) {
            if(err) console.log('error', err);
        });
    
        setTimeout(() => {
            reset(client)
        },1000*60*60*24)
        
    }catch(err){
        
        try{
            var embed = new Discord.MessageEmbed()
            .setTitle("FUNZIONE RICORSIVA DEL RESET")
            .setDescription(err)
            .setColor("RED")

            client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.errLog).send({embeds : [embed]})
            return
        }catch{
            return
        }


        return
    }
}

module.exports = {reset}