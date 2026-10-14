/// <reference types="cypress" />

/**
 * Hands-on: cypress-xpath
 *
 * Mesmos cenários de cadastro.cy.js e autenticacao.cy.js, com todos os
 * seletores reescritos em XPath. A spec é autocontida (importa o plugin e
 * declara os próprios dados) para poder ser entregue sozinha e para que a
 * comparação de tempo com as specs CSS seja justa.
 */
import "cypress-xpath";

const seletores = {
  // Cabeçalho
  linkLogin: "//a[contains(@href, '/login')]",
  linkSair: "//a[contains(@href, '/logout')]",
  // XPath filtra por texto no próprio seletor — CSS puro não consegue;
  // na versão CSS isso dependia do :contains() do jQuery.
  usuarioLogado: (nome) =>
    `//a[contains(., 'Logged in as')]/b[normalize-space() = '${nome}']`,

  // Login
  campoEmailLogin: "//input[@data-qa='login-email']",
  campoSenhaLogin: "//input[@data-qa='login-password']",
  botaoEntrar: "//button[@data-qa='login-button']",
  erroCredenciais:
    "//form[contains(@action, 'login')]/p[normalize-space() = 'Your email or password is incorrect!']",

  // Cadastro — etapa 1
  campoNome: "//input[@data-qa='signup-name']",
  campoEmailCadastro: "//input[@data-qa='signup-email']",
  botaoCadastrar: "//button[@data-qa='signup-button']",
  erroEmailDuplicado:
    "//form[contains(@action, 'signup')]/p[normalize-space() = 'Email Address already exist!']",

  // Cadastro — etapa 2
  radioMasculino: "//input[@id='id_gender1']",
  campoSenha: "//input[@data-qa='password']",
  diaNascimento: "//select[@data-qa='days']",
  mesNascimento: "//select[@data-qa='months']",
  anoNascimento: "//select[@data-qa='years']",
  campoPrimeiroNome: "//input[@data-qa='first_name']",
  campoSobrenome: "//input[@data-qa='last_name']",
  campoEmpresa: "//input[@data-qa='company']",
  campoEndereco: "//input[@data-qa='address']",
  selectPais: "//select[@data-qa='country']",
  campoEstado: "//input[@data-qa='state']",
  campoCidade: "//input[@data-qa='city']",
  campoCep: "//input[@data-qa='zipcode']",
  campoCelular: "//input[@data-qa='mobile_number']",
  botaoCriarConta: "//button[@data-qa='create-account']",

  // Cadastro — etapa 3
  tituloContaCriada:
    "//h2[@data-qa='account-created'][normalize-space() = 'Account Created!']",
  botaoContinuar: "//a[@data-qa='continue-button']",
};

// E-mail único por chamada: os testes podem ser repetidos sem colisão.
const criarUsuario = () => {
  const id = `${Date.now()}${Cypress._.random(1000, 9999)}`;
  return {
    nome: `PGATS XPath ${id}`,
    email: `pgats.xpath.${id}@teste.com`,
    senha: "SenhaSegura123",
  };
};

const iniciarCadastro = (usuario) => {
  cy.visit("/");
  cy.xpath(seletores.linkLogin).click();
  cy.xpath(seletores.campoNome).type(usuario.nome);
  cy.xpath(seletores.campoEmailCadastro).type(usuario.email);
  cy.xpath(seletores.botaoCadastrar).click();
};

const cadastrarUsuario = (usuario) => {
  iniciarCadastro(usuario);

  cy.xpath(seletores.radioMasculino).check();
  cy.xpath(seletores.campoSenha).type(usuario.senha, { log: false });
  cy.xpath(seletores.diaNascimento).select("1");
  cy.xpath(seletores.mesNascimento).select("October");
  cy.xpath(seletores.anoNascimento).select("1999");
  cy.xpath(seletores.campoPrimeiroNome).type("Gustavo");
  cy.xpath(seletores.campoSobrenome).type("Morales");
  cy.xpath(seletores.campoEmpresa).type("PGATS");
  cy.xpath(seletores.campoEndereco).type("Rua dos Testes, 123");
  cy.xpath(seletores.selectPais).select("United States");
  cy.xpath(seletores.campoEstado).type("California");
  cy.xpath(seletores.campoCidade).type("Los Angeles");
  cy.xpath(seletores.campoCep).type("90001");
  cy.xpath(seletores.campoCelular).type("11999999999");
  cy.xpath(seletores.botaoCriarConta).click();

  cy.xpath(seletores.tituloContaCriada).should("be.visible");
  cy.xpath(seletores.botaoContinuar).click();
};

const autenticar = (email, senha) => {
  cy.visit("/login");
  cy.xpath(seletores.campoEmailLogin).type(email);
  cy.xpath(seletores.campoSenhaLogin).type(senha, { log: false });
  cy.xpath(seletores.botaoEntrar).click();
};

const deveExibirUsuarioLogado = (nome) =>
  cy.xpath(seletores.usuarioLogado(nome)).should("be.visible");

describe("Cadastro e autenticação com XPath", () => {
  context("Cadastro de usuário", () => {
    it("deve cadastrar um novo usuário com sucesso", () => {
      const usuario = criarUsuario();

      cadastrarUsuario(usuario);

      deveExibirUsuarioLogado(usuario.nome);
    });

    it("não deve permitir cadastro com e-mail já existente", () => {
      const usuarioExistente = criarUsuario();
      cadastrarUsuario(usuarioExistente);
      cy.xpath(seletores.linkSair).click();

      iniciarCadastro(usuarioExistente);

      cy.xpath(seletores.erroEmailDuplicado).should("be.visible");
    });
  });

  context("Autenticação", () => {
    const usuario = criarUsuario();

    // O before roda depois da limpeza de cookies do 1º teste; sem o logout,
    // esse teste herdaria a sessão e /login redirecionaria para a home.
    before(() => {
      cadastrarUsuario(usuario);
      cy.xpath(seletores.linkSair).click();
    });

    it("deve efetuar login com e-mail e senha corretos", () => {
      autenticar(usuario.email, usuario.senha);

      deveExibirUsuarioLogado(usuario.nome);
    });

    it("não deve efetuar login com senha incorreta", () => {
      autenticar(usuario.email, "senha-propositalmente-invalida");

      cy.xpath(seletores.erroCredenciais).should("be.visible");
    });

    it("deve efetuar logout de um usuário autenticado", () => {
      autenticar(usuario.email, usuario.senha);
      deveExibirUsuarioLogado(usuario.nome);

      cy.xpath(seletores.linkSair).click();

      cy.url().should("include", "/login");
    });
  });
});
