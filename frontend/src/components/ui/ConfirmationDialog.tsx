"use client";

import React from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { AlertCircle } from "lucide-react";

export interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "primary" | "destructive" | "gold";
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "primary",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  const handleCancel = () => {
    if (onCancel) onCancel();
    onOpenChange(false);
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex items-center gap-2">
          {variant === "destructive" && <AlertCircle className="w-5 h-5 text-rose-400" />}
          <span>{title}</span>
        </div>
      }
      description={description}
      maxWidth="sm"
    >
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-court-border/40 mt-4">
        <Button variant="ghost" size="sm" onClick={handleCancel} disabled={isLoading}>
          {cancelLabel}
        </Button>
        <Button variant={variant} size="sm" onClick={handleConfirm} isLoading={isLoading}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
