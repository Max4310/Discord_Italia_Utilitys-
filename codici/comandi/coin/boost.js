const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../../variabili.json"))
const {membro, gestisciVisulizza, isStaff , CoinMember ,aggiona,user,aggiungi} = require(path.join(__dirname,"../../../oggetti.js"))


function boost(interaction)
{ 
    try{
        var target = interaction.options.getUser("target")
    
        if(target == null || target == undefined)
            target = interaction.member.user
        
        user("boost").then(userBoost => {
            var x = userBoost.findIndex(booster => booster.id == target.id)
            if(x>-1)
            {
                var embed = new Discord.MessageEmbed()
                    .setTitle(`Boost Di ${target.tag}`)
                    .setDescription(`L'utente Ha Boostato Il Server ${userBoost[x].boost} Volta`)
                    .setColor("RANDOM")
                interaction.reply({embeds: [embed], ephemeral: true})
            }   
            else
                interaction.reply({content: `❌ ${target} Non Boosta Il Server`, ephemeral : true})
        })
    }catch(err){
        try{
            interaction.reply({content : "❌ Qualcosa è Andato Storto", ephemeral : true})
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send(`**/boost **${err}`)
            
            })  
            return 
        }catch{
            return
        }
    }
}

module.exports = {boost}