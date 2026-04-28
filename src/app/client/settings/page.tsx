"use client";

import React from "react";
import {
  ProfilePhotoSection,
  PersonalInfoSection,
  SettingsFooter,
} from "@/features/settings/components";

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <ProfilePhotoSection
        name="John Doe"
        avatarUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      />
      <PersonalInfoSection />
      <SettingsFooter />
    </div>
  );
}
