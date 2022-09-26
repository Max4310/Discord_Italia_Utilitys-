const Discord=require("discord.js");
const path = require("path");
const internal = require("stream");
const variabili = require(path.join(__dirname,"../../../variabili.json"))

function grado (comando){
    try{
        var utente = comando.options.getUser("target")
        var membro = comando.guild.members.cache.get(utente.id)
        

        if(utente != comando.user)
        {
            Is=false
            bo=false
            k=0
        
            while(variabili.stelle[k] != undefined && Is == false)
            {
                c=0
                while(membro._roles[c] != undefined)
                {
        
                    if(variabili.stelle[k] == membro._roles[c])
                        Is=true;
                    
                    if (bo==false)
                    {
                        if(membro._roles[c] == variabili.gradi[0])
                        {
                            role = comando.guild.roles.cache.get(variabili.gradi[0])
        
                            membro.roles.remove(role)
                        }
                        
                        if(membro._roles[c]==variabili.gradi[1]) 
                        {
                            role = comando.guild.roles.cache.get(variabili.gradi[1])
        
                            membro.roles.remove(role)
                        }               
                        
                        if(membro._roles[c]==variabili.gradi[2])  
                        {
                            role = comando.guild.roles.cache.get(variabili.gradi[2])
        
                            membro.roles.remove(role)
                        }              
                        
                        if(membro._roles[c]==variabili.gradi[3])
                        {
                            role = comando.guild.roles.cache.get(variabili.gradi[3])
        
                            membro.roles.remove(role)
                        }
                        
                        if(membro._roles[c]==variabili.gradi[4])
                        {
                            role = comando.guild.roles.cache.get(variabili.gradi[4])
        
                            membro.roles.remove(role)
                        }
                        
                        if(membro._roles[c]==variabili.gradi[5])
                        {
                            role = comando.guild.roles.cache.get(variabili.gradi[5])
        
                            membro.roles.remove(role)
                        }
                    }
                    c++;
                }
                bo=true;
                k++;
            }
        
            if(Is==false)
            {
                var role = comando.guild.roles.cache.get(variabili.gradi[0])
                membro.roles.add(role)
        
                comando.reply({
                    "content": null,
                    "embeds": [
                    {
                        "title": "Discord Italia",
                        "description": "───────────────────────────────────────\n<@"+membro.id+"> Era Sprovvisto Di Stelle Ora Abbiamo Sistemato",
                        "color": 15871
                    }
                    ],
                    "attachments": []
                })
            }
            else
            { 
                /*i=0 @1 stella 
                i=1 @2 stelle 
                i=2 @3 stelle 
                i=3 @4 stelle 
                i=4 @5 stelle 
                i=5 @6 stelle 
                i=6 @7 stelle 
                i=7 @8 stelle 
                i=8 @9 stelle 
                i=9 @10 stelle*/ 
                
                if (k > 0)
                {
                    k=k-1    
                    var role
                    if (k==1)
                        var role = comando.guild.roles.cache.get(variabili.gradi[0])
                    else if (k==2 || k==3)
                        var role = comando.guild.roles.cache.get(variabili.gradi[1])
                    else if (k==4 || k==5)
                        var role = comando.guild.roles.cache.get(variabili.gradi[2])
                    else if(k==6 || k==7)
                        var role = comando.guild.roles.cache.get(variabili.gradi[3])
                    else if (k==8)
                        var role = comando.guild.roles.cache.get(variabili.gradi[4])
                    else if(k==9)
                        var role = comando.guild.roles.cache.get(variabili.gradi[5])
                    membro.roles.add(role)
        
                    comando.reply({
                        "content": null,
                        "embeds": [
                        {
                            "title": "Discord Italia",
                            "description": "───────────────────────────────────────\n<@"+membro.id+"> Possiede "+(k+1)+"^ Stella Abbiamo Quindi Ripristinato Il Suo Grado A <@&"+role.id+">",
                            "color": 15871
                        }
                        ],
                        "attachments": []
                    })
                }
                else
                {
                    comando.reply({
                        "content": null,
                        "embeds": [
                        {
                            "title": "Discord Italia",
                            "description": "───────────────────────────────────────\n<@"+membro.id+"> Possiede "+(k)+"^ Quindi Non Ha Diritto Ad Alcun Grando",
                            "color": 15871
                        }
                        ],
                        "attachments": []
                    })
                }
                
            }
            
            var canale = comando.guild.channels.cache.get(variabili.log)
            canale.send("<@"+comando.member.id+"> ha eseguito il comando grado su <@"+membro.id+">")
        }
        else
            comando.reply({content : "❌ Non Puoi Usare Questo Comando Su Te Stesso", ephemeral : true})
        return
    }catch(err){
        console.log(err)
        try{
            comando.guild.members.fetch("598498238336729088").then(member =>{
                member.user.send("**/grado** "+ err)
            
            })  
        
            comando.reply({content : "Qualcosa è Andato Storto", ephemeral : true})
        
            return
        }catch{
            return
        }
        
    }    
}

module.exports = {grado}