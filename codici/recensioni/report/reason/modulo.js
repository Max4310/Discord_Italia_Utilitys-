const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../../../variabili.json"))

const report = new Discord.MessageButton() //pulsante del report tu dici "perche globale" e io perche no? 
    .setEmoji("👮‍♂️")
    .setStyle("DANGER")
    .setCustomId("report")
    .setLabel("Report")

function modulo (interaction){
    try{
        var embed = interaction.message.embeds[0]
        embed.footer.text = "𝗠𝗼𝘁𝗶𝘃𝗼: " + interaction.fields.getTextInputValue("EL_Motivo")
        
        interaction.message.edit({embeds : [embed], components : []}) 

        interaction.deferUpdate()
    }catch{
        try{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max il modal del motivo ha fallito cabbo fai")
            
            })  
    
            interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return 
        }catch{
            return
        }
    }
}

module.exports = {modulo}