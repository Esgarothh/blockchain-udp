export class Transaction {
  constructor(
    public amount: number,
    public payer: string,
    public payee: string
  ) {}

  // Serialise transaction as a string
  toString() {
    return JSON.stringify(this);
  }
}
