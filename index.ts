import { Chain } from "./functions/src/blockchain-core/chain";
import { getGenesisBlock, getLastBlock, sendBlockToServer, sendChainToServer, sendTransactionToServer } from "./functions/src/blockchain-core/database_logic";
import { Wallet } from "./functions/src/blockchain-core/wallet";

async function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const initializeGenesisBlock = async () => {
console.log("Initializing genesis block...");
await sleep(5000);
const primaryBlock = Chain.instance.lastBlock;
await sendBlockToServer(primaryBlock);
await sendTransactionToServer(Chain.instance.lastBlock.transaction);
await sendChainToServer(Chain.instance.chain);
}

export const setSecondaryBlockInitialize = async () => {
    console.log("Initializing secondary block...");
    await sleep(5000);
    const seba = new Wallet();
    const chalo = new Wallet();
    await seba.sendMoney(50, chalo.publicKey);
    await sendTransactionToServer(Chain.instance.lastBlock.transaction);
    await sendBlockToServer(Chain.instance.lastBlock);
    await sendChainToServer(Chain.instance.chain);
}

export async function getGenesisBlockFromDatabase() {
    const genesisBlock = await getGenesisBlock();
    console.log("Get genesis block from database:", genesisBlock);
}

export async function getLastBlockFromDatabase() {
    const lastBlock = await getLastBlock();
    console.log("Get last block from database blockchain:", lastBlock);
}

export const getFunctionsFromDataBase = async () => {
    await getGenesisBlockFromDatabase();
    await getLastBlockFromDatabase();
}

const initializeProject = async () => {
    await initializeGenesisBlock();
    await sleep(5000);
    await setSecondaryBlockInitialize();
}



const main = async () => {
    // TODO 1: Initialize the project by calling the initializeProject function
    await initializeProject();
    // TODO 2: Call the showMenu function (pending implementation)
}

main();