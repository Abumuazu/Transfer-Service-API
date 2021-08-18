import app  from '../src/app'
const  balanceDatabase =  require('../database/balance.json')
const transactiondatabase  = require ('../database/transaction.json')
import supertest from 'supertest'

interface transaction {
    reference: string
        senderAccount:string
     amount: number
    receiverAccount: string
     transferDescription:string
        createdAt:string
  }
interface transfer {
    from:string
    amount: number
   to: string
    transferDescription:string
}
interface balance {
    accountNumber: string;
    balance: number;
    createdAt: string;
  }
// Getting all balance
  describe( 'test cases for Getting all balances  ', () => {
      test('it should return a status code of 200 when trying to get all balances ', async () => {
          const result = await supertest(app).get('/balance')
          expect(result.status).toBe(200)
      })
      test('it should return a status code of 404 for invalid path', async () => {
          const result = await supertest(app).get('/balancec')
          expect(result.status).toBe(404)
      })
  })

  //Getting balance by account number 
  describe(' Test cases for getting balances account ', () => {
      test('it should return a status code of 200 for a valid path to get a particular balance', async () => {
         const user:string = balanceDatabase.find((x:balance) => x.accountNumber === "1234567891")
          const result = await supertest(app).get('/balance/1234567891')
          expect(result.status).toBe(200)
      })
      test('it should return a status code of 404 for an Invalid path to get a particular balance', async () => {
        const user:string = balanceDatabase.find((x:balance) => x.accountNumber === "1234567891")
         const result = await supertest(app).get('/balance/"1234567891"')
         expect(result.status).toBe(404)
     })
    //  test('it should return the details of a particular balance ', async () => {
    //     const user:string = balanceDatabase.filter((x:balance) => x.accountNumber === "1234567898")
    //      const result = await supertest(app).get('/balance/1234567898')
    //      expect(result).toBe(user[0])
    //  })

  })

// posting/ create an account 
// describe('test cases posting a balance ', () => {
//     test('it should return a status code of 200', async () => {
//         const result = await supertest(app).post('/balance')
//         expect(result.status).toBe(200)
//     })
// })


//Test cases for TRANSFER 
// Getting all balance
describe( 'test cases for Getting all transactions  ', () => {
    test('it should return a status code of 200 when trying to get all transaction details ', async () => {
        const result = await supertest(app).get('/transactions')
        expect(result.status).toBe(200)
    })
    test('it should return a status code of 404 for invalid path', async () => {
        const result = await supertest(app).get('/transact')
        expect(result.status).toBe(404)
    })
})

//Getting balance by account number 
describe(' Test cases for getting transaction details by reference  ', () => {
    test('it should return a status code of 200 for a valid path to get a particular transacton details', async () => {
       const user:string = balanceDatabase.find((x:balance) => x.accountNumber === "367c")
        const result = await supertest(app).get('/transactions/367c')
        expect(result.status).toBe(200)
    })
    test('it should return a status code of 404 for an Invalid path to get a particular transaction', async () => {
      const user:string = balanceDatabase.find((x:balance) => x.accountNumber === "367c")
       const result = await supertest(app).get('/balance/"367c"')
       expect(result.status).toBe(404)
   })
  //  test('it should return the details of a particular balance ', async () => {
  //     const user:string = balanceDatabase.filter((x:balance) => x.accountNumber === "1234567898")
  //      const result = await supertest(app).get('/balance/1234567898')
  //      expect(result).toBe(user[0])
  //  })
})
