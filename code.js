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

const tempo_mute=60*60*5;
const tempo_reset=60*60*60*24;
const mute_totale=10;
var i=0;
var inizio_nute=false;

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
           
           
        })
    })

    console.log("bot online")
})

// il comando è stato creato nel "main_code" 
client.on("interactionCreate", (comando)=>{
    if(comando.isCommand==false) return

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
    
    
})