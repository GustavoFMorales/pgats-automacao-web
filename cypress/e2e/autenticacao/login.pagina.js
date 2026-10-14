/// <reference types="cypress" />

const seletores = {
  campoEmail: '[data-qa="login-email"]',
  campoSenha: '[data-qa="login-password"]',
  botaoEntrar: '[data-qa="login-button"]',
  mensagemDeErro: 'form[action*="login"] > p',
};

export const visitar = () => cy.visit("/login");

export const preencherCredenciais = (email, senha) => {
  cy.get(seletores.campoEmail).type(email);
  // log: false evita que a senha apareça no runner e nos artefatos de CI.
  cy.get(seletores.campoSenha).type(senha, { log: false });
};

export const entrar = () => cy.get(seletores.botaoEntrar).click();

export const deveExibirErroDeCredenciaisInvalidas = () =>
  cy
    .contains(seletores.mensagemDeErro, "Your email or password is incorrect!")
    .should("be.visible");
