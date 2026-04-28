"use client";

import React from "react";
import { SocialTab } from "@/features/settings/components";
import { mockSettingsData } from "@/features/settings/schema";

export default function SocialsSettingsPage() {
  return (
    <div className="pb-10">
      <SocialTab
        socialLinks={mockSettingsData.socialLinks}
        onSave={(data) => console.log("Saving social links:", data)}
      />
    </div>
  );
}
