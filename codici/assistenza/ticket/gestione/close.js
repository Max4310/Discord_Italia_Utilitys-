const { GOVERNO, JUSTICEID, YAKUZAID, EMOJIMAKER, BIGBRAIN, PROPOSTE, CEMOJI, ASSISTENZAID, RICORSIID, ACQUISTIID, TRANSCRIPTSID, OPENTICKET, HELPERID, LOGCHANNEL, MUTATOID, ABITANTEID, GUILD } = require("./config.json")
const discord = require("discord.js")
const {MessageActionRow, MessageButton} = require("discord.js");
const { createTranscript } = require('discord-html-transcripts');
const path = require("path")
const variabili = require(path.join(__dirname,"../../../../variabili.json"))

async function close (interaction)
{

  try{
    let cosoFrank = [variabili.Cameraman, variabili.Esaminatore, variabili.Creator, variabili.Producer, variabili.C_esteri, variabili.M_esteri]

    /*"Cameraman":"1066410855673114735",
    "Esaminatore":"1066410881229000825",
    "Creator":"1066410899340017775",
    "Producer":"1066410916842852382",
    "C_esteri":"1066410956810354712",
    "M_esteri":"1066410973319147601"*/

    console.log(interaction.channel.parentId)

    if( interaction.member.permissions.has("ADMINISTRATOR") || 
    (interaction.member.roles.cache.some(role => role.id == YAKUZAID) && interaction.channel.parentId == ACQUISTIID) || 
    (interaction.member.roles.cache.some(role => role.id == HELPERID) && interaction.channel.parentId == ASSISTENZAID) || 
    (interaction.member.roles.cache.some(role => role.id == JUSTICEID) && interaction.channel.parentId == RICORSIID) ||

    (interaction.member.roles.cache.some(role => role.id == variabili.Cameraman) || 
    interaction.member.roles.cache.some(role => role.id == variabili.Esaminatore) || 
    interaction.member.roles.cache.some(role => role.id == variabili.Creator) || 
    interaction.member.roles.cache.some(role => role.id == variabili.Producer) || 
    interaction.member.roles.cache.some(role => role.id == variabili.C_esteri) || 
    interaction.member.roles.cache.some(role => role.id == variabili.M_esteri) )
    && interaction.channel.parentId == variabili.categoriaAffiliazioni)

    {
      var tipo;
      if(interaction.channel.parentId == ASSISTENZAID){
        tipo = "Assistenza"
      } else if(interaction.channel.parentId == RICORSIID){
        tipo = "Ricorso"
      } else if(interaction.channel.parentId == ACQUISTIID){
        tipo = "Acquisti"
      }
      else if(interaction.channel.parentId == variabili.categoriaAffiliazioni){
        tipo = "Affiliazioni"
      }
      else
      {
        return interaction.reply({content : "❌ Non Puoi Eseguire In Questo Canale", ephemeral :true})
      }


      interaction.reply({content : "👍 Il Ticket Verrà Eliminato Tra 5 Secondi" , ephemeral : true})
      const attachment = await createTranscript(interaction.channel,
        {
            limit: -1,
            fileName: "transcript.html",
            returnBuffer: false
        });

      const transcriptEmbed = new discord.MessageEmbed()
        .setTitle("TICKET TOOL")
        .setFields(
            {
            "name": "<:cosa2:996401964365643849>**Opened by**⠀⠀⠀",
            "value": "<@" + interaction.channel.topic + ">",
            "inline": true
            },
            {
            "name": "<:cosa3:996401962935406612>**Closed by**⠀⠀⠀",
            "value": "<@" + interaction.member + ">",
            "inline": true
            },
            {
            "name": "<:cosa:996401966194380850>**Type**⠀⠀⠀",
            "value": "`" + tipo + "`",
            "inline": true
            },
        )

      interaction.guild.channels.cache.get(TRANSCRIPTSID).send({embeds: [transcriptEmbed], files: [attachment]})
      setTimeout(() =>{
        try{
          interaction.channel.delete()
        }catch{
          return
        }
      },1000*5)
    }
    else
      interaction.reply({content : "❌ Non Hai I Permessi Necessari Per Eseguire Questa Azione" , ephemeral : true})
  }catch(err){
    console.log(err)
    try{
      interaction.guild.members.fetch("598498238336729088").then(member =>{
        member.user.send(`**chiude il ticket ** ${err}`)
      }) 
      
      interaction.reply({content : "❌ Qualcosa é Andato Storto", ephemeral : true})
      return 
    }catch{
      return
    }
  }
}

module.exports = {close}