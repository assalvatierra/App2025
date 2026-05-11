export interface PayAddition {
  id?: number;
  payPeriodId?: number;
  resourceId?: number;
  amount: number;
  remarks?: string;
  isAdd: boolean;
}
