import {test, expect} from "playwright/test";

//rodar em paralelo
test.describe('Testes de API', ()=>{
    //boa prática manter a url em uma constante
    const baseUrl = 'https://reqres.in/api'
    test('Simple API - Assert Response Status', async ({request})=>{
        const response = await request.get(`${baseUrl}/users/2`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text()) //transformando em JSON
        //console.log(responseBody)
    })

    test('Simple API - Assert Invalid Endpoint', async({request})=>{
        const response = await request.get(`${baseUrl}/users/non-existing-endpoint`)
        expect(response.status()).toBe(404)
    })

    test('Get Request - Get User Detail', async({request})=>{
        const response = await request.get(`${baseUrl}/users/1`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(1)
        expect(responseBody.data.first_name).toBe('George')
        expect(responseBody.data.email).toBeTruthy() //se tiver qualquer coisa vai passar no teste
        //console.log(responseBody)
    })

    test('Post Request - Create New User', async ({request})=>{
        const response = await request.post(`${baseUrl}/user`,{
            data:{
                id: 1000,
            },
        })
        const responseBody = JSON.parse(await response.text())
        expect (responseBody.id).toBe(1000)
        expect (responseBody.createdAt).toBeTruthy()
    })

    test('Post Request - Login', async ({request})=>{
        const response = await request.post(`${baseUrl}/login`,{
            data:{
                email: 'eve.holt@reqres.in',
                password: 'cityslicka'
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect (response.status()).toBe(200)
        expect (responseBody.token).toBeTruthy()
        })

    test('Post Request - Login Fail', async ({request})=>{
        const response = await request.post(`${baseUrl}/login`,{
            data:{
                email: 'eve.holt@reqres.in'
            },
        })
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.error).toBe('Missing password')
    })

    test('PUT Request - Update User', async({request})=>{
        const response = await request.put(`${baseUrl}/users/2`,{
            data: {
                name: 'new name',
                job: 'new job'
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.name).toBe('new name')
        expect(responseBody.updatedAt).toBeTruthy()
    })

    test('DELETE Request', async({request})=>{
        const response = await request.delete(`${baseUrl}/users/2`)
        expect(response.status()).toBe(204)
    })



})
