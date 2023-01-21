const discord = require("discord.js");
const path = require("path")


const variabili = require(path.join(__dirname,"../../../../variabili.json"))

function affiliazioni(interaction){
    try{
        let aChiLoDo = [variabili.C_esteri, variabili.Cameraman, variabili.Creator, variabili.Esaminatore, variabili.M_esteri, variabili.Producer]

        let permission = [{
            id : interaction.guild.roles.everyone,
            deny : ["VIEW_CHANNEL"]
        },
        {
            id :  interaction.member.user.id,
            allow : ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
        }]


        aChiLoDo.forEach(idd =>{
            permission.push({
                id : idd,
                allow : ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
            })
        })

        interaction.guild.channels.create(`ticket- ${interaction.member.user.username}`, {
            parent : variabili.categoriaAffiliazioni,
            permissionOverwrites : permission
        })
        .then((channel)=>{
            let ping = `${interaction.member}`
            aChiLoDo.forEach(id => {
                ping += "<@&" + id +">"; 
            })

            channel.send(ping).then(message => message.delete());


            channel.send({embeds : [
                new discord.MessageEmbed()
                .setTitle("Benvenuto nella sezione Affiliazioni di Discord Italia")
                .setDescription("La preghiamo di procedere con la segnalazione, riceverà una risposta nel minor tempo possibile")
                .setColor("RED")
            ], components : [
                new discord.MessageActionRow()
                .addComponents(
                new discord.MessageButton()
                .setLabel("🔒")
                .setCustomId("close")
                .setStyle("DANGER")
                .setLabel("Chiudi")
                )
            ]})


            return interaction.reply({content : `👍 Visualizza Il Tuo Ticket -> ${channel}`, ephemeral : true})
        })
        .catch(err=>{
            console.log(err);

            return interaction.reply({content : "❌ Qualcosa è andato storto", ephemeral:  true})
        })
    }catch{
        return
    }
}

module.exports = {affiliazioni}; 