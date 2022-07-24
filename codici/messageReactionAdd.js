const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../variabili.json"))

async function menager (reaction, user){
    try{
        if (reaction.emoji.name == '👑'){
            if (reaction.message.channel.id == variabili.CEMOJI) {
              var counter = false
              var counter1 = false
              var log
              reaction.message.fetch()
                .then(message => {
                  if (!message.member.roles.cache.some(role => role.id == variabili.EMOJIMAKER)){  
                    message.guild.roles.fetch(variabili.EMOJIMAKER).then(role => {
                      message.member.roles.add(role)  
                    })
                    counter1 = true
                  }
                  if (message.member.roles.cache.some(role => role.id == variabili.STELLA4)) {
                    counter = true
                    message.guild.roles.fetch(variabili.STELLA5).then(role => { 
                      message.member.roles.add(role)
                    })
                    message.guild.roles.fetch(variabili.STELLA4).then(role => { 
                      message.member.roles.remove(role)
                    })
                    message.guild.roles.fetch(variabili.GRADO3).then(role => {
                      message.member.roles.add(role)
                    })
                    message.guild.roles.fetch(variabili.GRADO2).then(role => {
                      message.member.roles.remove(role)
                    })
                  }
                  if(counter == true && counter1 == true){
                    log = `${message.member} ha ricevuto Emoji maker e la 5° stella. interaction: ${user}`
                  } else if (counter == false && counter1 == true) {
                    log = `${message.member} ha ricevuto Emoji maker. interaction: ${user}`
                  } else if (counter == false && counter1 == false) {
                    log = `${message.member} ha un emoji accettata. interaction: ${user}`
                  } else if (counter == true && counter1 == false) {
                    log = `${message.member} ha ricevuto la 5° stella. interaction: ${user}`
                  }
                  const logchannel = message.guild.channels.cache.get(variabili.LOGCHANNEL)
                  const embed = new Discord.MessageEmbed()
                  .setTitle("UTILITY LOG")
                  .setDescription(log)
                  logchannel.send({embeds: [embed]})
                })  
            } else if(reaction.message.channel.id == variabili.PROPOSTE)  {
              var counter = false
              var counter1 = false
              var log
              reaction.message.fetch()
                .then(message => {
                  if (!message.member.roles.cache.some(role => role.id == variabili.BIGBRAIN)){  
                    message.guild.roles.fetch(variabili.BIGBRAIN).then(role => {
                      message.member.roles.add(role)
                    })
                    counter1 = true
                  }
                  if (message.member.roles.cache.some(role => role.id == variabili.STELLA7)) {
                    counter = true
                    message.guild.roles.fetch(variabili.STELLA8).then(role => { 
                      message.member.roles.add(role)
                    })
                    message.guild.roles.fetch(variabili.STELLA7).then(role => { 
                      message.member.roles.remove(role)
                    })
                  }
                  if(counter == true && counter1 == true){
                    log = `${message.member} ha ricevuto Big Brain e l' 8° stella. interaction: ${user}`
                  } else if (counter == false && counter1 == true) {
                    log = `${message.member} ha ricevuto Big Brain. interaction: ${user}`
                  } else if (counter == false && counter1 == false) {
                    log = `${message.member} ha una proposta accettata. interaction: ${user}`
                  } else if (counter == true && counter1 == false) {
                    log = `${message.member} ha ricevuto l' 8° stella. interaction: ${user}`
                  }
                  const logchannel = message.guild.channels.cache.get(variabili.LOGCHANNEL)
                  const embed = new Discord.MessageEmbed()
                  .setTitle("UTILITY LOG")
                  .setDescription(log)
                  logchannel.send({embeds: [embed]})
                })
            }
        }
    }catch{
        return
    }
}

module.exports = {menager}