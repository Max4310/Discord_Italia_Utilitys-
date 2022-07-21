const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../../variabili.json"))

function regole(interaction){
    try{
        const logchannel = interaction.guild.channels.cache.get(variabili.log) //log

        const log_message = new Discord.MessageEmbed()
            .setTitle('UTILITY LOG')
            .setDescription(`${interaction.member} ha usato il comando *regole* in <#${interaction.channelId}>`)
        logchannel.send({embeds:[log_message]})

        const choice = interaction.options.getString("regola")
        const regola = parseInt(choice.split("reg")[1])
        
        if(regola == 0){
        var reg = "Termini di Servizio e Linee Guida"
        }else{
        var reg = `Regola ${regola}`
        }
        const embed = new Discord.MessageEmbed()
            .setTitle("Rispetta le Regole!")
            .addField(reg, `<a:manss:976501011302711457>**${variabili.rules[regola]}**`)
            .setColor("BLURPLE")
        interaction.reply({embeds: [embed]})
    }catch(err){
        try{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max /regole ha fallito cabbo fai")
            
            })  
    
            interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return 
        }catch{
            return
        }
    }
}

module.exports = {regole}