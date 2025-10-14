const { test, expect } = require('@playwright/test');

test('Fazer login', async ({ page }) => {
    //Acessar a página do Blazedemo
    await page.goto('https://www.blazedemo.com/');
    await expect(page).toHaveTitle('BlazeDemo');
    await expect(page.locator('h1')).toHaveText('Welcome to the Simple Travel Agency!');

    //Clicar no botão Home
    await page.getByRole('link', { name: 'home' }).click();
    //await expect(page.locator('div')).toHaveText('Login');
    await expect(page.getByText('E-Mail Address')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Forgot Your Password?' })).toBeVisible();

    //Preencher os dados do usuário
    await page.locator('id=email').fill('emily@saucedo.com');
    await page.locator('id=password').fill('senha');
    await page.getByRole('button', { name: 'Login' }).click();

    //Pausa para validar a tela
    await page.waitForTimeout(2000);
    await expect(page.getByText('Page Expired')).toBeVisible();
    
});