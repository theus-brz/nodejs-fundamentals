import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    const incomes = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value);

    let income;
    if (incomes.length > 0)
      income = incomes.reduce((prev, curr) => prev + curr);
    else income = 0;

    const outcomes = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => transaction.value);

    let outcome;
    if (outcomes.length > 0)
      outcome = outcomes.reduce((prev, curr) => prev + curr);
    else outcome = 0;

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
