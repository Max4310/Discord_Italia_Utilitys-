const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../../variabili.json"))

function elimina (comando){
    try{
        var canale=comando.guild.channels.cache.get(variabili.presentazioni)
        var idMessage=comando.options.getString("message")
        

        canale.messages.fetch(idMessage)
            .then(message => {
                message.delete()
                var stella_2 = comando.guild.roles.cache.get(variabili.stella2)
                var stella_3 = comando.guild.roles.cache.get(variabili.stella3)
                var membro = comando.guild.members.cache.get(message.author.id)

                membro.roles.add(stella_2)
                membro.roles.remove(stella_3)

                var logg=comando.guild.channels.cache.get(variabili.log)

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
    }catch(err){
        console.log(err)
        try{
            comando.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max /delete ha fallito cabbo fai")
            
            })  
    
            comando.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return
        }catch{
            return
        }
    }
}

module.exports = {elimina}