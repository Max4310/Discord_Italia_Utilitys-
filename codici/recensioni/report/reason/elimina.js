const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../../../variabili.json"))

const report = new Discord.MessageButton() //pulsante del report tu dici "perche globale" e io perche no? 
    .setEmoji("👮‍♂️")
    .setStyle("DANGER")
    .setCustomId("report")
    .setLabel("Report")

function elimina (interaction){
    try{
        var xx = interaction.message.embeds[0].footer.text

        var xxx = xx.replace("IDmessaggio: ", "")
    
        messaggino = interaction.guild.channels.cache.get(variabili.recensioni).messages.fetch(xxx)
        .then(messaggio =>{
            messaggio.delete()

            var embed = new Discord.MessageEmbed()
                .setTitle("Discord Italia")
                .setDescription("**Recenzione Eliminata**")
                .setColor("AQUA")
            interaction.reply({embeds : [embed], ephemeral : true})

            var y = messaggio.embeds[0].title
            y = y.replace("Recensione di ","")
            membro = messaggio.guild.members.cache.find(member => member.user.username == y)
            
            var logg = interaction.guild.channels.cache.get(variabili.log)
            var informiamo = interaction.guild.channels.cache.get(variabili.info)

            var embed = new Discord.MessageEmbed()
                .setTitle("DISCORD ITALIA")
                .setDescription("Recenzione Di <@"+membro.user.id+"> Eliminata Da <@"+interaction.member.id+">")
                .setColor("AQUA")

            var embed1 = new Discord.MessageEmbed()
                .setTitle("DISCORD ITALIA")
                .setDescription("Recenzione Di <@" + membro +"> Eliminata")
                .setColor("AQUA")

            informiamo.send({embeds : [embed1]})
            logg.send({embeds : [embed]})
            return
        })
        .catch(() =>{
            var embed = new Discord.MessageEmbed()
                .setTitle("Discord Italia")
                .setDescription("**Recenzione Gia Giudicata Da Un Altro Operatore**")
                .setColor("AQUA")
            interaction.reply({embeds : [embed], ephemeral : true})

            return
        }) 

        interaction.message.delete() 
    }catch(err){
        console.log(err)
        try{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max no rece ha fallito cabbo fai")
            
            })  
    
            interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return 
        }catch{
            return
        }
    }
}

module.exports = {elimina}