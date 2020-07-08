import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: Request): Transaction {
    const transaction = new Transaction({
      title: data.title,
      value: data.value,
      type: data.type,
    });

    const balance = this.transactionsRepository.getBalance();

    if (transaction.type === 'outcome' && balance.total < transaction.value)
      throw new Error('You do not have this amount available');

    this.transactionsRepository.create(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
