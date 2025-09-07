import { Pessoa } from "../Pessoa";

export class ValidarAdocao {

    verficaPessoasAptas(animaisDisponiveis, nomesAnimais, brinquedosValidosPessoa1, brinquedosValidosPessoa2) {
        const resultado = {}
        const pessoa1 = new Pessoa("pessoa 1", brinquedosValidosPessoa1);
        const pessoa2 = new Pessoa("pessoa 2", brinquedosValidosPessoa2);

        const brinquedosJaUsadosPess1 = new Set();
        const brinquedosJaUsadosPess2 = new Set();
        for (let nomeAnimal of nomesAnimais) {
            const animal = animaisDisponiveis[nomeAnimal];
            let apta1 = pessoa1.aptaParaAdotar(animal) && pessoa1.podeAdotarMaisAnimais();
            let apta2 = pessoa2.aptaParaAdotar(animal) && pessoa2.podeAdotarMaisAnimais();

            // o some() é like o anyMatch do Java
            if (animal.tipo.toLowerCase() === "gato") {
                const conflitoPess1 = animal.brinquedosFavoritos.some(x => brinquedosJaUsadosPess1.has(x));
                const conflitoPess2 = animal.brinquedosFavoritos.some(x => brinquedosJaUsadosPess2.has(x));

                if (conflitoPess1) apta1 = false;
                if (conflitoPess2) apta2 = false;
            }

            //verifica se as duas ou nenhuma está apta, em um dos casos passa pro próximo pet
            if ((!apta1 && !apta2) || (apta1 && apta2)) {
                resultado[nomeAnimal] = "abrigo";
                continue; // passa para o próximo animal
            }

            //verificação normal de um(1) ou outro(2) e adiciona os brinquedos na lista dos Usados
            if (apta1) {
                pessoa1.adotar(animal);
                for (const brinquedo of animal.getBrinquedosFavoritos()) {
                    brinquedosJaUsadosPess1.add(brinquedo);
                }
                resultado[nomeAnimal] = pessoa1.nome;
            } else {
                pessoa2.adotar(animal);
                for (const brinquedo of animal.getBrinquedosFavoritos()) {
                    brinquedosJaUsadosPess2.add(brinquedo);
                }
                resultado[nomeAnimal] = pessoa2.nome;
            }
        }
        return resultado;
    }

}
