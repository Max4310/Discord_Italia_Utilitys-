const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../variabili.json"))
const { membro, gestisciVisulizza, isStaff, CoinMember, aggiona, user, aggiungi } = require(path.join(__dirname, "../oggetti.js"))

function menager (member) {
    try{
        //member.guild.channels.cache.get("944240250862059610").setName(`🌍 Membri: ${member.guild.memberCount}`)
        user("warn").then((members) => {
            var x = members.findIndex(u => u.memberId == member.user.id)

            if(x > -1){
                member.roles.add(member.guild.roles.cache.get(members[x].lvl))
            }
        }).catch((err) => console.log(err))

        const embed = new Discord.MessageEmbed()
            .setDescription("`-`<a:manss:976501011302711457> **Presonalizza il tuo Profilo in\n[<#1003017529905655839> <#902903643026636860>]**\n`-`<a:manss:976501011302711457> **Evolvi la tua Reputazione in\n[<#940633995568369684>]**\n`-`<a:manss:976501011302711457> **Conosci gli altri in\n[<#894195379418058774> <#910645854220726312>]**")
            .setColor("RANDOM")
            .setThumbnail(member.displayAvatarURL())
            .setImage("https://i.ibb.co/G5hcFgN/divider.gif")
        
        member.guild.channels.cache.get("906925387878129684").send({content: `<:patpat:958408567369633803> ${member}, ***Benvenuto/a su Discord Italia*** <:cilindro:958408567919104100>`, embeds: [embed]})

    }catch{
        try{
            var embed = new Discord.MessageEmbed()
            .setTitle("Member Join")
            .setDescription(err)
            .setColor("RED")

            client.guilds.cache.get(variabili.discordItalia).channels.cache.get(variabili.errLog).send({embeds : [embed]})
            return
        }catch{
            return
        }
    }
}

module.exports = {menager}