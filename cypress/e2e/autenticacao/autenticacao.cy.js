/// <reference types="cypress" />

import * as cabecalho from "../../compartilhado/cabecalho.pagina";
import { criarUsuario } from "../../compartilhado/usuario.fabrica";
// Dependência explícita entre funcionalidades: autenticar exige uma conta,
// e quem sabe criar conta é o módulo de cadastro. O import torna isso visível.
import { cadastrarUsuarioEContinuar } from "../cadastro/cadastro.acoes";
import * as paginaLogin from "./login.pagina";

describe("Autenticação", () => {
  // Uma conta descartável por execução. O Cypress limpa os cookies entre os
  // testes, então cada `it` parte sempre do estado deslogado.
  const usuario = criarUsuario();

  before(() => {
    cadastrarUsuarioEContinuar(usuario);
  });

  it("deve efetuar login com e-mail e senha corretos", () => {
    cy.autenticar(usuario.email, usuario.senha);

    cabecalho.deveExibirUsuarioLogado(usuario.nome);
  });

  it("não deve efetuar login com senha incorreta", () => {
    cy.autenticar(usuario.email, "senha-propositalmente-invalida");

    paginaLogin.deveExibirErroDeCredenciaisInvalidas();
  });

  it("deve efetuar logout de um usuário autenticado", () => {
    cy.autenticar(usuario.email, usuario.senha);
    cabecalho.deveExibirUsuarioLogado(usuario.nome);

    cabecalho.sair();

    cy.url().should("include", "/login");
  });
});
