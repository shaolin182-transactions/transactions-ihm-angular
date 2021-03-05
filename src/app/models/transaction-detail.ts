import {TransactionCategory} from "./transaction-category"
import {BankAccount} from "./bank-account"

export interface TransactionDetail {

  category? : TransactionCategory;
  income: Number;
  outcome: Number;
  description?: String;
  bankAccount : BankAccount;
  cost?: Number;
  costAbs?: Number;

}
