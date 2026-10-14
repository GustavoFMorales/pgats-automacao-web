const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Centraliza a URL: specs usam caminhos relativos (cy.visit("/login")).
    // Permite trocar de ambiente com CYPRESS_BASE_URL=... sem tocar no código.
    baseUrl: "https://automationexercise.com",

    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,

    // Reexecuta apenas no modo headless, para absorver instabilidade de rede
    // sem mascarar falhas durante o desenvolvimento local.
    retries: { runMode: 2, openMode: 0 },

    video: false,
    watchForFileChanges: false,

    setupNodeEvents(on, config) {
      return config;
    },
  },
});
