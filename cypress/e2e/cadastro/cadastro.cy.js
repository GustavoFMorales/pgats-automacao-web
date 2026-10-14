/// <reference types="cypress" />

import * as cabecalho from "../../compartilhado/cabecalho.pagina";
import { criarUsuario } from "../../compartilhado/usuario.fabrica";
import * as paginaCadastro from "./cadastro.pagina";
import { cadastrarUsuario, cadastrarUsuarioEContinuar } from "./cadastro.acoes";

describe("Cadastro de usuário", () => {
  it("deve cadastrar um novo usuário com sucesso", () => {
    // Preparação
    const usuario = criarUsuario();

    // Ação
    cadastrarUsuario(usuario);

    // Verificação
    paginaCadastro.deveExibirContaCriada();
    paginaCadastro.continuarAposCriacao();
    cabecalho.deveExibirUsuarioLogado(usuario.nome);
  });

  it("não deve permitir cadastro com e-mail já existente", () => {
    // Preparação: o próprio teste cria a pré-condição, sem depender de
    // conta pré-cadastrada nem da ordem de execução dos outros testes.
    const usuarioExistente = criarUsuario();
    cadastrarUsuarioEContinuar(usuarioExistente);
    cabecalho.sair();

    // Ação
    cy.visit("/");
    cabecalho.irParaLoginECadastro();
    paginaCadastro.iniciarCadastro(
      usuarioExistente.nome,
      usuarioExistente.email,
    );

    // Verificação
    paginaCadastro.deveExibirErroDeEmailDuplicado();
  });
});
