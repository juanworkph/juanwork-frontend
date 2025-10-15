import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Gift,
  AlertCircle,
  Building2,
  Wallet,
  CreditCard,
  Bitcoin,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import {
  Transaction,
  formatCurrency,
  formatDateTime,
  getTransactionTypeColor,
  getStatusColor,
} from "../schema";

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const isPositive =
    transaction.type === "earned" || transaction.type === "bonus";
  const isNegative =
    transaction.type === "withdrawn" ||
    transaction.type === "fee" ||
    transaction.type === "refund";

  const getTypeIcon = () => {
    switch (transaction.type) {
      case "earned":
        return <ArrowDownRight className="h-5 w-5" />;
      case "withdrawn":
        return <ArrowUpRight className="h-5 w-5" />;
      case "refund":
        return <RefreshCw className="h-5 w-5" />;
      case "bonus":
        return <Gift className="h-5 w-5" />;
      case "fee":
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <ArrowDownRight className="h-5 w-5" />;
    }
  };

  const getMethodIcon = () => {
    if (!transaction.method) return null;

    switch (transaction.method) {
      case "bank":
        return <Building2 className="h-4 w-4" />;
      case "paypal":
        return <Wallet className="h-4 w-4" />;
      case "stripe":
        return <CreditCard className="h-4 w-4" />;
      case "crypto":
        return <Bitcoin className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusIcon = () => {
    switch (transaction.status) {
      case "completed":
        return (
          <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
        );
      case "pending":
        return (
          <Clock className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
        );
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500 dark:text-red-400" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-gray-500 dark:text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Left Side - Icon and Details */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div
              className={`p-3 rounded-lg ${
                isPositive
                  ? "bg-green-100 dark:bg-green-900/30"
                  : isNegative
                  ? "bg-red-100 dark:bg-red-900/30"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              {getTypeIcon()}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-base text-gray-900 dark:text-white truncate">
                  {transaction.description}
                </h3>
                <Badge
                  variant="outline"
                  className={`${getTransactionTypeColor(
                    transaction.type
                  )} text-xs flex-shrink-0`}
                >
                  {transaction.type.charAt(0).toUpperCase() +
                    transaction.type.slice(1)}
                </Badge>
              </div>

              {/* Project/Client Info */}
              {(transaction.projectName || transaction.clientName) && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {transaction.projectName && (
                    <span className="truncate">{transaction.projectName}</span>
                  )}
                  {transaction.projectName && transaction.clientName && (
                    <span>•</span>
                  )}
                  {transaction.clientName && (
                    <span className="truncate">{transaction.clientName}</span>
                  )}
                </div>
              )}

              {/* Date and Method */}
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span>{formatDateTime(transaction.date)}</span>
                {transaction.method && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      {getMethodIcon()}
                      <span className="capitalize">{transaction.method}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Fee Info */}
              {transaction.fee && transaction.fee > 0 && (
                <div className="mt-2 text-xs text-orange-600 dark:text-orange-400">
                  Fee: {formatCurrency(transaction.fee, transaction.currency)}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Amount and Status */}
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <div className="text-right">
              <p
                className={`text-lg font-bold ${
                  isPositive
                    ? "text-green-600 dark:text-green-400"
                    : isNegative
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {isPositive ? "+" : isNegative ? "-" : ""}
                {formatCurrency(transaction.amount, transaction.currency)}
              </p>
              {transaction.netAmount !== undefined &&
                transaction.netAmount !== transaction.amount && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Net:{" "}
                    {formatCurrency(
                      Math.abs(transaction.netAmount),
                      transaction.currency
                    )}
                  </p>
                )}
            </div>

            <div className="flex items-center gap-1.5">
              {getStatusIcon()}
              <Badge
                variant="outline"
                className={`${getStatusColor(transaction.status)} text-xs`}
              >
                {transaction.status.charAt(0).toUpperCase() +
                  transaction.status.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
