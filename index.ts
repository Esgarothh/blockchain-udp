import { Chain } from "./functions/src/blockchain-core/chain";
import { Wallet } from "./functions/src/blockchain-core/wallet";

import { sendBlockToServer, sendTransactionToServer } from "./functions/src/blockchain-core/database_logic";

const seba = new Wallet();
const chalo = new Wallet();
const victor = new Wallet();

seba.sendMoney(50, chalo.publicKey);
chalo.sendMoney(23, victor.publicKey);
victor.sendMoney(5, chalo.publicKey);

const primaryBlock = Chain.instance.lastBlock; // Assuming this is your primary block

// Send the primary block to the server
sendBlockToServer(primaryBlock);

sendTransactionToServer(Chain.instance.lastBlock.transaction);



console.log(Chain.instance);
console.log(Chain.instance.lastBlock.transaction);

