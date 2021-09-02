import app from '../app';

import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import fs from 'fs';
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
        balanceDatabase;
      }
      console.log(balanceDatabase);
    },
  );
  balanceDatabase;
} else {
  balanceDatabase = [];
}


 interface balance {
  accountNumber: string;
  balance: number;
  createdAt: string;
}


// POST method: Create an account
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  let { accountNumber, balance } = req.body;

  const user = balanceDatabase.filter(
    (x: balance) => x.accountNumber === accountNumber.toString(),
  );

  if (user.length === 0) {
    if (accountNumber.toString().length !== 10) {
      res.status(404).send(`account number length must be equal to 10`);
    } else {
        
      if ( isNaN(balance) === false) {
        const newData = {
          accountNumber: accountNumber.toString(),
          balance: parseInt(balance)|| 0,
          createdAt: new Date().toString(),
        };
        balanceDatabase.push(newData);
        // writing file to database
        try {
          fs.writeFile(
            'database/balance.json',
            JSON.stringify(balanceDatabase, null, 2),
            (err: any) => {
              if (err) throw new Error('err');
              console.log('data written to database successfully');
            },
          );
        } catch (err) {
          console.error('Error writing balance');
        }
      }
            else {
        res.status(404).send('balance type invalid')
    }
    }
    res
      .status(200)
      .send(
        ` account with the account number ${accountNumber} has been created succefully`,
      );
  } else {
    res
      .status(404)
      .send(
        `user with account numver ${accountNumber} already exist, kindly choose another number combination`,
      );
  }
});


export default router;
