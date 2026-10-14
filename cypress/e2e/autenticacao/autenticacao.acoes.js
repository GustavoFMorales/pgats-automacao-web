/// <reference types="cypress" />

import * as paginaLogin from "./login.pagina";

/**
 * Fluxo de autenticação pela interface.
 * Registrado globalmente como `cy.autenticar()` em support/commands.js.
 */
export const autenticar = (email, senha) => {
  paginaLogin.visitar();
  paginaLogin.preencherCredenciais(email, senha);
  paginaLogin.entrar();
};
