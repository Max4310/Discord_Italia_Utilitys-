const { GOVERNO, JUSTICEID, YAKUZAID, EMOJIMAKER, BIGBRAIN, PROPOSTE, CEMOJI, ASSISTENZAID, RICORSIID, ACQUISTIID, TRANSCRIPTSID, OPENTICKET, HELPERID, LOGCHANNEL, MUTATOID, ABITANTEID, GUILD } = require("./config.json")
const discord = require("discord.js")
const {MessageActionRow, MessageButton} = require("discord.js");

const acquisto = new discord.MessageEmbed()
  .setTitle("Acquisti")
  .setDescription("Benvenuto nell'Assistenza Clienti di Discord Italia!\nUn Operatore Risponderà il Prima Possibile alle Sue Richieste.")
  .setColor("#2ECC71")

const ClaimRow2 = new MessageActionRow()
  .addComponents(
    new MessageButton()
      .setLabel  ("🙋‍♂️ Claim")
      .setCustomId("claim2")
      .setStyle("PRIMARY"),
  )

function acquisti (interaction){
  try{
    interaction.guild.channels.create('ticket-' + interaction.user.username, {
        parent: (ACQUISTIID),
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
          {
            id: YAKUZAID,
            allow: ['VIEW_CHANNEL'],
            deny: ['SEND_MESSAGES'],
          },
        ],
        type: 'text',
      }).then( c => {

        interaction.reply({ content: 'Il tuo ticket è stato aperto ➜ ' + '<#' + c.id + '>' , ephemeral: true })
        c.send({content: undefined, embeds: [acquisto], components: [ClaimRow2]})
        c.send({content:"<@&" + YAKUZAID + ">" + `${interaction.member.user}`}).then(msg => {
          msg.delete()
        })
    })
    .catch(()=>{
      return
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

module.exports = {acquisti}