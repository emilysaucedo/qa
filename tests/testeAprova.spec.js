import {test, expect} from "playwright/test";

test.describe('Deve realizar o login com usuários diferentes e Compra', ()=> {
    
    test('Deve fazer login no site - com standard_user', async({page})=>{
        await page.goto('https://www.saucedemo.com/v1/')
        await page.locator('id=user-name').fill('standard_user');
        await page.locator('id=password').fill('secret_sauce');
        await page.locator('id=login-button').click(); 
        await page.pause();
    })

    test('Deve fazer login no site - com locked_out_user', async({page})=>{
        await page.goto('https://www.saucedemo.com/v1/')
        await page.locator('id=user-name').fill('locked_out_user');
        await page.locator('id=password').fill('secret_sauce');
        await page.locator('id=login-button').click();
        await page.pause();
    })

    test('Deve fazer login no site - com problem_user', async({page})=>{
        await page.goto('https://www.saucedemo.com/v1/')
        await page.locator('id=user-name').fill('problem_user');
        await page.locator('id=password').fill('secret_sauce');
        await page.locator('id=login-button').click();
        await page.pause();
    })
})

test.describe('Deve realizar uma compra com standard_user', ()=>{
    test('Deve fazer uma compra', async({page})=>{
        await page.goto('https://www.saucedemo.com/v1/')
        await page.locator('id=user-name').fill('standard_user');
        await page.locator('id=password').fill('secret_sauce');
        await page.locator('id=login-button').click(); 
        await page.locator('id=item_4_title_link').click()
        await page.getByRole('button', { name: 'ADD TO CART' }).click();
        await page.getByRole('button', { name: '<- Back' }).click();
        await page.locator('id=item_5_title_link').click()
        await page.getByRole('button', { name: 'ADD TO CART' }).click();
        await page.getByRole('button', { name: '<- Back' }).click();
        await page.getByRole('link', { name: '2' }).click();
        await page.getByRole('link', { name: 'CHECKOUT' }).click();
        await page.locator('id=first-name').fill('Emily');
        await page.locator('id=last-name').fill('Saucedo');
        await page.locator('id=postal-code').fill('06735182');
        await page.getByRole('button', {name: 'CONTINUE'}).click();
        await page.getByRole('link', {name: 'FINISH'}).click();
        await page.getByRole('button',{name: 'Open Menu'}).click()
        await page.getByRole('link', {name: 'All Items'}).click();
 
    })
})