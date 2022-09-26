const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../../variabili.json"))

function is_verificato(membro)
{
    var is=false;

    var j=0
    while(membro._roles[j] != undefined && is==false)
    {
        if(membro._roles[j] == variabili.abitante)
            is=true

        j++
    }

    
    return is;
}

function verifica (comando){
    try{
        var utente = comando.options.getUser("target");
        var membro = comando.guild.members.cache.get(utente.id) //prendo il membro da per metterli abitante

        if(utente != comando.user)
        {
            if(membro.user.bot==false) // verifcio se sia un bot 
            {
                if(is_verificato(membro)==false) // verifico che non sia gia verificato 
                {
                    var role = comando.guild.roles.cache.get(variabili.abitante)
                    membro.roles.add(role) //gli metto abitante se tutte le condizioni sono verificate 
                    // ho scelto di fare cosi invece che di usare && per poter classificare i vari messaggi da inviare all'operatore
    
                    comando.reply({
                        "content": null,
                        "embeds": [
                        {
                            "title": "**"+membro.user.tag+" è Verificato**",
                            "description": "",
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
    
            var canale = comando.guild.channels.cache.get(variabili.log)
    
            canale.send("<@"+comando.member+"> ha usato il comando verifica su <@"+membro.id+">") //messaggio di log 
        }
        else
            comando.reply({content : "❌ Non Puoi Usare Questo Comando Su Te Stesso"})

        
        return
    }catch(err){
        console.log(err)
        try{
            comando.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("**/verifica** "+err)
            
            })  
    
            comando.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return
        }catch{
            return
        }
        
    }
}

module.exports = {verifica}