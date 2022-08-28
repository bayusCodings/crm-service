import { TransactionType } from "./transaction-type.enum"

export interface FundAccountDto {
  customerId?: string
  amount?: number
  type?: TransactionType
}