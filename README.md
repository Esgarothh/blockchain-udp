cre# <toBeDefinedCoin> BlockChain UDP proyect
<nameYetToBeDefined-Coin> is based on a group proyect to create a real functional distributed blockchain with amazing improvements (to be determined) 

## Installation

To get started with this project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/MGastelluM/blockchain-project.git
cd blockchain-project
```

2. Install the dependencies:

```bash
 npm install 
```

3. Initialize the database:

```bash
    cd db-level
    node db.js
```
## Usage Example: Sending a Transaction with a Wallet

In this example, we'll demonstrate how to create a wallet, send a transaction, and interact with a blockchain using the `Wallet` and `Chain` classes.

### Step 1: Create a Wallet

First, create a wallet instance. A wallet represents an entity capable of sending and receiving transactions on the blockchain.

```javascript
import { Wallet } from "./functions/src/blockchain-core/wallet";
import { Chain } from "./functions/src/blockchain-core/chain";

const primaryBlock = Chain.instance.lastBlock; //GENESIS

const seba = new Wallet();
const chalo = new Wallet();

seba.sendMoney(50, chalo.publicKey);

console.log(Chain.instance);
console.log(Chain.instance.lastBlock.transaction);
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
