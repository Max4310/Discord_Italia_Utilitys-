const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../variabili.json"))
const bannedParent = ["891739229846118462","893844656029306950","893561541302054973","980769226950320148","902593495523524638","894208493597372507"]
const bannedWord = ["113","118","888","di.verifica","di.recensione"]


function sleep(s){
    var now = new Date().getTime();
    while(new Date().getTime() < now + (s*1000)){ /* non faccio niente */ } 
}

function pattuglia(id)
{
    const pattuglie = require(path.join(__dirname,"../pattuglie.json"))
                                
    for(var cont=0;cont<pattuglie.length;cont++)
    {
        if(pattuglie[cont].includes(id))
            return (cont+1)   
    } 

    return null
}

async function menager (message,client) {
    try{
        if(message.channelId == "939919652950261860" || message.guildId == "996087822865936504" || bannedParent.includes(message.channel.parentId) || bannedWord.includes(message.content)) return
        sleep(2)

        message.guild.fetchAuditLogs({
            limit: 1,
            type: "MESSAGE_DELETE",
        }).then((autore) => {
            if(autore == null) return
            var { executor, target, extra } = autore.entries.first()
            if(target == null || extra == null) return
            if(target.id == message.author.id && extra.channel.id == message.channelId)
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
    
                    if(ver == true) //è nella pula
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
                            
                        }
                        
                        //console.log(pattuglia(membro.user.id))
                        switch(pattuglia(membro.user.id))
                        {
                            case 1:
                                var p = "996088525827100795"
                                break;
                            case 2:
                                var p = "996088571167506493"
                                break;
                            case 3:
                                var p = "996088615711015022"
                                break;
                            case 4:
                                var p = "996088669364568147"
                                break;
                            case 5:
                                var p = "996088708900073482"
                                break;
                            case 6:
                                var p = "996088752504057906"
                                break;
                            case 7:
                                var p = "1000029442472693870"
                                break;
                            default:
                                var p = "1000029286088069230"
                                break;
                        }
                        client.guilds.cache.get("996087822865936504").channels.cache.get(p).send({embeds : [notifica], components : [riga]})
                    }
                       
                })
                .catch((err) => {
                    console.log(err)
                    return
                })
            }       
        }).catch((err) => {
            console.log(err)
            return
        })
        
    }catch(err){
        console.log(err)
        try{
            message.channel.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send(`**Message Delete:** ${err}`)
            
            })  
            .catch(() => {
                return
            })
            return 
        }catch{
            return
        }
    }   
}

module.exports = {menager}