const Discord=require("discord.js");
const path = require("path")
const variabili = require(path.join(__dirname,"../../../variabili.json"))

function prefissi(interaction){
    const embed = new Discord.MessageEmbed()
        .setTitle("BOT DELLA MUSICA")
        .setDescription("**-)**<@866956216420007946> Prefix `di.`\n**-)**<@239631525350604801> Prefix `p!`\n**-)**<@282859044593598464> Prefix `.`\n**-)**<@159985870458322944> Prefix `!`\n\n**────────────────────────────────────────**\n**ACTIVITY RANK**\n\n**-)**`/top members server`\n(Visualizza la top generale del server)\n\n**-)**`/top members server -> Period: Week`\n(Visualizza la top settimanale del server)\n\n**-)** `/top members server -> Period: Day`\n(Visualizza la top giornaliera del server)")
        .setColor("BLURPLE")
    interaction.reply({embeds: [embed], ephemeral: true})
}

module.exports = {prefissi}