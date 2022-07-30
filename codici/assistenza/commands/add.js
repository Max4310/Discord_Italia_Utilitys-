const { GOVERNO, JUSTICEID, YAKUZAID, EMOJIMAKER, BIGBRAIN, PROPOSTE, CEMOJI, ASSISTENZAID, RICORSIID, ACQUISTIID, TRANSCRIPTSID, OPENTICKET, HELPERID, LOGCHANNEL, MUTATOID, ABITANTEID, GUILD } = require("./config.json")
const discord = require("discord.js")



function add(interaction)
{
  try{
    if(interaction.member.roles.cache.some(role => {(role.id == HELPERID && interaction.channel.parent == ASSISTENZAID) || (role.id == YAKUZAID && interaction.channel.parent == ACQUISTIID) || (interaction.channel.parentID == RICORSIID && role.id == JUSTICEID) || (role.id == GOVERNO)})){
      
      const member = interaction.options.get("utente")

      if(interaction.member != member){ 
        interaction.channel.permissionOverwrites.edit(member.user, {VIEW_CHANNEL: true, SEND_MESSAGES: true})
        
        const add = new discord.MessageEmbed()
          .setTitle("Utente Aggiunto")
          .setDescription(`Da ora ${member.user} ha accesso al ticket`)
          .setColor("GREEN")
        interaction.reply({embeds: [add]})

        const embed = new discord.MessageEmbed()
          .setTitle("UTILITY LOG")
          .setDescription('<@' + interaction.member + '>' + 'ha aggiunto' + ' <@' + member.user + '> ' + ' al ticket')

        interaction.guild.channels.cache.get(LOGCHANNEL).send({embeds: [embed]})
      } 
      else 
        interaction.reply({content: "❌ Non puoi aggiungere te stesso", ephemeral: true})
      
    } 
    else       
        interaction.reply({content: "❌ Non hai i permessi necessari", ephemeral: true})
  }catch(err){
    console.log(err)
    try{
      interaction.guild.members.fetch("598498238336729088").then(member =>{
        member.user.send(`**/add ** ${err}`)
      }) 
      
      interaction.reply({content : "❌ Qualcosa é Andato Storto", ephemeral : true})
      return 
    }catch{
      return
    }
  }

      
}

module.exports = {add}