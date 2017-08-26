import { transactionsRef } from '../modules/Firebase/Init/Init';

export const createTransaction = transaction => transactionsRef.push(transaction);
