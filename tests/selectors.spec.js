import { test, expect } from "playwright/test";

test('Selectors Demo', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.pause();
  await page.click('id=user-name');
  await page.locator('id=user-name').fill('standard_user');
  await page.click('id=password');
  await page.locator('id=password').fill('secret_sauce');
  await page.click('#login-button');
  //await page.locator('input:has-text("LOGIN")).click();
  await page.pause();

});

