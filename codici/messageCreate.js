const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../variabili.json"))

function menager (message) {
    if(variabili.channelsList.includes(message.channel.id) && !message.channel.isThread()){
        try{
            message.react("<:accettato:957650857439141978>")
            message.react("<:rifiutato:957650858181554226>")
            return
        }catch{
            return
        }
        
    }
    else if(message.content=="113") //comando polizia
    {
        try{
            message.delete()
            message.channel.send("🚨 La <@&911923177314201640> Sarà Presto Qui! 🚨")
        }
        catch{
            return
        }
    }
    else if(message.content == "118")
    {
        try{
        
            message.delete()
            message.channel.send("⚕️ I <@&993151916701929583> saranno presto qui' 『 🚑 🏥 』")
        }catch{
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
        .setDescription("━━━━━━━━━━━━━━━━━\n\n**Per Ricevere Assistenza ⇨ 📩\n\nPer Segnalare Un Utente ⇨ 🚔\n\nPer Assistenza Acquisti ⇨ 💳**\n\n━━━━━━━━━━━━━━━━━")

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
        )

        message.delete()
        message.channel.send({embeds: [EmbedTicketTool], components: [rorow]})    
    }
    else if(message.content == "di.streamer" && message.channelId == "1001171326645567578")
    {
        message.channel.send({
            "content": "<@&892868856639529021>",
            "embeds": [
              {
                "title": "Hai chiamato il Ministro degli esteri",
                "description": "Hai richiamato l'attenzione del <@&892868856639529021>! arriverà il prima possibile per chiarire qualsiasi tuo dubbio.",
                "color": 7218097
              }
            ],
            "attachments": []
        })
    }
}

module.exports = {menager}