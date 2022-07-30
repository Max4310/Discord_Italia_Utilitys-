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

function info (interaction,infoTickets)
{
  try{
    var members = interaction.guild.memberCount
    var boosts = interaction.guild.premiumSubscriptionCount
    var day = interaction.guild.createdAt.getDate()
    var month = interaction.guild.createdAt.getMonth() + 1
    var year = interaction.guild.createdAt.getFullYear()
    const infoembed = new discord.MessageEmbed()
      .setTitle("Discord Italia")
      .setDescription("\n ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
      .setURL("https://discord.gg/italia")
      .setColor("GREEN")
      .setFields(
      {
        "name": "Members:",
        "value": "`" + members + "`",
        "inline": true
      },
      {
        "name": "Boosts:",
        "value": "`" + boosts + "`",
        "inline": true
      },
      {
        "name": "Created:",
        "value": "`" + `${day}/${month}/${year}` + "`",
        "inline": true
      }
    )
    interaction.deferUpdate()
    const v = interaction.channel.lastMessage
    v.edit({embeds: [infoembed, servealtro], components: [rowaltro]})
    //inc ci
    
    var index = findIndex(interaction.member.user.id, infoTickets)
    if(index == null)
    {
      var ticket = {"channel":interaction.channelId,"cvt":0,"cvf":0,"cr":0,"ci":1,"id":interaction.member.user.id}
      infoTickets.push(ticket)
    }
    else
      infoTickets[index].ci ++ 
  }catch(err){
    console.log(err)
    try{
      interaction.guild.members.fetch("598498238336729088").then(member =>{
        member.user.send(`**assistenza info ** ${err}`)
      }) 
      
      interaction.reply({content : "❌ Qualcosa é Andato Storto", ephemeral : true})
      return 
    }catch{
      return
    }
  }
}

module.exports = {info}