"use client";

import React from "react";
import {
  ProfilePhotoSection,
  VideoIntroSection,
  PersonalInfoSection,
  SettingsFooter,
} from "@/features/settings/components";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <ProfilePhotoSection
        name="John Doe"
        avatarUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      />
      <VideoIntroSection />
      <PersonalInfoSection />
      <SettingsFooter />
    </div>
  );
}
