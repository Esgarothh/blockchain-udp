import * as crypto from "crypto";
import { Block } from "./block";
import { Transaction } from "./transaction";

export class Chain {
  // Singleton instance as we only want 1 chain
  public static instance = new Chain();

  // The chain is a series of linked blocks
  chain: Block[];

  // Create genesis block
  constructor() {
    this.chain = [new Block("", new Transaction(100, "genesis", "godwin"))];
  }

  // Return the last block in the chain
  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  // Mine a block to confirm it as a transaction on the blockchain
  mine(numOnlyUsedOnce: number) {
    let solution = 1;
    console.log("🐢 Mining transaction...");

    // Keep looping until solution is found
    while (true) {
      const hash = crypto.createHash("MD5");
      hash.update((numOnlyUsedOnce + solution).toString()).end();

      const attempt = hash.digest("hex");

      // Add more 0's to make it harder
      if (attempt.substr(0, 4) === "0000") {
        console.log(
          `---> Solved transaction with solution: ${solution}. Block is confirmed!\n`
        );
        return solution;
      }

      solution += 1;
    }
  }

  // Add a block to the blockchain
  addBlock(
    transaction: Transaction,
    senderPublicKey: string,
    signature: Buffer
  ) {
    console.log("🐢 Sending TurtleCoin...");

    // Verify a transaction before adding it
    const verifier = crypto.createVerify("SHA256");
    verifier.update(transaction.toString());

    const isValid = verifier.verify(senderPublicKey, signature);

    // If it is valid, create a block, mine it and add it to the blockchain
    if (isValid) {
      console.log("🐢 Transaction is valid!");
      const newBlock = new Block(this.lastBlock.hash, transaction);
      this.mine(newBlock.numberOnlyUsedOnce);
      this.chain.push(newBlock);
    }
  }
}
