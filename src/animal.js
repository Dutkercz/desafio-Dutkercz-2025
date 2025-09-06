export class Animal{
    constructor(nome, tipo, brinquedosFavoritos){
        this.nome = nome;
        this.tipo = tipo;
        this.brinquedosFavoritos = brinquedosFavoritos;
    }

    getBrinquedosFavoritos(){
        return this.brinquedosFavoritos;
    }
}
