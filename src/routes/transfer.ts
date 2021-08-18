import { error } from "console";
import express, {Request, Response, NextFunction, json} from "express";
const router = express.Router();
import fs from "fs" 
import crypto from "crypto";

// Dtatbase 1
let transactionDatabase:any;
if( fs.existsSync('database/transaction.json')){
    fs.readFile('database/transaction.json', ((err:any, data:any) => {
        if(err){
            console.error('error')
        }else {
            transactionDatabase =JSON.parse(data)
           
        }
    }))
} else {
    transactionDatabase = []
}
//Database twoo 
let balanceDatabase: any;
if (
  fs.existsSync(
    'database/balance.json',
  )
) {
  balanceDatabase = fs.readFile(
    'database/balance.json',
    (err: any, data: any) => {
      if (err) {
        console.error('erro');
      } else {
        balanceDatabase = JSON.parse(data);
        
      }
    },
  );
} else {
  balanceDatabase = [];
}

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
//Posting tomake a transfer tomake
router.post('/transfer', (req: Request, res: Response, next: NextFunction) => {
    const {from, to, amount, transferDescription} = req.body
    const sender = balanceDatabase.filter((x:balance) => x.accountNumber === from)
    const senderIndex = balanceDatabase.findIndex((x:balance) => x.accountNumber === from)
    const receiver = balanceDatabase.filter((x:balance) => x.accountNumber === to)
    const receiverIndex = balanceDatabase.findIndex((x:balance) => x.accountNumber === to)

    if(sender.length === 0 || receiver.length === 0){
        res.status(400).send(`The account number you provided ${from} doesnt exist, kindly try again`)
    }else if(receiver.length == 0){
        res.status(400).send(`The receivers address withh the account account Number ${to} doesnt not exist `)
    }else if ( isNaN(amount) === true){
        res.status(400).send('your amount must be of type number , instead i received something unsual')
    }else if (from == to){
        res.status(200).send('Invalid transaction request')
    } 
     else if (sender.length !==0 && receiver.length !==0){
        if (amount > sender[0].balance){
res.status(400).send('Insuficient balance')
        }else {
            const newData = {
                reference: crypto.randomBytes(2).toString("hex"),
                senderAccount: from,
                amount: amount,
                receiverAccount: to,
                transferDescription: transferDescription || "",
                createdAt: new Date()
            }
            transactionDatabase.push(newData)
            try{
                fs.writeFile("database/transaction.json", JSON.stringify(transactionDatabase, null, 2), (err:any)=>{
                    if(err) throw err
                    console.log('data written succesfully')
                })
            } catch(err){
                console.error('error writing transaction')
            }
            res.status(200).send('data created ')
        }

    }
    // Updating the balance database for sender 
    
    let updatedSenderBalance = sender[0].balance - amount
    
    const updatedSender = {
        accountNumber: sender[0].accountNumber,
        balance: updatedSenderBalance,
        createdAt: sender[0].createdAt,
    }
    // Updating the receivers balance in the database 
   const   { accountNumber, balance, createdAt } = balanceDatabase[receiverIndex]
let updatedReceiverBalance = balance + amount
const updatedReceiver = {
    accountNumber: accountNumber,
    balance: updatedReceiverBalance,
    createdAt: createdAt,
}
//database Update 
balanceDatabase[senderIndex] = updatedSender
balanceDatabase[receiverIndex] = updatedReceiver
//writing files to database

try{
    fs.writeFile("database/balance.json", JSON.stringify(balanceDatabase, null, 2), (err:any)=>{
        if(err) throw err
        console.log('data written succesfully')
    })
} catch(err){
    console.error('error writing transaction')
}

   
})


// Getting transact by reference
router.get('/transactions/:reference', (req: Request, res: Response, next: NextFunction) => {
    const {reference} = req.params
    const transactionDetail =  transactionDatabase.filter((x:transaction) => x.reference === reference)
    transactionDetail.length === 0
    ? res.status(400).send(' We have no record of this transaction details , Kindly check that you input the right reference')
    : res.status(200).send(transactionDetail[0])
})

// Getting all transaction Details 
router.get('/transactions', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(transactionDatabase)
})
export default router 