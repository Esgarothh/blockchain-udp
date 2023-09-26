import * as crypto from "crypto";
import { Transaction } from "./transaction";

export class Block {
  // Number only used once, used as the solution for mining
  public numberOnlyUsedOnce = Math.round(Math.random() * 999999999);

  constructor(
    public prevHash: string,
    public transaction: Transaction,
    public ts = Date.now()
  ) {}

  // Getter method to return a hash of this block
  get hash() {
    const str = JSON.stringify(this);
    const hash = crypto.createHash("SHA256");
    hash.update(str).end();
    return hash.digest("hex");
  }
}
