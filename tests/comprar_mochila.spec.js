// Referências e bibliotecas
const { test, expect } = require('@playwright/test');

// Classe ou Funções ou Métodos
test.skip('Realizar o fluxo de compra da mochila', async ({ page }) => {
    //Navegação para a página inicial
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/'); //Verifica se está na página raiz
    const botaoLogin = page.locator('#login-button'); //Para id coloca #id
    //const botaoLogin - page.getByTestId('login-button');
    await expect(botaoLogin).toHaveText('Login');

    //Página inicial e Realizar o login
    //await page.locator('[name="user-name"]').fill('standard_user');
    await page.fill('[name="user-name"]', 'standard_user');
    //await page.locator('[name="password"]').fill('secret_sauce');
    //await page.locator('input.input_error.form_input').fill('secret_sauce');
    await page.fill('[placeholder="Password"]', 'secret_sauce');
    await botaoLogin.click();

    //Página de Inventário / Produtos
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('span.title')).toHaveText('Products'); //css selector
    //await expect(page.locator('span.title'),'Products'); //css selector

    //Adicionar produto ao carrinho
    ///html/body/div/div/div/div[2]/div/div/div/div[1]/div[2]/div[2]/button
    const botaoAddToCart = 'xpath=/html/body/div/div/div/div[2]/div/div/div/div[1]/div[2]/div[2]/button';
    await page.locator(botaoAddToCart).click();

    //Verficiar se exibe o número 1 no carrinho
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1'); //css selector
    //await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1'); //data-testid

    await page.locator('.shopping_cart_badge').click();

    //Espera 1 segundo
    await page.waitForTimeout(1000);

    //Validar a página de carrinho
    await expect(page.locator('.title')).toHaveText('Your Cart'); //css selector
    await expect(page.locator('.cart_quantity')).toHaveText('1'); //css selector
    await expect(page.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack'); //testId
    await expect(page.locator('.inventory_item_price')).toHaveText('$29.99'); //css selector
});