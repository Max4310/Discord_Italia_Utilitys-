const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../variabili.json"))

const report = new Discord.MessageButton() //pulsante del report tu dici "perche globale" e io perche no? 
    .setEmoji("👮‍♂️")
    .setStyle("DANGER")
    .setCustomId("report")
    .setLabel("Report")

async function pulsante (interaction){
    try{
        ultima_recensione = interaction.message
        const {MessageActionRow, Modal, TextInputComponent} = require("discord.js")
    
        const modal = new Modal()
            .setTitle("Recensisci il Server!")
            .setCustomId("modulorecensioni")
        const stellerecensione = new TextInputComponent()
            .setLabel("Scrivi Il Numero Di Stelle")
            .setCustomId("numerostelle")
            .setStyle("SHORT")
        const recensione = new TextInputComponent()
            .setLabel("Scrivi Di Seguito La Tua Recensione")
            .setCustomId("recensione")
            .setStyle("PARAGRAPH")

        const stellerecensionerow = new MessageActionRow().addComponents(stellerecensione)
        const recensionerow = new MessageActionRow().addComponents(recensione)

        
        modal.addComponents(stellerecensionerow, recensionerow)
        await interaction.showModal(modal)
    }catch{
        try{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max il modulo recensione ha fallito cabbo fai")
            
            })  
    
            interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return 
        }catch{
            return
        }
    }
}

module.exports = {pulsante}