/// <reference types="cypress" />

import * as cabecalho from "../../compartilhado/cabecalho.pagina";
import * as paginaCadastro from "./cadastro.pagina";

/**
 * Ações de negócio da funcionalidade de cadastro.
 *
 * O Page Object sabe "como" interagir com cada campo; estas funções compõem
 * essas interações em fluxos que o spec lê como regra de negócio.
 *
 * São funções exportadas, não Custom Commands: quem importa `cadastrarUsuario`
 * enxerga de onde ela vem, e a dependência entre funcionalidades fica
 * explícita no topo do arquivo em vez de escondida num namespace global.
 */

/** Percorre o cadastro completo e para na tela "Account Created!". */
export const cadastrarUsuario = (usuario) => {
  cy.visit("/");
  cabecalho.irParaLoginECadastro();
  paginaCadastro.iniciarCadastro(usuario.nome, usuario.email);
  paginaCadastro.preencherDadosDaConta(usuario);
  paginaCadastro.confirmarCriacaoDaConta();
};

/** Cria a conta e segue até a home já autenticado — pré-condição de outros testes. */
export const cadastrarUsuarioEContinuar = (usuario) => {
  cadastrarUsuario(usuario);
  paginaCadastro.deveExibirContaCriada();
  paginaCadastro.continuarAposCriacao();
};
