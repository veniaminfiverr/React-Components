
// Transfer of funds between two wallets

class Transaction{
    constructor(amount,payer,payee,payerName,payeeName){
        this.amount = amount;
        this.payer = payer;
        this.payee = payee;
        this.payerName = payerName;
        this.payeeName = payeeName;
    }
    toString() {
        return JSON.stringify(this);
    }
}

export default Transaction;