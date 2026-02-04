"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Shield, ShieldCheck, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PasswordTabProps {
  onChangePassword: (currentPassword: string, newPassword: string) => void;
}

export function PasswordTab({ onChangePassword }: PasswordTabProps) {
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

  const strengthLabel =
    strengthScore <= 2 ? "Weak" : strengthScore <= 4 ? "Medium" : "Strong";

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

    onChangePassword(currentPassword, newPassword);

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
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12 animate-in fade-in duration-500">
      {/* Change Password Form */}
      <Card className="lg:col-span-3 bg-card rounded-xl p-8 border border-border shadow-sm">
        <div className="flex items-start gap-4 mb-8">
          <div className="p-2.5 bg-primary/10 rounded-lg">
            <LockKeyhole className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Change Password</h2>
            <p className="text-muted-foreground text-sm">
              Update your password for maximum security.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div>
            <Label className="block text-sm font-medium mb-2 text-foreground">
              Current Password
            </Label>
            <div className="relative">
              <Input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="w-full bg-accent/50 border-border rounded-lg px-4 py-6 focus:ring-primary focus:border-primary pr-12"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <Label className="block text-sm font-medium mb-2 text-foreground">
              New Password
            </Label>
            <div className="relative mb-3">
              <Input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="w-full bg-accent/50 border-border rounded-lg px-4 py-6 focus:ring-primary focus:border-primary pr-12"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
              >
                {showNewPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Strength indicator */}
            <div className="flex gap-1.5 h-1.5 mb-2">
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
            <p className="text-xs text-muted-foreground">
              Strength:{" "}
              <span
                className={cn(
                  "font-semibold",
                  strengthScore > 0
                    ? strengthColor.replace("bg-", "text-")
                    : "",
                )}
              >
                {newPassword ? strengthLabel : "None"}
              </span>
            </p>
          </div>

          {/* Confirm New Password */}
          <div>
            <Label className="block text-sm font-medium mb-2 text-foreground">
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full bg-accent/50 border-border rounded-lg px-4 py-6 focus:ring-primary focus:border-primary pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {confirmPassword && !passwordsMatch && (
              <p className="text-xs text-red-500 mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="px-6 py-6 h-auto rounded-lg font-medium bg-accent border-border text-foreground hover:bg-accent/80 transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!canSubmit || isChanging}
              className="px-6 py-6 h-auto rounded-lg font-medium bg-primary text-white flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              {isChanging ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <ShieldCheck className="h-5 w-5" />
              )}
              {isChanging ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </Card>

      {/* Password Security Tips */}
      <div className="lg:col-span-2 bg-[#93a5c0] dark:bg-slate-800 rounded-xl p-8 text-white flex flex-col shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-2 bg-white/20 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold">Password Security Tips</h2>
        </div>
        <ul className="space-y-4 flex-grow">
          {[
            "Ensure your password contains at least 12 characters, including both numbers and symbols.",
            "Avoid using your birthday as your password.",
            "Use a unique password that you don't use for other websites.",
            "Change your password regularly (every 3-6 months).",
            "Never share your password with anyone.",
            "Consider using a password manager for better security.",
          ].map((tip, index) => (
            <li
              key={index}
              className="flex gap-3 text-sm leading-relaxed text-white/90"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-primary shrink-0 mt-1.5"></span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
