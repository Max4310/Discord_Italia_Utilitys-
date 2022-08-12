const { GOVERNO, JUSTICEID, YAKUZAID, EMOJIMAKER, BIGBRAIN, PROPOSTE, CEMOJI, ASSISTENZAID, RICORSIID, ACQUISTIID, TRANSCRIPTSID, OPENTICKET, HELPERID, LOGCHANNEL, MUTATOID, ABITANTEID, GUILD } = require("./config.json")
const discord = require("discord.js")
const {MessageActionRow, MessageButton} = require("discord.js");

const ricorso = new discord.MessageEmbed()
  .setTitle("Benvenuto nella sezione ricorsi di Discord Italia")
  .setDescription("La preghiamo di procedere con la segnalazione, riceverà una risposta nel minor tempo possibile")
  .setColor("YELLOW")

const close = new MessageActionRow()
.addComponents(
  new MessageButton()
  .setLabel("🔒")
  .setCustomId("close")
  .setStyle("DANGER")
  .setLabel("Chiudi")
)

function ricorsi (interaction)
{
  try{
    interaction.guild.channels.create('ticket-' + interaction.user.username, {
      parent: (RICORSIID),
      topic: interaction.user.id,
      permissionOverwrites: [
        {
          id: interaction.user.id,
          allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
        },
        {
          id: interaction.guild.roles.everyone,
          deny: ['VIEW_CHANNEL'],
        },
      ],
      type: 'text',
    }).then( c => {
      interaction.reply({ content: 'Il tuo ticket è stato aperto ➜ ' + '<#' + c.id + '>' , ephemeral: true })
      c.send({content: undefined, embeds: [ricorso], components : [close]})
      c.send({content:"<@&" + JUSTICEID + ">"+`${interaction.member.user}`}).then(msg => {
        msg.delete()
      })
      .catch(()=>{
        return
      })
    }) 
  }catch(err){
    console.log(err)
    try{
      interaction.guild.members.fetch("598498238336729088").then(member =>{
        member.user.send(`**Apre Assistenza ** ${err}`)
      }) 
      
      interaction.reply({content : "❌ Qualcosa é Andato Storto", ephemeral : true})
      return 
    }catch{
      return
    }
  }
      
}

module.exports = {ricorsi}