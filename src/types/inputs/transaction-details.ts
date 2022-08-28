import { TransactionType } from "./transaction-type.enum"

export interface TransactionDetails {
  transactionId: string
  customerId: string
  amount: number
  status: string
  type: TransactionType
}
