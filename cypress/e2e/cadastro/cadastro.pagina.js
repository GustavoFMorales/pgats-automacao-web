/// <reference types="cypress" />

/**
 * Page Object do fluxo de cadastro.
 *
 * Os seletores ficam em um único ponto: se o front trocar um atributo,
 * o ajuste acontece aqui e em nenhum spec.
 */
const seletores = {
  // Etapa 1 — formulário "New User Signup!" exibido em /login
  campoNome: '[data-qa="signup-name"]',
  campoEmail: '[data-qa="signup-email"]',
  botaoCadastrar: '[data-qa="signup-button"]',
  erroEmailDuplicado: "form[action*=signup] p",

  // Etapa 2 — formulário "Enter Account Information" em /signup
  radioGenero: { masculino: "#id_gender1", feminino: "#id_gender2" },
  campoSenha: '[data-qa="password"]',
  diaNascimento: '[data-qa="days"]',
  mesNascimento: '[data-qa="months"]',
  anoNascimento: '[data-qa="years"]',
  campoPrimeiroNome: '[data-qa="first_name"]',
  campoSobrenome: '[data-qa="last_name"]',
  campoEmpresa: '[data-qa="company"]',
  campoEndereco: '[data-qa="address"]',
  selectPais: '[data-qa="country"]',
  campoEstado: '[data-qa="state"]',
  campoCidade: '[data-qa="city"]',
  campoCep: '[data-qa="zipcode"]',
  campoCelular: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',

  // Etapa 3 — confirmação
  tituloContaCriada: '[data-qa="account-created"]',
  botaoContinuar: '[data-qa="continue-button"]',
};

/** Etapa 1: dispara o cadastro informando nome e e-mail. */
export const iniciarCadastro = (nome, email) => {
  cy.get(seletores.campoNome).type(nome);
  cy.get(seletores.campoEmail).type(email);
  cy.get(seletores.botaoCadastrar).click();
};

/**
 * Etapa 2: preenche o formulário completo a partir do objeto da fábrica.
 * Recebe o usuário inteiro em vez de 14 parâmetros posicionais.
 */
export const preencherDadosDaConta = (usuario) => {
  cy.get(seletores.radioGenero[usuario.genero]).check();
  // log: false evita que a senha apareça no runner e nos artefatos de CI.
  cy.get(seletores.campoSenha).type(usuario.senha, { log: false });

  cy.get(seletores.diaNascimento).select(usuario.dataNascimento.dia);
  cy.get(seletores.mesNascimento).select(usuario.dataNascimento.mes);
  cy.get(seletores.anoNascimento).select(usuario.dataNascimento.ano);

  cy.get(seletores.campoPrimeiroNome).type(usuario.primeiroNome);
  cy.get(seletores.campoSobrenome).type(usuario.sobrenome);
  cy.get(seletores.campoEmpresa).type(usuario.empresa);
  cy.get(seletores.campoEndereco).type(usuario.endereco);
  cy.get(seletores.selectPais).select(usuario.pais);
  cy.get(seletores.campoEstado).type(usuario.estado);
  cy.get(seletores.campoCidade).type(usuario.cidade);
  cy.get(seletores.campoCep).type(usuario.cep);
  cy.get(seletores.campoCelular).type(usuario.celular);
};

export const confirmarCriacaoDaConta = () =>
  cy.get(seletores.botaoCriarConta).click();

export const continuarAposCriacao = () =>
  cy.get(seletores.botaoContinuar).click();

export const deveExibirContaCriada = () =>
  cy
    .get(seletores.tituloContaCriada)
    .should("be.visible")
    .and("contain.text", "Account Created!");

export const deveExibirErroDeEmailDuplicado = () =>
  cy
    .contains(seletores.erroEmailDuplicado, "Email Address already exist!")
    .should("be.visible");
