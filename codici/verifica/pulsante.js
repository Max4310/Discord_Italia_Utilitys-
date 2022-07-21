const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../variabili.json"))

async function pulsante (interaction){
    if(interaction.member.user.bot==false)
    {
        try{
            numero1 = Math.round(Math.random() * 30)
        
            if(numero1 <= 10 )
                numero2 = Math.round(Math.random() * 30)
            else if(numero1 <= 20)
                numero2 = Math.round(Math.random() * 20)
            else 
                numero2 = Math.round(Math.random() * 10)
            
            const {MessageActionRow, Modal, TextInputComponent} = require("discord.js")
                
            const titolo = new Modal()
                .setTitle("Fai Questa Somma Eseguire La Verifica")
                .setCustomId(`cd_verifica,${numero1+numero2}`)
            
            const testo = new TextInputComponent()
                .setLabel("Scrivi Il Risultato: " + numero1 + "+" + numero2)
                .setCustomId("verifica_testo")
                .setStyle("SHORT")
            const somma_verifica = new MessageActionRow().addComponents(testo)
                
            titolo.addComponents(somma_verifica)
            await interaction.showModal(titolo)
        }catch{
            return
        }
    }
    else
    {
        const risp = new Discord.MessageEmbed()
            .setTitle("DISCORD ITALIA")
            .setDescription("Il Tuo Account Sembra Essere Un Bot")
            .setColor("RED")

        interaction.reply({embeds : [risp], ephemeral : true})
    }

    return
}

module.exports = {pulsante}