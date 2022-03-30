import { Transaction } from "./transaction"

/**
 * Encapsulate Transaction object into a structure dedicated to GUI
 */
export interface TransactionItem {

    original: Transaction
    date: string
    cost: number
    description: string
    category: string
    bankaccount: string
}