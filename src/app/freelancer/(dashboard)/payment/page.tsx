"use client";

import React, { useState, useMemo } from "react";
import {
  PaymentHeader,
  WithdrawalModal,
  TransactionsList,
} from "@/features/payment/components";
import { mockPaymentData } from "@/features/payment/schema";
import { PaymentState } from "@/features/payment/schema";
import { toast } from "sonner";

export default function FreelancerPaymentPage() {
  // State for payment data
  const [paymentData, setPaymentData] = useState<PaymentState>(mockPaymentData);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  // Filter transactions based on current filters
  const filteredTransactions = useMemo(() => {
    let result = [...paymentData.transactions];

    // Filter by type
    if (paymentData.filters.type !== "all") {
      result = result.filter(
        (transaction) => transaction.type === paymentData.filters.type
      );
    }

    // Filter by status
    if (paymentData.filters.status !== "all") {
      result = result.filter(
        (transaction) => transaction.status === paymentData.filters.status
      );
    }

    // Filter by search query
    if (paymentData.filters.search.trim()) {
      const query = paymentData.filters.search.toLowerCase();
      result = result.filter((transaction) => {
        return (
          transaction.description.toLowerCase().includes(query) ||
          transaction.projectName?.toLowerCase().includes(query) ||
          transaction.clientName?.toLowerCase().includes(query) ||
          transaction.type.toLowerCase().includes(query)
        );
      });
    }

    // Sort transactions
    result.sort((a, b) => {
      if (paymentData.filters.sortBy === "date") {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return paymentData.filters.sortDirection === "asc"
          ? dateA - dateB
          : dateB - dateA;
      }

      if (paymentData.filters.sortBy === "amount") {
        return paymentData.filters.sortDirection === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      }

      return 0;
    });

    return result;
  }, [paymentData.transactions, paymentData.filters]);

  // Handle filter changes
  const handleFilterChange = (filters: Partial<PaymentState["filters"]>) => {
    setPaymentData((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...filters,
      },
    }));
  };

  // Handle refreshing payment data
  const handleRefresh = () => {
    setIsLoading(true);

    setTimeout(() => {
      setPaymentData(mockPaymentData);
      setIsLoading(false);
      toast.success("Payment data refreshed successfully");
    }, 800);
  };

  // Handle withdrawal
  const handleWithdrawal = (amount: number, accountId: string) => {
    const account = paymentData.withdrawalAccounts.find(
      (a) => a.id === accountId
    );

    if (!account) return;

    // Create new withdrawal transaction
    const newTransaction = {
      id: `withdraw-${Date.now()}`,
      type: "withdrawn" as const,
      amount: amount,
      currency: paymentData.stats.currency,
      status: "pending" as const,
      description: `Withdrawal to ${account.accountName}`,
      date: new Date().toISOString(),
      method: account.method,
      fee: amount * 0.03,
      netAmount: amount - amount * 0.03,
    };

    setPaymentData((prev) => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions],
      stats: {
        ...prev.stats,
        availableBalance: prev.stats.availableBalance - amount,
        pendingBalance: prev.stats.pendingBalance + amount,
      },
    }));

    toast.success(
      `Withdrawal of $${amount.toFixed(2)} initiated successfully!`,
      {
        description: `Your funds will be transferred to ${account.accountName} within 3-5 business days.`,
      }
    );
  };

  // Handle loading more transactions
  const handleLoadMore = () => {
    setLoadingMore(true);

    setTimeout(() => {
      setLoadingMore(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-10">
      <PaymentHeader
        stats={paymentData.stats}
        filters={paymentData.filters}
        onFilterChange={handleFilterChange}
        onRefresh={handleRefresh}
        onWithdraw={() => setIsWithdrawModalOpen(true)}
        isLoading={isLoading}
      />

      <TransactionsList
        transactions={filteredTransactions}
        isLoading={isLoading}
        onLoadMore={handleLoadMore}
        hasMoreTransactions={false}
        loadingMore={loadingMore}
      />

      <WithdrawalModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onSubmit={handleWithdrawal}
        availableBalance={paymentData.stats.availableBalance}
        currency={paymentData.stats.currency}
        accounts={paymentData.withdrawalAccounts}
      />
    </div>
  );
}
