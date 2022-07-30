const { GOVERNO, JUSTICEID, YAKUZAID, EMOJIMAKER, BIGBRAIN, PROPOSTE, CEMOJI, ASSISTENZAID, RICORSIID, ACQUISTIID, TRANSCRIPTSID, OPENTICKET, HELPERID, LOGCHANNEL, MUTATOID, ABITANTEID, GUILD } = require("./config.json")
const discord = require("discord.js")

function findIndex(id, infoTickets)
{
  for(var i=0;i<infoTickets.length;i++)
  {
    if(infoTickets[i].id == id) 
      return i
  }

  return null
}

function menager(member, infoTickets)
{
    try{
        var index = findIndex(member.user.id,infoTickets)
        if(index != null){
            var vert;
            var verf;
            var rep;
            var inf;
            if(data.cvt != 0){
            vert = `\nBottone Verifica(con successo): ${data.cvt} volte`
            } else {
            vert = ""
            }
            if(data.cvf != 0){
            verf = `\nBottone Verifica(Già verificato): ${data.cvf} volte`
            } else {
            verf = ""
            }
            if(data.cr != 0){
            rep = `\nBottone Reputazione: ${data.cr} volte`
            } else {
            rep = ""
            }
            if(data.ci != 0){
            inf = `\nBottone Informazioni: ${data.ci} volte`
            } else {
            inf = ""
            }
            
            const embed = new discord.MessageEmbed()
            .setTitle(`**TICKET TOOL** *id: ${data.jid}*`)
            
            if(vert == "" && verf == "" && rep == "" && inf == ""){
            embed.setDescription(`${member} ha utilizzato l'assistenza automatica ma non ha fatto niente`)
            } else {
            embed.setDescription(`${member} ha utilizzato l'assistenza automatica:${vert}${verf}${rep}${inf}`)
            }
            embed.setFooter({text:"è uscito dal server"})
            member.guild.channels.cache.get(TRANSCRIPTSID).send({embeds: [embed]})
            
            const x = member.guild.channels.cache.get(infoTickets[index])
            x.delete()
            infoTickets.splice(index)
        }
    }catch(err){
        console.log(err)
        try{
            member.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send(`**Member left ** ${err}`)
            
            })  
            return 
        }catch{
            return
        }
    }
    
}

module.exports = {menager}