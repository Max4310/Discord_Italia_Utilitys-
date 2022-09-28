const Discord=require("discord.js");
const Redis = require('ioredis');
const variabili = require("./variabili.json");
const client = new Discord.Client(
    {intents: 131071}
)
/*client.login("OTgxOTMwMDgyNTY4MzcyMjU0.GtmELi.77EG2LF8bAVv86f4anBQpQMRnVzsCsYXYhCrU8")*/
client.login("OTgwNzk2OTQ5NzM1Mjc2NTk0.Gpysym.aAzYr_nRux_Fulr4jN5S_0Epl_OYfzKoRhwLj8")

const redis = new Redis({ //mi collego al database
    host: 'localhost',
    port: 6379
});

function aggiona(parametro,dir="coinMember")
{
    var user = JSON.stringify(parametro)
    redis.call("JSON.SET", dir, "$", user);
}

async function user(id = "coinMember")
{
    const userr = await redis.call("JSON.GET", id, "$");
    var utente = JSON.parse(userr)
    
    if(utente != null)
    {
        if(utente[0].length != undefined)
            utente = utente[0]

        return utente
    }
    else
        return null
}

async function CoinMember(id)
{
    var members = await user("coinMember")
    //console.log(id)

    if(members != null) 
    {
        var userx = members.find(member => member.id == id)

        if(userx != undefined && userx != null)
            return userx
        else 
            return null
    }
    else
        return null
}

async function aggiungi(parametro)
{
    var members = await user ("coinMember") 
    //console.log(parametro)
    if(members != null)
    {
        CoinMember(parametro.id).then((member) => {
            if(member != null)
            {
                var x = members.findIndex((u) => u.id == member.id)
                members[x] = parametro
            }
            else
                members.push(parametro)


            //console.log(members)
            aggiona(members,"coinMember")
        })
        .catch((err) => {
            console.log(err)
            return
        })
    }
    else
        aggiona(parametro,"coinMember")
}

function isStaff(membro)
{
    if (membro._roles.includes(variabili.staff))
        return true
    else if(membro._roles.includes(variabili.staffAdmin))
        return true
    else if(membro._roles.includes(variabili.Consigliere))
        return true
    else if(membro._roles.includes(variabili.Governo))
        return true
    else 
        return false

}

