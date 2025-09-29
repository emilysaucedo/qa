// Referências e bibliotecas
const { test } = require('@playwright/test');

// Classe ou Funções ou Métodos
test('Realizar o fluxo de compra da mochila', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
});