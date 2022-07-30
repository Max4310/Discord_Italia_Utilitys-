const { GOVERNO, JUSTICEID, YAKUZAID, EMOJIMAKER, BIGBRAIN, PROPOSTE, CEMOJI, ASSISTENZAID, RICORSIID, ACQUISTIID, TRANSCRIPTSID, OPENTICKET, HELPERID, LOGCHANNEL, MUTATOID, ABITANTEID, GUILD } = require("./config.json")
const { STELLA1, STELLA2, STELLA3, STELLA4, STELLA5, STELLA6, STELLA7, STELLA8, STELLA9, STELLA0 } = require("./config.json")
const { GRADO1, GRADO2, GRADO3, GRADO4, GRADO5, GRADO6, GRADO7 } = require("./config.json")
const discord = require("discord.js")
const {MessageActionRow, MessageButton} = require("discord.js");

const servealtro = new discord.MessageEmbed()
  .setTitle("⠀Le Serve Altro?⠀")
  .setDescription("✔ Per Continuare Le Richieste\n✖ Per Chiudere Il Ticket")
  .setColor("GREEN")

const rowaltro = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setEmoji("✔")
    .setCustomId("altrosi")
    .setStyle("SUCCESS"),
    new MessageButton()
    .setEmoji("✖")
    .setCustomId("chiudi")
    .setStyle("DANGER")
  )

function findIndex(id,infoTickets)
{
  for(var i=0;i<infoTickets.length;i++)
  {
    if(infoTickets[i].id == id) 
      return i
  }

  return null
}




const verificagood = new discord.MessageEmbed()
  .setTitle("Sei Stato Verificato con Successo!")
  .setDescription("Buona Permanenza sul Server")
  .setColor("GREEN")

const verificameh = new discord.MessageEmbed()
  .setTitle("Sei Gia' un Abitante!")
  .setDescription("Hai già eseguito la verifica in passato, hai l'accesso al server")
  .setColor("GREEN")

function verifica(interaction, infoTickets)
{
  try{
    if(!interaction.member.roles.cache.some(role => role.id == ABITANTEID) && !interaction.user.bot){
        interaction.member.roles.add(interaction.guild.roles.cache.get(ABITANTEID))
        interaction.member.roles.add(interaction.guild.roles.cache.get(STELLA1))
        //L'UTETNTE E' ORA VERIFICATO

        interaction.deferUpdate()
        const v = interaction.channel.lastMessage
        v.edit({embeds: [verificagood, servealtro], components: [rowaltro]})
        var index = findIndex(interaction.member.user.id,infoTickets)

        if(index == null)
        {
          var ticket = {"channel":interaction.channelId,"cvt":0,"cvf":1,"cr":0,"ci":0,"id":interaction.member.user.id}
          infoTickets.push(ticket)
        }
        else
          infoTickets[index].cvf ++
      }
      else 
      {
        const v = interaction.channel.lastMessage
        interaction.deferUpdate()
        v.edit({embeds: [verificameh, servealtro], components: [rowaltro]})

        if(index == null)
        {
          var ticket = {"channel":interaction.channelId,"cvt":1,"cvf":0,"cr":0,"ci":0,"id":interaction.member.user.id}
          infoTickets.push(ticket)
        }
        else
          infoTickets[index].cvt ++
    }
  }catch(err){
    console.log(err)
    try{
      interaction.guild.members.fetch("598498238336729088").then(member =>{
        member.user.send(`**verifica assistenza** ${err}`)
      }) 
      
      interaction.reply({content : "❌ Qualcosa é Andato Storto", ephemeral : true})
      return 
    }catch{
      return
    }
  }
}

module.exports = {verifica}