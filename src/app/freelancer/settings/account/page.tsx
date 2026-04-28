"use client";

import React from "react";
import { AccountTab } from "@/features/settings/components";
import { toast } from "sonner";

export default function AccountSettingsPage() {
  const handleChangeEmail = () => {
    toast.info("Email change dialogue would open here.");
  };

  const handleManageBilling = () => {
    toast.info("Redirecting to billing management...");
  };

  const handleDeactivate = (
    reason: string,
    feedback: string,
    optOutEmails: boolean,
  ) => {
    toast.success(
      "Account deactivated successfully. You will be logged out shortly.",
    );
    console.log("Deactivation payload:", { reason, feedback, optOutEmails });
  };

  return (
    <div className="space-y-6">
      <AccountTab
        email="mathew.ranigo@juanwork.ph"
        isEmailVerified={true}
        currentPlan="Professional"
        billingCycle="ANNUAL BILLING"
        nextBillingDate="Nov 12, 2024"
        onChangeEmail={handleChangeEmail}
        onManageBilling={handleManageBilling}
        onDeactivate={handleDeactivate}
      />
    </div>
  );
}
