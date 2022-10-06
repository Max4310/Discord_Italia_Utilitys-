const Discord = require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname, "../../../variabili.json"))
const fs = require("fs")


function romano(interaction) {
    variabili.ContCapo = 0
    variabili.ContCommissari = 0
    variabili.ContIspettori = 0
    variabili.ContAgenti = 0


    var data = JSON.stringify(variabili)
    fs.writeFile(path.join(__dirname, "../../../variabili.json"), data, function (err, result) {
        if (err) console.log('error', err);
    });

    interaction.reply({ content: "👍 Mute Concessi Con Successo", ephemeral: true })
}

module.exports = {romano};