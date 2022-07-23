const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../../variabili.json"))

function pattuglia(id)
{
    const pattuglie = require(path.join(__dirname,"../../../pattuglie.json"))
                                
    for(var cont=0;cont<pattuglie.length;cont++)
    {
        if(pattuglie[cont].includes(id))
            return (cont+1)   
    } 

    return null
}

function pattuglie (interaction)
{

    try{
        const fs = require("fs")
        if(interaction.options.getString("azione") == "+") //aggiungere nelle pattuglie 
        {
            var pattugli = interaction.options.getInteger("pattuglia")
            if(pattugli == 6 && interaction.member.user.id != "624589515096457217") return interaction.reply({content : "❌ Non Sei Autorizzato A Modificare Questa Pattuglia", ephemeral : true}) 

            if(pattugli != null && pattugli != undefined)
            {
                var member = interaction.guild.members.cache.get(interaction.options.getUser("target").id)
                var i=0
                var ver = false
                while(i<member._roles.length && ver == false)
                {
                    if(member._roles[i] == variabili.pula)
                        ver = true
                    i++
                }

                if(ver == true)
                {
                    var aCosa = pattuglia(member.user.id)
                    if(aCosa == null)
                    {
                        const pattuglie = require(path.join(__dirname,"../../../pattuglie.json"))
                        pattuglie[pattugli].push(member.user.id)
        
        
                        var data = JSON.stringify(pattuglie)
                        fs.writeFile(path.join(__dirname,"../../../pattuglie.json"), data,function(err, result) {
                            if(err) console.log('error', err);
                        });
    
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`${interaction.member.user.tag} Ha Eseguito Il Comando Pattuglia`)
                            .setColor("YELLOW")
                            .setDescription(`${member} è Stato Aggiunto Nella Pattuglia ${pattugli+1}`)
    
                        const embed2 = new Discord.MessageEmbed()
                            .setTitle("AGGIUNTO CORRETTAMENTE")
                            .setColor("GREEN")
                            .setDescription(`${member} è Stato Correttamente Aggiunto Nella Pattuglia ${pattugli+1}`)
    
                        interaction.guild.channels.cache.get(variabili.log).send({embeds : [embed]})
                        interaction.reply({embeds : [embed2], ephemeral : true})

                    }else{
                        if(aCosa-1 != pattugli)
                        {
                            const risposta =  new Discord.MessageEmbed()
                            .setTitle("ERRORE")
                            .setColor("RED")
                            .setDescription(`**${member} è Nella Pattuglia ${aCosa}** \n\nDesideri Spostarlo?`)

                            const positivo = new Discord.MessageButton()
                                .setCustomId("pulaLevaSI,"+(aCosa-1)+","+pattugli)
                                .setEmoji("✔️")
                                .setStyle("SECONDARY")

                            const row = new Discord.MessageActionRow()
                                .addComponents(positivo)

                            interaction.reply({embeds : [risposta], components : [row], ephemeral : true})
                        }
                        else
                            interaction.reply({content : "❌ L'utente è Gia In Quella Pattuglia", ephemeral : true})
                    }
                }else
                    interaction.reply({content : "❌ L'utente Non è Nel Corpo Di Polizia", ephemeral :  true})    
            }else
                interaction.reply({content : "❌ Specificare La Pattuglia", ephemeral : true})
            
        }
        else //rimuovere nelle pattuglie
        {
            var pattuglii = pattuglia(interaction.options.getUser("target").id)
            if(pattuglii == 7 && interaction.member.user.id != "624589515096457217") return interaction.reply({content : "❌ Non Sei Autorizzato A Modificare Questa Pattuglia", ephemeral : true})
            
            if(pattuglii != null)
            {
                pattuglii = pattuglii-1
                const pattuglie = require(path.join(__dirname,"../../../pattuglie.json"))
                var Apattuglia = pattuglie[pattuglii]

                var j=0
                var verifica = false
                while(j<Apattuglia.length && verifica==false)
                {
                    if(Apattuglia[j] == interaction.options.getUser("target").id)
                        verifica = true

                    j++
                }

                for(k=j-1; k<Apattuglia.length-1 ; k++)
                {
                    var appoggio = Apattuglia[k+1]

                    Apattuglia[k+1] = Apattuglia[k]
                    Apattuglia[k] = appoggio
                }
                Apattuglia.pop()
                pattuglie[pattuglii] = Apattuglia


                var data = JSON.stringify(pattuglie)
                fs.writeFile(path.join(__dirname,"../../../pattuglie.json"), data,function(err, result) {
                    if(err) console.log('error', err);
                });

                const embed = new Discord.MessageEmbed()
                    .setTitle(`${interaction.member.user.tag} Ha Eseguito Il Comando Pattuglia`)
                    .setDescription(`${interaction.options.getUser("target")} Non è Piu Nella Pattuglia ${pattuglii+1}`)
                    .setColor("YELLOW")

                const embed2 = new Discord.MessageEmbed()
                    .setTitle("RIMOSSO CORRETTAMENTE")
                    .setColor("GREEN")
                    .setDescription(`${interaction.options.getUser("target")} è Stato Correttamente Rimosso Dalla Pattuglia ${pattuglii+1}`)
                
                interaction.guild.channels.cache.get(variabili.log).send({embeds : [embed]})
                interaction.reply({embeds : [embed2], ephemeral : true})
                
            }
            else
                interaction.reply({content : "❌ L'utente Non è In Nessuna Pattuglia", ephemeral : true})
        }
    }catch(err){
        console.log(err)
        
    }
}

module.exports = {pattuglie}