const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../../variabili.json"))

const report = new Discord.MessageButton() //pulsante del report tu dici "perche globale" e io perche no? 
    .setEmoji("👮‍♂️")
    .setStyle("DANGER")
    .setCustomId("report")
    .setLabel("Report")

async function pulsante (interaction){
    try{
        const {MessageActionRow, Modal, TextInputComponent} = require("discord.js")
        const modal = new Modal()
            .setTitle("Report")
            .setCustomId("moduloreport")
        const motivo = new TextInputComponent()
            .setLabel("Scrivi Il Motivo Del Report")
            .setCustomId("Reason_report")
            .setStyle("SHORT")
        
        const motivorow = new MessageActionRow().addComponents(motivo)
        modal.addComponents(motivorow)
        await interaction.showModal(modal)
        return interaction.message
    }catch{
        try{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max il report ha fallito cabbo fai")
            
            })  
    
            interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return interaction.message
        }catch{
            return interaction.message
        }
    } 
}

module.exports = {pulsante}