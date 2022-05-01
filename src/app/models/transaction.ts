import { TransactionDetail } from "./transaction-detail"

export interface Transaction {
  id : string;
  description?: string;
  transactions: TransactionDetail[]
  date : Object;
  cost : number;
  costAbs : number;
  type?: String

}