class abbonamento{
    constructor(id)
    {
        var ver = true
        switch (id)
        {
            case variabili.A_gold:
                 
                this.prezzo = variabili.P_gold
                this.nome = "🥇 **Gold**"
                break
            case variabili.A_vip:
                 
                this.prezzo = variabili.P_vip
                this.nome = "💎 **Vip**"
                break
            case variabili.A_customRole:
                 
                this.prezzo = variabili.P_customRole
                this.nome = "🧸 **Custom Role**"
                break
            case variabili.A_private_call:
                 
                this.prezzo = variabili.P_private_call
                this.nome = "📞 **Private Call**"
                break
            case variabili.A_colore:
                 
                this.prezzo = variabili.P_colore
                this.nome = "🎨 **Colore Base**"
                break
            case variabili.A_casa:
                 
                this.prezzo = variabili.P_casa
                this.nome = "🏠 **Casa**"
                break
            case variabili.A_chatTestuale:
                 
                this.prezzo = variabili.P_chatTestuale
                this.nome = "📄 **Testuale**"
                break
            case variabili.A_spoiler:
                 
                this.prezzo = variabili.P_spoiler
                this.nome = "📢 **Accesso Agli Spoiler**"
                break
            case variabili.A_anteprima:
                 
                this.prezzo = variabili.P_anteprima
                this.nome = "💃 **Anteprima Patch**"
                break
            case variabili.A_colorePlus:
                 
                this.prezzo = variabili.P_colorePlus
                this.nome = "🪙 **Colore Plus**"
                break
            default :
                console.log("L'id Passato Non è Valido")
                ver = false
                break
        }

        if(ver == true)
        {
            var data = new Date;
            var data2 = new Date;
            var temp = 1000 * 60 * 60 * 24 * 30
            
            data2.setTime(data.getTime() + temp)
            const end = {
                giorno : data2.getDate(),
                mese : data2.getMonth()+1,
                anno : data2.getFullYear() 
            }
                
            this.fine = end
            this.id = id
        }
    }
}
class lavoro{
    constructor (id){
        var ver = true
        switch(id)
        {
            case variabili.Helper:
                 
                this.paga = 800
                break
            case variabili.CEO:
                 
                this.paga = 1100
                break
            case variabili.Manager:
                 
                this.paga = 1600
                break
            case variabili.Developer:
                 
                this.paga = 1600
                break
            case variabili.Yakuza :
                 
                this.paga = 1200
                break
            case variabili.Agente :
                 
                this.paga =  1300
                break
            case variabili.Ispettore :
                 
                this.paga = 1500
                break
            case variabili.Commissario:
                 
                this.paga = 3000
                break
            case variabili.CapoPolizia :
                 
                this.paga = 6000
                break
            case variabili.Grafico:
                 
                this.paga = 1500
                break
            case variabili.Apprendista:
                 
                this.paga = 400
                break
            case variabili.Supervisor:
                 
                this.paga = 1500
                break
            case variabili.GestoreCEO:
                 
                this.paga = 1900
                break
            case variabili.Designer:
                 
                this.paga = 3000
                break
            case variabili.Consigliere:
                 
                this.paga = 4000
                break
            case variabili.Boss:
                 
                this.paga = 3000 
                break
            case variabili.HelperMaster:
                 
                this.paga = 2800
                break
            case variabili.DeveloperSenior:
                 
                this.paga = 3500
                break
            case variabili.OfficialManager:
                 
                this.paga = 3500
                break
            case variabili.Giornalista:
                 
                this.paga = 1500
                break
            case variabili.ContentCreator:
                 
                this.paga = 700 
                break
            case variabili.Rianimatore:
                 
                this.paga = 1200
                break
            case variabili.Animatore:
                 
                this.paga = 1300
                break
            case variabili.EventMaster:
                 
                this.paga = 2800
                break
            case variabili.GestoreHelper:
                 
                this.paga =  5000
                break
            case variabili.GestoreDeveloper:
                 
                this.paga = 5000
                break
            case variabili.Governo:
                 
                this.paga = 10000
                break
            case variabili.Cameraman:
                this.paga = 900
                break;
            case variabili.Esaminatore:
                this.paga = 1.800;
                break;
            case variabili.Creator:
                this.paga = 1.600
                break;
            case variabili.Producer:
                this.paga = 3.500
                break;
            default :
                console.log("l'id passato non è valido")
                ver = false
                break;
        }

        if(ver == true)
            this.id = id
    }
}
class membro {
    constructor (id){
        try{
            CoinMember(id).then(all => {
                //console.log(all)

                if(all != null) 
                { 
                    this.id = all.id        //id utente
                    this.lavori = all.lavori    //lavori svolti
                    this.abbonamenti = all.abbonamenti //abbonamenti comprati
                    this.stipendioTot = all.stipendioTot //lo stipendio totale da tutti il lavori
                    this.abbonamentiPrezzo = all.abbonamentiPrezzo //il prezzo di tutti gli abbonamenti
                    this.inviati = all.inviati // i soldi inviati in questa giornata (resettati ogni giorno)
                    this.soldi = all.soldi // il quantitativo di soldi che ha
                    this.warn = all.warn //se l'utenete è warnato nn riceve soldi 
                }
                else
                {
                    this.id = id         //id utente
                    this.lavori = []    //lavori svolti
                    this.abbonamenti = [] //abbonamenti comprati
                    this.stipendioTot = 0 //lo stipendio totale da tutti il lavori
                    this.abbonamentiPrezzo = 0 //il prezzo di tutti gli abbonamenti
                    this.inviati = 0 // i soldi inviati in questa giornata (resettati ogni giorno)
                    this.soldi = 0 // il quantitativo di soldi che ha
                    var membro = client.guilds.cache.get(variabili.discordItalia).members.cache.get(id)
                    var ver = false
                    var i=0
                    while(i < membro._roles.length && ver == false)
                    {
                        if(membro._roles[i] == variabili.warn1 || membro._roles[i] == variabili.warn2 || membro._roles[i] == variabili.warn3 || membro._roles[i] == variabili.warn4 )
                            ver = true
    
                        i++
                    }
                    this.warn = ver // se l'utente è warnato
                    aggiungi(this)
                }
            }).catch((err) => {
                console.log(err)
                return
            })


        }catch(err){
            console.log(err)
            return
        }
        
    }
    assumi (lavoroID) { //metodo per assumere un utente
        try{
            CoinMember("romano").then(() =>{
                //console.log(this)
                
                var lavor = new lavoro(lavoroID)
    
                this.lavori.push(lavor)
                this.stipendioTot = this.stipendioTot + lavor.paga

                console.log("assumi\n")
                console.log(this)
                aggiungi(this)
            }).catch((err) => {
                console.log(err)
                return
            })
        }catch(err){
            console.log(err)
            return
        }
        
    }
    dimetti(lavoroID){ //metoto per dimettere un utente
        try{
            console.log("lavoroid",lavoroID);

            CoinMember("romano").then(() =>{
                let index = this.lavori.findIndex(l => l.id == lavoroID)
                this.lavori.splice(index,1);
                

                console.log("dimetti\n")
                console.log(this)


                aggiungi(this)
            })
            .catch((err) => {
                console.log(err)
                return
            })
        }catch (err){
            console.log(err)
            return
        }
        
    }
    isdimetti(lavoroID)
    {
        try{
            CoinMember("romano").then(() =>{
                var j=0
                var verifica = false
    
                while(j < this.lavori.length && verifica==false)
                {
                    if(this.lavori[j].id == lavoroID)
                        verifica = true
                    j++
                }
    
                return verifica
            })
        }catch(err){
            console.log(err)
            return
        }
        
    }
    aquista(abbonamentoID){ //metodo di aquisto di un abbonamento
        try{
            CoinMember("romano").then(() =>{
                var abbonament = new abbonamento(abbonamentoID)
                
                this.abbonamenti.push(abbonament)
                this.abbonamentiPrezzo = this.abbonamentiPrezzo + abbonament.prezzo
    
                aggiungi(this)
            })
        }catch(err){
            console.log(err)
            return
        }
        
    }
    annulla(abbonamentoID){ //metodo di annullamento di un pagamento
        try{
            CoinMember("romano").then(() =>{
                var j=0
                var verifica = false
    
                while(j < this.abbonamenti.length && verifica==false)
                {
                    if(this.abbonamenti[j].id == abbonamentoID)
                        verifica = true
                    j++
                }
    
                if(verifica == true)
                {
                    for(var k=j-1; k<this.abbonamenti.length-1 ; k++)
                    {
                        var appoggio = this.abbonamenti[k+1]
                        this.abbonamenti[k+1] = this.abbonamenti[k]
                        this.abbonamenti[k] = appoggio
                    }
                    this.abbonamentiPrezzo = this.abbonamentiPrezzo-this.abbonamenti[this.abbonamenti.length-1].prezzo 
                    this.abbonamenti.pop()

                    aggiungi(this)
                }else{
                    console.error("abbonamento non trovato")
                }
            })
        }catch(err){
            console.log(err)
            return
        }
        
    }
    isAnnulla(abbonamentoID)
    {
        try{
            CoinMember("romano").then(() =>{
                var j=0
                var verifica = false
    
                while(j < this.abbonamenti.length && verifica==false)
                {
                    if(this.abbonamenti[j].id == abbonamentoID)
                        verifica = true
                    j++
                }
    
                return verifica
            })
        }catch(err){
            console.log(err)
            return
        }
    }
    invia(id,quanita){ //metodo di invio di soldi
        try{
            CoinMember("romano").then(() =>{
                if(quanita+this.inviati <= 200 && quanita <= this.soldi)
                {
                    this.inviati = this.inviati+quanita
                    var target = new membro(id)
                    target.add(quanita)
                    this.soldi=this.soldi-quanita
    
                    aggiungi(this)
                }
                else
                    console.error("l'utete ha inviato troppi soldi")
            })
        }catch(err){
            console.log(err)
            return
        }
        
        
    }
    add(quanita){ //metodo di aggiunta soldi
        try{
            CoinMember("romano").then(() =>{
                this.soldi = this.soldi+quanita
                
                aggiungi(this)
            })
        }catch(err){
            console.log(err)
            return
        }
        
    }
    remove(quanita){ //metodo per rimuovere i soldi
        try{
            CoinMember("romano").then(() =>{
                this.soldi = this.soldi-quanita
                
                aggiungi(this)
            })
        }catch(err){
            console.log(err)
            return
        }
        
    }
    /*isRemove(quanita){
        try{
            CoinMember("romano").then(() =>{
                console.log(this.soldi, quanita)
                if(this.soldi >= quanita){
                    return true
                }else{
                    return false
                }
            })
        }catch(err){
            console.log(err)
            return
        } 
    }*/
    isDonatore(quanita){
        try{
            CoinMember("romano").then(() =>{
                if(quanita+this.inviati <= 200 && quanita<= this.soldi){
                    return true
                }else{
                    return false
                }
            })
        }catch(err){
            console.log(err)
            return
        }
        
    }
    visualizza(interaction){ //metodo di visualizzazione dell'utente
        try{
            CoinMember("romano").then(() =>{
                var membro = interaction.guild.members.cache.get(this.id)
            
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Inventario Di ${membro.user.tag}`)
                    .setThumbnail(membro.user.displayAvatarURL())
                    .setDescription(`
                    **Totale Dei Soldi:** ${this.soldi}
                    **Warn:** ${this.warn}
                    **Soldi Donati Oggi:** ${this.inviati}\n\n`)
                    .addFields(
                        {
                            name : "Totale Degli Incassi",
                            value : `${this.stipendioTot}`,
                            inline : true
                        },
                        {
                            name : "Totale Delle Spese",
                            value : `${this.abbonamentiPrezzo}`,
                            inline : true
                        },
                    )
                    
                
                if(this.stipendioTot>= this.abbonamenti)
                    embed.setColor("GREEN")
                else
                    embed.setColor("RED")
    
                const lavori = new Discord.MessageButton()
                    .setCustomId("lavori,"+this.id)
                    .setEmoji("⚒️")
                    .setLabel("Lavori")
                    .setStyle("SECONDARY")
    
                const abbonamenti = new Discord.MessageButton()
                    .setCustomId("abbonamenti,"+this.id)
                    .setEmoji("🤩")
                    .setLabel("Abbonamenti")
                    .setStyle("SECONDARY")
    
                const comandi = new Discord.MessageButton()
                    .setCustomId("comandi")
                    .setEmoji("🤖")
                    .setLabel("Comandi")
                    .setStyle("SUCCESS")
                
                if (this.stipendioTot <= 0)
                    lavori.setDisabled()
    
                if(this.abbonamentiPrezzo <= 0)
                    abbonamenti.setDisabled()
    
    
                const row = new Discord.MessageActionRow()
                    .addComponents(lavori)
                    .addComponents(abbonamenti)
                    .addComponents(comandi)
    
                interaction.reply({embeds : [embed], components : [row], ephemeral : true})
                
                
            })
        }catch(err){
            console.log(err)
            return
        }
        
    } 
}

function gestisciVisulizza (interaction)
{
    if(interaction.commandName == "coins")
    {
        var member;
        if(interaction.options.getUser("target") != null && interaction.options.getUser("target") != undefined)
            member = interaction.guild.members.cache.get(interaction.options.getUser("target").id);
        else
            member = interaction.member;

        if(isStaff(member))
        {
            var utenteCoin = new membro(member.user.id)
            utenteCoin.visualizza(interaction)
        }
        else
            interaction.reply({content : "❌ L'utente Non è Nello Staff", ephemeral : true})

         
    }
    else if(interaction.customId.split(",")[0] == "abbonamenti")
    {
        CoinMember(interaction.customId.split(",")[1]).then((utenteCoin) =>{
            if(utenteCoin.abbonamentiPrezzo > 0)
            {
                let utente = interaction.guild.members.cache.get(utenteCoin.id)
                var description = ""
                var prezzo = ""
                var fine = ""
                for(var i=0;i<utenteCoin.abbonamenti.length;i++)    
                {
                    fine = fine + utenteCoin.abbonamenti[i].fine.giorno+"/"+utenteCoin.abbonamenti[i].fine.mese+"/"+utenteCoin.abbonamenti[i].fine.anno+"\n"
                    description = description + utenteCoin.abbonamenti[i].nome +"\n"
                    prezzo = prezzo + utenteCoin.abbonamenti[i].prezzo + "£\n"
                }

                var abbonamenti = new Discord.MessageEmbed()
                    .setTitle(`Abbonamenti Di ${utente.user.tag}`)
                    .setColor(interaction.message.embeds[0].color)
                    .setThumbnail(utente.user.displayAvatarURL())
                    .setDescription(`Spendi **${utenteCoin.abbonamentiPrezzo}£** Al Mese Per Gli Abbonamenti`)
                    .setFields(
                        {
                            name : "Abbonamento",
                            value : description,
                            inline : true
                        },
                        {
                            name : "Scadenza",
                            value : fine,
                            inline : true
                        },
                        {
                            name : "Prezzo",
                            value : prezzo,
                            inline : true
                        }
                    )


                interaction.reply({embeds : [abbonamenti], ephemeral : true})
                
            }
            else
                interaction.reply({content : "❌ <@"+utenteCoin.id+"> Non Ha Nessun Abbonamento", ephemeral : true})
        }).catch(() => interaction.reply({content : "❌ Qualcosa è Andato Storto"}))
        return
    } 
    else if(interaction.customId.split(",")[0] == "lavori")
    {
        CoinMember(interaction.customId.split(",")[1]).then((utenteCoin) =>{
            if(utenteCoin.stipendioTot > 0)
            {
                let utente = interaction.guild.members.cache.get(utenteCoin.id)
                var description = ""
                var prezzo = ""
                for(var i=0;i<utenteCoin.lavori.length;i++)    
                {
                    description = description +"<@&"+ utenteCoin.lavori[i].id +">\n"
                    prezzo = prezzo + utenteCoin.lavori[i].paga + "£\n"
                }

                var abbonamenti = new Discord.MessageEmbed()
                    .setTitle(`Lavori Di ${utente.user.tag}`)
                    .setColor(interaction.message.embeds[0].color)
                    .setThumbnail(utente.user.displayAvatarURL())
                    .setDescription(`Guadagni **${utenteCoin.stipendioTot}£** Al Mese Dai Tuoi Lavori`)
                    .setFields(
                        {
                            name : "Lavori: ",
                            value : description,
                            inline : true
                        },
                        {
                            name : "Paghe: ",
                            value : prezzo,
                            inline : true
                        }
                    )


                interaction.reply({embeds : [abbonamenti], ephemeral : true})
                
            }
            else
            interaction.reply({content : "❌ <@"+utenteCoin.id+"> Non Ha Nessun Lavoro", ephemeral : true})
        
        }).catch(() => interaction.reply({content : "❌ Qualcosa è Andato Storto"}))


        return
    } 
    else if(interaction.customId == "comandi")
    {
        const emebed = new Discord.MessageEmbed()
            .setTitle(`Comandi Discord Italia Coin`)
            .setColor("GREEN")
            .setDescription(
                "**Visualizza Gli:** <#1001643547834982490>\n"+
                "[Aquista I Discord Italia Coin](https://discorditalia.tebex.io/category/1952772)\n\n"+
                "\`/coins\`"+ " *Visualizza Il Profilo Di Un Altro Utente.*\n" +
                "\`/proprieta\`"+ " *Visualizza Le Proprietà Di Un Utente.*\n"+
                "\`/givecoin\`"+ " *Dai Una Parte Di Denaro Ad Un Altro Utente.*\n"+
                "\`/annulla\` *Annulla Un Tuo Abbonamento*"
            )
        
        interaction.reply({embeds : [emebed], ephemeral : true})
        return
    }
    else
        return   
}

module.exports = {membro , gestisciVisulizza,isStaff,CoinMember,aggiona,user,aggiungi}