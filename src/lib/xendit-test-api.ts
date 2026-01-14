/**
 * Xendit Test API Client
 * API functions for testing Xendit integration
 */

import apiClient from '@/lib/api-client';

// Types
export interface XenditHealthResponse {
  success: boolean;
  message: string;
  data: {
    configured: boolean;
    hasSecretKey: boolean;
    hasWebhookToken: boolean;
    environment: 'test' | 'production';
  };
}

export interface PaymentChannel {
  code: string;
  name: string;
  description: string;
}

export interface XenditChannelsResponse {
  success: boolean;
  data: {
    directDebit: PaymentChannel[];
    ewallet: PaymentChannel[];
  };
}

export interface TestAmount {
  amount: number;
  currency: string;
  scenario: string;
  description: string;
}

export interface XenditTestAmountsResponse {
  success: boolean;
  data: {
    testAmounts: TestAmount[];
  };
}

export interface SimulateWebhookRequest {
  type: 'invoice' | 'direct-debit' | 'ewallet';
  status: 'PAID' | 'EXPIRED' | 'FAILED' | 'PENDING';
  transactionId: string;
  amount?: number;
}

export interface SimulateWebhookResponse {
  success: boolean;
  message: string;
  data: {
    type: string;
    status: string;
    transactionId: string;
    amount?: number;
    timestamp: string;
    simulated: boolean;
  };
}

export interface IntegrationStep {
  step: number;
  title: string;
  tasks: string[];
  endpoint?: string;
}

export interface XenditChecklistResponse {
  success: boolean;
  data: {
    steps: IntegrationStep[];
  };
}

export interface LinkPaymentMethodRequest {
  type: 'direct_debit' | 'ewallet';
  channelCode: string;
  mobileNumber?: string;
  email?: string;
  successRedirectUrl: string;
  failureRedirectUrl: string;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  xenditId: string;
  type: string;
  channelCode: string;
  status: string;
  accountName?: string;
  accountNumber?: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WalletBalance {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  isActive: boolean;
  lastTransactionAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TopUpWalletRequest {
  amount: number;
  paymentMethodId?: string;
  description?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  walletId: string;
  paymentMethodId?: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Test API Functions
 */
export const xenditTestApi = {
  /**
   * Check Xendit configuration health
   */
  async checkHealth(): Promise<XenditHealthResponse> {
    const response = await apiClient.get('/test/xendit/health');
    return response.data;
  },

  /**
   * Get available payment channels
   */
  async getChannels(): Promise<XenditChannelsResponse> {
    const response = await apiClient.get('/test/xendit/channels');
    return response.data;
  },

  /**
   * Get test amounts for different scenarios
   */
  async getTestAmounts(): Promise<XenditTestAmountsResponse> {
    const response = await apiClient.get('/test/xendit/test-amounts');
    return response.data;
  },

  /**
   * Simulate a webhook callback
   */
  async simulateWebhook(data: SimulateWebhookRequest): Promise<SimulateWebhookResponse> {
    const response = await apiClient.post('/test/xendit/simulate-webhook', data);
    return response.data;
  },

  /**
   * Get test credentials information
   */
  async getCredentialsInfo(): Promise<any> {
    const response = await apiClient.get('/test/xendit/credentials-info');
    return response.data;
  },

  /**
   * Get integration checklist
   */
  async getChecklist(): Promise<XenditChecklistResponse> {
    const response = await apiClient.get('/test/xendit/checklist');
    return response.data;
  },
};

/**
 * Actual Payment API Functions
 */
export const paymentApi = {
  /**
   * Link a new payment method
   */
  async linkPaymentMethod(data: LinkPaymentMethodRequest): Promise<any> {
    const response = await apiClient.post('/payments/methods', data);
    return response.data;
  },

  /**
   * List all payment methods
   */
  async listPaymentMethods(): Promise<{ success: boolean; data: { paymentMethods: PaymentMethod[] } }> {
    const response = await apiClient.get('/payments/methods');
    return response.data;
  },

  /**
   * Set default payment method
   */
  async setDefaultPaymentMethod(paymentMethodId: string): Promise<any> {
    const response = await apiClient.post('/payments/methods/default', { paymentMethodId });
    return response.data;
  },

  /**
   * Remove a payment method
   */
  async removePaymentMethod(id: string): Promise<any> {
    const response = await apiClient.delete(`/payments/methods/${id}`);
    return response.data;
  },

  /**
   * Get available payment channels
   */
  async getAvailableChannels(): Promise<any> {
    const response = await apiClient.get('/payments/channels');
    return response.data;
  },
};

/**
 * Wallet API Functions
 */
export const walletApi = {
  /**
   * Get wallet balance
   */
  async getBalance(): Promise<{ success: boolean; data: { wallet: WalletBalance } }> {
    const response = await apiClient.get('/wallet/balance');
    return response.data;
  },

  /**
   * Top up wallet
   */
  async topUp(data: TopUpWalletRequest): Promise<any> {
    const response = await apiClient.post('/wallet/topup', data);
    return response.data;
  },

  /**
   * Get transaction history
   */
  async getTransactions(params?: {
    type?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<{ success: boolean; data: { transactions: Transaction[]; pagination: any } }> {
    const response = await apiClient.get('/wallet/transactions', { params });
    return response.data;
  },

  /**
   * Get transaction details
   */
  async getTransactionDetails(id: string): Promise<{ success: boolean; data: { transaction: Transaction } }> {
    const response = await apiClient.get(`/wallet/transactions/${id}`);
    return response.data;
  },
};
