/// <reference types="cypress" />

import { autenticar } from "../e2e/autenticacao/autenticacao.acoes";

/**
 * Custom Command é um namespace global: tudo registrado aqui fica visível em
 * todo spec do projeto. Isso é o oposto de modular, então a régua é estreita —
 * só entra o que é genuinamente transversal.
 *
 * `autenticar` passa no critério: é pré-condição de praticamente qualquer
 * funcionalidade protegida. A implementação continua morando na própria
 * funcionalidade; esta linha é apenas o registro global.
 */
Cypress.Commands.add("autenticar", autenticar);
