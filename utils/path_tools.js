//Bibliotecas
const fs = require('fs') //File System - Biblioteca do SO
const path = require('path') //Biblioteca de caminhos de pastas/arquivos

//Formatar números com zero na frente
function pad(num) { return num.toString().padStart(2, '0'); } //no máximo 2 dígitos

// Função para definir data e hora baseada no momento da execução
function computeRunFolder(baseDir){
    //Cria carimbo de data via CI
    if (process.env.RUN_TAG){
        const tag = process.env.RUN_TAG.replace(/[^\w-:.]/g, '_');
        const runDir = path.join(baseDir, tag);
        fs.mkdirSync(runDir, {recursive: true});
        return runDir;
    }

    const now = new Date();
    const YYYY = now.getFullYear();
    const MM = pad(now.getMonth());
    const dd = pad(now.getDate());
    const HH = pad(now.getHours());
    const mm = pad(now.getMinutes());
    const ss = pad(now.getSeconds());

    //Criar pastas
    const runDir = path.join(baseDir, `${YYYY}-${MM}-${dd}-${HH}-${mm}-${ss}`);
    fs.mkdirSync(runDir, {recursive: true});
    return runDir;
}

//Criar subpastas dentro da estrutura
function ensureSubdirs(runDir){
    const dirs = { //lista de subpastas
        runDir, 
        screenshotsDir: path.join(runDir, 'screenshots'),
    };

    Object.values(dirs).forEach(d => {
        if (!fs.existsSync(d)){ //se não existir o screenshot
            fs.mkdirSync(d, {recursive: true});
        }
        return dirs;
    })
}

//Exportar as funções
module.exports = { computeRunFolder, ensureSubdirs };


