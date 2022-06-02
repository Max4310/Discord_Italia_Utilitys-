const { channel } = require("diagnostics_channel");
const Discord=require("discord.js");
const { cp } = require("fs");
const { Server } = require("http");
const { type } = require("os");
const internal = require("stream");
const client = new Discord.Client(
    {intents: ["GUILDS", "GUILD_MESSAGES","GUILD_WEBHOOKS","GUILD_INTEGRATIONS","GUILD_MEMBERS"]}
)
client.login("")


const abitante="895325493237272647" /*cambia con il ruolo abitante*/
const mutato="978669080196308992" /*cambiare con il ruolo mutato*/
const stella1="923227838524575794" /*mettere il ruolo prima stella*/ //SCOMMENTA NELLA FUNZIONE DI RIPRISTINA 
const stella2="923228316541010011" //mettere il ruolo 2 stella
const stella3="923228263814422599" //mettere il ruolo 3 stella

const log="928669343535988736" /*cambiare con il canale log*/
const info="947597992238673940" /*cambiare con la chat della polizia*/
const presentazioni="902903625586720798" //cambiare con quello di presentazioni 

const stelle = ["923227838524575794","923228316541010011","923228263814422599","923228260161167380","923228267224371280","923228308466966608","923228320768876596","923228312900370473","923228296601305118","923228325592305664"]
//cambiare con gli id delle stelle  IN ORDINE SENNO SI SBALLA TUTTO
const gradi = ["946120997881380964","946130972901011466","946131519230070925","946131628558778379","946131754215964753","946131907568082965"]
//cambiare con gli id dei gradi
const gold = "893851166239252530" //cambia con l'utente gold 
const vip = "893844096957952017" //cambia con l'utente vip 


//const abitante="951188354370764910" /*cambia con il ruolo abitante*/
//const mutato="951188059754467389" /*cambiare con il ruolo mutato*/
//const stella1="980853388826796082" /*mettere il ruolo prima stella*/ //SCOMMENTA NELLA FUNZIONE DI RIPRISTINA 
//const stella2="957301782130856046" //mettere il ruolo 2 stella
//const stella3="957301787919020132" //mettere il ruolo 3 stella

//const stelle = ["980853388826796082", "957301782130856046", "957301787919020132", "980849025546846210", "980849065183043644", "980853153429852193", "980853201307856937", "980853229363539968", "980853256202891304", "980853280152379413"]
//cambiare con gli id delle stelle  IN ORDINE SENNO SI SBALLA TUTTO
//const gradi = ["980853588093993050","980853649142075392","980853715529506906","980853733116235836","980853792859885638","980853806206173234"]
//cambiare con gli id dei gradi
//const gold = "981694340009177119" //cambia con l'utente gold 
//const vip = "981694367611908097" //cambia con l'utente vip 

//const log="957328086251221042" /*cambiare con il canale log*/
//const info="957328059030183936" /*cambiare con la chat della polizia*/
//const presentazioni="957328105842810881" //cambiare con quello di presentazioni 

const tempo_mute=1000*60*60*5;
const tempo_reset=1000*60*60*60*24;
const mute_totale=10;
var i=0;
var inizio_nute=false;

const RICCHI = "895991422187098122" //GIA CAMBIATO

function cont()
{
    i=0;
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


client.on("ready",()=>{
    
    client.guilds.cache.forEach(guild=>{ 

        guild.commands.create({
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
           
        })
    })

    console.log("bot online")
})

client.on("messageCreate", message =>{
    if(message.content=="113") //comando polizia
    {
        message.delete()

        message.channel.send("🚨 La <@&911923177314201640> Sarà Presto Qui! 🚨")
    }
    else if(message.content=="888" && message.channel.id==RICCHI) //comano yakuza
    {
        message.delete()

        message.channel.send("💀 **ATTENZIONE!** La <@&970721741615824926> Sarà Presto Qui! 💀")
    }

    if (message.mentions.members.first() != undefined)
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
            message.channel.send("")
    }

})
 
client.on("interactionCreate", (comando)=>{
    //if(comando.isCommand==false) return

    if(comando.commandName=="delete")
    {
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
    }

    if(comando.commandName=="mute")     //se è stato fatto il comando /mute
    {
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
                    cont();
                },tempo_reset); //resetta il cont dei mute fatti dopo un gionro
                
            }

            if(i<mute_totale) //verifico se si hanno ancora i mute giornalieri
            {
                if(is_mute(membro)==false)
                {
                    i++ //gli incremento il numero dei mute fatti
                    console.log(i)

                    var role=comando.guild.roles.cache.get(abitante)
                    membro.roles.remove(role) //gli levo abitante
                    role=comando.guild.roles.cache.get(mutato)
                    membro.roles.add(role) //gli metto il ruolo mutato
                    
                    

                    var risposta = new Discord.MessageEmbed()  //metto in "messaggio" il messaggio di riuscita dell'operazione
                        .setTitle("**DISCORD ITALIA**\n\n")
                        .setColor("#0b39db")
                        .setDescription("───────────────────────────────────────\nOperazione Autorizzata:  **Utente Modificato**")

                    
                    
                    client.users.fetch(utente.id, false).then((utente) => {
                        utente.send(`**Sei Stato Mutato Da Un Moderatore Per 5 Minuti**\nMotivo: **`+reason+`**\nSe Hai Un Richiamo Preghiamo Di Aprire Un Ricorso Nella Chat <#893589753222545438>`); 
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

                    setTimeout(function (){
                        ripristina(membro , comando);
                    },tempo_mute);  //resetto il tutto
                    
                }
                else
                {
                    var risposta = new Discord.MessageEmbed()
                    .setTitle("**DISCORD ITALIA**\n\n")
                    .setColor("#0b39db")
                    .setDescription("───────────────────────────────────────\nOperazione Non Autorizzata:  **Utente Gia Mutato**")
                }
                
                    
                
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
    }
    
    if(comando.commandName=="verifica" && comando.channel.parentId==assistenza) // /verifica
    //controllo che il comando sia verifica e che l'operatore lo abbia fatto in un ticket (quindi in una chat nella categoria assitenza)
    {
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
    }

    if(comando.commandName=="stella" && comando.channel.parentId==assistenza) // /stella comando che capisce a che stella sei e ti da la successiva
    //controllo che il comando sia stella e che l'operatore lo abbia fatto in un ticket (quindi in una chat nella categoria assitenza)
    {
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
                    "content": "<@892866382729977896>",
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
    }

    if(comando.commandName=="grado" && comando.channel.parentId==assistenza) // /grado TESTING
    {
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
    }

    if((comando.commandName=="stella" || comando.commandName=="verifica" || comando.commandName=="grado") && comando.channel.parentId != assistenza)
    {
        comando.reply({content : "Non Puoi Fare Questo Comando Fuori Da Un Ticket", ephemeral: true})
        return
    }
})