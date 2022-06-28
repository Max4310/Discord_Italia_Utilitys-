const { channel } = require("diagnostics_channel");
const Discord=require("discord.js");
const discord = require("discord.js")
const { randomInt } = require("crypto");
const { cp } = require("fs");
const { Server } = require("http");
const { type } = require("os");
const internal = require("stream");
const client = new Discord.Client(
    {intents: 131071, partials: ['MESSAGE', 'CHANNEL', 'REACTION']}
)
client.login("OTgxOTMwMDgyNTY4MzcyMjU0.GmayiA.8Dvpt4PA2GBfsfjDaOm4n1cQZgqhGygNXuufmQ")


const rules = ["Rispetta i Termini di Servizio e le Linee Guida Della Piattaforma Discord.\n*Linee Guida:*\nhttps://discord.com/guidelines\n*Termini di Servizio:*\nhttps://discord.com/terms","E' Vietato Distribuire Dati Sensibili e Informazioni Non Pubbliche Riguardanti Altri Membri del Server Discord Senza il Loro Consenso.", "E' Vietata Qualsiasi Forma di Violenza Psicologica Tramite: Bullismo, Nickname Offensivi e/o Volgari e Infastidimento.", "E' Vietato Distribuire Immagini o Video Espliciti (Violenti e/o Pornografici).", "E' Vietato Qualsiasi Tipo di Spoiler. Sia in Chat Testuale che in Chat Vocale.", "E' Vietato Farsi Pubblicità Non Autorizzata di Qualsiasi Tipo."]
const abitante="895325493237272647" 
const mutato="978669080196308992" 
const stella1="923227838524575794"  
const stella2="923228316541010011" 
const stella3="923228263814422599" 
const assistenza = "893561541302054973";
const chat_report = "933313509628981268" 
const pula = "911923177314201640" 
const recensioni = "911622885389508678" 

const LOGCHANNEL = "894209987881087046" 
const CEMOJI= "914426001365303356"
const PROPOSTE= "895331284954513468"
const EMOJIMAKER= "914430066472144907"
const BIGBRAIN= "913761921130430485"
const GRADO2= "946130972901011466"
const GRADO3= "946131519230070925"
const STELLA4= "923228260161167380"
const STELLA5= "923228267224371280"
const STELLA7= "923228320768876596"
const STELLA8= "923228312900370473"

const log="928669343535988736" 
const info="947597992238673940" 
const presentazioni="902903625586720798"  
const RICCHI = "895991422187098122" 

const stelle = ["923227838524575794","923228316541010011","923228263814422599","923228260161167380","923228267224371280","923228308466966608","923228320768876596","923228312900370473","923228296601305118","923228325592305664"]
const gradi = ["946120997881380964","946130972901011466","946131519230070925","946131628558778379","946131754215964753","946131907568082965"]
const gold = "893851166239252530"  
const vip = "893844096957952017" 
const log_verifica = "894610389407502366"  


const tempo_reset=1000*60*60*24;
const mute_totale = 10;
var i=0;
var inizio_nute=false;
var code = []
var UtenteVerifica = [] 
var cont_verifica = 0
var compare;


function is_verificato(membro)
{
    is=false;

    j=0
    while(membro._roles[j] != undefined && is==false)
    {
        if(membro._roles[j] == abitante)
            is=true

        j++
    }

    
    return is;
}

function ripristina(membro, comando){
    var role=comando.guild.roles.cache.get(abitante)
    membro.roles.add(role) //gli metto il ruolo abitante
    
    role=comando.guild.roles.cache.get(mutato)
    membro.roles.remove(role) //gli levo il ruolo mutato
    
    role=comando.guild.roles.cache.get(stella1)
    membro.roles.remove(role) //gli levo prima stella
}

function is_mute(membro)
{
    is=false;

    j=0
    while(membro._roles[j] != undefined && is==false)
    {
        if(membro._roles[j] == mutato)
            is=true

        j++
    }

    
    return is;
}

function A_seconda_Autor(utente)
{
    var val = undefined
    i=0

    while(i<100 && val == undefined)
    {
        if(UtenteVerifica[i]==utente)
            val = i
        
        i++
    }

    return val 
}

function parole_bannate(testo)
{
    const parole_ban = ["dio","madonna","cristo","gesù","duce","Duce","DVX","dvx","padre pio","dio","figa","negro","frocio","ricchione","lesbicona","lesbicaccia","lisbicona","finocchione","negra","negrone","smegma","d1o","di0","m4donna","m4d0nna","m4d0nn4","mad0nn4","madonn4","nigger","DVCE","dvce","Hitler","HITLER","h|tiler","h!tler","Madonna","Cristo","Dio","D!o","D!O","D*O","P0rco","P0RC0 DI0","PORCO","DIO","Negro","NEGRO" ,"N€gro","N€GR0","N|GGA" ,"N!IGG@","Nebro","NEBRO","NEGR0","Niggers","N!iggers","Fr0cio" ,"FR0CI0","Nehro","nudes","nude","nudi","nuda","nudo","sesso","sex" ,"sess0","porno"  ,"cristaccio","frocione","fr0cio","fr0ci0" ,"froc1o","scopata","scopare","trombata","mignotta","mignotte","diocane","dioporco","dioladro","diobastardo","madonnatroia","madonnaladra","diostronzo","porcoodio" ,"porcodidio","mignottona","battona","puttana","negraccio","bastardo","bastarda","bastard*","bastard","negra","negr*","succhiacazzi","bitch","bitches","nigg@","n3gr0","n3gro","negr0","negrO","N3GR0","NIGG@","negros","negritos","bitchs","nigg3rs","n1gg4","n1gg@","n1gg3r","n1gg3rs","negri","Nig3rss","N1gger","n1gger","N1gg3r","porcodio","porcamadonna","diocane" ,"diomerda","porcodduce","porcoduce","porcodiosburra","porcodiosbura","porcoddiosburra"]
    
    i=0
    trovato = null
    while(i<parole_ban.length && trovato == null)
    {
        if(testo.includes(parole_ban[i]))
            trovato = parole_ban[i]

        i++
    }


    return trovato
}

var report = new Discord.MessageButton() //pulsante del report tu dici "perche globale" e io perche no? 
    .setEmoji("👮‍♂️")
    .setStyle("DANGER")
    .setCustomId("report")
    .setLabel("Report")


