export interface PaymentExternal {
  id?: number;
  gateway?: string;
  amount: number;
  currency: string;
  jsonInfo: string;
  jobMainId?: number;
}
