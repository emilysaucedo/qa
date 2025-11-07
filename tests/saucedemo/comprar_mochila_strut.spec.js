import { test, expect } from '../../utils/logger'; //importando customizado
import { snap } from '../../utils/snap'; 

async function acessarSaucedemo(page, testInfo){
    await page.goto('/');
    await expect(page).toHaveURL('/'); 
    await page.waitForLoadState('load');
    await expect(page.locator('[data-test="login-button"]')).toHaveText('Login');
}

async function loginFill(page, testInfo){
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
}

async function loginClick(page, testInfo){
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('/inventory\.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products'); //testId
}


test.describe('Saucedemo - Fluxo Principal de Compra', ()=>{

    test('Comprar mochila Direta', async ({ page }, testInfo) => {
        testInfo.setTimeout(testInfo.timeout + 15000);

        await test.step('Acessar Saucedemo.com', async ()=>{
            await acessarSaucedemo(page, testInfo);
            await snap(page, testInfo, 'TC001-Passo-1-Home');
        })

        await test.step('Iniciar o login com sucesso', async ()=>{
            await loginFill(page, testInfo);
            await snap(page, testInfo, 'TC001-Passo-2-Login-Info');
            await loginClick(page, testInfo);
            await snap(page, testInfo, 'TC001-Passo-3-Inventory');
        })

        await test.step('Adicionar mochila ao carrinho', async ()=>{
            await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1'); //testId
            await snap(page, testInfo, 'TC001-Passo-4-Mochila-Adicionada');
        })

        await test.step('Ir para o carrinho de compras', async ()=>{
            await page.locator('[data-test="shopping-cart-link"]').click();
            await expect(page).toHaveURL('/cart\.html');
            await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart'); //testId 
            //toHave é exato, toContain é parcial
            await expect(page.locator('[data-test="item-quantity"]')).toHaveText('1'); //testId
            await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack'); //testId
            await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99'); //testId

            await snap(page, testInfo, 'TC001-Passo-5-Carrinho-Info-Verificado');
        })
    
    })

    test('Comprar mochila Detalhada', async ({ page }, testInfo) => {
        testInfo.setTimeout(testInfo.timeout + 15000);

        await test.step('Acessar Saucedemo.com', async ()=>{
            await acessarSaucedemo(page, testInfo);
            await snap(page, testInfo, 'TC001-Passo-1-Home');
        })

        await test.step('Iniciar o login com sucesso', async ()=>{
            await loginFill(page, testInfo);
            await snap(page, testInfo, 'TC001-Passo-2-Login-Info');
            await loginClick(page, testInfo);
            await snap(page, testInfo, 'TC001-Passo-3-Inventory');
        })

        await test.step('Verificar detalhes da mochila', async ()=>{
            await page.locator('[data-test="item-4-title-link"]').click();
            await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack'); //testId
            await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99'); //testId
            await snap(page, testInfo, 'TC001-Passo-4-Mochila-Adicionada');
        })

        await test.step('Adicionar mochila ao carrinho', async ()=>{
            await page.locator('[data-test="add-to-cart"]').click();
            await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1'); //testId
            await snap(page, testInfo, 'TC001-Passo-5-Mochila-Adicionada-Carrinho');
        })

        await test.step('Ir para o carrinho de compras', async ()=>{
            await page.locator('[data-test="shopping-cart-link"]').click();
            await expect(page).toHaveURL('/cart\.html');
            await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart'); //testId 
            await expect(page.locator('[data-test="item-quantity"]')).toHaveText('1'); //testId
            await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack'); //testId
            await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99'); //testId
            await snap(page, testInfo, 'TC001-Passo-6-Carrinho-Info-Verificado');
        })
    })

})
