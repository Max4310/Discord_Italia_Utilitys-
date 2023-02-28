const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../variabili.json"))
const fs = require("fs");

async function  profilo(interaction)
{
    try{
        const generi = ["896061685880729681","896062246491394068","896062660708294686","896062507750404156","896063618452447293"]
        const pronomi = ["896067712164454451","896064079779729409","896067889730301982","896068244799115335","896068455659343952","896068523011489802"]
        const segno  = ["896069334781267989","896069435394236416","896069439148134420","896069441555689502","896069442218393651","896069443212419092","896069443753488434","896069444416208937","896069444768522261","896069445523501086","896069446886629418","896069447377358848"]
        const social = ["897375656470519829","897375649340207105","897375543446614067","897375658659938346","897375653425467472","897375651865194556","897375655245774848", "1065312324535210024"]
        const luogo  = ["902922148006473758","902922176066371614","902922905917218848","902922530795429999"]
        const sentimenti  = ["955517944144752700","955517995537551412","955518000247754792"]
        const notifiche = [
            /*0*/"1062070651487256608", 
            /*1*/"898331041893343282",
            /*2*/"944596815708307486",
            /*3*/"944595871717265438",
            /*4*/"904306184268419102",
            /*5*/"916634967130378270",
            /*6*/"1028651951740682272",
            /*7*/"955518863573930094",
            /*8*/"955518884310564994",
            /*9*/"1002555397296627782",
            /*10*/"1080134856568209498"]

        

        switch(interaction.customId.split(":")[1])
        {
            
            case "genere":
                interaction.deferUpdate()
                //const generi = ["896061685880729681","896062246491394068","896062660708294686","896062507750404156","896063618452447293"]
                
                var i = 0
                var ver = false
                while(i<generi.length && ver == false)
                {
                    if(interaction.member._roles.includes(generi[i]))
                    {
                        interaction.member.roles.remove(interaction.guild.roles.cache.get(generi[i]))
                        ver = false
                    }
                    i++
                }
                if(interaction.values[0] != null){
                    interaction.member.roles.add(interaction.guild.roles.cache.get(interaction.values[0]))
                    variabili.profilo++;
                }

                
                break;
            case "pronomi":
                interaction.deferUpdate()
                //const pronomi = ["896067712164454451","896064079779729409","896067889730301982","896068244799115335","896068455659343952","896068523011489802"]
                
                var i = 0
                var ver = false
                while(i<pronomi.length && ver == false)
                {
                    if(interaction.member._roles.includes(pronomi[i]))
                    {
                        interaction.member.roles.remove(interaction.guild.roles.cache.get(pronomi[i]))
                        ver = false
                    }
                    i++
                }
                
                if(interaction.values[0] != null){
                    interaction.member.roles.add(interaction.guild.roles.cache.get(interaction.values[0]));
                    variabili.profilo++;
                }


                break;
            case "segno":
                interaction.deferUpdate()
                //const segno  = ["896069334781267989","896069435394236416","896069439148134420","896069441555689502","896069442218393651","896069443212419092","896069443753488434","896069444416208937","896069444768522261","896069445523501086","896069446886629418","896069447377358848"]
                
                var i = 0
                var ver = false
                while(i<segno.length && ver == false)
                {
                    if(interaction.member._roles.includes(segno[i]))
                    {
                        interaction.member.roles.remove(interaction.guild.roles.cache.get(segno[i]))
                        ver = false
                    }
                    i++
                }
                
                if(interaction.values[0] != null){
                    interaction.member.roles.add(interaction.guild.roles.cache.get(interaction.values[0]))
                    variabili.profilo++;
                }
                    
                  
                


                break;
            case "social": //
                interaction.deferUpdate()
                var socialV = social;
                
                if(interaction.values.length != social.length)
                {
                    for(var i in interaction.values)
                    {
                        interaction.member.roles.add(interaction.guild.roles.cache.get(interaction.values[i]))
                        var index = socialV.indexOf(interaction.values[i])
                        socialV.splice(index,1)
                    }
                    for(var x in socialV)
                        interaction.member.roles.remove(interaction.guild.roles.cache.get(social[x]))
                }
                else
                {
                    for(var i in interaction.values)
                        interaction.member.roles.add(interaction.guild.roles.cache.get(interaction.values[i]))
                }

                variabili.profilo++;


                break;
            case "luogo":
                interaction.deferUpdate()
                //const luogo  = ["902922148006473758","902922176066371614","902922905917218848","902922530795429999"]
                
                var i = 0
                var ver = false
                while(i<luogo.length && ver == false)
                {
                    if(interaction.member._roles.includes(luogo[i]))
                    {
                        interaction.member.roles.remove(interaction.guild.roles.cache.get(luogo[i]))
                        ver = false
                    }
                    i++
                }
                
                if(interaction.values[0] != null){
                    interaction.member.roles.add(interaction.guild.roles.cache.get(interaction.values[0]))

                    variabili.profilo++;
                }
                    

                break;
            case "sentimenti":
                interaction.deferUpdate()
                //const sentimenti  = ["955517944144752700","955517995537551412","955518000247754792"]
                
                var i = 0
                var ver = false
                while(i<sentimenti.length && ver == false)
                {
                    if(interaction.member._roles.includes(sentimenti[i]))
                    {
                        interaction.member.roles.remove(interaction.guild.roles.cache.get(sentimenti[i]))
                        ver = false
                    }
                    i++
                }
                
                if(interaction.values[0] != null){
                    interaction.member.roles.add(interaction.guild.roles.cache.get(interaction.values[0]))
                    variabili.profilo++;
                }
                    
                break;
            case "notifiche": //
                interaction.deferUpdate()
                


                //notifiche*/
                var notificheV = notifiche;
                
                if(interaction.values.length != notifiche.length)
                {
                    for(var i in interaction.values)
                    {
                        interaction.member.roles.add(interaction.guild.roles.cache.get(interaction.values[i]))
                        var index = notificheV.indexOf(interaction.values[i])
                        notificheV.splice(index,1)       
                    }
                    for(var x in notificheV)
                        interaction.member.roles.remove(interaction.guild.roles.cache.get(notifiche[x]))
                }
                else
                {
                    for(var i in interaction.values)
                        interaction.member.roles.add(interaction.guild.roles.cache.get(interaction.values[i]))
                }

                variabili.profilo++;

                break;
            default:
                interaction.reply({content : "❌ Emm Non Ho Capito Cosa Ti Serve", ephemeral : true})
        }

        if(variabili.profilo>=2 && interaction.member.roles.cache.some(role => {role.id == variabili.stella1})){
            interaction.member.roles.remove(interaction.guild.roles.cache.get(variabili.stella1))
            interaction.member.roles.add(interaction.guild.roles.cache.get(variabili.stella2))  
            variabili.profilo=0;
        }


        var data = JSON.stringify(variabili)
        fs.writeFile(path.join(__dirname, "../../../variabili.json"), data, function (err, result) {
            if (err) console.log('error', err);
        });

    }catch(err){
        console.log(err)

        try{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send(`**Profilo ** ${err}`)
            }) 
            
            interaction.reply({content : "❌ Qualcosa é Andato Storto", ephemeral : true})
            return 
        }catch{
            return
        }
    }
}

module.exports = {profilo}