client.on("ready",()=>{
    client.guilds.cache.forEach(guild=>{ 

        guild.commands.create({
           name : "grado",
           description : "sistema il grando di un utente",
           options : [
               {//argomento utente 
                   name : "target",
                   description : "utente a cui sistemare il grando",
                   type : "USER",
                   required : true
               }
           ],
           name : "stella" , 
           description : "dai la stella ad un utente",
           options : [
               {//utente
                   name : "target" ,
                   description : "utente a cui assegnare la stella",
                   type : "USER",
                   required : true
               }
           ],
           name : "verifica" ,
           description : "verifica un Utente",
           options: [
               { //argomento utente
                   name: "target", 
                   description: "L'utente Da Verificare",
                   type: "USER",
                   required: true
               },
           ],
           name : "delete",
           description : "Elimina Un Messaggio In Presentazioni",
           options: [
               {
                   name : "message",
                   description : "Id messaggio da eliminare",
                   type: "STRING",
                   required : true
               }
           ],
           name : "mute",
           description : "Muta Un Utente",
           options: [
               { //argomento utente
                   name: "user", 
                   description: "utente/bot da mutare",
                   type: "USER",
                   required: true
               },
               { //argomento reason
                    name: "motivo",
                    description: "motivo del mute",
                    type: "STRING",
                    required: true
               }
           ],
            name: "regole",
            description: "Mostra la Regola Richiesta",
            options: [
                {
                    name: "regola",
                    description: "Regola da visualizzare",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "Termini di Servizio e Linee Guida",
                            value: "reg0"
                        },
                        {
                            name: "Regola 1 - Dati Sensibili",
                            value: "reg1"
                        },
                        {
                            name: "Regola 2 - Bullismo",
                            value: "reg2"
                        },
                        {
                            name: "Regola 3 - Immagini Esplicite",
                            value: "reg3"
                        },
                        {
                            name: "Regola 4 - Spoiler",
                            value: "reg4"
                        },
                        {
                            name: "Regola 5 - Pubblicita'",
                            value: "reg5"
                        },
                        
                    ]   
                }
            ],
            
            name: "prefissi",
            description: "mostra tutti i prefissi",
            options: null,

            name: "info",
            description: "member info",
            options: [{
                name: "member",
                type: "USER",
                description: "il membro",
                required: false
            }],
            
            name: "prefissi",
            description: "mostra tutti i prefissi",
            options: null,
        })
    })

    console.log("bot online")
})

client.on("messageCreate", message =>{
    if(message.content=="113") //comando polizia
    {
        try{
            message.delete()
            message.channel.send("🚨 La <@&911923177314201640> Sarà Presto Qui! 🚨")
        }
        catch{
            message.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max 113 ha fallito cabbo fai")
                
                return
            })

        }
    }
    
    if(message.content=="888" && message.channelId==RICCHI) //comano yakuza
    {
        try{
            message.delete()

            message.channel.send("💀 **ATTENZIONE!** La <@&970721741615824926> Sarà Presto Qui! 💀")
        }
        catch{
            message.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max 888 ha fallito cabbo fai")
                
                return
            })

        }
    }

    /*if (message.mentions.members.first() != undefined)
    {
        membro=message.mentions.members.first()

        is_supremo=false
        contatore_economia=0

        while(membro._roles[contatore_economia] != undefined && is_supremo == false)
        {
            if(membro._roles[contatore_economia] == gold || membro._roles[contatore_economia] == vip)
                is_supremo=true

            contatore_economia++
        }

        if(is_supremo==true)
            message.channel.send("Complimenti Hai Trovato Un Easter Egg")
    }*/ 
    
    if(message.content=="di.verifica" && message.author.id == "598498238336729088")
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
    if(message.content == "di.recensione" && message.author.id == "598498238336729088" && message.channelId == recensioni)
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
})
 
