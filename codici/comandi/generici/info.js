const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../../variabili.json"))

function info(interaction){
    try{
        var member = interaction.options.get("member")
    
        if(member == undefined || member == null){
            member = interaction.member
            var roles = member._roles
            var joined =  member.joinedTimestamp
        }else{
            var roles = member.member._roles
            var joined = member.member.joinedTimestamp
        }
        var pingroles = ""
        
        for(let x in roles){
            pingroles += `<@&${roles[x]}> `
        }


        
        var embed = new Discord.MessageEmbed()
            .setTitle(`Info di ${member.user.username}`)
            .setDescription(`**Nome**\n${member.user.username}#${member.user.discriminator}`)
            .setColor("BLURPLE")
            .setThumbnail(member.user.displayAvatarURL())
            .addField("Ping", `${member.user}`)
            .addField("Ruoli", `${pingroles}`)
            .addField("Joinato Discord Italia", `<t:${Math.floor(joined / 1000)}:R>`)
            .addField("Joinato Discord", `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`)
        interaction.reply({embeds: [embed]})


    }catch{
        try{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max /info ha fallito cabbo fai")
            
            })  
    
            interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return 
        }catch{
            return
        }
    }
}

module.exports = {info}