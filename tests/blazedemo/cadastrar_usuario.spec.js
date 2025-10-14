const { test, expect } = require('@playwright/test');

test('Cadastrar usuário', async ({ page }) => {
    //Acessar a página do Blazedemo
    await page.goto('https://www.blazedemo.com/');
    await expect(page).toHaveTitle('BlazeDemo');
    await expect(page.locator('h1')).toHaveText('Welcome to the Simple Travel Agency!');

    //Clicar no botão Home
    await page.getByRole('link', { name: 'home' }).click();
    //await expect(page.locator('div')).toHaveText('Login');
    await expect(page.getByText('E-Mail Address')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Forgot Your Password?' })).toBeVisible();

    //Pausa para validar a tela
    await page.waitForTimeout(1000);

    //Clicar no botão Register
    await page.getByRole('link', { name: 'Register' }).click();

    //Validar página de Cadastro
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Company')).toBeVisible();
    await expect(page.getByLabel('E-Mail Address')).toBeVisible();

    //Preencher os dados do usuário
    await page.locator('id=name').fill('Emily Saucedo');
    await page.locator('id=company').fill('Empresa Saucedo');
    await page.locator('id=email').fill('emily@saucedo.com');
    await page.locator('id=password').fill('senha');
    await page.locator('id=password-confirm').fill('senha');
    await page.getByRole('button', { name: 'Register' }).click();

    //Pausa para validar a tela
    await page.waitForTimeout(2000);
    await expect(page.getByText('Page Expired')).toBeVisible();
});