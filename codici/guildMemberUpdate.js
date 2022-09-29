const path = require("path")
const variabili = require(path.join(__dirname,"../variabili.json"))
const {membro, gestisciVisulizza, isStaff , CoinMember ,aggiona,user,aggiungi} = require(path.join(__dirname,"../oggetti.js"));
const Discord = require("discord.js")

function guildMemberUpdate (old,nuovo)
{
    try{
        if(old._roles.length > nuovo._roles.length)
        {
            var role = null
            var i = 0  
            while(i<old._roles.length && role == null)
            {
                if(old._roles[i] != nuovo._roles[i])
                    role = old._roles[i]

                i++
            }

            if(role == variabili.gold)
            {
                user("proprietà").then(usersPropetis => {
                    if(usersPropetis == null) return 

                    var a = usersPropetis.findIndex((p) => p.id == old.user.id)

                    if(a > -1)
                    {
                        if(usersPropetis[a].voc != null)
                        {
                            old.guild.channels.cache.get(usersPropetis[a].voc).delete()
                            usersPropetis[a].voc = null
                        }
                        
                        if(usersPropetis[a].testuale != null)
                        {
                            old.guild.channels.cache.get(usersPropetis[a].testuale).delete()
                            usersPropetis[a].testuale = null
                        }
                        
                    }
                    else
                    {
                        
                        const economyLog = new Discord.MessageEmbed()
                            .setTitle("ECONOMY LOG")
                            .setDescription(`${old} ha terminato il suo abbonamento gold`)
                            .setColor("YELLOW")
                            .setFooter({text : "eliminare casa e chat"})
                        
                        client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.logCoin).send({embeds : [economyLog]})

                        //ERRORE

                        /* * * * * * * * * * 
                        * Un Gold non ha piu il suo abbonamento ma la casa e la chat tesuale nn sono stati tolti
                        *
                        * old è il membro
                        * * * * * * * * * * */
                    }

                    aggiona(usersPropetis , "proprietà")
                })
                .catch((err) => {
                    console.log(err) 
                    return
                })
            }
            //levo il boost e il vip
            else if(role == variabili.roleBoost)
            {
                old.roles.remove(old.guild.roles.cache.get(variabili.vip))
                user("boost").then(userBoost => {
                    if (userBoost == null) return

                    var a = userBoost.findIndex((p) => p.id == old.user.id)

                    if(a>-1)
                    {
                        userBoost.splice(a,1)
                        aggiona(userBoost, "boost")
                    }
                        
                })
                .catch((err) => {
                    console.log(err) 
                    return
                })
            }
        }
    }catch(err){
        try{
            var embed = new Discord.MessageEmbed()
                .setTitle("Vip (togli), gold (aggiungi)")
                .setDescription(err)
                .setColor("RED")

            client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.errLog).send({embeds : [embed]})
            return 
        }catch{
            return
        }
    }
    
}

module.exports = {guildMemberUpdate}