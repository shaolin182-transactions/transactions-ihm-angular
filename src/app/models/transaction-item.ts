import { BankAccount } from "./bank-account"
import { Transaction } from "./transaction"
import { TransactionCategory } from "./transaction-category"

/**
 * Encapsulate Transaction object into a structure dedicated to GUI
 */
export interface TransactionItem {

    original: Transaction
    date: string
    cost: number
    description: string
    category: TransactionCategory
    bankAccount: BankAccount
}