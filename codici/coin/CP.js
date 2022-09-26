const Discord = require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname, "../../variabili.json"))
const { membro, gestisciVisulizza, isStaff, CoinMember, aggiona, user, aggiungi } = require(path.join(__dirname, "../../oggetti.js"))


function origami(interaction)
{
    try{
        interaction.member.roles.add(interaction.guild.roles.cache.get(variabili.R_origami))
            const embed = new Discord.MessageEmbed()
                .setTitle("Colore Riscattato Con Successo")
                .setColor("WHITE")
                .setDescription(`Ho Aggiunto Il colore <@&${variabili.R_origami}>\n`)

            if(interaction.member._roles.includes(variabili.R_buddha))
            {
                interaction.member.roles.remove(variabili.R_buddha)
                embed.setDescription(`${embed.description}-) Ho Rimosso Il Colore <@&${variabili.R_buddha}>\n`)
            }
            
            if( interaction.member._roles.includes(variabili.R_shinigami))
            {
                interaction.member.roles.remove(variabili.R_shinigami)
                embed.setDescription(`${embed.description}-) Ho Rimosso Il Colore <@&${variabili.R_shinigami}>`)
            }
            
            interaction.reply({embeds : [embed], ephemeral : true})
    }catch(err){
        try {
            interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })
            interaction.guild.members.fetch("598498238336729088").then(member => {
                member.user.send(`**CP_origami **${err}`)
            })
            return
        } catch {
            return
        }
    }
}

function buddha(interaction)
{
    try{
        interaction.member.roles.add(interaction.guild.roles.cache.get(variabili.R_buddha))
            const embed = new Discord.MessageEmbed()
                .setTitle("Colore Riscattato Con Successo")
                .setColor("WHITE")
                .setDescription(`Ho Aggiunto Il colore <@&${variabili.R_buddha}>\n`)

            if(interaction.member._roles.includes(variabili.R_origami))
            {
                interaction.member.roles.remove(variabili.R_origami)
                embed.setDescription(`${embed.description}-) Ho Rimosso Il Colore <@&${variabili.R_origami}>\n`)
            }
            
            if( interaction.member._roles.includes(variabili.R_shinigami))
            {
                interaction.member.roles.remove(variabili.R_shinigami)
                embed.setDescription(`${embed.description}-) Ho Rimosso Il Colore <@&${variabili.R_shinigami}>`)
            }
            
            interaction.reply({embeds : [embed], ephemeral : true})
    }catch(err){
        try {
            interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })
            interaction.guild.members.fetch("598498238336729088").then(member => {
                member.user.send(`**CP_buddha **${err}`)
            })
            return
        } catch {
            return
        }
    }

            

} 

function shinigami(interaction)
{
    try{
        interaction.member.roles.add(interaction.guild.roles.cache.get(variabili.R_shinigami))
        const embed = new Discord.MessageEmbed()
            .setTitle("Colore Riscattato Con Successo")
            .setColor("WHITE")
            .setDescription(`Ho Aggiunto Il colore <@&${variabili.R_shinigami}>\n`)

        if(interaction.member._roles.includes(variabili.R_origami))
        {
            interaction.member.roles.remove(variabili.R_origami)
            embed.setDescription(`${embed.description}-) Ho Rimosso Il Colore <@&${variabili.R_origami}>\n`)
        }

        if(interaction.member._roles.includes(variabili.R_buddha))
        {
            interaction.member.roles.remove(variabili.R_buddha)
            embed.setDescription(`${embed.description}-) Ho Rimosso Il Colore <@&${variabili.R_buddha}>\n`)
        }

        interaction.reply({embeds : [embed], ephemeral : true})
    }catch(err){
        try {
            interaction.reply({ content: "❌ Qualcosa è Andato Storto", ephemeral: true })
            interaction.guild.members.fetch("598498238336729088").then(member => {
                member.user.send(`**CP_shinigami **${err}`)
            })
            return
        } catch {
            return
        }
    }
}

module.exports = {origami, buddha, shinigami}