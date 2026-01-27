"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  Trash2,
  UserX,
  Clock,
  Shield,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

interface DeactivationTabProps {
  onDeactivate: (reason: string, isPermanent: boolean) => void;
  onDelete: (reason: string) => void;
}

export function DeactivationTab({
  onDeactivate,
  onDelete,
}: DeactivationTabProps) {
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deactivateReason, setDeactivateReason] = useState("");
  const [deleteReason, setDeleteReason] = useState("");
  const [isPermanent, setIsPermanent] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDeactivate = async () => {
    if (!deactivateReason.trim()) {
      toast.error("Please provide a reason for deactivation");
      return;
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onDeactivate(deactivateReason, isPermanent);
    setIsProcessing(false);
    setShowDeactivateDialog(false);
    toast.success("Account deactivated successfully");
  };

  const handleDelete = async () => {
    if (!deleteReason.trim()) {
      toast.error("Please provide a reason for account deletion");
      return;
    }

    if (!confirmDelete) {
      toast.error("Please confirm account deletion");
      return;
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onDelete(deleteReason);
    setIsProcessing(false);
    setShowDeleteDialog(false);
    toast.success("Account deletion request submitted");
  };

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      <Alert
        variant="destructive"
        className="border-red-200 dark:border-red-800"
      >
        <AlertTriangle className="h-5 w-5" />
        <AlertDescription className="text-sm">
          <strong>Warning:</strong> These actions will affect your account
          access and data. Please read carefully before proceeding.
        </AlertDescription>
      </Alert>

      {/* Deactivate and Delete Account - 2 Column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deactivate Account */}
        <Card className="border-orange-200 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
              <UserX className="h-5 w-5" />
              Deactivate Account
            </CardTitle>
            <CardDescription>
              Temporarily disable your account. You can reactivate it anytime by
              logging back in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                What happens when you deactivate:
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-orange-500" />
                  <span>
                    Your profile will be hidden from search results and clients
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-orange-500" />
                  <span>
                    Active projects and conversations will remain accessible
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-orange-500" />
                  <span>
                    You can reactivate your account anytime by logging in
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-orange-500" />
                  <span>Your data and settings will be preserved</span>
                </li>
              </ul>
            </div>

            <Button
              variant="outline"
              className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-400 dark:hover:bg-orange-900/20"
              onClick={() => setShowDeactivateDialog(true)}
            >
              <UserX className="h-4 w-4 mr-2" />
              Deactivate My Account
            </Button>
          </CardContent>
        </Card>

        {/* Delete Account */}
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <Trash2 className="h-5 w-5" />
              Delete Account Permanently
            </CardTitle>
            <CardDescription>
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                What happens when you delete your account:
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0 text-red-500" />
                  <span>All your profile data will be permanently deleted</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0 text-red-500" />
                  <span>
                    Your projects, bids, and proposals will be removed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0 text-red-500" />
                  <span>Messages and conversations will be deleted</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0 text-red-500" />
                  <span>This action is permanent and cannot be reversed</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-500" />
                  <span>
                    Outstanding payments will be processed before deletion
                  </span>
                </li>
              </ul>
            </div>

            <Button
              variant="destructive"
              className="w-full"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete My Account Permanently
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Deactivation Dialog */}
      <Dialog
        open={showDeactivateDialog}
        onOpenChange={setShowDeactivateDialog}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserX className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              Deactivate Account
            </DialogTitle>
            <DialogDescription>
              We're sorry to see you go. Please tell us why you're deactivating
              your account.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="deactivateReason"
                className="flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Reason for deactivation
              </Label>
              <Textarea
                id="deactivateReason"
                value={deactivateReason}
                onChange={(e) => setDeactivateReason(e.target.value)}
                placeholder="Please share your feedback to help us improve..."
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="permanent"
                checked={isPermanent}
                onCheckedChange={(checked) =>
                  setIsPermanent(checked as boolean)
                }
              />
              <Label
                htmlFor="permanent"
                className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
              >
                Keep my account deactivated until I manually reactivate it
              </Label>
            </div>

            <Alert className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
              <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <AlertDescription className="text-sm text-orange-800 dark:text-orange-300">
                Your profile will be hidden, but you can reactivate anytime by
                logging in.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeactivateDialog(false);
                setDeactivateReason("");
                setIsPermanent(false);
              }}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              className="border-orange-300 text-orange-600 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-400"
              onClick={handleDeactivate}
              disabled={isProcessing || !deactivateReason.trim()}
            >
              {isProcessing ? "Deactivating..." : "Deactivate Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <Trash2 className="h-5 w-5" />
              Delete Account Permanently
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. All your data will be permanently
              deleted.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="deleteReason" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Reason for deletion
              </Label>
              <Textarea
                id="deleteReason"
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                placeholder="Please tell us why you're leaving..."
                rows={4}
                className="resize-none"
              />
            </div>

            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Warning:</strong> This will permanently delete all your
                data including projects, bids, messages, and payment history.
                This action is irreversible.
              </AlertDescription>
            </Alert>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="confirmDelete"
                checked={confirmDelete}
                onCheckedChange={(checked) =>
                  setConfirmDelete(checked as boolean)
                }
              />
              <Label
                htmlFor="confirmDelete"
                className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer font-medium"
              >
                I understand this action is permanent and cannot be reversed
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteDialog(false);
                setDeleteReason("");
                setConfirmDelete(false);
              }}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isProcessing || !deleteReason.trim() || !confirmDelete}
            >
              {isProcessing
                ? "Deleting Account..."
                : "Delete Account Permanently"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
