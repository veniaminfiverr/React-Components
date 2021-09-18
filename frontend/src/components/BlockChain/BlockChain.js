import React, {useEffect, useState} from "react";
import Wallet from "./Wallet/Wallet";
import Chain from "./Chain/Chain";
import arrow from "../../assets/arrow.png";
import Swal from "sweetalert2";

const BlockChain =  (props) => {

    const[blockChain,setBlockChain] = useState([]);
    const[wallets,setWallets] = useState([]);
    const[changed,setChanged] = useState(false);

    useEffect(() => {
        async function fetchData() {

            const saif =  new Wallet('saif',10);
            let keyPairs = await saif.createKeyPairs();
            saif.publicKey = await keyPairs.publicKey;
            saif.privateKey = await keyPairs.privateKey;

            const ali =  new Wallet('ali',10);
            keyPairs = await ali.createKeyPairs();
            ali.publicKey = await keyPairs.publicKey;
            ali.privateKey = await keyPairs.privateKey;

            const sims =  new Wallet('sims',10);
            keyPairs = await sims.createKeyPairs();
            sims.publicKey = await keyPairs.publicKey;
            sims.privateKey = await keyPairs.privateKey;

            setWallets([saif,ali,sims]);
        }
        fetchData();

    },[]);

    useEffect(()=>{
        setBlockChain(Chain.instance.chain);
    },[changed]);

    const sendMoney = (event) => {
        event.preventDefault();
        const payerWalletIndex = wallets.findIndex(w => w.name === event.target.payerName.value);
        let payeeWalletIndex = wallets.findIndex(w => w.name === event.target.payeeName.value);
        const payerWallet = wallets[payerWalletIndex];
        const payeeWallet = wallets[payeeWalletIndex];
        if(!event.target.amount.value || event.target.amount.value > payerWallet.balance || event.target.amount.value < 0) {
            Swal.fire('Invalid Amount!', '', 'error');
        } else if(!payeeWallet) {
            Swal.fire('Invalid payee!', '', 'error');
        } else {
            Wallet.sendMoney(event.target.amount.value,payerWallet.publicKey,payerWallet.privateKey,payeeWallet.publicKey,payerWallet.name,payeeWallet.name);
            payerWallet.balance = parseInt(payeeWallet.balance) - parseInt(event.target.amount.value);
            payeeWallet.balance = parseInt(payeeWallet.balance) + parseInt(event.target.amount.value);
            wallets.splice(payerWalletIndex,1);
            payeeWalletIndex = wallets.findIndex(w => w.name === event.target.payeeName.value);
            wallets.splice(payeeWalletIndex,1);
            const updatedWallets = [...wallets];
            updatedWallets.push(payerWallet);
            updatedWallets.push(payeeWallet);
            setWallets(updatedWallets);
            event.target.amount.value = '';
            event.target.payeeName.value = '';
            setChanged(true);
        }
    }

    return (
        <div className="p-4">
            <div className="row">
                {
                    wallets ? wallets.map(wallet => (
                        <div className="card col-md-3 m-3">
                            <form onSubmit={sendMoney}>
                                <input type="hidden" name="payerName" value={wallet.name}/>
                                <div><span className="h6">Wallet:</span> {wallet.name}</div>
                                <div><span className="h6">Balance:</span> {wallet.balance}</div>
                                <div><span className="h6">Send To:</span> <input type="text" name="payeeName"/></div>
                                <div><span className="h6">Amount:</span> <input type="number" name="amount"/></div>
                                <div><input type="submit" value="Send" /></div>
                            </form>
                        </div>
                    )) : ''
                }
            </div>
            <div className="row">
            {
                blockChain ? blockChain.map((block,index) => (
                    <>
                        <div className="card col-md-2 border-primary" key={block.hash} >
                            <div className="card-header text-center h4">
                                {index === 0 ? (
                                    <span>Genesis Block</span>
                                 ) : <span>Block {index}</span>
                                }
                            </div>
                            <div className="card-body">
                                <div><span className="h6">PrevHash: </span>{block.prevHash}</div>
                                <div><span className="h6"> Hash: </span>{block.hash}</div>
                            </div>
                            <div className="card-footer">
                                <div><span className="h6">Payer: </span>{block.transaction.payerName}</div>
                                <div><span className="h6">Payee: </span>{block.transaction.payeeName}</div>
                                <div><span className="h6">Amount: </span>{block.transaction.amount}</div>
                            </div>
                        </div>
                        {
                            index !== blockChain.length-1 ? (
                                <div className="col-md-1" key={block.prevHash}>
                                    <img src={arrow} alt={"arrow"} style={{width:'100%'}}/>
                                </div>
                            ) : ''
                        }
                    </>
                    )) : ''
            }
            </div>
        </div>
    );
}


export default BlockChain;