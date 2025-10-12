const { test, expect } = require('@playwright/test');

test('Escolher origem e destino', async ({ page }) => {
    //Acessar a página do Blazedemo
    await page.goto('https://www.blazedemo.com/');
    await expect(page.locator('h1')).toHaveText('Welcome to the Simple Travel Agency!');

    //Escolher a origem e destino
    await page.locator('select[name="fromPort"]').selectOption('San Diego');
    await page.locator('select[name="toPort"]').selectOption('Rome');

    //Clicar no botão Find Flights
    await page.locator('input[type="submit"]').click();

    //Verificar página de Resultados
    //Pausa para validar a tela
    await page.waitForTimeout(3000);
    await expect(page.locator('h3')).toHaveText('Flights from San Diego to Rome:');
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('th').nth(3)).toHaveText('Departs: San Diego');
});
