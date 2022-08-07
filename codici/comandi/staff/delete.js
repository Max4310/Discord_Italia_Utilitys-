const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../../variabili.json"))
const fs = require("fs")

function sleep(s){
    var now = new Date().getTime();
    while(new Date().getTime() < now + (s*1000)){ /* non faccio niente */ } 
}

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

function elimina (interaction,client){
    try{
        var canale=interaction.guild.channels.cache.get(interaction.options.getString("canale"))
        var idMessage=interaction.options.getString("message")

        canale.messages.fetch(idMessage)
            .then(message => {
                variabili.ContDelete++

                var data = JSON.stringify(variabili)
                fs.writeFile(path.join(__dirname,"../../../variabili.json"), data,function(err, result) {
                    if(err) console.log('error', err);
                });
                
                if( variabili.ContDelete <= 20)
                {
                    message.delete()

                    if ( canale.id == "902903625586720798")
                    {
                        var stella_2 = interaction.guild.roles.cache.get(variabili.stella2)
                        var stella_3 = interaction.guild.roles.cache.get(variabili.stella3)
                        var membro = interaction.guild.members.cache.get(message.author.id)
        
                        membro.roles.add(stella_2)
                        membro.roles.remove(stella_3)
                    }
                    
    
                    var logg=interaction.guild.channels.cache.get(variabili.log)
    
                    const embedlog = new Discord.MessageEmbed()
                        .setTitle(`${interaction.member.user.tag} Ha Eseguito Il Comando Delete`)
                        .setColor("YELLOW")
                        .setDescription(`Il Messaggio Di ${message.author} Nella Chat ${canale} è Stato Eliminato`)
                        .setFooter({text : `Rimangono ${20 - variabili.ContDelete} Delete Per La Giornata Di Oggi`}) //comunicare quanti ne mancano
    
                    logg.send({embeds : [embedlog]})
                    
                    const risposta = new Discord.MessageEmbed() 
                        .setTitle("Messaggio Eliminato Con Successo")
                        .setColor("GREEN")
                        .setDescription(`Rimangono ${20-variabili.ContDelete} Delete Per La Giornata Di Oggi`)
                        
                    interaction.reply({embeds:[risposta], ephemeral: true})

                    
                    var notifica = new Discord.MessageEmbed()
                        .setTitle("Messaggio Eliminato Da: "+interaction.member.user.tag+ " Eliminato Con Delete")
                        .setDescription("**Chat Messaggio:** <#"+canale.id+">\n"+"**Autore Del Messaggio:** <@"+message.author.id+">\n**Contenuto Del Messaggio:** "+message.content)
                        .setFooter("Motivo Non Fornito")
                        .setColor("RANDOM")
                    
                    const reason = new Discord.MessageButton()
                        .setLabel("Motivo")
                        .setStyle("DANGER")
                        .setEmoji("🛑")
                        .setCustomId("reason_messaggio_eliminato")
                    const riga = new Discord.MessageActionRow()
                        .addComponents(reason)

                    if(message.attachments.first() != undefined)
                    {   
                        if(message.content == "")
                            notifica.description=notifica.description.replace("\n**Contenuto Del Messaggio:** ", "")
                        notifica = new Discord.MessageEmbed()
                            .setTitle("Messaggio Eliminato Da: "+interaction.member.user.tag+ " Eliminato Con Delete")
                            .setImage(message.attachments.first().url)
                            .setDescription(notifica.description + "\n**↓↓↓↓↓↓↓↓Immagine↓↓↓↓↓↓↓**")
                            .setFooter("Motivo Non Fornito")
                            .setColor("RANDOM")
                        
                    }

                    switch(pattuglia(interaction.member.user.id))
                    {
                        case 1:
                            var p = "996088525827100795"
                            break;
                        case 2:
                            var p = "996088571167506493"
                            break;
                        case 3:
                            var p = "996088615711015022"
                            break;
                        case 4:
                            var p = "996088669364568147"
                            break;
                        case 5:
                            var p = "996088708900073482"
                            break;
                        case 6:
                            var p = "996088752504057906"
                            break;
                        case 7:
                            var p = "1000029442472693870"
                            break;
                        default:
                            var p = "1000029286088069230"
                            break;
                    }
                    client.guilds.cache.get("996087822865936504").channels.cache.get(p).send({embeds : [notifica], components : [riga]})
                    
                    return;
                }
                else
                {
                    const risposta = new Discord.MessageEmbed()
                        .setTitle("Messaggio Non Eliminato")
                        .setColor("RED")
                        .setDescription("Sono Finiti I Delete Per La Giornata Di Oggi")

                    interaction.reply({embeds:[risposta], ephemeral: true})
                }
                
            })
            .catch(() => {
                const risposta = new Discord.MessageEmbed()
                    .setTitle("Messaggio Non Eliminato")
                    .setColor("RED")
                    .setDescription("L'id Del Messaggio Non è Valido")
                    .setFooter({text : "Assicurati Che Che Il Messaggio Sia Presente Nella Chat"})
                    
                
                interaction.reply({embeds:[risposta], ephemeral: true}); 
                
            })

        return;
    }catch(err){
        console.log(err)
        try{
            comando.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max /delete ha fallito cabbo fai")
            
            })  
    
            comando.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return
        }catch{
            return
        }
    }
}

module.exports = {elimina}