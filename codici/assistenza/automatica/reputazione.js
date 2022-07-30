const { GOVERNO, JUSTICEID, YAKUZAID, EMOJIMAKER, BIGBRAIN, PROPOSTE, CEMOJI, ASSISTENZAID, RICORSIID, ACQUISTIID, TRANSCRIPTSID, OPENTICKET, HELPERID, LOGCHANNEL, MUTATOID, ABITANTEID, GUILD } = require("./config.json")
const { STELLA1, STELLA2, STELLA3, STELLA4, STELLA5, STELLA6, STELLA7, STELLA8, STELLA9, STELLA0 } = require("./config.json")
const { GRADO1, GRADO2, GRADO3, GRADO4, GRADO5, GRADO6, GRADO7 } = require("./config.json")
const discord = require("discord.js")
const {MessageActionRow, MessageButton} = require("discord.js");

const servealtro = new discord.MessageEmbed()
  .setTitle("⠀Le Serve Altro?⠀")
  .setDescription("✔ Per Continuare Le Richieste\n✖ Per Chiudere Il Ticket")
  .setColor("GREEN")

const rowaltro = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setEmoji("✔")
    .setCustomId("altrosi")
    .setStyle("SUCCESS"),
    new MessageButton()
    .setEmoji("✖")
    .setCustomId("chiudi")
    .setStyle("DANGER")
  )

function findIndex(id,infoTickets)
{
  for(var i=0;i<infoTickets.length;i++)
  {
    if(infoTickets[i].id == id) 
      return i
  }

  return null
}

const reptrue = new discord.MessageEmbed()
  .setTitle("TUTTO NORMALE")
  .setDescription("Non abbiamo trovato nessun problema con la tua *Reputazione*")
  .setColor("GREEN")
  .setFooter({text: "In caso di errori da parte del bot la preghiamo di parlare con un operatore"})

const repfal = new discord.MessageEmbed()
  .setTitle("‼PROBLEMA RILEVATO‼")
  .setDescription("Stiamo risolvendo l'errore ci scusiamo per il disagio")
  .setColor("RED")
  .setFooter({text: "Se il problema persiste la preghiamo di parlare con un operatore"})

const repboh = new discord.MessageEmbed()
  .setTitle("‼PROBLEMA RILEVATO‼")
  .setDescription("Per un errore del sistema non ha ricevuto la prima stella,\nda ora ha accesso al sistema di Reputazione, per maggiori informazioni -> <#940633995568369684>")
  .setColor("GREEN")
  .setFooter({text: "Se il problema persiste la preghiamo di parlare con un operatore"})


