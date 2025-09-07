import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');
      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve limitar a lista em 3 animais', () => {
    const res = new AbrigoAnimais().encontraPessoas('LASER, RATO, BOLA, CAIXA, NOVELO, SKATE', 'LASER, CAIXA', 'Rex, Bola, Bebe, Loco, Fofo')
    expect(res.lista.length).toBe(5)
    expect(res.lista[0]).toBe('Bebe - pessoa 1');
    expect(res.lista[1]).toBe('Bola - pessoa 1');
    expect(res.lista[2]).toBe('Fofo - abrigo');
    expect(res.lista[3]).toBe('Loco - abrigo');
    expect(res.lista[4]).toBe('Rex - pessoa 1');
    expect(res.erro).toBeFalsy();

  })

  test('Deve enviar animal para o abrigo, ambas pessoas aptas (Tadinho)', () => {
    const res = new AbrigoAnimais().encontraPessoas('CAIXA,NOVELO', 'CAIXA, RATO,NOVELO', 'Bola');
    
    expect(res.lista[0]).toBe('Bola - abrigo');
    expect(res.erro).toBeFalsy();
  })

   test('Deve ser adotado pela pessoa1, apenas uma apta', () => {
    const res = new AbrigoAnimais().encontraPessoas('BOLA, RATO, LASER', 'CAIXA, RATO, NOVELO', 'Fofo');
    
    expect(res.lista[0]).toBe('Fofo - pessoa 1');
    expect(res.erro).toBeFalsy();
  })

  test('Deve enviar animal para o abrigo, ambas pessoas inaptas', () => {
    const res = new AbrigoAnimais().encontraPessoas('CAIXA,NOVELO', 'SKATE, RATO', "Zero");
    expect(res.lista[0]).toBe('Zero - abrigo')
    expect(res.lista.length).toBe(1)
    expect(res.erro).toBeFalsy();
  })

  test('Deve enviar animal para o abrigo, o Loco não fica sozinho', () => {
    const res = new AbrigoAnimais().encontraPessoas('SKATE, RATO', 'BOLA, CAIXA', 'Loco');
    expect(res.lista[0]).toBe('Loco - abrigo');
    expect(res.erro).toBeFalsy();
  })

  test('Deve gerar erro de Animal duplicado', () => {
    const res = new AbrigoAnimais().encontraPessoas('BOLA, LASER', 'RATO, BOLA', 'Rex, Rex');
    expect(res.erro).toBe("Animal inválido");
    expect(res.lista).toBeFalsy();
  })

  test('Deve gerar erro de Brinquedo duplicado', () => {
    const res = new AbrigoAnimais().encontraPessoas('BOLA, LASER, BOLA', 'RATO, BOLA', 'Rex')
    expect(res.erro).toBe("Brinquedo inválido");
    expect(res.lista).toBeFalsy();
  })

  test('Deve eviar o gato Mimi para o abrigo (gatos não dividem brinquedos)', () => {
    const res = new AbrigoAnimais().encontraPessoas('BOLA, RATO, LASER', 'SKATE, RATO, BOLA', 'Mimi,Fofo,Zero');
    expect(res.lista[0]).toBe('Fofo - abrigo');
    expect(res.lista[1]).toBe('Mimi - pessoa 1');
    expect(res.lista[2]).toBe('Zero - pessoa 2');
    expect(res.erro).toBeFalsy();
  })

  test('Deve rejeitar animal, ordem dos brinquedos errada', () => {
    const res = new AbrigoAnimais().encontraPessoas('RATO, LASER, BOLA', 'SKATE, RATO', 'Mimi');
    expect(res.lista[0]).toBe("Mimi - abrigo");
    expect(res.erro).toBeFalsy();
  })

});
