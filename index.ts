import { Chain } from "./functions/src/blockchain-core/chain";
import { Wallet } from "./functions/src/blockchain-core/wallet";


const seba = new Wallet();
const chalo = new Wallet();
const victor = new Wallet();

seba.sendMoney(50, chalo.publicKey);
chalo.sendMoney(23, victor.publicKey);
victor.sendMoney(5, chalo.publicKey);

console.log(Chain.instance);
