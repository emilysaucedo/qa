import {test, expect} from "playwright/test";

test.skip('Teste One', async({page})=>{

})

test('not ready', async({page})=>{
    test.fail();
})

test.fixme('test to be fixed', async({page})=>{
    //contéudo 
})

test('slow', async({page})=>{
    test.slow();
})