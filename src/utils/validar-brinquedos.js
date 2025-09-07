export class ValidarBrinquedos {

    //Fazendo o split por ',' das entradas, e padronizando para UPPERCASE
    //Eliminar elementos repetidos, usando o Set, portanto se as listas(Set e []) 
    //tiverem tamanhos diferentes, significa que haviam elementos duplicados
    isBrinquedosValidos(brinquedos) {
        const listaBrinquedos = brinquedos.split(",").map(b => b.trim().toUpperCase());
        if (new Set(listaBrinquedos).size !== listaBrinquedos.length) {
            return { erro: "Brinquedo inválido", lista: null };
        }
        return listaBrinquedos
    }
}
