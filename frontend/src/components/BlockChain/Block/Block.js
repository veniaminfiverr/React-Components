// Individual block on the chain
import sjcl from 'sjcl';

class Block {

    nonce = Math.round(Math.random() * 999999999);

    constructor(prevHash,transaction) {
        this.prevHash = prevHash;
        this.transaction=transaction;
        this.ts=Date.now();
    }

    get hash() {
        const str = JSON.stringify(this);
        const myBitArray = sjcl.hash.sha256.hash(str)
        const myHash = sjcl.codec.hex.fromBits(myBitArray)
        return myHash;
    }
}
export default Block;