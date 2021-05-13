export class Customer {
  _id: string
  name: string
  email: string
  phone1: PhoneContact
  phone2: PhoneContact
  phone3: PhoneContact
  address: string
  history: HistoryItem[]
}

export interface PhoneContact {
  name: string
  number: string
}

export class HistoryItem {
  _id: string
  compressor: string
  jobDescription: string
  supplier: string
  quoteSheetUrl: string
  powraSheetUrl: string
  ramsSheetUrl: string
  jobSheetUrl: string
  invoiceUrl: string
  invoiceNumber: string
  nextDueDate: Date | null
  purchaseOrderNumber: string
}
