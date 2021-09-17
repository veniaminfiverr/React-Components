import Transaction from "../Transaction/Transaction";
import Chain from "../Chain/Chain";

class Wallet {

    publicKey;
    privateKey;

    constructor(name,balance) {
        this.name = name;
        this.balance = balance;
    }

    async createKeyPairs() {
        const keyPairs = await crypto.subtle.generateKey(
            {
                name: "RSASSA-PKCS1-v1_5",
                modulusLength: 2048, //can be 1024, 2048, or 4096
                publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
            },
            true, //whether the key is extractable (i.e. can be used in exportKey)
            ["sign", "verify"] //can be any combination of "sign" and "verify"
        );
        return keyPairs;
    }

    static sendMoney(amount,payerPublicKey,payerPrivateKey,payeePublicKey,payerName,payeeName) {
        const transaction = new Transaction(amount, payerPublicKey, payeePublicKey, payerName, payeeName);
        const signature = crypto.subtle.sign('RSASSA-PKCS1-v1_5',payerPrivateKey,new ArrayBuffer(amount));
        Chain.instance.addBlock(transaction, payerPublicKey, signature);
    }
}
export default Wallet;