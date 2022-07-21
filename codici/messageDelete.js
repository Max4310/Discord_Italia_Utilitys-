const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../variabili.json"))

function menager (message) {
    try{
        message.guild.fetchAuditLogs({
            limit: 1,
            type: "MESSAGE_DELETE",
        })
        .then (autore => {
            try{
                var { executor, target } = autore.entries.first()
            
                if(executor.id != message.author.id && autore.entries.first().extra.channel.id == message.channelId && target.id == message.author.id && message.channelId != "991451005843689482" && message.channel.parentId != "891739229846118462" && message.channel.parentId != "946136791151439933")
                {
                    message.guild.members.fetch(executor.id)
                    .then(membro =>{
                        var i=0
                        var ver = false
                        while(i<membro._roles.length && ver == false)
                        {
                            if(membro._roles[i] == variabili.pula)
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
                                message.guild.channels.cache.get(variabili.info).send({embeds : [notifica], components : [riga]})
                            }
                            else
                            {
                                message.guild.channels.cache.get(variabili.info).send({embeds : [notifica/*,fotos*/], components : [riga]})
                                
                            }
                        }   
                    })
                }
  
            }catch{
                return
            }
            
        })
    }catch{
        try{
            message.channel.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max il message delete ha fallito cabbo fai")
            
            })  
    
            //interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return 
        }catch{
            return
        }
    }    
}

module.exports = {menager}