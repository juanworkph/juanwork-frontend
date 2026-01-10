/**
 * Confirm Dialog Component
 * 
 * Reusable confirmation dialog for service-related actions.
 * Uses Shadcn AlertDialog component for consistent UI.
 * 
 * Features:
 * - Customizable title and description
 * - Loading state support
 * - Destructive variant for dangerous actions
 * - Cancel and confirm callbacks
 * - Focus management and keyboard navigation
 * - Accessibility attributes
 * 
 * Requirements: 6.3, 11.3
 */

"use client";

import React, { useEffect, useRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  variant?: "default" | "destructive";
}

/**
 * ConfirmDialog Component
 * 
 * A reusable confirmation dialog that wraps Shadcn's AlertDialog
 * with service-specific styling and behavior.
 * 
 * @param open - Controls dialog visibility
 * @param onOpenChange - Callback when dialog state changes
 * @param title - Dialog title
 * @param description - Dialog description/message
 * @param confirmText - Text for confirm button (default: "Confirm")
 * @param cancelText - Text for cancel button (default: "Cancel")
 * @param onConfirm - Callback when confirm button is clicked
 * @param onCancel - Optional callback when cancel button is clicked
 * @param isLoading - Shows loading state on confirm button
 * @param variant - Visual variant: "default" or "destructive"
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false,
  variant = "default",
}) => {
  // Ref for focus management - Requirement 11.3
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management: Focus cancel button when dialog opens - Requirement 11.3
  useEffect(() => {
    if (open && cancelButtonRef.current) {
      // Small delay to ensure dialog is fully rendered
      const timeoutId = setTimeout(() => {
        cancelButtonRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [open]);

  /**
   * Handle cancel action
   * Calls optional onCancel callback and closes dialog
   */
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  };

  /**
   * Handle confirm action
   * Calls onConfirm callback
   * Note: Dialog closing is handled by parent component
   */
  const handleConfirm = () => {
    onConfirm();
  };

  /**
   * Handle keyboard navigation - Requirement 11.3
   * Escape key closes dialog
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && !isLoading) {
      e.preventDefault();
      handleCancel();
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent onKeyDown={handleKeyDown} aria-describedby="dialog-description">
        <AlertDialogHeader>
          <AlertDialogTitle id="dialog-title">{title}</AlertDialogTitle>
          <AlertDialogDescription id="dialog-description">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            ref={cancelButtonRef}
            onClick={handleCancel} 
            disabled={isLoading}
            aria-label={`${cancelText} and close dialog`}
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            aria-label={isLoading ? "Processing" : confirmText}
            aria-busy={isLoading}
            className={
              variant === "destructive"
                ? "bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                : ""
            }
          >
            {isLoading ? "Processing..." : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
