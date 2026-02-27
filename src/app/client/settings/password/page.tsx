"use client";

import React from "react";
import { PasswordTab } from "@/features/settings/components";
import { toast } from "sonner";

export default function PasswordSettingsPage() {
  const handleChangePassword = (
    currentPassword: string,
    newPassword: string,
  ) => {
    // This would normally call an API
    console.log("Changing password...", { currentPassword, newPassword });
  };

  return (
    <div className="pb-10">
      <PasswordTab onChangePassword={handleChangePassword} />
    </div>
  );
}
