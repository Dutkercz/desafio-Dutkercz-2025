/*export class ValidarAnimais {

    
    validaAnimais(ordemAnimais) {
        ordemAnimais.split(",").map(a => a.trim());
        const setAnimais = new Set();
        //Verifica se os nomes escolhidos existem na lista de adoção,
        //ou se ja existem no set
        for (let nome of nomesAnimais) {
            if (!this.animaisDisponiveis[nome] || setAnimais.has(nome)) {
                return { erro: "Animal inválido", lista: null };
            }
            setAnimais.add(nome);
        }
        return setAnimais;
    }
}*/