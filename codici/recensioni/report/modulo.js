const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../../variabili.json"))

const report = new Discord.MessageButton() //pulsante del report tu dici "perche globale" e io perche no? 
    .setEmoji("👮‍♂️")
    .setStyle("DANGER")
    .setCustomId("report")
    .setLabel("Report")

function modulo  (interaction){
    try{
        var c = interaction.guild.channels.cache.get(variabili.chat_report)

        var reason = interaction.fields.getTextInputValue("Reason_report")

        var x = interaction.message.embeds[0]

        x.footer.text = "IDmessaggio: " + interaction.message.id
        x.description = x.description + "\n\n**Motivo: **" + reason + "\n**Reportatore: ** <@"+ interaction.member.id + ">" 

        
        var no = new Discord.MessageButton()
            .setLabel("Eliminare")
            .setStyle("DANGER")
            .setCustomId("no_rece")
            .setEmoji("✖️")

        var row = new Discord.MessageActionRow()
            .addComponents(no)

        c.send({content : "<@&"+variabili.pula+">", embeds : [x], components : [row]})
        

        interaction.deferUpdate()
    }catch(err){
        console.log(err)
        try{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max modulo report ha fallito cabbo fai")
            
            })  
    
            interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return 
        }catch{
            return
        }
    }
}

module.exports = {modulo}