## Transfer Service API

### Language, Tools & Setup

1.  `TypeScript` was used for this Project
2.  `express` was used to build the APIs (endpoints)
3.  Package Manager: `Yarn`
4.  Docker was used to containerize the project <a href="https://desktop.docker.com/mac/stable/Docker.dmg">Download</a>

## Project Description:

This is a transfer service with APIs to transfer money between two accounts
This application has the following database structure

- TABLE 1 - transactions

  - reference (unique)
  - senderAccount nr
  - amount
  - receiverAccount nr
  - transferDescription
  - createdAt

- TABLE 2 - balances
  - account nr (unique)
  - balance
  - createdAt

The transaction table registers any transaction in an account (ie. today I paid N2000 for a movie with my card), the balances table represents the account balance of customers (ie. I have N50k in my bank account). If a sender is trying to make a transaction of an amount of money more than his current balance, an error should be returned indicating insufficient funds

This API is able to handle a transfer request of the form below and updates the transactions/balances table/database accordingly.

```
{
    from: account,
    to: account,
    amount: money
}
```

### Endpoints to test

| Method | Endpoint                | Enable a user to:                                            |
| :----- | :---------------------- | :----------------------------------------------------------- |
| POST   | /create-account         | Enable user to create an account stored in the balance table |
| GET    | /balance/:accountNumber | Getting balance for a particular account number              |
| GET    | /balance                | Getting all accounts and their balance                       |
| POST   | /transfer               | To make a transaction to another account                     |

## Test coverage

- Test cases were written to cover the application efficiency using supertest

## Hosting

- Application is hosted on Heroku
- link:
