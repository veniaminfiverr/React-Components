import Block from "../Block/Block";
import Transaction from "../Transaction/Transaction";
import sjcl from "sjcl";

class Chain {
    static instance = new Chain();
    chain = [];

    constructor() {
        this.chain = [
            new Block('', new Transaction(0, 'genesis', 'genesis','genesis', 'genesis'))
        ];
    }

    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Proof of work system
    mine(nonce) {
        let solution = 1;
        console.log('⛏️  mining...')
        while(true) {
            const myBitArray = sjcl.hash.sha256.hash(nonce + solution)
            const attempt = sjcl.codec.hex.fromBits(myBitArray)
            if(attempt.substr(0,4) === '0000'){
                console.log(`Solved: ${solution}`);
                return solution;
            }
            solution += 1;
        }
    }

    addBlock(transaction, senderPublicKey, signature) {
        const isValid =  crypto.subtle.verify("RSASSA-PKCS1-v1_5", senderPublicKey, new ArrayBuffer(signature), new ArrayBuffer(transaction.amount));
        if (isValid) {
            const newBlock = new Block(this.lastBlock.hash,transaction);
            this.mine(newBlock.nonce);
            this.chain.push(newBlock);
        }
    }

}

export default Chain;