"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  ChevronRight,
  CreditCard,
  CalendarDays,
  Settings2,
  PauseCircle,
  CheckCircle2,
  Power,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export interface AccountTabProps {
  email?: string;
  isEmailVerified?: boolean;
  currentPlan?: string;
  billingCycle?: string;
  nextBillingDate?: string;
  onChangeEmail?: () => void;
  onManageBilling?: () => void;
  onDeactivate?: (
    reason: string,
    feedback: string,
    optOutEmails: boolean,
  ) => void;
}

export function AccountTab({
  email = "mathew.ranigo@juanwork.ph",
  isEmailVerified = true,
  currentPlan = "Professional",
  billingCycle = "ANNUAL BILLING",
  nextBillingDate = "Nov 12, 2024",
  onChangeEmail,
  onManageBilling,
  onDeactivate,
}: AccountTabProps) {
  const [deactivateReason, setDeactivateReason] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [optOutEmails, setOptOutEmails] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDeactivateClick = async () => {
    if (!deactivateReason) return;

    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (onDeactivate) {
      onDeactivate(deactivateReason, feedback, optOutEmails);
    }

    setIsProcessing(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Security & Authentication */}
        <Card className="flex flex-col h-full bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-6">
            <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-lg text-primary shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-lg">
                Security & Authentication
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-1">
                Manage your login credentials and access.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 flex-1 flex flex-col">
            <div>
              <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-2 block">
                Primary Email
              </label>
              <div className="bg-accent/50 border border-border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{email}</p>
                  {isEmailVerified && (
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-tight">
                      Verified
                    </span>
                  )}
                </div>
                <button
                  onClick={onChangeEmail}
                  className="text-xs font-semibold text-primary hover:underline transition-all"
                >
                  Change Email
                </button>
              </div>
            </div>

            <div className="mt-auto pt-4">
              <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-2 block">
                Security Access
              </label>
              <Link
                href="/freelancer/settings/password"
                className="flex items-center justify-between p-4 bg-accent/30 border border-border rounded-lg hover:bg-accent transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Lock className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium">Password Settings</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Subscription & Billing */}
        <Card className="flex flex-col h-full bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-6">
            <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-lg text-primary shrink-0">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-lg">Subscription & Billing</CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-1">
                Review your plan and upcoming invoices.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="space-y-6 mb-6">
              <div className="bg-accent/50 border border-border rounded-lg p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">
                      Current Plan
                    </p>
                    <p className="text-xl font-bold text-primary">
                      {currentPlan}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded border border-primary/20">
                    {billingCycle}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  Next billing date:{" "}
                  <span className="text-foreground font-medium">
                    {nextBillingDate}
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={onManageBilling}
              className="w-full flex items-center justify-center gap-2 py-6 bg-primary text-white hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/10"
            >
              <Settings2 className="h-4 w-4" />
              Manage Billing
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Account Status */}
      <Card className="bg-card border-border shadow-sm overflow-hidden">
        <CardContent>
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-lg text-muted-foreground">
                  <PauseCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Account Status</h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
                Need a break? Deactivating your account is a{" "}
                <span className="text-foreground font-medium border-b border-muted">
                  temporary pause
                </span>
                . Your profile, portfolios, and active contracts will be hidden
                from the public, but your data is safely stored for when you
                decide to return.
              </p>

              <div className="flex flex-wrap gap-6 mt-6 pb-8 border-b border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Search visibility disabled
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Messages archived
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Contracts paused
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-4 block">
                    Reason for deactivating
                  </label>
                  <RadioGroup
                    value={deactivateReason}
                    onValueChange={setDeactivateReason}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {[
                      { id: "break", label: "I need a break" },
                      { id: "emails", label: "Too many emails" },
                      { id: "platform", label: "Found another platform" },
                      { id: "other", label: "Other" },
                    ].map((reason) => (
                      <label
                        key={reason.id}
                        htmlFor={reason.id}
                        className={`flex items-center gap-3 p-4 bg-accent/40 border rounded-lg cursor-pointer transition-colors group ${
                          deactivateReason === reason.id
                            ? "border-primary bg-accent/60"
                            : "border-border hover:bg-accent"
                        }`}
                      >
                        <RadioGroupItem value={reason.id} id={reason.id} />
                        <span
                          className={`text-sm font-medium transition-colors ${
                            deactivateReason === reason.id
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-foreground"
                          }`}
                        >
                          {reason.label}
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-4 block">
                    Additional Feedback (Optional)
                  </label>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full bg-accent/50 min-h-[120px]"
                    placeholder="Tell us more about how we can improve..."
                  />
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="bg-accent/30 border border-border rounded-xl p-6 space-y-6">
                  <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="mt-0.5">
                        <Checkbox
                          checked={optOutEmails}
                          onCheckedChange={(checked) =>
                            setOptOutEmails(!!checked)
                          }
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          Opt-out of all email notifications
                        </span>
                        <span className="text-xs text-muted-foreground leading-relaxed mt-1">
                          We won't send you any marketing or platform updates
                          during your break.
                        </span>
                      </div>
                    </label>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      disabled={!deactivateReason || isProcessing}
                      onClick={handleDeactivateClick}
                      className="w-full py-6 border border-border text-muted-foreground hover:text-foreground hover:bg-accent hover:border-accent-foreground/20 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <div className="h-4 w-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                      ) : (
                        <Power className="h-4 w-4" />
                      )}
                      {isProcessing ? "Deactivating..." : "Deactivate Account"}
                    </Button>
                    <p className="text-[10px] text-center text-muted-foreground mt-4 leading-relaxed uppercase tracking-tighter">
                      You can reactivate your account anytime by logging back
                      in.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
