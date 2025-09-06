import { Pessoa } from './Pessoa.js';
import { Animal } from './Animal.js';


class AbrigoAnimais {
  constructor() {
    this.animaisDisponiveis = {
      Rex: new Animal("Rex", "cão", ["RATO", "BOLA"]),
      Mimi: new Animal("Mimi", "gato", ["BOLA", "LASER"]),
      Fofo: new Animal("Fofo", "gato", ["BOLA", "RATO", "LASER"]),
      Zero: new Animal("Zero", "gato", ["RATO", "BOLA"]),
      Bola: new Animal("Bola", "cão", ["CAIXA", "NOVELO"]),
      Bebe: new Animal("Bebe", "cão", ["LASER", "RATO", "BOLA"]),
      Loco: new Animal("Loco", "jabuti", ["SKATE", "RATO"])
    };
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    //Fazendo o split por ',' das entradas, e padronizando para.
    const listaBrinquedos1 = brinquedosPessoa1.split(",").map(b => b.trim().toUpperCase());
    const listaBrinquedos2 = brinquedosPessoa2.split(",").map(b => b.trim().toUpperCase());
    const nomesAnimais = ordemAnimais.split(",").map(a => a.trim());

    //Eliminar elementos repetidos, usando o Set, portanto se as listas(Set e []) 
    //tiverem tamanos diferentes, significa que haviam elementos duplicados
    if (new Set(listaBrinquedos1).size !== listaBrinquedos1.length ||
      new Set(listaBrinquedos2).size !== listaBrinquedos2.length) {
      return { erro: "Brinquedo inválido", lista: null };
    }

    //Verifica se os nomes escolhidos existem na lista de adoção
    const setAnimais = new Set();
    for (let nome of nomesAnimais) {
      if (!this.animaisDisponiveis[nome] || setAnimais.has(nome)) {
        return { erro: "Animal inválido", lista: null };
      }
      setAnimais.add(nome);
    }

    const pessoa1 = new Pessoa("pessoa 1", listaBrinquedos1);
    const pessoa2 = new Pessoa("pessoa 2", listaBrinquedos2);
    const resultado = {};
    const brinquedosJaUsadosPess1 = new Set();
    const brinquedosJaUsadosPess2 = new Set();

    for (let nomeAnimal of nomesAnimais) {
      const animal = this.animaisDisponiveis[nomeAnimal];
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
      } else{
        pessoa2.adotar(animal);
        for (const brinquedo of animal.getBrinquedosFavoritos()) {
          brinquedosJaUsadosPess2.add(brinquedo);
        }
        resultado[nomeAnimal] = pessoa2.nome;
      }
    }

    //Montando a lista final, com o padrão de saída esperado e em ordem alfabetica
    const listaFinal = Object.keys(resultado)
      .sort()
      .map(nome => `${nome} - ${resultado[nome]}`);

    return { erro: null, lista: listaFinal };
  }
}
export { AbrigoAnimais as AbrigoAnimais };
