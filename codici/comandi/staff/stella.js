const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../../variabili.json"))

function stella (comando){
    try{
        var utente = comando.options.getUser("target");
        var membro = comando.guild.members.cache.get(utente.id) //prendo il membro


        if(utente == comando.user)
        {
            var i=0;
            var is = false
            while(variabili.stelle[i] != undefined && is == false) //scorro tutto l'array dove ci sono i ruoli stella IN ORDINE 
            {
                var j=0
                while(membro._roles[j] != undefined) // ogni ruolo stella lo confronto con i ruoli che ha l'utente
                {
                    if(variabili.stelle[i]==membro._roles[j]) //appena ne trovo uno imposto "is" a true 
                        is=true;
                    
                    j++;
                }
                i++;
            }

            if (is == true) //se ho trovato che l'utente ha almeno un ruolo stella 
            {
                if (i==1 || i==2 || i==3 || i==5)// in caso in cui gli helper possano aiutate      (stella 2,3,4,6) -> (array 1,2,3,5) 
                {
                    var stella_attuale = comando.guild.roles.cache.get(variabili.stelle[i-1]) //prendo la stella precendente 
                    var stella_successiva = comando.guild.roles.cache.get(variabili.stelle[i]) // e la stella che ha 

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
                var stellina = comando.guild.roles.cache.get(variabili.stelle[0])

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
            

            var canale = comando.guild.channels.cache.get(variabili.log)

            canale.send("<@"+comando.member+"> ha usato il comando stella su <@"+membro.id+">") //log 
        }
        else
            comando.reply({content : "❌ Non Puoi Usare Questo Comando Su Te Stesso", ephemeral : true})
        return
    }catch(err){
        try{
            comando.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("**/stella** "+err)
            
            })  
    
            comando.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return
        }catch{
            return
        }
    }
}

module.exports = {stella}