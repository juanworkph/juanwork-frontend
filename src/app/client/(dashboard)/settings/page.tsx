"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  User,
  Lock,
  Share2,
  UserX,
  Settings as SettingsIcon,
} from "lucide-react";
import {
  ProfileTab,
  PasswordTab,
  SocialTab,
  DeactivationTab,
} from "@/features/settings/components";
import {
  mockSettingsData,
  UserProfile,
  SocialLinks,
} from "@/features/settings/schema";
import { toast } from "sonner";

export default function ClientSettingsPage() {
  const [settingsData, setSettingsData] = useState(mockSettingsData);
  const [activeTab, setActiveTab] = useState<string>("profile");

  // Profile handlers
  const handleSaveProfile = (profile: UserProfile) => {
    setSettingsData({ ...settingsData, profile });
    toast.success("Profile updated successfully!");
  };

  // Password handler
  const handleChangePassword = () => {
    console.log("Password changed");
    toast.success("Password changed successfully!");
  };

  // Social links handler
  const handleSaveSocialLinks = (socialLinks: SocialLinks) => {
    setSettingsData({ ...settingsData, socialLinks });
    toast.success("Social links updated successfully!");
  };

  // Deactivation handlers
  const handleDeactivate = (reason: string, isPermanent: boolean) => {
    console.log("Account deactivated:", { reason, isPermanent });
    toast.success("Account deactivated successfully!");
  };

  const handleDelete = (reason: string) => {
    console.log("Account deleted:", reason);
    toast.error("Account deleted!");
  };

  const tabs = [
    {
      value: "profile",
      label: "Profile",
      icon: User,
      description: "Manage your personal information",
    },
    {
      value: "password",
      label: "Password",
      icon: Lock,
      description: "Change your password",
    },
    {
      value: "social",
      label: "Social Links",
      icon: Share2,
      description: "Connect your social profiles",
    },
    {
      value: "deactivation",
      label: "Account",
      icon: UserX,
      description: "Deactivate or delete account",
    },
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <SettingsIcon className="h-7 w-7 text-gray-700 dark:text-gray-300" />
        </div>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        {/* Tab Navigation - Desktop */}
        <div className="hidden lg:block mb-0 mt-1">
          <Card className="p-2">
            <TabsList className="flex flex-wrap w-full h-full gap-2 bg-transparent">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center gap-2 data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:shadow-sm border-0 px-4 py-3"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Card>
        </div>

        {/* Tab Navigation - Mobile */}
        <div className="lg:hidden mb-0 mt-1">
          <Card className="p-2">
            <TabsList className="flex flex-wrap gap-2 bg-transparent h-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm px-3 py-2 flex-1 min-w-[140px]"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Card>
        </div>

        {/* Tab Content */}
        <TabsContent value="profile" className="mt-6">
          <ProfileTab
            profile={settingsData.profile}
            onSave={handleSaveProfile}
          />
        </TabsContent>

        <TabsContent value="password" className="mt-6">
          <PasswordTab onChangePassword={handleChangePassword} />
        </TabsContent>

        <TabsContent value="social" className="mt-6">
          <SocialTab
            socialLinks={settingsData.socialLinks}
            onSave={handleSaveSocialLinks}
          />
        </TabsContent>

        <TabsContent value="deactivation" className="mt-6">
          <DeactivationTab
            onDeactivate={handleDeactivate}
            onDelete={handleDelete}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
