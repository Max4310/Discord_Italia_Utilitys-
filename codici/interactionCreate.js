const path = require("path")
const variabili = require(path.join(__dirname,"../variabili.json"))
const fs = require("fs")

function menager (interaction)
{
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

            elimina.elimina(interaction)
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
    }
}
module.exports = {menager}