client.on("interactionCreate", (comando)=>{
    //if(comando.isCommand==false) return

    if(comando.commandName=="delete")
    {
        try{
            var canale=comando.guild.channels.cache.get(presentazioni)
            var idMessage=comando.options.getString("message")
            

            canale.messages.fetch(idMessage)
                .then(message => {
                    message.delete()
                    var stella_2 = comando.guild.roles.cache.get(stella2)
                    var stella_3 = comando.guild.roles.cache.get(stella3)
                    var membro = comando.guild.members.cache.get(message.author.id)

                    membro.roles.add(stella_2)
                    membro.roles.remove(stella_3)
    
                    var logg=comando.guild.channels.cache.get(log)

                    logg.send({
                        "content": null,
                        "embeds": [
                        {
                            "title": "Discord Italia",
                            "description": "───────────────────────────────────────\nPresentazione Di <@"+message.author+"> Eliminata Da <@"+comando.member+">",
                            "color": 996600
                        }
                        ],
                        "attachments": []
                    })


                    risposta = new Discord.MessageEmbed()
                        .setTitle("Discord Italia")
                        .setColor("#0b39db")
                        .setDescription("───────────────────────────────────────\nL'Id Passato é Valido: **Presentazione Eliminata**\n───────────────────────────────────────")
                    comando.reply({embeds:[risposta], ephemeral: true})
                    
                    return;
                })

                .catch(NonServoANulla => {
                    risposta = new Discord.MessageEmbed()
                        .setTitle("Discord Italia")
                        .setColor("#0b39db")
                        .setDescription("───────────────────────────────────────\nL'Id Passato Non é Valido: **Presentazione Non Eliminata**\n───────────────────────────────────────")
                        .setFooter ("Il Messaggio Da Eliminare Deve Essere Nella Chat Presentazioni")
                    comando.reply({embeds:[risposta], ephemeral: true}); 
                    return})

            return;
        }catch{
            comando.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max /delete ha fallito cabbo fai")
            
            })  

            comando.reply({content : "Qualcosa è Andato Storto", ephemeral : true})

            return
        }
    }

    if(comando.commandName=="mute")     //se è stato fatto il comando /mute
    {
        try{
            var utente= comando.options.getUser("user"); //prendo l'utente passato dall'operatore
            var reason= comando.options.getString("motivo");
            var membro = comando.guild.members.cache.get(utente.id); //prendo il membro passato dall'operatore

            if(membro.bannable==false) //verifico che il bot possa bannare il membro (se non puo l'utente è un membro del governo)
            {
                var risposta = new Discord.MessageEmbed()
                    .setTitle("**DISCORD ITALIA**\n\n")
                    .setColor("#0b39db")
                    .setDescription("───────────────────────────────────────\nL'utente è Un Moderatore:  **Utente Non Modificato**")  //metto in "messaggio" il messaggio d'errore

                
            }
            else
            {
                if(inizio_nute==false) //verifico che sia il primo mute della giornata
                {
                    inizio_nute=true //dico di non entrare piu qui dentro perche gia c'è stato un altro mute
                    
                    setTimeout(function () {
                        i = 0
                    },tempo_reset); //resetta il cont dei mute fatti dopo un gionro
                    
                }

                if(i < mute_totale) //verifico se si hanno ancora i mute giornalieri
                {
                    i++
                    membro.timeout(1000 * 60 * 60)
                    
                    /*if(is_mute(membro)==false)
                    {
                        i++ //gli incremento il numero dei mute fatti
                        console.log(i)

                        /*var role=comando.guild.roles.cache.get(abitante)
                        membro.roles.remove(role) //gli levo abitante
                        role=comando.guild.roles.cache.get(mutato)
                        membro.roles.add(role) //gli metto il ruolo mutato*/
                        
                        

                        var risposta = new Discord.MessageEmbed()  //metto in "messaggio" il messaggio di riuscita dell'operazione
                            .setTitle("**DISCORD ITALIA**\n\n")
                            .setColor("#0b39db")
                            .setDescription("───────────────────────────────────────\nOperazione Autorizzata:  **Utente Modificato**")

                        
                        
                        client.users.fetch(utente.id, false).then((utente) => {
                            utente.send(`**Sei Stato Mutato Da Un Moderatore Per 1 Ora Minuti**\nMotivo: **`+reason+`**\nSe Hai Un Richiamo Preghiamo Di Aprire Un Ricorso Nella Chat <#893589753222545438>`); 
                        }); //comunico al'untente mutato che è stato mutato per 5 minuti per una reason passata dal poliziotto... ricordo inoltre che è possibile fare denuncia aprendo un ricorso

                        var campare=comando.guild.channels.cache.get(log)
                        campare.send({
                            "content": null,
                            "embeds": [
                            {
                                "title": "**DISCORD ITALIA**",
                                "description": "<@"+comando.member.id+"> ha eseguito il comando mute su <@"+membro.id+">\n**Motivo: **"+ reason,
                                "color": 735707,
                                "footer": {
                                "text": "rimangono "+ (mute_totale-i) +" mute per la giornata di oggi"
                                }
                            }
                            ],
                            "attachments": []
                        }) //mando il messaggio di log
                        
                        campare=comando.guild.channels.cache.get(info)
                        campare.send("utente mutato \nrimangono "+(mute_totale-i)+" mute per la giornata di oggi") 
                        //comunico alla polizia che è stato fatto un mute e quindi ne rimandono uno in meno (questo comando non tagga i membri della polizia)

                        /*setTimeout(function (){
                            ripristina(membro , comando);
                        },tempo_mute);  //resetto il tutto*/
                        
                    
                    /*else
                    {
                        var risposta = new Discord.MessageEmbed()
                        .setTitle("**DISCORD ITALIA**\n\n")
                        .setColor("#0b39db")
                        .setDescription("───────────────────────────────────────\nOperazione Non Autorizzata:  **Utente Gia Mutato**")
                    }*/
                    
                        
                    
                }
                else
                {
                    var risposta = new Discord.MessageEmbed() //metto in "messaggio" un messaggio d'errore che i mute sono finiti... 
                    .setTitle("**DISCORD ITALIA**\n\n")
                    .setColor("#0b39db")
                    .setDescription("───────────────────────────────────────\nOperazione Non Autorizzata:  **Sono Finiti I Mute**")
                }
                
            }
            comando.reply({embeds:[risposta], ephemeral: true}) //comunico il contenuto di messaggio al poliziotto    
            return
            //il comando è eseguibile in qualisiasi chat e i messaggio mandati NON DI LOG vengono inviati in maniera effimera quindi visulizzabile solo al polizotto
        }catch{
            comando.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max /mute ha fallito cabbo fai")
            
            })  

            comando.reply({content : "Qualcosa è Andato Storto", ephemeral : true})

            return
        }
        
    }
    
    if(comando.commandName=="verifica" && comando.channel.parentId==assistenza) // /verifica
    //controllo che il comando sia verifica e che l'operatore lo abbia fatto in un ticket (quindi in una chat nella categoria assitenza)
    {
        try{
            var utente = comando.options.getUser("target");
            var membro = comando.guild.members.cache.get(utente.id) //prendo il membro da per metterli abitante

            if(is_mute(membro)==false) //verifico se è mutato
            {
                
                if(membro.user.bot==false) // verifcio se sia un bot 
                {
                    
                    if(is_verificato(membro)==false) // verifico che non sia gia verificato 
                    {
                        var role = comando.guild.roles.cache.get(abitante)
                        membro.roles.add(role) //gli metto abitante se tutte le condizioni sono verificate 

                        // ho scelto di fare cosi invece che di usare && per poter classificare i vari messaggi da inviare all'operatore 

                        comando.reply({
                            "content": null,
                            "embeds": [
                            {
                                "title": "Discord Italia",
                                "description": "───────────────────────────────────────\n**Utente è Verificato**",
                                "color": 15871
                            }
                            ],
                            "attachments": []
                        }) //tutto è riusito 
                    }
                    else
                    {
                        comando.reply({
                            "content": null,
                            "embeds": [
                            {
                                "title": "Discord Italia",
                                "description": "───────────────────────────────────────\nImpossibile Verificare L'utente: **L'utente è Verificato**",
                                "color": 15871
                            }
                            ],
                            "attachments": []
                        }) //l'utetne è verificato 
                    }
                }
                else
                {
                    
                    comando.reply({
                        "content": null,
                        "embeds": [
                        {
                            "title": "Discord Italia",
                            "description": "───────────────────────────────────────\nImpossibile Verificare L'utente: **L'utente è Un Bot**",
                            "color": 15871
                        }
                        ],
                        "attachments": []
                    }) //l'utente è un bot 
                }


            }
            else
            {   
                comando.reply({
                    "content": null,
                    "embeds": [
                    {
                        "title": "Discord Italia",
                        "description": "───────────────────────────────────────\nImpossibile Verificare L'utente: **L'utente è Mutato**",
                        "color": 15871
                    }
                    ],
                    "attachments": []
                })   //l'utente è mutato 
            }

            var canale = comando.guild.channels.cache.get(log)

            canale.send("<@"+comando.member+"> ha usato il comando verifica su <@"+membro.id+">") //messaggio di log 
            return
        }catch{
            comando.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max /verifica ha fallito cabbo fai")
            
            })  

            comando.reply({content : "Qualcosa è Andato Storto", ephemeral : true})

            return
        }

        
    }

    if(comando.commandName=="stella" && comando.channel.parentId==assistenza) // /stella comando che capisce a che stella sei e ti da la successiva
    //controllo che il comando sia stella e che l'operatore lo abbia fatto in un ticket (quindi in una chat nella categoria assitenza)
    {
        try{
            var utente = comando.options.getUser("target");
            var membro = comando.guild.members.cache.get(utente.id) //prendo il membro
    
            i=0;
            is = false
            while(stelle[i] != undefined && is == false) //scorro tutto l'array dove ci sono i ruoli stella IN ORDINE 
            {
                j=0
                while(membro._roles[j] != undefined) // ogni ruolo stella lo confronto con i ruoli che ha l'utente
                {
                    if( stelle[i]==membro._roles[j]) //appena ne trovo uno imposto "is" a true 
                        is=true;
                    
                    j++;
                }
                i++;
            }
    
            if (is == true) //se ho trovato che l'utente ha almeno un ruolo stella 
            {
                if (i==1 || i==2 || i==3 || i==5)// in caso in cui gli helper possano aiutate      (stella 2,3,4,6) -> (array 1,2,3,5) 
                //verifico i casi in cui l'helper possa aiutare seguendo questo schema:  
                /*i=0 @1 stella 
                i=1 @2 stelle 
                i=2 @3 stelle 
                i=3 @4 stelle 
                i=4 @5 stelle 
                i=5 @6 stelle 
                i=6 @7 stelle 
                i=7 @8 stelle 
                i=8 @9 stelle 
                i=9 @10 stelle*/ 
                {
                    var stella_attuale = comando.guild.roles.cache.get(stelle[i-1]) //prendo la stella precendente 
                    var stella_successiva = comando.guild.roles.cache.get(stelle[i]) // e la stella che ha 
    
                    membro.roles.add(stella_successiva)
                    membro.roles.remove(stella_attuale) //le assegno e rimuovo la prendecente 
                    
                    comando.reply({ //comunico che il tutto sia andato a buon fine 
                        "content": null,
                        "embeds": [
                        {
                            "title": "Discord Italia",
                            "description": "───────────────────────────────────────\n<@"+membro.id+"> Ha Superato La Task Ora Ha La Stella "+(i+1),
                            "color": 15871
                        }
                        ],
                        "attachments": []
                    })
                }
                else //in caso il cui l'helper non ci possa fare nulla e quindi si contatta il governo
                {
    
                    comando.reply({ //contatto il governo 
                        "content": "<@&892866382729977896>",
                        "embeds": [
                        {
                            "title": "Discord Italia",
                            "description": "───────────────────────────────────────\nCi Scusiamo Per Il Disagio Ma L'operatore Non Ha Il Permesso Necessario Per Promuoverla Abbiamo Contattato Un Amministratore",
                            "color": 15871,
                            "footer": {
                                "text": "Ha Superato La Task "+i+" Ha Bisogno Della Stella Successiva Ovvero La "+(i+1)+ " stella"
                            }
                        }
                        ],
                        "attachments": []
                    })
                }
                
            }
            else //caso in cui nn abbia stelle (gli do la prima) 
            {
                var stellina = comando.guild.roles.cache.get(stelle[0])
    
                membro.roles.add(stellina)
                comando.reply({ //comunico che ho fato la prima stella
                    "content": null,
                    "embeds": [
                    {
                        "title": "Discord Italia",
                        "description": "───────────────────────────────────────\n<@"+membro.id+"> Ha Ora La Prima Stella Iniziando Cosi Le Sue Task",
                        "color": 15871
                    }
                    ],
                    "attachments": []
                })
            }
             
    
            var canale = comando.guild.channels.cache.get(log)
    
            canale.send("<@"+comando.member+"> ha usato il comando stella su <@"+membro.id+">") //log 
            return
        }catch{
            comando.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max /stella ha fallito cabbo fai")
            
            })  

            comando.reply({content : "Qualcosa è Andato Storto", ephemeral : true})

            return
        }
        
        
    }

    if(comando.commandName=="grado" && comando.channel.parentId==assistenza) // /grado TESTING
    {
        try{
            var utente = comando.options.getUser("target")
            var membro = comando.guild.members.cache.get(utente.id)
    
            Is=false
            bo=false
            k=0
    
            while(stelle[k] != undefined && Is == false)
            {
                c=0
                while(membro._roles[c] != undefined)
                {
    
                    if(stelle[k] == membro._roles[c])
                        Is=true;
                    
                    if (bo==false)
                    {
                        if(membro._roles[c] == gradi[0])
                        {
                            role = comando.guild.roles.cache.get(gradi[0])
    
                            membro.roles.remove(role)
                        }
                        
                        if(membro._roles[c]==gradi[1]) 
                        {
                            role = comando.guild.roles.cache.get(gradi[1])
    
                            membro.roles.remove(role)
                        }               
                        
                        if(membro._roles[c]==gradi[2])  
                        {
                            role = comando.guild.roles.cache.get(gradi[2])
    
                            membro.roles.remove(role)
                        }              
                        
                        if(membro._roles[c]==gradi[3])
                        {
                            role = comando.guild.roles.cache.get(gradi[3])
    
                            membro.roles.remove(role)
                        }
                        
                        if(membro._roles[c]==gradi[4])
                        {
                            role = comando.guild.roles.cache.get(gradi[4])
    
                            membro.roles.remove(role)
                        }
                        
                        if(membro._roles[c]==gradi[5])
                        {
                            role = comando.guild.roles.cache.get(gradi[5])
    
                            membro.roles.remove(role)
                        }
                    }
                    c++;
                }
                bo=true;
                k++;
            }
    
            if(Is==false)
            {
                var role = comando.guild.roles.cache.get(gradi[0])
                membro.roles.add(role)
    
                comando.reply({
                    "content": null,
                    "embeds": [
                    {
                        "title": "Discord Italia",
                        "description": "───────────────────────────────────────\n<@"+membro.id+"> Era Sprovvisto Di Stelle Ora Abbiamo Sistemato",
                        "color": 15871
                    }
                    ],
                    "attachments": []
                })
            }
            else
            { 
                /*i=0 @1 stella 
                i=1 @2 stelle 
                i=2 @3 stelle 
                i=3 @4 stelle 
                i=4 @5 stelle 
                i=5 @6 stelle 
                i=6 @7 stelle 
                i=7 @8 stelle 
                i=8 @9 stelle 
                i=9 @10 stelle*/ 
                
                if (k > 0)
                {
                    k=k-1
                    console.log(k)
    
                    var role
                    if (k==1)
                        var role = comando.guild.roles.cache.get(gradi[0])
                    else if (k==2 || k==3)
                        var role = comando.guild.roles.cache.get(gradi[1])
                    else if (k==4 || k==5)
                        var role = comando.guild.roles.cache.get(gradi[2])
                    else if(k==6 || k==7)
                        var role = comando.guild.roles.cache.get(gradi[3])
                    else if (k==8)
                        var role = comando.guild.roles.cache.get(gradi[4])
                    else if(k==9)
                        var role = comando.guild.roles.cache.get(gradi[5])
    
    
                    console.log(role)
                    membro.roles.add(role)
    
                    comando.reply({
                        "content": null,
                        "embeds": [
                        {
                            "title": "Discord Italia",
                            "description": "───────────────────────────────────────\n<@"+membro.id+"> Possiede "+(k)+"^ Stella Abbiamo Quindi Ripristinato Il Suo Grado A <@&"+role.id+">",
                            "color": 15871
                        }
                        ],
                        "attachments": []
                    })
                }
                else
                {
                    comando.reply({
                        "content": null,
                        "embeds": [
                        {
                            "title": "Discord Italia",
                            "description": "───────────────────────────────────────\n<@"+membro.id+"> Possiede "+(k)+"^ Quindi Non Ha Diritto Ad Alcun Grando",
                            "color": 15871
                        }
                        ],
                        "attachments": []
                    })
                }
                
            }
            
            var canale = comando.guild.channels.cache.get(log)
            canale.send("<@"+comando.member.id+"> ha eseguito il comando grado su <@"+membro.id+">")
    
            return
        }catch{
            comando.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max /grado ha fallito cabbo fai")
            
            })  

            comando.reply({content : "Qualcosa è Andato Storto", ephemeral : true})

            return
        }
        
    }

    if((comando.commandName=="stella" || comando.commandName=="verifica" || comando.commandName=="grado") && comando.channel.parentId != assistenza)
    {
        comando.reply({content : "Non Puoi Fare Questo Comando Fuori Da Un Ticket", ephemeral: true})
        return
    }
})

