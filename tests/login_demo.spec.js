import {test, expect} from "playwright/test";

test.only('Login Demo Test 1', async ({page}) => {
    await page.goto('https://demo.applitools.com/');
    await page.pause();
    await page.click('id=username');
    await page.locator('id=username').fill('emilysaucedo');
    await page.click('id=password');
    await page.locator('id=password').fill('saucedo');
    await page.click('id=log-in');
    await page.pause();
    //await page.waitForSelector('text=Sign in', {timeout: 5000});
});

test('Login Orange Test 2', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.pause();
    await page.locator('placeholder="Username"').fill('Admin');
    await page.locator('placeholder="Password"').fill('admin123');
    await page.pause();

});

test('Login Demo Test 3', async ({page}) => {
    await page.goto('https://admin-demo.nopcommerce.com/login?ReturnUrl=%2Fadmin%2F');
    await page.pause();
    await page.getByLabel('Email:').click();
    await page.getByLabel('Email:').fill('admin@yourstore.com');
    await page.getByLabel('Password:').click();
    await page.getByLabel('Password:').fill('admin');
    await page.getByRole('button', { name: 'Log in' }).click();

})