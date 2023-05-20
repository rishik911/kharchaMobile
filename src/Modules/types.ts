export interface SignUpTypes {}

export interface LoginTypes {}

export interface ProfileIndexTypes {}

export interface ExpensesIndexTypes {}

export interface MonthListItemTypes {
  monthName: string;
  id: string;
  totalSpent: string;
  handleOnMonthPress: (id: string) => void;
}

export interface MonthExpenseTypes {}

export interface AddModalTypes {
  isVisible: boolean;
  handleVisibility: () => void;
  accessToken: string;
  yearId?: string;
}
