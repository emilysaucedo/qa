const { test, expect } = require('@playwright/test');

test('Comprar passagem', async ({ page }) => {
    //Acessar a página do Blazedemo
    await page.goto('https://www.blazedemo.com/');
    await expect(page).toHaveTitle('BlazeDemo');
    await expect(page.locator('h1')).toHaveText('Welcome to the Simple Travel Agency!');

    //Escolher a origem e destino
    await page.locator('select[name="fromPort"]').selectOption('Boston');
    await page.locator('select[name="toPort"]').selectOption('Berlin');

    //Clicar no botão Find Flights
    await page.locator('input[type="submit"]').click();

    //Verificar página de Resultados
    //Pausa para validar a tela
    await page.waitForTimeout(3000);
    await expect(page.locator('h3')).toHaveText('Flights from Boston to Berlin:');
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('th').nth(3)).toHaveText('Departs: Boston');

    //Escolher voo
    await page.getByRole('row', { name: 'Choose This Flight 234 United' }).getByRole('button').click();

    //Preencher os dados do passageiro
    await expect(page.locator('h2')).toHaveText('Your flight from TLV to SFO has been reserved.');
    await expect(page.getByText('Airline: United')).toBeVisible();
    await page.locator('id=inputName').fill('Emily Saucedo');
    await page.locator('id=address').fill('123 Main St');
    await page.locator('id=city').fill('Vargem Grande Paulista');
    await page.locator('id=state').fill('SP');
    await page.locator('id=zipCode').fill('06735182');
    await page.locator('id=cardType').selectOption('American Express');
    await page.locator('id=creditCardNumber').fill('1234567890');
    await page.locator('id=creditCardMonth').fill('01');
    await page.locator('id=creditCardYear').fill('2027');
    await page.locator('id=nameOnCard').fill('Emily Saucedo');

    //Clicar no botão Purchase Flight
    await page.getByRole('button', { name: 'Purchase Flight' }).click();

    //Verificar página de Confirmação/Reserva
    await expect(page.locator('h1')).toHaveText('Thank you for your purchase today!');
    await expect(page.getByText('555 USD')).toBeVisible();

    //Pausa para validar a tela
    await page.waitForTimeout(2000);
});