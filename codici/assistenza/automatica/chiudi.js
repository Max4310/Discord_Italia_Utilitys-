const { GOVERNO, JUSTICEID, YAKUZAID, EMOJIMAKER, BIGBRAIN, PROPOSTE, CEMOJI, ASSISTENZAID, RICORSIID, ACQUISTIID, TRANSCRIPTSID, OPENTICKET, HELPERID, LOGCHANNEL, MUTATOID, ABITANTEID, GUILD } = require("./config.json")
const { STELLA1, STELLA2, STELLA3, STELLA4, STELLA5, STELLA6, STELLA7, STELLA8, STELLA9, STELLA0 } = require("./config.json")
const { GRADO1, GRADO2, GRADO3, GRADO4, GRADO5, GRADO6, GRADO7 } = require("./config.json")
const discord = require("discord.js")
const {MessageActionRow, MessageButton} = require("discord.js");

function findIndex(id, infoTickets)
{
  for(var i=0;i<infoTickets.length;i++)
  {
    if(infoTickets[i].id == id) 
      return i
  }

  return null
}

function chiudi (interaction, infoTickets)
{
  try{
    interaction.reply({content : "👍 Il Ticket Verrà Eliminato Tra 5 Secondi" , ephemeral : true})

    setTimeout(() =>{
      interaction.channel.delete()
    },1000*5)

    var index = findIndex(interaction.member.user.id,infoTickets)
    const embed = new discord.MessageEmbed()
      .setTitle(`**Assistenza Automatica**`)
      if(index == null){
        embed.setDescription(`${interaction.member.user} ha utilizzato l'assistenza automatica ma non ha fatto niente`)
      } else {
        embed.setDescription(
        `${interaction.member.user} ha utilizzato l'assistenza automatica:\n` + 
        `Bottone Verifica(con successo): ${infoTickets[index].cvt} volte\n` +
        `Bottone Verifica(Già verificato): ${infoTickets[index].cvf} volte\n` + 
        `Bottone Reputazione: ${infoTickets[index].cr} volte\n` + 
        `Bottone Informazioni: ${infoTickets[index].ci} volte`)
      }
    embed.setFooter({text:"Passaggio a ticket con operatore"})
    interaction.guild.channels.cache.get(TRANSCRIPTSID).send({embeds: [embed]})
    infoTickets.splice(index,1)
  }catch(err){
    console.log(err)
    try{
      interaction.guild.members.fetch("598498238336729088").then(member =>{
        member.user.send(`**chiudi il ticket ass automatica ** ${err}`)
      }) 
      
      interaction.reply({content : "❌ Qualcosa é Andato Storto", ephemeral : true})
      return 
    }catch{
      return
    }
  }
}

module.exports = {chiudi}
