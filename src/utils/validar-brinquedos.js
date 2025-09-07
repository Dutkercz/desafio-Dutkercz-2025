export class ValidarBrinquedos {

    //Fazendo o split por ',' das entradas, e padronizando para.
    //Eliminar elementos repetidos, usando o Set, portanto se as listas(Set e []) 
    //tiverem tamanos diferentes, significa que haviam elementos duplicados
    validaBrinquedos(brinquedos) {
        const listaBrinquedos = brinquedos.split(",").map(b => b.trim().toUpperCase());
        if (new Set(listaBrinquedos).size !== listaBrinquedos.length) {
            return { erro: "Brinquedo inválido", lista: null };
        }
        return listaBrinquedos
    }
}
