/// <reference types="cypress" />

/**
 * Cabeçalho — presente em todas as telas da aplicação.
 *
 * Mora em `compartilhado/` porque é usado por mais de uma funcionalidade.
 * Módulo de funções, não classe: não há estado a guardar, e um agrupamento
 * de comportamento sem estado é exatamente o que um módulo é.
 */
const seletores = {
  linkLogin: "a[href*=login]",
  linkSair: 'a[href*="logout"]',
  rotuloUsuarioLogado: "a:contains('Logged in as')",
};

export const irParaLoginECadastro = () => cy.get(seletores.linkLogin).click();

export const sair = () =>
  cy.get(seletores.linkSair).should("be.visible").click();

export const deveExibirUsuarioLogado = (nome) =>
  cy
    .contains(seletores.rotuloUsuarioLogado, `Logged in as ${nome}`)
    .should("be.visible");