client.on("interactionCreate", (interaction) => {
    if(interaction.customId == "cd_verifica")
    {
        try{
            var We_we = A_seconda_Autor(interaction.member.user.id)
            if(interaction.fields.getTextInputValue("verifica_testo") == code[We_we])
            {
                interaction.member.roles.add(interaction.guild.roles.cache.get(abitante))
                interaction.member.roles.add(interaction.guild.roles.cache.get(stella1))
                interaction.deferReply()
                interaction.deleteReply()
    
                var message_log = new Discord.MessageEmbed()
                    .setTitle("DISCORD ITALIA")
                    .setDescription("<@"+interaction.member.user.id+"> Si è Verificato Con Successo")
                    .setColor("BLUE")
    
                interaction.guild.channels.cache.get(log_verifica).send({embeds : [message_log]})
            }
            else
            {
                UtenteVerifica[We_we] = null
                var risposta = new Discord.MessageEmbed()
                    .setTitle("DISCORD ITALIA")
                    .setDescription("**Il Codice Risulta Essere Sbagliato**\n\n*Ricordo Che Non Bisogna Mettere Spazi, Ma Scrivere Semplicemente Il Risultato.*")
                    .setFooter("Contattare L'assistenza In Caso Di Problemi")
                    .setColor("RED")
    
                interaction.reply({embeds : [risposta], ephemeral : true})
            }
        }catch{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max la Verifica ha fallito cabbo fai")
            
            })  
    
            interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return
        }
        
    }
    if(interaction.commandName == "regole"){
        try{
            const logchannel = interaction.guild.channels.cache.get(log) //log
            const log_message = new discord.MessageEmbed()
                .setTitle('UTILITY LOG')
                .setDescription(`${interaction.member} ha usato il comando *regole* in <#${interaction.channelId}>`)
            logchannel.send({embeds:[log_message]})

            const choice = interaction.options.getString("regola")
            const regola = parseInt(choice.split("reg")[1])
            
            if(regola == 0){
            var reg = "Termini di Servizio e Linee Guida"
            }else{
            reg = `Regola ${regola}`
            }
            const embed = new discord.MessageEmbed()
                .setTitle("Rispetta le Regole!")
                .addField(reg, `<a:manss:976501011302711457>**${rules[regola]}**`)
                .setColor("BLURPLE")
            interaction.reply({embeds: [embed]})
        }catch{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max /regole ha fallito cabbo fai")
            
            })  
    
            interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return 
        }
        
    }
    if(interaction.commandName == "prefissi"){
        const embed = new discord.MessageEmbed()
        .setTitle("BOT DELLA MUSICA")
        .setDescription("**-)**<@866956216420007946> Prefix `di.`\n**-)**<@239631525350604801> Prefix `p!`\n**-)**<@282859044593598464> Prefix `.`\n**-)**<@159985870458322944> Prefix `!`\n\n**────────────────────────────────────────**\n**ACTIVITY RANK**\n\n**-)**`/top members server`\n(Visualizza la top generale del server)\n\n**-)**`/top members server -> Period: Week`\n(Visualizza la top settimanale del server)\n\n**-)** `/top members server -> Period: Day`\n(Visualizza la top giornaliera del server)")
        .setColor("BLURPLE")
        interaction.reply({embeds: [embed], ephemeral: true})
    } 
    if(interaction.commandName == "info"){

        try{
            var member = interaction.options.get("member")
        
            if(member == undefined || member == null){
                member = interaction.member
                var roles = member._roles
                var joined =  member.joinedTimestamp
            }else{
                roles = member.member._roles
                joined = member.member.joinedTimestamp
            }
            var pingroles = ""
            for(let x in roles){
                pingroles += `<@&${roles[x]}> `
            }
            console.log(pingroles, member)
            
            var embed = new discord.MessageEmbed()
                .setTitle(`Info di ${member.user.username}`) // <t::R> <t::T>
                .setDescription(`**Nome**\n${member.user.username}#${member.user.discriminator}`)
                .setColor("BLURPLE")
                .setThumbnail(member.user.displayAvatarURL())
                .addField("Ping", `${member.user}`)
                .addField("Ruoli", `${pingroles}`)
                .addField("Joinato Discord Italia Developers", `<t:${Math.floor(joined / 1000)}:R>`)
                .addField("Joinato Discord", `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`)
            
            interaction.reply({embeds: [embed]})
        }catch{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max /regole ha fallito cabbo fai")
            
            })  
    
            interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return
        }
    }
    if(interaction.isModalSubmit()){ // codice modal recenzioni
        
        if(interaction.customId == "modulorecensioni"){
            try{
                parolina = parole_bannate(interaction.fields.getTextInputValue("recensione"))
                if(parolina == null)
                {
                    var numerostelle = null
                    var recensione = null
                    try{
                        numerostelle = parseInt(interaction.fields.getTextInputValue("numerostelle"))
                        recensione = interaction.fields.getTextInputValue("recensione")
                    }catch{
                        return
                    }
                    var stelle = ""
    
                    if(numerostelle <= 5 && numerostelle>=0)
                    {
                        for(var x = 0; x < numerostelle; x++){
                            stelle += ":star:"
                        }
    
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`Recensione di ${interaction.member.user.username}`)
                            .setDescription(`**───────────────────────────────────────\nNumero Di Stelle:** ${stelle}\n\n**Commento: **${recensione}\n\n`)
                            .setColor("#4958cf")
                            .setFooter("\n───────────────────────────────────────\nPer Fare La Tua Recensione ⇨ 💯 \nPer Reportare Questa Recensione ⇨ 👮‍♂️")
    
                        var Nuova = new Discord.MessageButton()
                            .setEmoji("💯")
                            .setStyle("PRIMARY")
                            .setCustomId("recensione")
                            .setLabel("Recencisci")
    
                        var recensione = new Discord.MessageActionRow()
                            .addComponents(Nuova)
                            .addComponents(report)
    
                        interaction.channel.send({embeds: [embed], components : [recensione]})
    
                        interaction.deferReply()
                        interaction.deleteReply()
                    }
                    else
                    {
                        var embed = new Discord.MessageEmbed()
                            .setTitle("**Il Numero Di Stelle Non È Valido**")
                            .setDescription("*Il Massimo è 5, Il Minino è 0.*")
                            .setColor("RED")
    
                        var Nuova = new Discord.MessageButton()
                            .setEmoji("💯")
                            .setStyle("PRIMARY")
                            .setCustomId("recensione")
                            .setLabel("Recencisci")
        
                        var recensione = new Discord.MessageActionRow()
                            .addComponents(Nuova)   
                        
                        interaction.reply({embeds : [embed] , components : [recensione],ephemeral :true })
                    }
                }
                else
                {
                    const risposta = new Discord.MessageEmbed()
                        .setTitle("**La Ta Recensione Contiene Parole Bannate**")
                        .setDescription("Parola Bannata: `"+parolina+"`\n\nLa Tua Recensione: "+interaction.fields.getTextInputValue("recensione"))
                        .setColor("RED")
                    
                    var Nuova = new Discord.MessageButton()
                        .setEmoji("💯")
                        .setStyle("PRIMARY")
                        .setCustomId("recensione")
                        .setLabel("Recencisci")
    
                    var recensione = new Discord.MessageActionRow()
                        .addComponents(Nuova)   
                    
                    interaction.reply({embeds : [risposta] , components : [recensione],ephemeral :true })
                }
            }catch{
                interaction.guild.members.fetch("598498238336729088").then(member =>{
                    member.user.send("max il modulo recensioni ha fallito cabbo fai")
                
                })  
        
                interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
        
                return
            }
            
        }
        if(interaction.customId == "moduloreport"){
            try{
                var c = interaction.guild.channels.cache.get(chat_report)

                var reason = interaction.fields.getTextInputValue("Reason_report")
    
                var x = compare.embeds[0]
    
                x.footer.text = "IDmessaggio: " + compare.id
                x.description = x.description + "\n\n**Motivo: **" + reason + "\n**Reportatore: ** <@"+ interaction.member.id + ">" 
    
                
                var no = new Discord.MessageButton()
                    .setLabel("Eliminare")
                    .setStyle("DANGER")
                    .setCustomId("no_rece")
                    .setEmoji("✖️")
    
                var row = new Discord.MessageActionRow()
                    .addComponents(no)
    
                c.send({content : "<@&"+pula+">", embeds : [x], components : [row]})
                
    
                interaction.deferUpdate()
            }catch{
                interaction.guild.members.fetch("598498238336729088").then(member =>{
                    member.user.send("max il modulo recensioni ha fallito cabbo fai")
                
                })  
        
                interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
        
                return
            }
            
        }
    }
    if (interaction.isButton()) // codice pulsante eliminare/lasciare
    {
        if(interaction.customId == "no_rece") //codice pulsante "eliminare"
        {
            try{
                var xx = interaction.message.embeds[0].footer.text

                var xxx = xx.replace("IDmessaggio: ", "")
            
                messaggino = interaction.guild.channels.cache.get(recensioni).messages.fetch(xxx)
                .then(messaggio =>{
                    messaggio.delete()
    
                    var embed = new Discord.MessageEmbed()
                        .setTitle("Discord Italia")
                        .setDescription("**Recenzione Eliminata**")
                        .setColor("AQUA")
                    interaction.reply({embeds : [embed], ephemeral : true})
    
                    var y = messaggio.embeds[0].title
                    y = y.replace("Recensione di ","")
                    membro = messaggio.guild.members.cache.find(member => member.user.username == y)
                    
                    var logg = interaction.guild.channels.cache.get(log)
                    var informiamo = interaction.guild.channels.cache.get(info)
    
                    var embed = new Discord.MessageEmbed()
                        .setTitle("DISCORD ITALIA")
                        .setDescription("Recenzione Di <@"+membro.user.id+"> Eliminata Da <@"+interaction.member.id+">")
                        .setColor("AQUA")
    
                    var embed1 = new Discord.MessageEmbed()
                        .setTitle("DISCORD ITALIA")
                        .setDescription("Recenzione Di <@" + membro +"> Eliminata")
                        .setColor("AQUA")
    
                    informiamo.send({embeds : [embed1]})
                    logg.send({embeds : [embed]})
                    return
                })
                .catch(() =>{
                    var embed = new Discord.MessageEmbed()
                        .setTitle("Discord Italia")
                        .setDescription("**Recenzione Gia Giudicata Da Un Altro Operatore**")
                        .setColor("AQUA")
                    interaction.reply({embeds : [embed], ephemeral : true})
    
                    return
                }) 
    
                interaction.message.delete() 
            }catch{
                interaction.guild.members.fetch("598498238336729088").then(member =>{
                    member.user.send("max il pulsante dell'eliminazione non ha funzionano ha fallito cabbo fai")
                
                })  
        
                interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
        
                return
            }
            
        }
    }
    if(interaction.customId == "EL_modal")
    {
        try{
            var embed = interaction.message.embeds[0]
            embed.footer.text = "𝗠𝗼𝘁𝗶𝘃𝗼: " + interaction.fields.getTextInputValue("EL_Motivo")
            
            interaction.message.edit({embeds : [embed], components : []}) 
    
            interaction.deferUpdate()
        }catch{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max la modifica del embed dei messaggi eliminati ha fallito cabbo fai")
            
            })  
    
            interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return
        }
        
    }
   
})

