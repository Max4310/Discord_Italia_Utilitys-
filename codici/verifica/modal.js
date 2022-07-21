const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../variabili.json"))

function modulo (interaction){
    try{
        if(interaction.fields.getTextInputValue("verifica_testo") == interaction.customId.split(",")[1])
        {
            interaction.member.roles.add(interaction.guild.roles.cache.get(variabili.abitante))
            interaction.member.roles.add(interaction.guild.roles.cache.get(variabili.stella1))
            interaction.deferUpdate()

            var message_log = new Discord.MessageEmbed()
                .setTitle("DISCORD ITALIA")
                .setDescription("<@"+interaction.member.user.id+"> Si è Verificato Con Successo")
                .setColor("BLUE")

            interaction.guild.channels.cache.get(variabili.log_verifica).send({embeds : [message_log]})
        }
        else
        {
            var risposta = new Discord.MessageEmbed()
                .setTitle("DISCORD ITALIA")
                .setDescription("**Il Codice Risulta Essere Sbagliato**\n\n*Ricordo Che Non Bisogna Mettere Spazi, Ma Scrivere Semplicemente Il Risultato.*")
                .setFooter("Contattare L'assistenza In Caso Di Problemi")
                .setColor("RED")

            interaction.reply({embeds : [risposta], ephemeral : true})
        }
    }catch{
        return
    }
}

module.exports = {modulo}