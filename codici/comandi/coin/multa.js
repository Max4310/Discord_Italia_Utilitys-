const Discord = require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname, "../../../variabili.json"))
const { membro, gestisciVisulizza, isStaff, CoinMember, aggiona, user, aggiungi } = require(path.join(__dirname, "../../../oggetti.js"))

function multa(interaction) {
    try{
        var member = interaction.guild.members.cache.get(interaction.options.getUser("target"));
        if (isStaff(member)) {
            var m = new membro(member.id);
            m.remove(500);
    
            member.send({ content: "Sei Stato Multato Da Uno Staffer\n*Ora Hai " + m.soldi + "£" })
                .catch(() => { return; });
            interaction.reply({ content: "👍 Utente Multato Con Sucesso", ephemeral: true });
        }
        else
            interaction.reply({ content: "❌ L'utente Non è Nello Staff", ephemeral: true })
    }catch (err) {
        try{
            interaction.reply({content : "❌ Qualcosa è Andato Storto", ephemeral : true})
            interaction.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send(`**/proprieta **${err}`)
            
            })  
            return 
        }catch{
            return
        }
}
    
}