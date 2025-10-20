const { test: base } = require('@playwright/test')
const fs = require('fs')
const path = require('path')

//Formatar espaçamento entre datas am e pm
function isoTs(){
    const novaData = new Date();
    return novaData.toISOString().replace('T', ' ').replace('Z', '');
}

const LOGS_DIR = process.env.LOGS_DIR || path.join(process.cwd(), 'artifacts', 'logs');

if (!fs.existsSync(LOGS_DIR)){
    fs.mkdirSync(LOGS_DIR, {recursive: true});
}

//Cria o arquivo de log
const EXEC_LOG = path.join(LOGS_DIR, 'steps.log');

//Estrutura para escrever no arquivo de log
export const test = base.extend({
    log: async ({}, use, testInfo)=> {
        function log(message){
            const line = `${isoTs()} ${testInfo.title} ${message}\n`;
            fs.appendFileSync(EXEC_LOG, line, 'utf8'); //escrever no arquivo de log
            return line;
        }
        await use(log);
    }
})

export const expect = base.expect