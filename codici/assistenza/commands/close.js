const { GOVERNO, JUSTICEID, YAKUZAID, EMOJIMAKER, BIGBRAIN, PROPOSTE, CEMOJI, ASSISTENZAID, RICORSIID, ACQUISTIID, TRANSCRIPTSID, OPENTICKET, HELPERID, LOGCHANNEL, MUTATOID, ABITANTEID, GUILD } = require("./config.json")
const discord = require("discord.js")
const { createTranscript } = require('discord-html-transcripts');

async function close (interaction)
{
  try{
    var tipo;
    if(interaction.channel.parentId == ASSISTENZAID){
      tipo = "Assistenza"
    } else if(interaction.channel.parentId == RICORSIID){
      tipo = "Ricorso"
    } else if(interaction.channel.parentId == ACQUISTIID){
      tipo = "Acquisti"
    }
    else
    {
      return interaction.reply({content : "❌ Non Puoi Eseguire In Questo Canale", ephemeral :true})
    }
    interaction.reply({content : "👍 Il Ticket Verrà Eliminato Tra 5 Secondi" , ephemeral : true})

    const attachment = await createTranscript(interaction.channel, {
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
      {
        "name": "<:cosa4:996703800788271194>**Reason**⠀⠀⠀",
        "value": "`" + interaction.options.get("reason").value + "`",
        "inline": false
      }
    )
    interaction.guild.channels.cache.get(TRANSCRIPTSID).send({embeds: [transcriptEmbed], files: [attachment]})

    setTimeout(() =>{
      interaction.channel.delete()
    },1000*5)
  }catch(err){
    console.log(err)
    try{
      interaction.guild.members.fetch("598498238336729088").then(member =>{
        member.user.send(`**/close ** ${err}`)
      }) 
      
      interaction.reply({content : "❌ Qualcosa é Andato Storto", ephemeral : true})
      return 
    }catch{
      return
    }
  }
}

module.exports = {close}