client.on("interactionCreate", async (interaction) => { //codici di interezione
    if(interaction.customId == "P_verifica" && interaction.member.user.bot==false)
    {
        try{
            if(cont_verifica >= 100)
                cont_verifica=0
    
            
            numero1 = Math.round(Math.random() * 30)
            
            if(numero1 <= 10 )
                numero2 = Math.round(Math.random() * 30)
            else if(numero1 <= 20)
                numero2 = Math.round(Math.random() * 20)
            else 
                numero2 = Math.round(Math.random() * 10)
    
            code[cont_verifica] = numero1 + numero2
            UtenteVerifica[cont_verifica] = interaction.member.user.id
            cont_verifica++
            
            const {MessageActionRow, Modal, TextInputComponent} = require("discord.js")
                
            const titolo = new Modal()
                .setTitle("Fai Questa Somma Eseguire La Verifica")
                .setCustomId("cd_verifica")
            
            const testo = new TextInputComponent()
                .setLabel("Scrivi Il Risultato: " + numero1 + "+" + numero2)
                .setCustomId("verifica_testo")
                .setStyle("SHORT")
            const somma_verifica = new MessageActionRow().addComponents(testo)
                
            titolo.addComponents(somma_verifica)
            await interaction.showModal(titolo)
        }catch{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max il Pulsante Della Verifica ha fallito cabbo fai")
            
            })  
    
            interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return
        }
    }
    else if(interaction.customId == "P_verifica")
    {
        const risp = new Discord.MessageEmbed()
            .setTitle("DISCORD ITALIA")
            .setDescription("Il Tuo Account Sembra Essere Un Bot")
            .setColor("RED")

        interaction.reply({embeds : [risp], ephemeral : true})
    }
    if(interaction.customId == "recensione"){ //crea il modulo del recenzione
        try{
            const {MessageActionRow, Modal, TextInputComponent} = require("discord.js")
        
            const modal = new Modal()
                .setTitle("Recensisci il Server!")
                .setCustomId("modulorecensioni")
            const stellerecensione = new TextInputComponent()
                .setLabel("Scrivi Il Numero Di Stelle")
                .setCustomId("numerostelle")
                .setStyle("SHORT")
            const recensione = new TextInputComponent()
                .setLabel("Scrivi Di Seguito La Tua Recenzione")
                .setCustomId("recensione")
                .setStyle("PARAGRAPH")
    
            const stellerecensionerow = new MessageActionRow().addComponents(stellerecensione)
            const recensionerow = new MessageActionRow().addComponents(recensione)
            
            modal.addComponents(stellerecensionerow, recensionerow)
            await interaction.showModal(modal)
        }catch{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max il Pulsante Della recensione ha fallito cabbo fai")
            
            })  
    
            interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return
        }

        
    }
    if(interaction.customId == "report" ) //crea il modulo del report 
    {
        try{
            const {MessageActionRow, Modal, TextInputComponent} = require("discord.js")
            const modal = new Modal()
                .setTitle("Report")
                .setCustomId("moduloreport")
            const motivo = new TextInputComponent()
                .setLabel("Scrivi Il Motivo Del Report")
                .setCustomId("Reason_report")
                .setStyle("SHORT")
            
            const motivorow = new MessageActionRow().addComponents(motivo)
            modal.addComponents(motivorow)
            await interaction.showModal(modal)
            compare =  interaction.message
        }catch{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max il Pulsante Del report ha fallito cabbo fai")
            
            })  
    
            interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return
        }
        
        
    }
    if(interaction.customId == "reason_messaggio_eliminato")
    {
        try{
            if (interaction.user.tag==interaction.message.embeds[0].title.replace("Messaggio Eliminato Da: ", ""))
            {
                const {MessageActionRow, Modal, TextInputComponent} = require("discord.js")
    
                const modal = new Modal()
                    .setTitle("Come Mai Hai Eliminto Quel Messaggio?")
                    .setCustomId("EL_modal")
    
                const motivo = new TextInputComponent()
                    .setLabel("Dicci Il Motivo")
                    .setCustomId("EL_Motivo")
                    .setStyle("PARAGRAPH")
            
                const motivoriga = new MessageActionRow().addComponents(motivo)
                    
                modal.addComponents(motivoriga)
                await interaction.showModal(modal)
            }
            else
                interaction.reply({content : "❌ Non Hai Eliminato Tu Il Messaggio", ephemeral : true})
        }catch{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max il Pulsante Del reason del messaggio ha fallito cabbo fai")
            
            })  
    
            interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return
        }
        
        
    }

})

