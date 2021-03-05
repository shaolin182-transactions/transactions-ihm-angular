import { TransactionDetail } from "./transaction-detail"

export interface Transaction {
  id : string;
  description?: string;
  transactions: TransactionDetail[]
  date : string;
  cost : number;
  costAbs : number;
  type?: String

}
