import "./commands";

/**
 * O automationexercise.com carrega scripts de anúncio de terceiros que lançam
 * exceções não tratadas. Sem este filtro o Cypress falharia testes por erros
 * que não pertencem à aplicação sob teste.
 *
 * O filtro é intencionalmente restrito: erros vindos da própria aplicação
 * continuam quebrando o teste, como devem.
 */
const PADROES_DE_ERRO_DE_TERCEIROS = [
  /Script error/,
  /googletag/i,
  /adsbygoogle/i,
];

Cypress.on("uncaught:exception", (erro) => {
  const ehDeTerceiro = PADROES_DE_ERRO_DE_TERCEIROS.some((padrao) =>
    padrao.test(erro.message),
  );
  return !ehDeTerceiro;
});
