const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../../../variabili.json"))

const report = new Discord.MessageButton() //pulsante del report tu dici "perche globale" e io perche no? 
    .setEmoji("👮‍♂️")
    .setStyle("DANGER")
    .setCustomId("report")
    .setLabel("Report")

async function pulsante (interaction){
    try{
        if (interaction.user.tag==interaction.message.embeds[0].title.replace("Messaggio Eliminato Da: ", ""))
        {
            const {MessageActionRow, Modal, TextInputComponent} = require("discord.js")

            const modal = new Modal()
                .setTitle("Come Mai Hai Eliminto Quel Messaggio?")
                .setCustomId("EL_modal")

            const motivo = new TextInputComponent()
                .setLabel("Dicci Il Motivo")
                .setCustomId("EL_Motivo")
                .setStyle("PARAGRAPH")
        
            const motivoriga = new MessageActionRow().addComponents(motivo)
                
            modal.addComponents(motivoriga)
            await interaction.showModal(modal)
        }
        else
            interaction.reply({content : "❌ Non Hai Eliminato Tu Il Messaggio", ephemeral : true})
    }catch{
        try{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max il modal motivo ha fallito cabbo fai")
            
            })  
    
            interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return 
        }catch{
            return
        }
    }
}

module.exports = {pulsante}