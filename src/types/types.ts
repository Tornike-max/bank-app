export type SettingsType = {
  transactionPercentage: number;
  loanPercentage: number;
  creditPercentage: number;
};

export type GoalType = {
  amount: number;
  goalName: string;
  description: string;
  deadline: string;
  remainingAmount: number;
  goal: number;
  user: string;
  account?: string;
  sliderAmount: number;
};

export type LoanRequestType = {
  loanPurpose: string;
  account: string | undefined;
  amount: number;
  interestRate: number;
  period: number;
  status: string;
  user: string | undefined;
};

export type LoanType = {
  loanPurpose: string;
  period: number;
  amount: number;
  interestRate: number;
  status: string;
  user: string;
  account: string;
};

export type TransferType = {
  description: string;
  amount: string;
  user: string | undefined;
  to: string;
  account: string;
};

export type CartType = {
  cardName: string;
  userName: string;
  expiry_date: string;
  cvv: number;
  user: string | undefined;
  card_number: string;
};
