import {test, expect} from "playwright/test";

test('Assertions Demo', async({page})=>{
    // Assertions
    await page.goto('https://kitchen.applitools.com/');
    await page.pause();
    //check element present or not
    await expect(page.locator('text=The Kitchen')).toHaveCount(1);
    if (await page.$('text=The Kitchen')){
        await page.locator('text=The Kitchen').click()
    }
    //check element hidden ou visible
    await expect(page.locator('text=The Kitchen')).toBeVisible();
    await expect(page.locator('text=The Kitchen')).toBeHidden();
    //check element enable ou disabled
    await expect(page.locator('text=The Kitchen')).toBeEnabled();
    await expect(page.locator('text=The Kitchen')).toBeDisabled();
    //text matches value or not
    await expect(page.locator('text=The Kitchen')).toHaveText('The Kitchen');
    await expect(page.locator('text=The Kitchen')).not.rejectstoHaveText('The Kitchen');
    //check atribute value
    await expect(page.locator('text=The Kitchen')).toHaveAttribute('class',/.*css-dpmy2a/)
    //page
    await expect(page).toHaveURL('https://kitchen.applitools.com/')
    await expect(page).toHaveTitle(/.*Kitchen/)
})