import { Animal } from './Animal.js';
import { ValidarBrinquedos } from './utils/validar-brinquedos.js';
import { ValidarAnimais } from './utils/validar-animais.js';
import { ValidarAdocao } from './utils/validar-adocao.js';


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
    const validadorBrinquedos = new ValidarBrinquedos();
    const validadorAnimais = new ValidarAnimais();
    const validadorDeAdocao = new ValidarAdocao();
    const brinquedosValidosPessoa1 = validadorBrinquedos.isBrinquedosValidos(brinquedosPessoa1);
    const brinquedosValidosPessoa2 = validadorBrinquedos.isBrinquedosValidos(brinquedosPessoa2);
    const nomesAnimais = validadorAnimais.isAnimaisValidos(ordemAnimais, this.animaisDisponiveis);

    //se o retorno tiver a propiedade "erro", retorna a mensagem de erro
    if (brinquedosValidosPessoa1.erro) return brinquedosValidosPessoa1;
    if (brinquedosValidosPessoa2.erro) return brinquedosValidosPessoa2;
    if (nomesAnimais.erro) return nomesAnimais;
    
    const resultado = validadorDeAdocao.verficaPessoasAptas(this.animaisDisponiveis, nomesAnimais, brinquedosValidosPessoa1, brinquedosValidosPessoa2);
    //Montando a lista final, com o padrão de saída esperado e em ordem alfabetica
    const listaFinal = Object.keys(resultado)
      .sort()
      .map(nome => `${nome} - ${resultado[nome]}`);

    return { erro: null, lista: listaFinal };
  }
}
export { AbrigoAnimais as AbrigoAnimais };
