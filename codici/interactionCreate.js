const path = require("path")
const variabili = require(path.join(__dirname,"../variabili.json"))
const fs = require("fs")
const { Client } = require("discord.js")
const Discord = require("discord.js")
const {membro, gestisciVisulizza, isStaff , CoinMember ,aggiona,user,aggiungi} = require(path.join(__dirname,"../oggetti.js"))


function menager (interaction,client,infoTickets)
{
    //if(interaction.member.user.id != "598498238336729088") return interaction.reply({content : "😚 Bot In Manutezione", ephemeral : true})

    gestisciVisulizza(interaction)
    if(interaction.isCommand())
    {
        if(interaction.commandName == "regole"){ // comandi / generici / regole.js
            const regole = require (path.join(__dirname,"/comandi/generici/regole.js"))
            
            regole.regole(interaction)
        }
        else if(interaction.commandName == "prefissi"){ //comandi / generici / prefissi.js
            const prefissi = require (path.join(__dirname,"/comandi/generici/prefissi.js"))

            prefissi.prefissi(interaction)
        } 
        else if(interaction.commandName == "info"){ //comandi / generici / info.js
            const info = require (path.join(__dirname,"/comandi/generici/info.js"))

            info.info(interaction)
        }
        else if(interaction.commandName=="delete") //delete.js
        {
            const elimina = require (path.join(__dirname,"/comandi/staff/delete.js"))

            elimina.elimina(interaction,client)
        }
        else if(interaction.commandName=="mute") //mute.js
        {
            const mute = require (path.join(__dirname,"/comandi/staff/mute.js"))

            mute.mute(interaction)
        }
        else if(interaction.commandName=="verifica" && interaction.channel.parentId==variabili.assistenza) //verifica.js 
        {
            const verifica = require (path.join(__dirname,"/comandi/staff/verifica.js"))

            verifica.verifica(interaction)
        }
        else if(interaction.commandName=="stella" && interaction.channel.parentId==variabili.assistenza) //stellla.js
        {
            const stella = require (path.join(__dirname,"/comandi/staff/stella.js"))

            stella.stella(interaction)
        }
        else if(interaction.commandName=="grado" && interaction.channel.parentId==variabili.assistenza) //grado.js 
        {
            const grado = require (path.join(__dirname,"/comandi/staff/grado.js"))

            grado.grado(interaction)
        }
        else if((interaction.commandName=="stella" || interaction.commandName=="verifica" || interaction.commandName=="grado") && interaction.channel.parentId != variabili.assistenza)
        {
            interaction.reply({content : "❌ Non Puoi Fare Questo Comando Fuori Da Un Ticket", ephemeral: true})
            return
        }
        else if(interaction.commandName == "pattuglie") // comandi / staff /pattuglie.js
        {
            const pattuglie = require (path.join(__dirname,"/comandi/staff/pattuglie.js"))

            pattuglie.pattuglie(interaction)
        }
        /*else if(interaction.commandName == "add")  //gestione dello /add
        {
            const add = require (path.join(__dirname,"/assistenza/commands/add.js"))

            add.add(interaction)
        }
        else if(interaction.commandName == "remove") //gestine del /remove
        { 
            const remove = require (path.join(__dirname,"/assistenza/commands/remove.js"))

            remove.remove(interaction)
        }
        else if(interaction.commandName == "close") //chiude un ticket con lo /close
        {
            const close = require (path.join(__dirname,"/assistenza/commands/close.js"))

            close.close(interaction)
        }
        else if(interaction.commandName == "managecoin")//comandi/coin/managecoin
        {
            const managecoin = require (path.join(__dirname,"/comandi/coin/managecoin.js"))
            managecoin.managecoin(interaction, client)
        }
        else if(interaction.commandName == "warn")//comandi/coin/warn.comando
        {
            const warn = require (path.join(__dirname,"/comandi/coin/warn.js"))
            warn.comando(interaction)
        }
        else if(interaction.commandName == "infowarn")//comandi/coin/warn.info
        {
            const warn = require (path.join(__dirname,"/comandi/coin/warn.js"))
            warn.info(interaction)
        }
        else if(interaction.commandName == "proprieta")//comandi/coin/proprietà
        {
            const proprieta = require (path.join(__dirname,"/comandi/coin/proprieta.js"))
            proprieta.proprieta(interaction)
        }
        else if(interaction.commandName == "boost")//comandi/coin/boost
        {
            const boost = require (path.join(__dirname,"/comandi/coin/boost.js"))
            boost.boost(interaction)
        }
        else if(interaction.commandName == "give")//comandi/coin/role.give
        {
            const role = require (path.join(__dirname,"/comandi/coin/role.js"))
            role.give(interaction)
        }
        else if(interaction.commandName == "inforole")//comandi/coin/role.info
        {
            const role = require (path.join(__dirname,"/comandi/coin/role.js"))
            role.info(interaction)
        }
        else if(interaction.commandName == "assumi")//comandi/coin/lavori.assumi
        {
            const lavori = require (path.join(__dirname,"/comandi/coin/lavori.js"))
            lavori.assumi(interaction)
        }
        else if(interaction.commandName == "dimetti")//comandi/coin/lavori.dimetti
        {
            const lavori = require (path.join(__dirname,"/comandi/coin/lavori.js"))
            lavori.dimetti(interaction)
        }
        else if(interaction.commandName == "multa"){
            const multa = require (path.join(__dirname,"/comandi/coin/multa.js"))
            multa.multa(interaction)  
        }
        else if(interaction.commandName == "abbonati"){
            const abbonati = require (path.join(__dirname,"/comandi/coin/abbonati.js"))
            abbonati.command(interaction)
        }
        else if(interaction.commandName == "annulla"){
            if(interaction.member.user.id == "598498238336729088"){

            }
            else{
                interaction.reply({content:  "😁 Stiamo Ancora Testando Questo Comando A Breve Sarà Disponibile", ephemeral : true})
            }
        }
        else if (interaction.commandName == "matrimonio"){
            const matrimonio = require (path.join(__dirname,"/comandi/generici/matrimonio.js"))
            matrimonio.matrimonio(interaction)
        }
        else if (interaction.commandName == "divorzia") {
            const matrimonio = require (path.join(__dirname,"/comandi/generici/matrimonio.js"))
            matrimonio.divorzia(interaction)
        }
        else if(interaction.commandName == "visualizzamatrimoni"){
            const matrimonio = require (path.join(__dirname,"/comandi/generici/matrimonio.js"))
            matrimonio.visualizzamatrimoni(interaction)
        }*/
    }
    else if(interaction.isModalSubmit()){ 
        if(interaction.customId == "modulorecensioni"){ // recensioni / modulo.js
            const modulorecensioni = require (path.join(__dirname,"/recensioni/modulo.js"))

            modulorecensioni.modulo(interaction)
        }
        else if(interaction.customId == "moduloreport"){ //recensioni / report / modulo.js
            const moduloreport = require (path.join(__dirname,"/recensioni/report/modulo.js"))

            moduloreport.modulo(interaction)
        }
        else if(interaction.customId == "EL_modal") // recensioni / report / reason / modulo.js
        {
            const EL_modal = require (path.join(__dirname,"/recensioni/report/reason/modulo.js"))

            EL_modal.modulo(interaction)
        }
        else if(interaction.customId.split(",")[0] == "cd_verifica") // verifica / modal.js
        {
            const cd_verifica = require (path.join(__dirname,"/verifica/modal.js"))

            cd_verifica.modulo(interaction)
        }
    }
    else if(interaction.isButton())
    {
        if(interaction.customId == "no_rece") // recensioni / report / reason / elimina.js
        {
            const no_rece = require (path.join(__dirname,"/recensioni/report/reason/elimina.js"))

            no_rece.elimina(interaction)
        }
        else if(interaction.customId == "P_verifica") // verifica/pulsante.js
        {  
            const P_verifica = require (path.join(__dirname,"/verifica/pulsante.js"))

            P_verifica.pulsante(interaction)
        }
        else if(interaction.customId == "recensione"){ // recensioni / pulsante.js 
            const recensione = require (path.join(__dirname,"/recensioni/pulsante.js"))

            recensione.pulsante(interaction)
        }
        else if(interaction.customId == "report" ) // recensioni / report / pulsante.js
        {
            const report = require (path.join(__dirname,"/recensioni/report/pulsante.js"))

            report.pulsante(interaction)
        }
        else if(interaction.customId == "reason_messaggio_eliminato") // recensioni / report / reason / pulsante.js
        {
            const reason_messaggio_eliminato = require (path.join(__dirname,"/recensioni/report/reason/pulsante.js"))

            reason_messaggio_eliminato.pulsante(interaction)
        }
        else if(interaction.customId.split(",")[0] == "pulaLevaSI") 
        {
            const pulaLevaSI = require (path.join(__dirname,"/comandi/staff/pulaLevaSI.js"))

            pulaLevaSI.pulaLevaSI(interaction)
        }
        /*else if(interaction.customId == "assistenzaverifica") // sistema la verifica
        {
            const verifica = require (path.join(__dirname,"/assistenza/automatica/verifica.js"))

            verifica.verifica(interaction,infoTickets)
        }
        else if(interaction.customId == "assistenzareputazione") //qui sistema reputazione in maniera un po ambigua ma lo fa...
        {
            const rep = require (path.join(__dirname,"/assistenza/automatica/reputazione.js"))

            rep.rep(interaction,infoTickets)
        }
        else if(interaction.customId == "assistenzainfo") //gestisce le info per il server di discord italia (in beta manca il testo di foca)
        {
            const info = require (path.join(__dirname,"/assistenza/automatica/info.js"))

            info.info(interaction,infoTickets)
        }
        else if(interaction.customId == "assistenzaaltro") //contatto un operatore
        {
            const operatore = require (path.join(__dirname,"/assistenza/automatica/operatore.js"))

            operatore.operatore(interaction,infoTickets)
        }
        else if(interaction.customId == "altrosi") //altro si
        {
          const EmbedAssistenza = new Discord.MessageEmbed()
            .setTitle("Assistenza Automatica di Discord Italia (V Beta)")
            .setDescription("━━━━━━━━━━━━━━━━━\n\n𝐏𝐫𝐨𝐛𝐥𝐞𝐦𝐢 𝐝𝐢 𝐕𝐞𝐫𝐢𝐟𝐢𝐜𝐚 ➜ 🔒\n\n𝐀𝐬𝐬𝐢𝐬𝐭𝐞𝐧𝐳𝐚 𝐑𝐞𝐩𝐮𝐭𝐚𝐳𝐢𝐨𝐧𝐞 ➜ ⭐\n\n𝐈𝐧𝐟𝐨 𝐒𝐞𝐫𝐯𝐞𝐫 ➜ 🔎\n\n𝐏𝐚𝐫𝐥𝐚𝐫𝐞 𝐜𝐨𝐧 𝐮𝐧 𝐎𝐩𝐞𝐫𝐚𝐭𝐨𝐫𝐞 ➜ 👷‍♂️\n\n𝐀𝐫𝐜𝐡𝐢𝐯𝐢𝐚 𝐓𝐢𝐜𝐤𝐞𝐭 ➜ 📂\n\n━━━━━━━━━━━━━━━━━")
            .setColor("GREEN")
            .setFooter({text:'‼ 𝐋𝐞 𝐏𝐚𝐫𝐭𝐧𝐞𝐫𝐬𝐡𝐢𝐩 𝐒𝐨𝐧𝐨 𝐀𝐭𝐭𝐮𝐚𝐥𝐦𝐞𝐧𝐭𝐞 𝐂𝐡𝐢𝐮𝐬𝐞 ‼'})
          const rowe = new Discord.MessageActionRow()
          .addComponents(
              new Discord.MessageButton()
              .setEmoji("🔒")
              .setCustomId("assistenzaverifica")
              .setStyle("PRIMARY"),
              new Discord.MessageButton()
              .setEmoji("⭐")
              .setCustomId("assistenzareputazione")
              .setStyle("PRIMARY"),
              new Discord.MessageButton()
              .setEmoji("🔎")
              .setCustomId("assistenzainfo")
              .setStyle("PRIMARY"),
              new Discord.MessageButton()
              .setEmoji("👷‍♂️")
              .setCustomId("assistenzaaltro")
              .setStyle("PRIMARY"),
              new Discord.MessageButton()
              .setEmoji("📂")
              .setCustomId("chiudi")
              .setStyle("DANGER")
          )
          interaction.deferUpdate()
          const g = interaction.channel.lastMessage
          g.edit({embeds: [EmbedAssistenza], components: [rowe]})
        }
        else if(interaction.customId == "chiudi") //chiudi il ticket
        {
            const chiudi = require (path.join(__dirname,"/assistenza/automatica/chiudi.js"))

            chiudi.chiudi(interaction,infoTickets)
        }
        else if(interaction.customId == "assistenzanormale") //apre il ticket normale
        {
            // ticket / crea PASSARE ANCHE L'ARRAY DEI TICKET (infotickets)  
            const assistenza = require (path.join(__dirname,"/assistenza/ticket/crea/assistenza.js"))

            assistenza.assistenza(interaction,infoTickets)
        } 
        else if(interaction.customId == "ricorsi") //apre il ticket ricorsi
        {
            const ricorsi = require (path.join(__dirname,"/assistenza/ticket/crea/ricorsi.js"))

            ricorsi.ricorsi(interaction)
        } 
        else if(interaction.customId == "acquisti") //apre il ticket di acquisti
        {
            const acquisti = require (path.join(__dirname,"/assistenza/ticket/crea/acquisti.js"))

            acquisti.acquisti(interaction)
        }
        else if(interaction.customId == "ticket:affiliazioni"){
            const affiliazioni = require (path.join(__dirname,"/assistenza/ticket/crea/affiliazioni.js"))

            affiliazioni.affiliazioni(interaction)
        }
        else if(interaction.customId == "claim") //claim degli helper
        {
            const claimHelper = require (path.join(__dirname,"/assistenza/ticket/gestione/claimHelper.js"))

            claimHelper.claimHelper(interaction)
        } 
        else if(interaction.customId == "claim2")  //claim della yakuza
        {
            const claimYakuza = require (path.join(__dirname,"/assistenza/ticket/gestione/claimYakuza.js"))

            claimYakuza.claimYakuza(interaction)
        }
        else if(interaction.customId == "close") //l'operatore chiude il ticket
        {
            const close = require (path.join(__dirname,"/assistenza/ticket/gestione/close.js"))

            close.close(interaction)
        }
        else if (interaction.customId == "CR_assistenza") //coin/cr.assistenza
        {
            const cr = require (path.join(__dirname,"/coin/CR"))
            cr.assistenza(interaction)
        }
        else if(interaction.customId == "CR_close") //coin/cr.close
        {
            const cr = require (path.join(__dirname,"/coin/CR"))
            cr.close(interaction)
        }
        else if (interaction.customId == "CP_origami")//coin/cp.origami
        {
            const CP = require (path.join(__dirname,"/coin/CP"))
            CP.origami(interaction)
        }
        else if (interaction.customId == "CP_buddha")//coin/cp.buddha
        {
            const CP = require (path.join(__dirname,"/coin/CP"))
            CP.buddha(interaction)
        }
        else if (interaction.customId == "CP_shinigami")//coin/cp.shinigami
        {
            const CP = require (path.join(__dirname,"/coin/CP"))
            CP.shinigami(interaction)
        }
        else if(interaction.customId.split(",")[0] == "abbonamenti"){
            const visualizzaCoin = require (path.join(__dirname,"/coin/visualizzaCoin.js"))
            visualizzaCoin.abbonamenti(interaction);
        }
        else if(interaction.customId.split(",")[0] == "lavori"){
            const visualizzaCoin = require (path.join(__dirname,"/coin/visualizzaCoin.js"))
            visualizzaCoin.lavori(interaction)
        }
        else if(interaction.customId == "comandi"){
            const visualizzaCoin = require (path.join(__dirname,"/coin/visualizzaCoin.js"))
            visualizzaCoin.comandi(interaction);
        }*/
        else if(interaction.customId == "pula_concedi"){
            const concediPula = require (path.join(__dirname,"/comandi/staff/concediPula.js"))
            concediPula.romano(interaction)
        }
        else if (interaction.customId.startsWith("sposi_accetto,")){
            const matrimonio = require (path.join(__dirname,"/comandi/generici/matrimonio.js"))
            matrimonio.sposi_accetto(interaction)
        }
    }
    else if(interaction.isSelectMenu())
    {
        if(interaction.customId.split(":")[0] == "profilo") //gestisce il profilo
        {
            const profilo = require("./profilo.js")

            profilo.profilo(interaction)
        }
        /*else if(interaction.customId == "abbonamentiMenu")//coin/abbonamenti
        {
            const abbonamentiMenu = require (path.join(__dirname,"/coin/abbonamenti"))
            abbonamentiMenu.abbonamenti(interaction,client)
        }
        else if(interaction.customId.split(",")[0] == "Assumi")//coin/lavoro.assumi
        {
            const lavoro = require (path.join(__dirname,"/coin/lavoro"))
            lavoro.assumi(interaction)
        }   
        else if(interaction.customId.split(",")[0] == "Dimetti")//coin/lavoro.dimetti
        {
            const lavoro = require (path.join(__dirname,"/coin/lavoro"))
            lavoro.dimetti(interaction)
        }*/ 
    }
}
module.exports = {menager}
