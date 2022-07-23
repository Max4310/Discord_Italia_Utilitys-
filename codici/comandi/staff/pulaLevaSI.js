const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../../variabili.json"))
const fs = require("fs")
            
function sleep(s){
    var now = new Date().getTime();
    while(new Date().getTime() < now + (s*1000)){ /* non faccio niente */ } 
}
            
function pulaLevaSI(interaction)
{
    interaction.deferUpdate()
    var vecchia = parseInt(interaction.customId.split(",")[1])
    var nuova = parseInt(interaction.customId.split(",")[2])
    
    var x = interaction.message.embeds[0].description.replace(`> è Nella Pattuglia ${vecchia+1}** \n\nDesideri Spostarlo?`,"")
    
    var id = x.replace("**<@!","")
    

    const pattuglie = require(path.join(__dirname,"../../../pattuglie.json"))
    var Apattuglia = pattuglie[vecchia]

    var j=0
    var verifica = false
    while(j<Apattuglia.length && verifica==false)
    {
        if(Apattuglia[j] == id)
            verifica = true
        j++
    }

    for(var k=j-1; k<Apattuglia.length-1 ; k++)
    {
        var appoggio = Apattuglia[k+1]
        Apattuglia[k+1] = Apattuglia[k]
        Apattuglia[k] = appoggio
    }
    Apattuglia.pop()
    pattuglie[vecchia] = Apattuglia

    pattuglie[nuova].push(id)
    
    var data = JSON.stringify(pattuglie)
    fs.writeFile(path.join(__dirname,"../../../pattuglie.json"), data,function(err, result) {
        if(err) console.log('error', err);
    });

    const embed = new Discord.MessageEmbed()
        .setTitle("SPOSTATO CORRETTAMENTE")
        .setDescription(`<@${id}> è Stato Correttamente Spostato Della Pattuglia ${vecchia+1} Alla Numero ${nuova+1}`)
        .setColor("GREEN")

    const embed2 = new Discord.MessageEmbed()
        .setTitle(`${interaction.member.user.tag} Ha Eseguito Il Comando Pattuglia`)
        .setDescription(`<@${id}> è Stato Spostato Della Pattuglia ${vecchia+1} Alla Numero ${nuova+1}`)
        .setColor("YELLOW")

    interaction.channel.send({embeds : [embed], ephemeral : true})
    .then(msg =>{
        sleep(5)
        try{
            msg.delete()
        }catch{
            return
        }
    })
    interaction.guild.channels.cache.get(variabili.log).send({embeds : [embed2]})
}        

module.exports = {pulaLevaSI}