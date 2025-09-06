export class Pessoa {
    constructor(nome, brinquedos) {
        this.nome = nome;
        this.brinquedos = brinquedos;
        this.animaisAdotados = [];
    }

    // verifica se a pessoa tem espaço em casa pra adotar mais 1 (limite 3)
    podeAdotarMaisAnimais() {
        return this.animaisAdotados.length < 3;
    }

    // verifica as condições da pessoa para adotar. Brinquedos escolhidos
    aptaParaAdotar(animal) {
        // Regra do Loco (O JABUTI)
        if (animal.nome === "Loco") {
            return this.animaisAdotados.length > 0;
        }
        const favoritos = animal.brinquedosFavoritos.map(b => b.toUpperCase());
        let index = 0;
        for (let b of this.brinquedos) {
            if (b === favoritos[index]) index++;
            if (index === favoritos.length) break;
        }
        return index === favoritos.length;
    }
    adotar(animal) {
        this.animaisAdotados.push(animal);
    }
}