client.on("messageDelete", (message)=>{
    try{
        if(message.author.bot == false)
        {
            message.guild.fetchAuditLogs({
                limit: 1,
                type: "MESSAGE_DELETE",
            })
            .then (autore => {
                var { executor, target } = autore.entries.first()
                if(executor.id != message.author.id)
                {
                    message.guild.members.fetch(executor.id)
                    .then(membro =>{
                        var i=0
                        var ver = false
                        while(i<membro._roles.length && ver == false)
                        {
                            if(membro._roles[i] == pula)
                                ver = true
                            i++
                        }
        
                        if(ver == true)
                        {   
                            var notifica = new Discord.MessageEmbed()
                                .setTitle("Messaggio Eliminato Da: "+executor.username+"#"+executor.discriminator)
                                .setDescription("**Chat Messaggio:** <#"+message.channelId+">\n"+"**Autore Del Messaggio:** <@"+message.author.id+">\n**Contenuto Del Messaggio:** "+message.content)
                                .setFooter("Motivo Non Fornito")
                                .setColor("RANDOM")
                            
                            const reason = new Discord.MessageButton()
                                .setLabel("Motivo")
                                .setStyle("DANGER")
                                .setEmoji("🛑")
                                .setCustomId("reason_messaggio_eliminato")
                            const riga = new Discord.MessageActionRow()
                                .addComponents(reason)
        
                            if(message.attachments.first() != undefined)
                            {   
                                if(message.content == "")
                                    notifica.description=notifica.description.replace("\n**Contenuto Del Messaggio:** ", "")

                                notifica = new Discord.MessageEmbed()
                                    .setTitle("Messaggio Eliminato Da: "+executor.username+"#"+executor.discriminator)
                                    .setImage(message.attachments.first().url)
                                    .setDescription(notifica.description + "\n**↓↓↓↓↓↓↓↓Immagine↓↓↓↓↓↓↓**")
                                    .setFooter("Motivo Non Fornito")
                                    .setColor("RANDOM")

                                message.guild.channels.cache.get(info).send({embeds : [notifica], components : [riga]})
                            }
                            else
                            {
                                message.guild.channels.cache.get(info).send({embeds : [notifica/*,fotos*/], components : [riga]})
                                
                            }
                        }   
                    })
                }
                
            })
        }
    }catch{
            message.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max il coso dei messaggi eliminati ha fallito cabbo fai")
            
            })  
    
            //interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return
    }    
})

