const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../variabili.json"))

const report = new Discord.MessageButton() //pulsante del report tu dici "perche globale" e io perche no? 
    .setEmoji("👮‍♂️")
    .setStyle("DANGER")
    .setCustomId("report")
    .setLabel("Report")

function parole_bannate(testo)
{
    const parole_ban = ["dio","madonna","cristo","gesù","duce","Duce","DVX","dvx","padre pio","dio","figa","negro","frocio","ricchione","lesbicona","lesbicaccia","lisbicona","finocchione","negra","negrone","smegma","d1o","di0","m4donna","m4d0nna","m4d0nn4","mad0nn4","madonn4","nigger","DVCE","dvce","Hitler","HITLER","h|tiler","h!tler","Madonna","Cristo","Dio","D!o","D!O","D*O","P0rco","P0RC0 DI0","PORCO","DIO","Negro","NEGRO" ,"N€gro","N€GR0","N|GGA" ,"N!IGG@","Nebro","NEBRO","NEGR0","Niggers","N!iggers","Fr0cio" ,"FR0CI0","Nehro","nudes","nude","nudi","nuda","nudo","sesso","sex" ,"sess0","porno"  ,"cristaccio","frocione","fr0cio","fr0ci0" ,"froc1o","scopata","scopare","trombata","mignotta","mignotte","diocane","dioporco","dioladro","diobastardo","madonnatroia","madonnaladra","diostronzo","porcoodio" ,"porcodidio","mignottona","battona","puttana","negraccio","bastardo","bastarda","bastard*","bastard","negra","negr*","succhiacazzi","bitch","bitches","nigg@","n3gr0","n3gro","negr0","negrO","N3GR0","NIGG@","negros","negritos","bitchs","nigg3rs","n1gg4","n1gg@","n1gg3r","n1gg3rs","negri","Nig3rss","N1gger","n1gger","N1gg3r","porcodio","porcamadonna","diocane" ,"diomerda","porcodduce","porcoduce","porcodiosburra","porcodiosbura","porcoddiosburra"]
    
    var i=0
    while(i<parole_ban.length)
    {
        if(testo.includes(parole_ban[i]))
            return parole_ban[i]

        i++
    }


    return null
}

function modulo (interaction){
    try{
        parolina = parole_bannate(interaction.fields.getTextInputValue("recensione"))
        if(parolina == null)
        {
            var numerostelle = null
            var recensione = null
            try{
                numerostelle = parseInt(interaction.fields.getTextInputValue("numerostelle"))
                recensione = interaction.fields.getTextInputValue("recensione")
            }catch{
                return
            }
            var stelle = ""

            if(numerostelle <= 5 && numerostelle>=0)
            {
                for(var x = 0; x < numerostelle; x++){
                    stelle += ":star:"
                }

                const embed = new Discord.MessageEmbed()
                    .setTitle(`Recensione di ${interaction.member.user.username}`)
                    .setDescription(`**───────────────────────────────────────\nNumero Di Stelle:** ${stelle}\n\n**Commento: **${recensione}\n\n`)
                    .setColor("#4958cf")
                    .setFooter("\n───────────────────────────────────────\nPer Fare La Tua Recensione ⇨ 💯 \nPer Reportare Questa Recensione ⇨ 👮‍♂️")

                var Nuova = new Discord.MessageButton()
                    .setEmoji("💯")
                    .setStyle("PRIMARY")
                    .setCustomId("recensione")
                    .setLabel("Recencisci")

                var recensione = new Discord.MessageActionRow()
                    .addComponents(Nuova)
                    .addComponents(report)

                interaction.channel.send({embeds: [embed], components : [recensione]})

                interaction.deferUpdate()
            }
            else
            {
                var embed = new Discord.MessageEmbed()
                    .setTitle("**Il Numero Di Stelle Non È Valido**")
                    .setDescription("*Il Massimo è 5, Il Minino è 0.*")
                    .setColor("RED")

                var Nuova = new Discord.MessageButton()
                    .setEmoji("💯")
                    .setStyle("PRIMARY")
                    .setCustomId("recensione")
                    .setLabel("Recencisci")

                var recensione = new Discord.MessageActionRow()
                    .addComponents(Nuova)   
                
                interaction.reply({embeds : [embed] , components : [recensione],ephemeral :true })
            }
        }
        else
        {
            const risposta = new Discord.MessageEmbed()
                .setTitle("**La Ta Recensione Contiene Parole Bannate**")
                .setDescription("Parola Bannata: `"+parolina+"`\n\nLa Tua Recensione: "+interaction.fields.getTextInputValue("recensione"))
                .setColor("RED")
            
            var Nuova = new Discord.MessageButton()
                .setEmoji("💯")
                .setStyle("PRIMARY")
                .setCustomId("recensione")
                .setLabel("Recencisci")

            var recensione = new Discord.MessageActionRow()
                .addComponents(Nuova)   
            
            interaction.reply({embeds : [risposta] , components : [recensione],ephemeral :true })
        }
    }catch(err){
        console.log(err)
        try{
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("max modulo recensioni ha fallito cabbo fai")
            
            })  
    
            interaction.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
    
            return 
        }catch{
            return
        }
    }
    
}

module.exports = {modulo}