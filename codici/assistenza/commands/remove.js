const { GOVERNO, JUSTICEID, YAKUZAID, EMOJIMAKER, BIGBRAIN, PROPOSTE, CEMOJI, ASSISTENZAID, RICORSIID, ACQUISTIID, TRANSCRIPTSID, OPENTICKET, HELPERID, LOGCHANNEL, MUTATOID, ABITANTEID, GUILD } = require("./config.json")
const discord = require("discord.js")



function remove (interaction)
{
  try{ 
    if(interaction.member.roles.cache.some(role => role.id == HELPERID && interaction.channel.parent == ASSISTENZAID || role.id == YAKUZAID && interaction.channel.parent == ACQUISTIID || interaction.channel.parent == RICORSIID && role.id == JUSTICEID || role.id == GOVERNO)){
      const member = interaction.options.get("utente")
      
      if(interaction.member != member){ 
        interaction.channel.permissionOverwrites.edit(member.user, {VIEW_CHANNEL: false, SEND_MESSAGES: false})
        
        const remove = new discord.MessageEmbed()
          .setTitle("Utente Rimosso")
          .setDescription(`Da ora ${member.user} non ha più accesso al ticket`)
          .setColor("RED")
        interaction.reply({embeds: [remove]})

        const logchannel = interaction.guild.channels.cache.get(LOGCHANNEL)
        const embed = new discord.MessageEmbed()
          .setTitle("UTILITY LOG")
          .setDescription('<@' + interaction.member + '>' + 'ha rimosso' + ' <@' + member.user + '> ' + ' dal ticket')
        logchannel.send({embeds: [embed]})

      } else 
        interaction.reply({content: "❌ Non puoi rimuovere te stesso", ephemeral: true})
      
    } else 
      interaction.reply({content: "❌ Non hai i permessi necessari", ephemeral: true})
  }catch(err){
    console.log(err)
    try{
      interaction.guild.members.fetch("598498238336729088").then(member =>{
        member.user.send(`**/remove ** ${err}`)
      }) 
      
      interaction.reply({content : "❌ Qualcosa é Andato Storto", ephemeral : true})
      return 
    }catch{
      return
    }
  }     
      
}

module.exports = {remove}