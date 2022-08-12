const path = require("path")
const variabili = require(path.join(__dirname,"../variabili.json"))
const fs = require("fs")
const Discord = require("discord.js")

function reset (client)
{
    try{
        var embed = new Discord.MessageEmbed()
            .setTitle("NordVPN")
            .setURL("https://go.nordvpn.net/aff_c?offer_id=615&aff_id=74241&url_id=14831")
            .setDescription(
                "**Serve una VPN? Apposto! NordVPN x Discord Italia!**\n\n"+
                "*<a:manss:976501011302711457> Ogni Mese di NordVPN = 1 Mese di* <@&893851166239252530> *su Discord Italia!*\n"+
                "*<a:manss:976501011302711457> Badge Esclusivo* <@&1002543691526836224>*!*\n"+
                "*<a:manss:976501011302711457> Icona del Ruolo Esclusiva!*"
            )
            .setImage("https://www.informarea.it/wp-content/uploads/2020/09/recensione-nordVPN.jpg")
            .setColor("#fdf9f9")
            
        //client.guilds.cache.get("891739229846118461").channels.cache.get("894195379418058774").send({embeds : [embed]})

        variabili.inizio_nute = false
        variabili.entroDelete = true
        variabili.ContCapo = 0
        variabili.ContCommissari = 0
        variabili.ContIspettori = 0
        variabili.ContAgenti = 0
        variabili.ContDelete = 0
        variabili.vpn = true

    
        var data = JSON.stringify(variabili)
        fs.writeFile(path.join(__dirname,"../variabili.json"), data,function(err, result) {
            if(err) console.log('error', err);
        });
    
        setTimeout(() => {
            reset(client)
        },1000*60*60*24)
    }catch(err){
        console.log(err)
        return
    }
}

module.exports = {reset}