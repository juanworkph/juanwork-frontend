"use client";

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectTitle: string;
  isDeleting?: boolean;
}

/**
 * ConfirmDeleteDialog Component
 * 
 * A reusable confirmation dialog for deleting portfolio projects.
 * Displays the project title and warns that deletion is permanent.
 * 
 * @param isOpen - Controls dialog visibility
 * @param onClose - Callback when dialog is closed/cancelled
 * @param onConfirm - Callback when deletion is confirmed
 * @param projectTitle - The title of the project to be deleted
 * @param isDeleting - Optional loading state during deletion
 * 
 * Requirements: 7.1, 7.2
 */
export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  projectTitle,
  isDeleting = false,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Portfolio Project</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>"{projectTitle}"</strong>? 
            This action cannot be undone and will permanently remove this project from your portfolio.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={onClose} 
            disabled={isDeleting}
            aria-label="Cancel deletion"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            aria-label={`Delete ${projectTitle}`}
            aria-busy={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
