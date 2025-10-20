// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');
const { snap } = require('./utils/snap');
const { computeRunFolder, ensureSubdirs } = require('./utils/path_tools');

//Diretório de artefatos
const ARTIFACTS_ROOT = path.join(__dirname, 'artifacts');
const runDir = computeRunFolder(ARTIFACTS_ROOT);
const { screenshotsDir, resultsDir } = ensureSubdirs(runDir);

//Expõe caminhos de diretórios como variáveis de ambiente
process.env.RUN_DIR = runDir;
process.env.SCREENSHOTS_DIR = screenshotsDir;


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * /** @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  outputDir: resultsDir,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com/', //Alterar para a URL do site que será testado
    headless: false,
    screenshot: 'only-on-failure', //apenas quando der erro
    video: 'retain-on-failure', //salva o vídeo se der erro
    trace: 'retain-on-failure', //salta o trace se der erro
    launchOptions: {
      slowMo: 500, //slow motion
    },
  },
  

  //Configuração dos projetos
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

