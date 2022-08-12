const { GOVERNO, JUSTICEID, YAKUZAID, EMOJIMAKER, BIGBRAIN, PROPOSTE, CEMOJI, ASSISTENZAID, RICORSIID, ACQUISTIID, TRANSCRIPTSID, OPENTICKET, HELPERID, LOGCHANNEL, MUTATOID, ABITANTEID, GUILD } = require("./config.json")
const discord = require("discord.js")
const {MessageActionRow, MessageButton} = require("discord.js");

const EmbedAssistenza = new discord.MessageEmbed()
    .setTitle("Assistenza Automatica di Discord Italia (V Beta)")
    .setDescription("━━━━━━━━━━━━━━━━━\n\n𝐏𝐫𝐨𝐛𝐥𝐞𝐦𝐢 𝐝𝐢 𝐕𝐞𝐫𝐢𝐟𝐢𝐜𝐚 ➜ 🔒\n\n𝐀𝐬𝐬𝐢𝐬𝐭𝐞𝐧𝐳𝐚 𝐑𝐞𝐩𝐮𝐭𝐚𝐳𝐢𝐨𝐧𝐞 ➜ ⭐\n\n𝐈𝐧𝐟𝐨 𝐒𝐞𝐫𝐯𝐞𝐫 ➜ 🔎\n\n𝐏𝐚𝐫𝐥𝐚𝐫𝐞 𝐜𝐨𝐧 𝐮𝐧 𝐎𝐩𝐞𝐫𝐚𝐭𝐨𝐫𝐞 ➜ 👷‍♂️\n\n𝐀𝐫𝐜𝐡𝐢𝐯𝐢𝐚 𝐓𝐢𝐜𝐤𝐞𝐭 ➜ 📂\n\n━━━━━━━━━━━━━━━━━")
    .setColor("GREEN")
    .setFooter({text:'‼ 𝐋𝐞 𝐏𝐚𝐫𝐭𝐧𝐞𝐫𝐬𝐡𝐢𝐩 𝐒𝐨𝐧𝐨 𝐀𝐭𝐭𝐮𝐚𝐥𝐦𝐞𝐧𝐭𝐞 𝐂𝐡𝐢𝐮𝐬𝐞 ‼'})


    
const rowe = new MessageActionRow()
.addComponents(
    new MessageButton()
    .setEmoji("🔒")
    .setCustomId("assistenzaverifica")
    .setStyle("PRIMARY"),
    new MessageButton()
    .setEmoji("⭐")
    .setCustomId("assistenzareputazione")
    .setStyle("PRIMARY"),
    new MessageButton()
    .setEmoji("🔎")
    .setCustomId("assistenzainfo")
    .setStyle("PRIMARY"),
    new MessageButton()
    .setEmoji("👷‍♂️")
    .setCustomId("assistenzaaltro")
    .setStyle("PRIMARY"),
    new MessageButton()
    .setEmoji("📂")
    .setCustomId("chiudi")
    .setStyle("DANGER")
)

function findIndex(id, infoTickets)
{
  for(var i=0;i<infoTickets.length;i++)
  {
    if(infoTickets[i].id == id) 
      return i
  }

  return null
}

function assistenza (interaction , infoTickets)
{
  try{
    if(interaction.customId == "assistenzanormale") //apre il ticket normale
    {
      if(findIndex(interaction.member.user.id, infoTickets) == null){
        interaction.guild.channels.create('ticket-' + interaction.user.username, {
          parent: (ASSISTENZAID),
          topic: interaction.user.id,
          permissionOverwrites: [
            {
              id: interaction.user.id,
              allow: ['VIEW_CHANNEL', "READ_MESSAGE_HISTORY"],
              deny : ["SEND_MESSAGES"]
            },
            {
              id: interaction.guild.roles.everyone,
              deny: ['VIEW_CHANNEL'],
            },
          ],
          type: 'text',
        }).then( c => {
          interaction.reply({ content: 'Il tuo ticket è stato aperto ➜ ' + '<#' + c.id + '>' , ephemeral: true })

          c.send(`${interaction.member.user}`).then((msg) => msg.delete())
          
          var message1 = "Benvenuto/a nell'assistenza automatica di Discord Italia!"
          c.send({content: message1, embeds: [EmbedAssistenza], components: [rowe]}) 

          var ticket = {"channel":c.id,"cvt":0,"cvf":0,"cr":0,"ci":0,"id":interaction.member.user.id}
          infoTickets.push(ticket)
        }) 
        .catch(()=>{
          return
        })
        
      } 
      else 
        interaction.reply({content: `Hai già aperto un ticket <#${infoTickets[findIndex(interaction.member.user.id)].channel}>`, ephemeral: true})  
    } 
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

module.exports = {assistenza}
