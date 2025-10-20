import { test, expect } from '../../utils/logger'; //importando customizado
import { snap } from '../../utils/snap'; 

test.describe('Saucedemo - Fluxo Principal de Compra', ()=>{

    test('Login, adicionar produto ao carrinho e finalizar compra', async ({ page }, testInfo) => {
        testInfo.setTimeout(testInfo.timeout + 15000);

        await test.step('Acessar Saucedemo.com', async ()=>{
            await page.goto('/');

            await expect(page).toHaveURL('/'); 
            await page.waitForLoadState('load');
            await page.waitForResponse(response => 
                response.url().includes('/v1/') && response.status() === 200
            );
            await expect(page.getByTestId('login-button')).toHaveText('Login');

            await snap(page, testInfo, 'TC001-Home');
        })

        await test.step('Iniciar o login com sucesso', async ()=>{
            await page.getByTestId('username').fill('standard_user');
            await page.getByTestId('password').fill('secret_sauce');
            await page.getByTestId('login-button').click();

            await expect(page).toHaveURL('/inventory\.html/');
            await expect(page.getByTestId('title')).toHaveText('Products'); //testId
            await snap(page, testInfo, 'TC001-Inventory');
        })

        await test.step('Adicionar mochila ao carrinho', async ()=>{
            await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
            await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1'); //testId

            await snap(page, testInfo, 'TC001-Mochila-Adicionada');
        })

        // await test.step('Ir para o carrinho de compras', async ()=>{
        //     await page.getByTestId('shopping-cart-link').click();
        // })
        
        // await test.step('Verificar se o carrinho de compras foi aberto', async ()=>{
        //     await expect(page.getByTestId('title')).toHaveText('Your Cart'); //testId
        //     await expect(page.getByTestId('item-quantity')).toHaveText('1'); //testId
        //     await expect(page.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack'); //testId
        //     await expect(page.getByTestId('inventory-item-price')).toHaveText('$29.99'); //testId
        // })
    })
})
