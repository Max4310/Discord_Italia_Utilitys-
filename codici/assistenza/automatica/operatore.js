const { GOVERNO, JUSTICEID, YAKUZAID, EMOJIMAKER, BIGBRAIN, PROPOSTE, CEMOJI, ASSISTENZAID, RICORSIID, ACQUISTIID, TRANSCRIPTSID, OPENTICKET, HELPERID, LOGCHANNEL, MUTATOID, ABITANTEID, GUILD } = require("./config.json")
const { STELLA1, STELLA2, STELLA3, STELLA4, STELLA5, STELLA6, STELLA7, STELLA8, STELLA9, STELLA0 } = require("./config.json")
const { GRADO1, GRADO2, GRADO3, GRADO4, GRADO5, GRADO6, GRADO7 } = require("./config.json")
const discord = require("discord.js")
const {MessageActionRow, MessageButton} = require("discord.js");

function findIndex(id,infoTickets)
{
  for(var i=0;i<infoTickets.length;i++)
  {
    if(infoTickets[i].id == id) 
      return i
  }

  return null
}

const EmbedClaim = new discord.MessageEmbed()
  .setTitle("Benvenuto nell'Assistenza di Discord Italia")
  .setDescription("A Breve Un Nostro Operatore Risponderà Alle Sue Richieste.")
  .setColor("GREEN")

const ClaimRow = new MessageActionRow()
  .addComponents(
    new MessageButton()
      .setLabel  ("🙋‍♂️ Claim")
      .setCustomId("claim")
      .setStyle("PRIMARY"),
  )

function operatore(interaction,infoTickets)
{
  try{
    interaction.deferUpdate()    
    const helper = interaction.guild.roles.cache.get(HELPERID)
    interaction.channel.permissionOverwrites.edit(helper, {VIEW_CHANNEL: true, SEND_MESSAGES: false})
    interaction.channel.permissionOverwrites.edit(interaction.member, {SEND_MESSAGES : true})
    const editm = interaction.channel.lastMessage
    editm.edit({content: "Benvenuto nell'Assistenza di Discord Italia" , embeds: [EmbedClaim], components: [ClaimRow]})
    interaction.channel.send('<@&' + HELPERID + '> ').then(msg => {msg.delete()})
    var index = findIndex(interaction.member.user.id, infoTickets)
    var vert = null;
    var verf = null;
    var rep= null;
    var inf = null;
    if(index == null)
    {
      inf = "\nNon è Successo Nulla"
    }
    else
    {
      if(infoTickets[index].cvt != 0)
        vert = `\nBottone Verifica(con successo): ${infoTickets[index].cvt} volte`
      
      if(infoTickets[index].cvf != 0)
        verf = `\nBottone Verifica(Già verificato): ${infoTickets[index].cvf} volte`
      
      if(infoTickets[index].cr != 0)
        rep = `\nBottone Reputazione: ${infoTickets[index].cr} volte`
      
      if(infoTickets[index].ci != 0)
        inf = `\nBottone Informazioni: ${infoTickets[index].ci} volte`
      
    }
    const embed = new discord.MessageEmbed()
      .setTitle(`**Assistenza Automatica**`)
      if(vert == null && verf == null && rep == null && inf == null){
        embed.setDescription(`${interaction.member.user} ha utilizzato l'assistenza automatica ma non ha fatto niente`)
      } else {
        embed.setDescription(`${interaction.member.user} ha utilizzato l'assistenza automatica:` + vert + verf + rep + inf)
      }
    embed.setFooter({text:"Passaggio a ticket con operatore"})
    interaction.guild.channels.cache.get(TRANSCRIPTSID).send({embeds: [embed]})
    infoTickets.splice(index,1)
  }catch(err){
    console.log(err)
    try{
      interaction.guild.members.fetch("598498238336729088").then(member =>{
        member.user.send(`**contatto operatore ** ${err}`)
      }) 
      
      interaction.reply({content : "❌ Qualcosa é Andato Storto", ephemeral : true})
      return 
    }catch{
      return
    }
  }
  
}

module.exports = {operatore}