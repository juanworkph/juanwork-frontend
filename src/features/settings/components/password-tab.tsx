"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Lock, Shield, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

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
  const isStrongPassword =
    hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
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
    await new Promise((resolve) => setTimeout(resolve, 1500));

    onChangePassword(currentPassword, newPassword);

    // Reset form
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsChanging(false);

    toast.success("Password changed successfully!");
  };

  const PasswordRequirement = ({
    met,
    text,
  }: {
    met: boolean;
    text: string;
  }) => (
    <div className="flex items-center gap-2 text-sm">
      {met ? (
        <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
      ) : (
        <XCircle className="h-4 w-4 text-gray-300 dark:text-gray-600" />
      )}
      <span
        className={
          met
            ? "text-green-600 dark:text-green-400"
            : "text-gray-500 dark:text-gray-400"
        }
      >
        {text}
      </span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Password Form and Security Tips - 2 Column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Change Password Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Change Password
            </CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Password */}
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter your current password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                {newPassword && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password Requirements:
                    </p>
                    <PasswordRequirement
                      met={hasMinLength}
                      text="At least 8 characters"
                    />
                    <PasswordRequirement
                      met={hasUpperCase}
                      text="One uppercase letter"
                    />
                    <PasswordRequirement
                      met={hasLowerCase}
                      text="One lowercase letter"
                    />
                    <PasswordRequirement met={hasNumber} text="One number" />
                    <PasswordRequirement
                      met={hasSpecialChar}
                      text="One special character"
                    />
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {confirmPassword && !passwordsMatch && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Passwords do not match
                  </p>
                )}
                {confirmPassword && passwordsMatch && (
                  <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    Passwords match
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!canSubmit || isChanging}
                  className="gap-2"
                >
                  <Shield className="h-4 w-4" />
                  {isChanging ? "Changing Password..." : "Change Password"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Security Tips */}
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Password Security Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">
                  •
                </span>
                <span>
                  Use a unique password that you don't use for other websites
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">
                  •
                </span>
                <span>Change your password regularly (every 3-6 months)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">
                  •
                </span>
                <span>Never share your password with anyone</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">
                  •
                </span>
                <span>
                  Consider using a password manager for better security
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
