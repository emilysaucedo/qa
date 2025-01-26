const {test, expect} = require('@playwright/test')
//import test from '@playwright/test'
//const {hello, helloworld} = require('./demo/hello') //importando as funções
//import { hello } from './demo/hello';

test('My first test', async ({page}) => {
    // Test code here
    await page.goto('https://google.com')
    await expect(page).toHaveTitle('Google')
} )