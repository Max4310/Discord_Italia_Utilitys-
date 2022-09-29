const { GOVERNO, JUSTICEID, YAKUZAID, EMOJIMAKER, BIGBRAIN, PROPOSTE, CEMOJI, ASSISTENZAID, RICORSIID, ACQUISTIID, TRANSCRIPTSID, OPENTICKET, HELPERID, LOGCHANNEL, MUTATOID, ABITANTEID, GUILD } = require("./config.json")
const discord = require("discord.js")
const path = require("path")
const {membro, gestisciVisulizza, isStaff , CoinMember ,aggiona,user,aggiungi} = require(path.join(__dirname,"../oggetti.js"));

function findIndex(id, infoTickets)
{
  for(var i=0;i<infoTickets.length;i++)
  {
    if(infoTickets[i].id == id) 
      return i
  }

  return null
}

async function menager(member, infoTickets)
{
    try{
        member.guild.channels.cache.get("944240250862059610").setName(`🌍 Membri: ${member.guild.memberCount}`)
        var index = findIndex(member.user.id,infoTickets)
        if(index != null){
            var vert;
            var verf;
            var rep;
            var inf;
            var data = infoTickets[index]
            if(data.cvt != 0){
            vert = `\nBottone Verifica(con successo): ${data.cvt} volte`
            } else {
            vert = ""
            }
            if(data.cvf != 0){
            verf = `\nBottone Verifica(Già verificato): ${data.cvf} volte`
            } else {
            verf = ""
            }
            if(data.cr != 0){
            rep = `\nBottone Reputazione: ${data.cr} volte`
            } else {
            rep = ""
            }
            if(data.ci != 0){
            inf = `\nBottone Informazioni: ${data.ci} volte`
            } else {
            inf = ""
            }
            
            const embed = new discord.MessageEmbed()
            .setTitle(`**TICKET TOOL** *id: ${data.jid}*`)
            
            if(vert == "" && verf == "" && rep == "" && inf == ""){
            embed.setDescription(`${member} ha utilizzato l'assistenza automatica ma non ha fatto niente`)
            } else {
            embed.setDescription(`${member} ha utilizzato l'assistenza automatica:${vert}${verf}${rep}${inf}`)
            }
            embed.setFooter({text:"è uscito dal server"})
            member.guild.channels.cache.get(TRANSCRIPTSID).send({embeds: [embed]})
            
            const x = member.guild.channels.cache.get(infoTickets[index])
            x.delete()
            infoTickets.splice(index)
        }

        let coinUser = await user("coinMember")
        let booster = await user("boost")
        let tempRoles = await user("role")
        let proprieta = await user("proprietà")

        if(coinUser != null)
        {
            let indexCoin = coinUser.findIndex(userx => userx.id == member.user.id)
            
            if(indexCoin > -1)
                coinUser.splice(indexCoin,1)

            aggiona(coinUser,"coinMember")
        }

        if(booster != null)
        {
            let boosterIndex = booster.findIndex(userx => userx.id == member.user.id)

            if(boosterIndex > -1)
                booster.splice(boosterIndex,1)

            aggiona(booster,"boost")
        }

        if(tempRoles != null)
        {
            let tempRolesIndex = tempRoles.findIndex(userx => userx.member == member.user.id)

            if(tempRolesIndex > -1)
                tempRoles.splice(tempRolesIndex, 1)

            aggiona(tempRoles,"role")
        }

        if(proprieta != null)
        {
            let proprietaIndex = proprieta.findIndex(userx => userx.id == member.user.id)

            if(proprietaIndex > -1)
            {
                if(proprieta[proprietaIndex].voc != null)
                    member.guild.channels.cache.get(proprieta[proprietaIndex].voc).delete()

                if(proprieta[proprietaIndex].testuale != null)
                    member.guild.channels.cache.get(proprieta[proprietaIndex].testuale).delete()

                if(proprieta[proprietaIndex].ruolo != null)
                {
                    let role = null

                    if(proprieta[proprietaIndex].ruolo.roleId == null)
                        role = proprieta[proprietaIndex].ruolo
                    else
                        role = proprieta[proprietaIndex].ruolo.roleId

                    member.guild.roles.cache.get(role).delete()
                }


                proprieta.splice(proprietaIndex, 1)

                aggiona(proprieta,"proprietà")
            }
        }


    }catch(err){
        console.log(err)
        try{
            member.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send(`**Member left ** ${err}`)
            
            })  
            return 
        }catch{
            return
        }
    }
    
}

module.exports = {menager}