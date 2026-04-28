"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  LockKeyhole,
  Smartphone,
  QrCode,
  Monitor,
  Laptop,
  History,
  Shield,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function PasswordTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  // Password strength validation
  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

  const passwordsMatch =
    newPassword === confirmPassword && confirmPassword.length > 0;

  // Logic for strength bar (0-5)
  const strengthScore = [
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
  ].filter(Boolean).length;

  const strengthColor =
    strengthScore <= 2
      ? "bg-red-500"
      : strengthScore <= 4
        ? "bg-primary"
        : "bg-emerald-500";

  const isStrongPassword = strengthScore >= 4; // Requiring at least Medium-Strong

  const canSubmit =
    currentPassword &&
    newPassword &&
    confirmPassword &&
    passwordsMatch &&
    isStrongPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) return;

    setIsChanging(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Reset form
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsChanging(false);

    toast.success("Password updated successfully!");
  };

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-in fade-in duration-500">
      <div className="lg:col-span-8 space-y-6">
        {/* Change Password */}
        <Card className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <LockKeyhole className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold">Change Password</h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="space-y-2 md:col-span-2">
              <Label className="text-sm font-medium text-foreground">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-background border-border rounded-md px-3 py-2 text-sm text-foreground focus:ring-1 focus:ring-primary transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                New Password
              </Label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-background border-border rounded-md px-3 py-2 text-sm text-foreground focus:ring-1 focus:ring-primary transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="flex gap-1 h-1 mt-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={cn(
                      "flex-1 rounded-full transition-all duration-300",
                      level <= strengthScore ? strengthColor : "bg-muted",
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-background border-border rounded-md px-3 py-2 text-sm text-foreground focus:ring-1 focus:ring-primary transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-xs text-destructive mt-1">
                  Passwords do not match
                </p>
              )}
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="px-4 py-2 border border-border text-muted-foreground hover:text-foreground transition-all h-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!canSubmit || isChanging}
                className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all h-auto"
              >
                {isChanging ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </Card>

        {/* 2FA */}
        <Card className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">
                Two-Factor Authentication (2FA)
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-accent/50 text-muted-foreground uppercase tracking-wider border border-border">
              Recommended
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Add an extra layer of security to your account by requiring more
            than just a password to log in.
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg group hover:border-accent-foreground/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center border border-border">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    SMS Authentication
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Receive a code via text message.
                  </p>
                </div>
              </div>
              <button className="text-xs font-semibold text-primary hover:underline">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg group hover:border-accent-foreground/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center border border-border">
                  <QrCode className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Authenticator App
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Use apps like Google Authenticator.
                  </p>
                </div>
              </div>
              <button className="text-xs font-semibold text-primary hover:underline">
                Setup
              </button>
            </div>
          </div>
        </Card>

        {/* Active Sessions */}
        <Card className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Monitor className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">Active Sessions</h3>
            </div>
            <button className="text-xs font-semibold text-destructive hover:text-destructive/80 transition-colors">
              Log out other devices
            </button>
          </div>
          <div className="divide-y divide-border">
            <div className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Laptop className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">
                      MacBook Pro - Chrome
                    </p>
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-green-500/10 text-green-500 font-bold uppercase">
                      Current
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Manila, Philippines • 122.54.12.8
                  </p>
                </div>
              </div>
            </div>
            <div className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    iPhone 14 Pro - Juanwork App
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Cebu City, Philippines • Last active 2 hours ago
                  </p>
                </div>
              </div>
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Revoke
              </button>
            </div>
          </div>
        </Card>

        {/* Security Audit Log */}
        <Card className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <History className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold">Security Audit Log</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-foreground">
                    Password changed successfully
                  </p>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    Today, 10:45 AM
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 bg-accent-foreground/20 rounded-full mt-2 shrink-0"></div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-foreground">
                    New login from Chrome on Windows
                  </p>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    Yesterday, 08:20 PM
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  IP Address: 110.54.23.155 (Quezon City, PH)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 bg-accent-foreground/20 rounded-full mt-2 shrink-0"></div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-foreground">
                    2FA setup initiated
                  </p>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    Oct 24, 02:15 PM
                  </span>
                </div>
              </div>
            </div>
            <button className="w-full text-center py-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors border-t border-border mt-2">
              View full activity log
            </button>
          </div>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-accent/50 flex items-center justify-center rounded text-muted-foreground">
              <Shield className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-foreground">
              Security Best Practices
            </h4>
          </div>
          <ul className="space-y-5">
            {[
              "Ensure your password contains at least 12 characters, including both numbers and symbols.",
              "Avoid using common words or personal details like birthdays.",
              "Use a unique password that you don't use for other platform logins.",
              "Change your password regularly (every 3-6 months) for maximum safety.",
              "Never share your password or authentication codes with anyone.",
            ].map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-1.5 shrink-0"></div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tip}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-6 border-t border-border">
            <div className="p-4 bg-background rounded-lg border border-border flex items-start gap-3">
              <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-foreground mb-1">
                  Need help?
                </p>
                <p className="text-[11px] text-muted-foreground leading-tight">
                  Contact our security team if you notice any suspicious
                  activity on your account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
