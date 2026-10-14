import { fakerPT_BR as faker } from "@faker-js/faker";

/**
 * Fábrica de massa de testes — compartilhada entre as funcionalidades.
 *
 * Cada chamada devolve um usuário único, o que torna os testes repetíveis
 * (nenhum e-mail colide com execuções anteriores) e independentes entre si.
 * `sobrescritas` permite que o teste fixe apenas o campo sob verificação,
 * sem precisar montar o objeto inteiro.
 *
 * @param {object} sobrescritas campos que o teste quer fixar
 */
export const criarUsuario = (sobrescritas = {}) => ({
  nome: `PGATS ${faker.person.firstName()}`,
  email: faker.internet.email().toLowerCase(),
  senha: faker.internet.password({ length: 12 }),
  genero: "masculino",

  // O mês vai em inglês porque o próprio <select> do site usa os nomes
  // em inglês como value. Dado ditado pela aplicação, não escolha nossa.
  dataNascimento: { dia: "1", mes: "October", ano: "1999" },

  primeiroNome: faker.person.firstName(),
  sobrenome: faker.person.lastName(),
  empresa: faker.company.name(),
  endereco: faker.location.streetAddress(),

  // O site não oferece Brasil no <select> de país; mantemos uma das opções
  // válidas para o formulário poder ser submetido.
  pais: "United States",

  estado: faker.location.state(),
  cidade: faker.location.city(),
  cep: faker.location.zipCode(),
  celular: faker.string.numeric(11),

  ...sobrescritas,
});
