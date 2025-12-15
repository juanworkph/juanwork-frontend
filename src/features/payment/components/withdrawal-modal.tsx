import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  Wallet,
  CreditCard,
  Bitcoin,
  CheckCircle,
  Info,
} from "lucide-react";
import { WithdrawalAccount, formatCurrency } from "../schema";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number, accountId: string) => void;
  availableBalance: number;
  currency: string;
  accounts: WithdrawalAccount[];
}

export function WithdrawalModal({
  isOpen,
  onClose,
  onSubmit,
  availableBalance,
  currency,
  accounts,
}: WithdrawalModalProps) {
  const [amount, setAmount] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const selectedAccount = accounts.find((a) => a.id === selectedAccountId);
  const withdrawalAmount = parseFloat(amount) || 0;
  const fee = withdrawalAmount * 0.03; // 3% fee
  const netAmount = withdrawalAmount - fee;

  const isValidAmount =
    withdrawalAmount > 0 && withdrawalAmount <= availableBalance;
  const minWithdrawal = 50;
  const isAboveMinimum = withdrawalAmount >= minWithdrawal;

  const handleSubmit = async () => {
    if (!isValidAmount || !isAboveMinimum) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onSubmit(withdrawalAmount, selectedAccountId);
    setIsSubmitting(false);
    setAmount("");
    onClose();
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "bank":
        return <Building2 className="h-5 w-5" />;
      case "paypal":
        return <Wallet className="h-5 w-5" />;
      case "stripe":
        return <CreditCard className="h-5 w-5" />;
      case "crypto":
        return <Bitcoin className="h-5 w-5" />;
      default:
        return <Wallet className="h-5 w-5" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Withdraw Funds</DialogTitle>
          <DialogDescription>
            Transfer your earnings to your preferred payment method
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Available Balance */}
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Available Balance
            </p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(availableBalance, currency)}
            </p>
          </div>

          {/* Withdrawal Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-base font-medium">
              Withdrawal Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 text-lg h-12"
                min={minWithdrawal}
                max={availableBalance}
                step="0.01"
              />
            </div>
            {amount && !isAboveMinimum && (
              <p className="text-sm text-red-600 dark:text-red-400">
                Minimum withdrawal amount is{" "}
                {formatCurrency(minWithdrawal, currency)}
              </p>
            )}
            {amount && withdrawalAmount > availableBalance && (
              <p className="text-sm text-red-600 dark:text-red-400">
                Amount exceeds available balance
              </p>
            )}
            <div className="flex gap-2 mt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setAmount((availableBalance * 0.25).toFixed(2))}
              >
                25%
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setAmount((availableBalance * 0.5).toFixed(2))}
              >
                50%
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setAmount((availableBalance * 0.75).toFixed(2))}
              >
                75%
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setAmount(availableBalance.toFixed(2))}
              >
                All
              </Button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label htmlFor="account" className="text-base font-medium">
              Payment Method
            </Label>
            <Select
              value={selectedAccountId}
              onValueChange={setSelectedAccountId}
            >
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    <div className="flex items-center gap-3">
                      {getMethodIcon(account.method)}
                      <div className="flex-1">
                        <p className="font-medium">{account.accountName}</p>
                        {account.accountNumber && (
                          <p className="text-xs text-gray-500">
                            {account.accountNumber}
                          </p>
                        )}
                        {account.email && (
                          <p className="text-xs text-gray-500">
                            {account.email}
                          </p>
                        )}
                      </div>
                      {account.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          Default
                        </Badge>
                      )}
                      {account.isVerified && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Withdrawal Summary */}
          {withdrawalAmount > 0 && isValidAmount && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Withdrawal Amount
                </span>
                <span className="font-medium">
                  {formatCurrency(withdrawalAmount, currency)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Processing Fee (3%)
                </span>
                <span className="font-medium text-orange-600 dark:text-orange-400">
                  -{formatCurrency(fee, currency)}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    You'll Receive
                  </span>
                  <span className="font-bold text-lg text-green-600 dark:text-green-400">
                    {formatCurrency(netAmount, currency)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Info Alert */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Withdrawals typically process within 3-5 business days. You'll
              receive an email confirmation once the transfer is complete.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValidAmount || !isAboveMinimum || isSubmitting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? "Processing..." : "Withdraw Funds"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
