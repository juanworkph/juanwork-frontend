"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Wallet,
  CreditCard,
  TrendingUp,
  RefreshCcw,
  Copy,
  ExternalLink,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import {
  xenditTestApi,
  paymentApi,
  walletApi,
  type PaymentChannel,
  type TestAmount,
  type IntegrationStep,
  type PaymentMethod,
  type WalletBalance,
  type Transaction,
} from "@/lib/xendit-test-api";

export function XenditTestPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Overview State
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [channels, setChannels] = useState<{
    directDebit: PaymentChannel[];
    ewallet: PaymentChannel[];
  } | null>(null);
  const [testAmounts, setTestAmounts] = useState<TestAmount[]>([]);
  const [checklist, setChecklist] = useState<IntegrationStep[]>([]);

  // Payment Methods State
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [linkPaymentForm, setLinkPaymentForm] = useState({
    type: "ewallet" as "ewallet" | "direct_debit",
    channelCode: "",
    mobileNumber: "",
    email: "",
  });

  // Wallet State
  const [walletBalance, setWalletBalance] = useState<WalletBalance | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // Webhook Test State
  const [webhookForm, setWebhookForm] = useState({
    type: "invoice" as "invoice" | "direct-debit" | "ewallet",
    status: "PAID" as "PAID" | "EXPIRED" | "FAILED" | "PENDING",
    transactionId: "",
    amount: "",
  });

  // Load initial data
  useEffect(() => {
    loadOverviewData();
  }, []);

  const loadOverviewData = async () => {
    try {
      setLoading(true);
      const [healthRes, channelsRes, amountsRes, checklistRes] = await Promise.all([
        xenditTestApi.checkHealth(),
        xenditTestApi.getChannels(),
        xenditTestApi.getTestAmounts(),
        xenditTestApi.getChecklist(),
      ]);

      setHealthStatus(healthRes.data);
      setChannels(channelsRes.data);
      setTestAmounts(amountsRes.data.testAmounts);
      setChecklist(checklistRes.data.steps);
    } catch (error: any) {
      console.error('Failed to load overview data:', error);
      toast.error(error.message || "Failed to load overview data");
    } finally {
      setLoading(false);
    }
  };

  const loadPaymentMethods = async () => {
    try {
      setLoading(true);
      const response = await paymentApi.listPaymentMethods();
      setPaymentMethods(response.data.paymentMethods);
    } catch (error: any) {
      toast.error(error.message || "Failed to load payment methods");
    } finally {
      setLoading(false);
    }
  };

  const loadWalletData = async () => {
    try {
      setLoading(true);
      const [balanceRes, transactionsRes] = await Promise.all([
        walletApi.getBalance(),
        walletApi.getTransactions({ limit: 10 }),
      ]);

      setWalletBalance(balanceRes.data.wallet);
      setTransactions(transactionsRes.data.transactions);
    } catch (error: any) {
      toast.error(error.message || "Failed to load wallet data");
    } finally {
      setLoading(false);
    }
  };

  const handleLinkPaymentMethod = async () => {
    try {
      setLoading(true);
      const baseUrl = window.location.origin;
      const response = await paymentApi.linkPaymentMethod({
        type: linkPaymentForm.type,
        channelCode: linkPaymentForm.channelCode,
        mobileNumber: linkPaymentForm.mobileNumber || undefined,
        email: linkPaymentForm.email || undefined,
        successRedirectUrl: `${baseUrl}/test/xendit?status=success`,
        failureRedirectUrl: `${baseUrl}/test/xendit?status=failed`,
      });

      if (response.data.authorizationUrl) {
        toast.success("Payment method initiated. Opening authorization URL...");
        window.open(response.data.authorizationUrl, "_blank");
      }

      await loadPaymentMethods();
    } catch (error: any) {
      toast.error(error.message || "Failed to link payment method");
    } finally {
      setLoading(false);
    }
  };

  const handleTopUp = async () => {
    try {
      setLoading(true);
      const response = await walletApi.topUp({
        amount: parseFloat(topUpAmount),
        paymentMethodId: selectedPaymentMethod || undefined,
        description: "Test top-up from Xendit test page",
      });

      if (response.data.invoiceUrl) {
        toast.success("Top-up initiated. Opening payment page...");
        window.open(response.data.invoiceUrl, "_blank");
      }

      await loadWalletData();
    } catch (error: any) {
      toast.error(error.message || "Failed to top up wallet");
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateWebhook = async () => {
    try {
      setLoading(true);
      const response = await xenditTestApi.simulateWebhook({
        type: webhookForm.type,
        status: webhookForm.status,
        transactionId: webhookForm.transactionId,
        amount: webhookForm.amount ? parseFloat(webhookForm.amount) : undefined,
      });

      toast.success(`Webhook Simulated: ${response.message}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to simulate webhook");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Xendit Integration Test</h1>
          <p className="text-muted-foreground">
            Validate and test Xendit payment integration
          </p>
        </div>
        <Button onClick={loadOverviewData} disabled={loading}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Status</CardTitle>
              <CardDescription>
                Check if Xendit is properly configured
              </CardDescription>
            </CardHeader>
            <CardContent>
              {healthStatus ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Configured</span>
                    <Badge
                      variant={healthStatus.configured ? "default" : "destructive"}
                    >
                      {healthStatus.configured ? (
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                      ) : (
                        <XCircle className="mr-1 h-3 w-3" />
                      )}
                      {healthStatus.configured ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Secret Key</span>
                    <Badge
                      variant={healthStatus.hasSecretKey ? "default" : "destructive"}
                    >
                      {healthStatus.hasSecretKey ? (
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                      ) : (
                        <XCircle className="mr-1 h-3 w-3" />
                      )}
                      {healthStatus.hasSecretKey ? "Set" : "Missing"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Webhook Token</span>
                    <Badge
                      variant={
                        healthStatus.hasWebhookToken ? "default" : "secondary"
                      }
                    >
                      {healthStatus.hasWebhookToken ? (
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                      ) : (
                        <AlertCircle className="mr-1 h-3 w-3" />
                      )}
                      {healthStatus.hasWebhookToken ? "Set" : "Optional"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Environment</span>
                    <Badge variant="outline">{healthStatus.environment}</Badge>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Channels</CardTitle>
                <CardDescription>Supported payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                {channels ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Direct Debit (Banks)</h4>
                      <div className="space-y-2">
                        {channels?.directDebit?.length > 0 ? (
                          channels.directDebit.map((channel) => (
                            <div
                              key={channel.code}
                              className="flex items-center justify-between p-2 border rounded"
                            >
                              <div>
                                <p className="font-medium">{channel.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {channel.description}
                                </p>
                              </div>
                              <Badge variant="outline">{channel.code}</Badge>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No direct debit channels available</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">E-Wallets</h4>
                      <div className="space-y-2">
                        {channels?.ewallet?.length > 0 ? (
                          channels.ewallet.map((channel) => (
                            <div
                              key={channel.code}
                              className="flex items-center justify-between p-2 border rounded"
                            >
                              <div>
                                <p className="font-medium">{channel.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {channel.description}
                                </p>
                              </div>
                              <Badge variant="outline">{channel.code}</Badge>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No e-wallet channels available</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test Amounts</CardTitle>
                <CardDescription>
                  Use these amounts for testing different scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {testAmounts?.map((amount, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-mono font-bold">
                          ₱{amount?.amount?.toLocaleString() || '0'}
                        </p>
                        <Badge
                          variant={
                            amount?.scenario === "success"
                              ? "default"
                              : amount?.scenario === "failed"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {amount?.scenario || 'unknown'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {amount?.description || 'No description'}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="payment-methods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Link New Payment Method</CardTitle>
              <CardDescription>
                Add a new payment method for testing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={linkPaymentForm.type}
                    onValueChange={(value: any) =>
                      setLinkPaymentForm({ ...linkPaymentForm, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ewallet">E-Wallet</SelectItem>
                      <SelectItem value="direct_debit">Direct Debit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Channel</Label>
                  <Select
                    value={linkPaymentForm.channelCode}
                    onValueChange={(value) =>
                      setLinkPaymentForm({ ...linkPaymentForm, channelCode: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      {linkPaymentForm.type === "ewallet"
                        ? channels?.ewallet?.map((ch) => (
                            <SelectItem key={ch.code} value={ch.code}>
                              {ch.name}
                            </SelectItem>
                          ))
                        : channels?.directDebit?.map((ch) => (
                            <SelectItem key={ch.code} value={ch.code}>
                              {ch.name}
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {linkPaymentForm.type === "ewallet" && (
                <div className="space-y-2">
                  <Label>Mobile Number</Label>
                  <Input
                    placeholder="+639171234567"
                    value={linkPaymentForm.mobileNumber}
                    onChange={(e) =>
                      setLinkPaymentForm({
                        ...linkPaymentForm,
                        mobileNumber: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Email (Optional)</Label>
                <Input
                  type="email"
                  placeholder="test@example.com"
                  value={linkPaymentForm.email}
                  onChange={(e) =>
                    setLinkPaymentForm({
                      ...linkPaymentForm,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <Button
                onClick={handleLinkPaymentMethod}
                disabled={loading || !linkPaymentForm.channelCode}
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CreditCard className="mr-2 h-4 w-4" />
                )}
                Link Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Linked Payment Methods</CardTitle>
              <CardDescription>Your registered payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={loadPaymentMethods}
                variant="outline"
                size="sm"
                className="mb-4"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Refresh
              </Button>

              {paymentMethods.length === 0 ? (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>No payment methods</AlertTitle>
                  <AlertDescription>
                    Link a payment method above to get started.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-2">
                  {paymentMethods?.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between p-3 border rounded"
                    >
                      <div>
                        <p className="font-medium">{method.channelCode}</p>
                        <p className="text-sm text-muted-foreground">
                          {method.type} • {method.status}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault && <Badge>Default</Badge>}
                        <Badge variant="outline">{method.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wallet Tab */}
        <TabsContent value="wallet" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Balance</CardTitle>
              <CardDescription>Your current wallet balance</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={loadWalletData}
                variant="outline"
                size="sm"
                className="mb-4"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Refresh
              </Button>

              {walletBalance ? (
                <div className="space-y-4">
                  <div className="p-6 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      Available Balance
                    </p>
                    <p className="text-4xl font-bold">
                      ₱{walletBalance?.balance?.toLocaleString() || '0.00'}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Currency</p>
                      <p className="font-medium">{walletBalance.currency}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <Badge variant={walletBalance.isActive ? "default" : "destructive"}>
                        {walletBalance.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>No wallet found</AlertTitle>
                  <AlertDescription>
                    A wallet will be created automatically when you sign up.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Up Wallet</CardTitle>
              <CardDescription>Add funds to your wallet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Amount (PHP)</Label>
                <Input
                  type="number"
                  placeholder="10000"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  min="100"
                  max="100000"
                />
                <p className="text-xs text-muted-foreground">
                  Min: ₱100 | Max: ₱100,000
                </p>
              </div>

              <div className="space-y-2">
                <Label>Payment Method (Optional)</Label>
                <Select
                  value={selectedPaymentMethod}
                  onValueChange={setSelectedPaymentMethod}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Use default or create new" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods?.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        {method.channelCode} - {method.accountName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleTopUp}
                disabled={loading || !topUpAmount || parseFloat(topUpAmount) < 100}
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <TrendingUp className="mr-2 h-4 w-4" />
                )}
                Top Up Wallet
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest wallet transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>No transactions</AlertTitle>
                  <AlertDescription>
                    Your transactions will appear here.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-2">
                  {transactions?.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-3 border rounded"
                    >
                      <div>
                        <p className="font-medium">{tx?.type || 'Unknown'}</p>
                        <p className="text-sm text-muted-foreground">
                          {tx?.createdAt ? new Date(tx.createdAt).toLocaleString() : 'N/A'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          ₱{tx?.amount?.toLocaleString() || '0.00'}
                        </p>
                        <Badge variant="outline">{tx?.status || 'unknown'}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Webhooks Tab */}
        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Simulate Webhook</CardTitle>
              <CardDescription>
                Test webhook handling without actual Xendit callbacks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Webhook Type</Label>
                  <Select
                    value={webhookForm.type}
                    onValueChange={(value: any) =>
                      setWebhookForm({ ...webhookForm, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="invoice">Invoice</SelectItem>
                      <SelectItem value="direct-debit">Direct Debit</SelectItem>
                      <SelectItem value="ewallet">E-Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={webhookForm.status}
                    onValueChange={(value: any) =>
                      setWebhookForm({ ...webhookForm, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PAID">PAID</SelectItem>
                      <SelectItem value="EXPIRED">EXPIRED</SelectItem>
                      <SelectItem value="FAILED">FAILED</SelectItem>
                      <SelectItem value="PENDING">PENDING</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Transaction ID</Label>
                <Input
                  placeholder="transaction-id-here"
                  value={webhookForm.transactionId}
                  onChange={(e) =>
                    setWebhookForm({
                      ...webhookForm,
                      transactionId: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Amount (Optional)</Label>
                <Input
                  type="number"
                  placeholder="10000"
                  value={webhookForm.amount}
                  onChange={(e) =>
                    setWebhookForm({ ...webhookForm, amount: e.target.value })
                  }
                />
              </div>

              <Button
                onClick={handleSimulateWebhook}
                disabled={loading || !webhookForm.transactionId}
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ExternalLink className="mr-2 h-4 w-4" />
                )}
                Simulate Webhook
              </Button>
            </CardContent>
          </Card>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Webhook Testing</AlertTitle>
            <AlertDescription>
              For real webhook testing, use ngrok or similar tools to expose your
              local server and configure the webhook URLs in Xendit dashboard.
            </AlertDescription>
          </Alert>
        </TabsContent>

        {/* Checklist Tab */}
        <TabsContent value="checklist" className="space-y-4">
          {checklist?.map((step) => (
            <Card key={step.step}>
              <CardHeader>
                <CardTitle>
                  Step {step.step}: {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {step?.tasks?.map((task, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
                {step.endpoint && (
                  <div className="mt-4 p-3 bg-muted rounded flex items-center justify-between">
                    <code className="text-sm">{step.endpoint}</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(step.endpoint || "")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
