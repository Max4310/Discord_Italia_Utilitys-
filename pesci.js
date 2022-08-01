const readLine = require("readline")

class inventario{
    constructor(){
        this.pesci = []
        this.valore = 0
    }
    aggiungi(pesce){
        this.pesci.push(pesce)
        this.valore += pesce.valore
    }
    rimuovi(pesce){
        for(var x in this.pesci){
            if(pesce == this.inventario.pesci[x]){
                this.pesci.splice(x)
                this.valore -= pesce.valore
            }
        }
    }
}

class membro{
    constructor(id){
        this.id = id;
        this.inventario = new inventario()
    }
    elimina(){ // elimina il membro
        return
    }
    aggiungi(pesce){
        this.inventario.pesci.push(pesce)
        this.inventario.valore += pesce.valore
    }
    rimuovi(pesce){
        for(var x in this.pesci){
            if(pesce == this.inventario.pesci[x]){
                this.pesci.splice(x)
                this.inventario.valore -= pesce.valore
            }
        }
    }
}

class pesce{
    constructor(tipo, rarita){ //tipo e rarirà = 2 int
        var pesciarray = ["Sardina", "Tonno", "Salmone", "Pesce Spada", "Pesce Tropicale"]
        var ariraArray = ["Comune", "Non Comune", "Raro", "Epico", "Leggendario", "Magico", "Re Del Mare"]
        var raritaMultiplierArray = [1, 2, 5, 10, 20, 50, 100]
        var raritaMultiplier = raritaMultiplierArray[rarita - 1]
        
        
        tipo = parseInt(tipo)
        rarita = parseInt (rarita)
        if(tipo <= pesciarray.length + 1 && rarita <= ariraArray.length+1 && tipo > 0 && rarita > 0)
        {   
            this.valore = tipo*raritaMultiplier
            this.tipo = pesciarray[tipo-1]
            this.rarita = ariraArray[rarita-1]
        }
        else{
            console.error("tipo o rarirà non accettablili \n***massimo tipo: 5**\n**massimo rarira 7**")
        }

        if(this.rarita == "Re Del Mare")
            this.valore = 100 * tipo
    }

}
// 
function randomNumbInclusive(min, max){
    const a = Math.floor(Math.random() * (max - min + 1)) + min
    return a
}

class spawnerManger{ // la classe perche' penso di metterci piu' funzioni
    spawnPesci(){
        var a = randomNumbInclusive(1, 100)
        var ra = randomNumbInclusive(1, 100)
        var tipo = 0
        var rarita = 0
        if(a == 69){
            tipo = 5
        }else if(a <= 11){
            tipo = 4
        }else if(a <= 31){
            tipo = 3
        }else if(a <= 61){
            tipo = 2
        }else{
            tipo = 1
        }
        if(ra == 69){
            rarita = 5
        }else if(ra <= 11){
            rarita = 4
        }else if(ra <= 31){
            rarita = 3
        }else if(ra <= 61){
            rarita = 2
        }else{
            rarita = 1
        }
        var pesciolino = new pesce(tipo, rarita)
        return pesciolino
    }
}

module.exports = {membro,pesce,spawnerManger}