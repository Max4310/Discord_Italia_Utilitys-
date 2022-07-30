const { GOVERNO, JUSTICEID, YAKUZAID, EMOJIMAKER, BIGBRAIN, PROPOSTE, CEMOJI, ASSISTENZAID, RICORSIID, ACQUISTIID, TRANSCRIPTSID, OPENTICKET, HELPERID, LOGCHANNEL, MUTATOID, ABITANTEID, GUILD } = require("./config.json")
const discord = require("discord.js")
const {MessageActionRow, MessageButton} = require("discord.js");

const close = new MessageActionRow()
.addComponents(
  new MessageButton()
  .setLabel("🔒")
  .setCustomId("close")
  .setStyle("DANGER")
  .setLabel("Chiudi")
)

function claimYakuza(interaction)
{
  try{
    if(interaction.member.roles.cache.some(role => role.id == YAKUZAID)  || interaction.member.permissions.has("ADMINISTRATOR")){

        interaction.message.delete()
    
        interaction.guild.channels.fetch(interaction.channelId).then(channel => {
          channel.permissionOverwrites.edit(interaction.member.id, {VIEW_CHANNEL: true, SEND_MESSAGES: true})
          interaction.reply({content: "Ticket Claimato", ephemeral: true})
        })
    
        const claimembed = new discord.MessageEmbed()
          .setTitle("Ticket Claimato")
          .setDescription(`Il Ticket sarà Gestito da ${interaction.member}`)
          .setColor("#2ECC71")
        interaction.channel.send({embeds: [claimembed], components : [close]})
    }
    else
      interaction.reply({content : "❌ Non Hai I Permessi Per Claimare Questo Ticket", ephemeral : true})
  }catch(err){
    console.log(err)
    try{
      interaction.guild.members.fetch("598498238336729088").then(member =>{
        member.user.send(`**claim yakuza ** ${err}`)
      }) 
      
      interaction.reply({content : "❌ Qualcosa é Andato Storto", ephemeral : true})
      return 
    }catch{
      return
    }
  }
}

module.exports = {claimYakuza}