client.on('messageReactionAdd', async (reaction, user) => {
    try{
        if (reaction.emoji.name == '👑'){
            if (reaction.message.channel.id == CEMOJI) {
              var counter = false
              var counter1 = false
              var log
              reaction.message.fetch()
                .then(message => {
                  if (!message.member.roles.cache.some(role => role.id == EMOJIMAKER)){  
                    message.guild.roles.fetch(EMOJIMAKER).then(role => {
                      message.member.roles.add(role)  
                    })
                    counter1 = true
                  }
                  if (message.member.roles.cache.some(role => role.id == STELLA4)) {
                    counter = true
                    message.guild.roles.fetch(STELLA5).then(role => { 
                      message.member.roles.add(role)
                    })
                    message.guild.roles.fetch(STELLA4).then(role => { 
                      message.member.roles.remove(role)
                    })
                    message.guild.roles.fetch(GRADO3).then(role => {
                      message.member.roles.add(role)
                    })
                    message.guild.roles.fetch(GRADO2).then(role => {
                      message.member.roles.remove(role)
                    })
                  }
                  if(counter == true && counter1 == true){
                    log = `${message.member} ha ricevuto Emoji maker e la 5° stella. interaction: ${user}`
                  } else if (counter == false && counter1 == true) {
                    log = `${message.member} ha ricevuto Emoji maker. interaction: ${user}`
                  } else if (counter == false && counter1 == false) {
                    log = `${message.member} ha un emoji accettata. interaction: ${user}`
                  } else if (counter == true && counter1 == false) {
                    log = `${message.member} ha ricevuto la 5° stella. interaction: ${user}`
                  }
                  const logchannel = message.guild.channels.cache.get(LOGCHANNEL)
                  const embed = new discord.MessageEmbed()
                  .setTitle("UTILITY LOG")
                  .setDescription(log)
                  logchannel.send({embeds: [embed]})
                })  
            } else if(reaction.message.channel.id == PROPOSTE)  {
              var counter = false
              var counter1 = false
              var log
              reaction.message.fetch()
                .then(message => {
                  if (!message.member.roles.cache.some(role => role.id == BIGBRAIN)){  
                    message.guild.roles.fetch(BIGBRAIN).then(role => {
                      message.member.roles.add(role)
                    })
                    counter1 = true
                  }
                  if (message.member.roles.cache.some(role => role.id == STELLA7)) {
                    counter = true
                    message.guild.roles.fetch(STELLA8).then(role => { 
                      message.member.roles.add(role)
                    })
                    message.guild.roles.fetch(STELLA7).then(role => { 
                      message.member.roles.remove(role)
                    })
                  }
                  if(counter == true && counter1 == true){
                    log = `${message.member} ha ricevuto Big Brain e l' 8° stella. interaction: ${user}`
                  } else if (counter == false && counter1 == true) {
                    log = `${message.member} ha ricevuto Big Brain. interaction: ${user}`
                  } else if (counter == false && counter1 == false) {
                    log = `${message.member} ha una proposta accettata. interaction: ${user}`
                  } else if (counter == true && counter1 == false) {
                    log = `${message.member} ha ricevuto l' 8° stella. interaction: ${user}`
                  }
                  const logchannel = message.guild.channels.cache.get(LOGCHANNEL)
                  const embed = new discord.MessageEmbed()
                  .setTitle("UTILITY LOG")
                  .setDescription(log)
                  logchannel.send({embeds: [embed]})
                })
            }
        }
    }catch{
        message.guild.members.fetch("598498238336729088").then(member =>{
            member.user.send("max il coso di gabbo ha fallito cabbo fai")
        
        })  

        return
    }
    
});