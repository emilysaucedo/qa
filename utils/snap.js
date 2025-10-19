const fs = require('fs');
const path = require('path');

// constante para armazenar o local onde serão salvos os screenshots
const SHOTS_DIR = process.env.SCREENSHOTS_DIR;

function safeName(name){
    return String(name).replace(/[^\w\d-_.]+/g, '_').slice(0, 120);
    //remover caracteres especiais e limitar o tamanho do nome
}

/**
 * Salvar o screenshot quando solicitado
 * @param { import('@playwright/test').Page } page
 * @param { import('@playwright/test').TestInfo } testInfo
 * @param { string } label
 */
async function snap(page, testInfo, label) {
    const file = `${safeName(testInfo.title)}__${safeName(label)}.png`;
    const dest = path.join(SHOTS_DIR, file);

    fs.mkdirSync(SHOTS_DIR, {recursive: true});
    await page.screenshot({ path: dest, fullPage: true });
    return dest;
}

module.exports = { snap };