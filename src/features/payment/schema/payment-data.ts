export type TransactionType =
  | "earned"
  | "withdrawn"
  | "refund"
  | "bonus"
  | "fee";
export type TransactionStatus =
  | "completed"
  | "pending"
  | "failed"
  | "cancelled";
export type WithdrawalMethod = "bank" | "paypal" | "stripe" | "crypto";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
  description: string;
  projectName?: string;
  clientName?: string;
  date: string;
  method?: WithdrawalMethod;
  fee?: number;
  netAmount?: number;
}

export interface EarningsStats {
  totalEarnings: number;
  availableBalance: number;
  pendingBalance: number;
  withdrawnAmount: number;
  thisMonthEarnings: number;
  lastMonthEarnings: number;
  currency: string;
}

export interface WithdrawalAccount {
  id: string;
  method: WithdrawalMethod;
  accountName: string;
  accountNumber?: string;
  email?: string;
  isDefault: boolean;
  isVerified: boolean;
}

export interface PaymentFilters {
  type: TransactionType | "all";
  status: TransactionStatus | "all";
  search: string;
  sortBy: "date" | "amount";
  sortDirection: "asc" | "desc";
  dateRange?: {
    from?: string;
    to?: string;
  };
}

export interface PaymentState {
  transactions: Transaction[];
  stats: EarningsStats;
  withdrawalAccounts: WithdrawalAccount[];
  filters: PaymentFilters;
}

// Helper functions
export const formatCurrency = (
  amount: number,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getTransactionTypeColor = (type: TransactionType): string => {
  switch (type) {
    case "earned":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "withdrawn":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "refund":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    case "bonus":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
    case "fee":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  }
};

export const getStatusColor = (status: TransactionStatus): string => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "pending":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "failed":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    case "cancelled":
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  }
};

export const getWithdrawalMethodIcon = (method: WithdrawalMethod): string => {
  switch (method) {
    case "bank":
      return "Building2";
    case "paypal":
      return "Wallet";
    case "stripe":
      return "CreditCard";
    case "crypto":
      return "Bitcoin";
    default:
      return "Wallet";
  }
};

// Mock data
export const mockPaymentData: PaymentState = {
  transactions: [
    {
      id: "1",
      type: "earned",
      amount: 4500,
      currency: "USD",
      status: "completed",
      description: "Payment received for completed project",
      projectName: "E-commerce Website Redesign",
      clientName: "Sarah Johnson",
      date: "2024-02-15T10:30:00Z",
      fee: 225,
      netAmount: 4275,
    },
    {
      id: "2",
      type: "withdrawn",
      amount: 3000,
      currency: "USD",
      status: "completed",
      description: "Withdrawal to Bank Account",
      date: "2024-02-10T14:20:00Z",
      method: "bank",
      fee: 15,
      netAmount: 2985,
    },
    {
      id: "3",
      type: "earned",
      amount: 3600,
      currency: "USD",
      status: "pending",
      description: "Payment processing for completed project",
      projectName: "Mobile App Development",
      clientName: "Ahmed Hassan",
      date: "2024-02-12T09:15:00Z",
      fee: 180,
      netAmount: 3420,
    },
    {
      id: "4",
      type: "bonus",
      amount: 500,
      currency: "USD",
      status: "completed",
      description: "Performance bonus for excellent client rating",
      date: "2024-02-08T11:00:00Z",
      netAmount: 500,
    },
    {
      id: "5",
      type: "earned",
      amount: 2800,
      currency: "USD",
      status: "completed",
      description: "Payment received for completed project",
      projectName: "Data Analytics Dashboard",
      clientName: "Maria Garcia",
      date: "2024-02-05T16:45:00Z",
      fee: 140,
      netAmount: 2660,
    },
    {
      id: "6",
      type: "withdrawn",
      amount: 2000,
      currency: "USD",
      status: "completed",
      description: "Withdrawal to PayPal",
      date: "2024-02-01T13:30:00Z",
      method: "paypal",
      fee: 60,
      netAmount: 1940,
    },
    {
      id: "7",
      type: "fee",
      amount: 50,
      currency: "USD",
      status: "completed",
      description: "Platform service fee",
      date: "2024-01-28T08:00:00Z",
      netAmount: -50,
    },
    {
      id: "8",
      type: "earned",
      amount: 1200,
      currency: "USD",
      status: "completed",
      description: "Payment received for completed project",
      projectName: "Brand Identity Design",
      clientName: "James Wilson",
      date: "2024-01-25T15:20:00Z",
      fee: 60,
      netAmount: 1140,
    },
    {
      id: "9",
      type: "refund",
      amount: 800,
      currency: "USD",
      status: "completed",
      description: "Refund issued for cancelled project",
      projectName: "WordPress Plugin Development",
      clientName: "Robert Brown",
      date: "2024-01-20T10:15:00Z",
      netAmount: -800,
    },
    {
      id: "10",
      type: "withdrawn",
      amount: 1500,
      currency: "USD",
      status: "failed",
      description: "Withdrawal to Bank Account - Failed",
      date: "2024-01-15T12:00:00Z",
      method: "bank",
      fee: 0,
      netAmount: 0,
    },
  ],
  stats: {
    totalEarnings: 18900,
    availableBalance: 8695,
    pendingBalance: 3420,
    withdrawnAmount: 6785,
    thisMonthEarnings: 11400,
    lastMonthEarnings: 7500,
    currency: "USD",
  },
  withdrawalAccounts: [
    {
      id: "1",
      method: "bank",
      accountName: "Chase Bank - Checking",
      accountNumber: "****1234",
      isDefault: true,
      isVerified: true,
    },
    {
      id: "2",
      method: "paypal",
      accountName: "PayPal Account",
      email: "freelancer@example.com",
      isDefault: false,
      isVerified: true,
    },
    {
      id: "3",
      method: "stripe",
      accountName: "Stripe Account",
      email: "freelancer@example.com",
      isDefault: false,
      isVerified: true,
    },
  ],
  filters: {
    type: "all",
    status: "all",
    search: "",
    sortBy: "date",
    sortDirection: "desc",
  },
};
