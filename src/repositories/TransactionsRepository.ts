import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeSum = this.transactions
      .filter(t => t.type === 'income')
      .map(t => t.value)
      .reduce((accum, curr) => accum + curr, 0);

    const outcomeSum = this.transactions
      .filter(t => t.type === 'outcome')
      .map(t => t.value)
      .reduce((accum, curr) => accum + curr, 0);

    return {
      income: incomeSum,
      outcome: outcomeSum,
      total: incomeSum - outcomeSum,
    };
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