function rep(interaction, infoTickets)
{
  try{
    const member = interaction.member
    const stellerolesid = [STELLA1, STELLA2, STELLA3, STELLA4, STELLA5, STELLA6, STELLA7, STELLA8, STELLA9, STELLA0]
    const reprolesid = [ABITANTEID, GRADO1, GRADO2, GRADO2, GRADO3, GRADO3, GRADO4, GRADO4, GRADO5, GRADO6]
    const memberRoles = interaction.member._roles
    
    var memberstelle = []
    var memberreputazione = []
    
    
    var roles = null
    for(let x in memberRoles){ //si prendisponde 2 array con tutti gli eventuali ruoli stella e un altro con tutti il ruolo di grado
        if(stellerolesid.includes(memberRoles[x])){
            memberstelle.push(memberRoles[x])
        }
        if(reprolesid.includes(memberRoles[x])){
            memberreputazione.push(memberRoles[x])
        }
    }
    
    var star = 0
    for(let x in memberstelle){ //si prende la stella maggiore che trova 
        for(let stelle in stellerolesid){
            if(stellerolesid[stelle] == memberstelle[x]){
                if(stelle >= star){
                    star = stelle
                }
            }
        }
    }
    
    var rep = 0
    for(let x in memberreputazione){ //si prende il grado maggiore ah no... verifica che quel array ha piu di uno spazio e idem sopra... ODDIO CHE COSA CONTORTA QUESTO È CARDINAL
        for(let reproles in reprolesid){
            if(reprolesid[reproles] == memberreputazione[x]){
                if(reproles >= rep){
                    rep = reproles
                }
            }
        }
    } //aaaaaa ma è un nificato si scorre tuttto l'array ed cosi ha in rep umm no nonha senso... 
    
    /*
      rep = se ha un ruolo rep > di 1 questa variabile è incrementata
      ster = se ha un ruolo stella > di 1 questa variabile è incrementata
      
      SONO PARALLALI(?) misa di si...
    */
    
    if(star == rep && rep != 0){ //tutto apposto
      
      const v = interaction.channel.lastMessage
      v.edit({embeds: [reptrue, servealtro], components: [rowaltro]})
    
    }
    else if(rep != 0 && star != 0)
    { //sistema i gradi  o la stella in base al maggiore  
      if(star > rep){
        interaction.member.roles.add(reprolesid[star])
      }else{
        interaction.member.roles.add(stellerolesid[rep])
      }
      const v = interaction.channel.lastMessage
      v.edit({embeds: [repfal, servealtro], components: [rowaltro]})
    }
    else
    {
      interaction.member.roles.add(stellerolesid[0])
      interaction.member.roles.add(reprolesid[0])
      const v = interaction.channel.lastMessage
      v.edit({embeds: [repboh, servealtro], components: [rowaltro]})
    }
    
    if(star > rep){
      r = star
    }else if(rep > star){
      r = rep
    }else{
      r = rep
    }
    /*
    if(rep >= star)
      r= rep
    else
      r=star
    */
    
    var fixedreputazione = parseInt(r)
    var ruoloreputazione = reprolesid[r]
    var ruolostella = stellerolesid[r]
    for(let x in memberstelle){
      if(memberstelle[x] != ruolostella && x < r){ 
        interaction.member.roles.remove(memberstelle[x])
      }
    }
    
    for(let x in memberreputazione){
      if(memberreputazione[x] != ruoloreputazione && x < r){
        interaction.member.roles.remove(memberreputazione[x])
      }
    }
    
    fixedreputazione += 1
    
    if(fixedreputazione == 4){
        if(interaction.member.roles.cache.some(r => r.id == EMOJIMAKER)){
            interaction.member.roles.remove(ruoloreputazione)
            interaction.member.roles.remove(ruolostella)
            interaction.member.roles.add(reprolesid[fixedreputazione])
            interaction.member.roles.add(stellerolesid[fixedreputazione])
          }
      }else if(fixedreputazione == 7){
          if(interaction.member.roles.cache.some(r => r.id == BIGBRAIN)){
              interaction.member.roles.remove(ruoloreputazione)
              interaction.member.roles.remove(ruolostella)
              interaction.member.roles.add(reprolesid[fixedreputazione])
              interaction.member.roles.add(stellerolesid[fixedreputazione])
          }
      }
      interaction.deferUpdate()
      //ok ammetto che non ho capito cosa avete fatto qui... 
      //inc cr
    
    
      var index = findIndex(interaction.member.user.id, infoTickets)
      if(index == null)
      {
        var ticket = {"channel":interaction.channelId,"cvt":0,"cvf":0,"cr":1,"ci":0,"id":interaction.member.user.id}
        infoTickets.push(ticket)
      }
      else
        infoTickets[index].cr ++ 
  }catch(err){
    console.log(err)
    try{
      interaction.guild.members.fetch("598498238336729088").then(member =>{
        member.user.send(`**assistenza rep ** ${err}`)
      }) 
      
      interaction.reply({content : "❌ Qualcosa é Andato Storto", ephemeral : true})
      return 
    }catch{
      return
    }
  }
    
}

module.exports = {rep}