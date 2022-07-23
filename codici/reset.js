const path = require("path")
const variabili = require(path.join(__dirname,"../variabili.json"))

function reset ()
{
    variabili.inizio_nute = false
    variabili.entroDelete = false
    variabili.ContCapo = 0
    variabili.ContCommissari = 0
    variabili.ContIspettori = 0
    variabili.ContAgenti = 0
    variabili.ContDelete = 0
}

module.exports = {reset}