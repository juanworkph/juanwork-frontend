"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Camera,
  IdCard,
  Fingerprint,
  BadgeCheck,
  ChevronDown,
  Lock,
  Edit3,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";
import { VerificationData, VerificationIdType } from "../schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface VerificationTabProps {
  verificationData: VerificationData;
  onSubmit: (data: {
    idType: string;
    idNumber: string;
    selfie?: File;
    idPhoto?: File;
  }) => void;
  isSubmitting?: boolean;
}

export const VerificationTab: React.FC<VerificationTabProps> = ({
  verificationData,
  onSubmit,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState({
    idType: verificationData.idType || ("" as string),
    idNumber: verificationData.idNumber || "",
  });

  const [files, setFiles] = useState<{
    selfie?: File;
    idPhoto?: File;
  }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, idType: value }));
  };

  const handleFileChange = (
    type: "selfie" | "idPhoto",
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      ...files,
    });
  };

  const steps = [
    { id: 1, label: "Documents", icon: IdCard },
    { id: 2, label: "Processing", icon: Clock },
    { id: 3, label: "Verified", icon: BadgeCheck },
  ];

  const currentStep = verificationData.currentStep;

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-6 animate-in fade-in duration-500">
      {/* Navigation Stepper */}
      <nav className="flex items-center justify-between mx-auto relative px-4 max-w-sm">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const Icon = step.icon;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-2 z-10">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shadow-sm",
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/25 border-4 border-background"
                      : isCompleted
                        ? "bg-primary/20 text-primary border-2 border-primary/20"
                        : "bg-card border-2 border-border text-muted-foreground",
                  )}
                >
                  {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : step.id}
                </div>
                <span
                  className={cn(
                    "text-[9px] font-bold tracking-widest uppercase transition-colors duration-300",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-[2px] mx-2 -mt-6 transition-colors duration-500",
                    isCompleted ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </nav>

      <div className="space-y-10">
        {/* Header Section */}
        <header className="text-center space-y-4">
          <div className="relative inline-block group">
            <div className="relative bg-primary p-8 rounded-[2.5rem] transition-all duration-500 group-hover:scale-105 shadow-xl shadow-primary/20">
              <ShieldAlert className="text-white h-18 w-18 stroke-[2]" />
              {/* Shield shape using clip-path or just a stylized container */}
              <div className="absolute inset-0 border-4 border-white/20 rounded-[2.5rem]" />
            </div>

            {/* Logo Inset */}
            <div className="absolute -bottom-2 -right-2 bg-white border-4 border-background p-1 rounded-full shadow-lg transform transition-transform group-hover:rotate-12 w-12 h-12 flex items-center justify-center overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="JuanWork Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Verify your Identity
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed text-sm font-light">
              Secure your account by providing a valid government-issued ID.
              Ensure photos are clear and uncropped for faster processing.
            </p>
          </div>
        </header>

        {/* Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase ml-1 flex items-center gap-2">
              <IdCard className="h-3 w-3" />
              ID Type
            </label>
            <Select value={formData.idType} onValueChange={handleSelectChange}>
              <SelectTrigger className="!h-12 w-full rounded-xl border-2 bg-card hover:bg-accent/50 transition-all border-border focus:ring-primary/20 focus:border-primary px-4">
                <SelectValue placeholder="Choose ID Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="drivers_license">
                  Driver's License
                </SelectItem>
                <SelectItem value="national_id">National ID</SelectItem>
                <SelectItem value="postal_id">Postal ID</SelectItem>
                <SelectItem value="philhealth">PhilHealth</SelectItem>
                <SelectItem value="sss">SSS</SelectItem>
                <SelectItem value="voters_id">Voter's ID</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase ml-1 flex items-center gap-2">
              <Fingerprint className="h-3 w-3" />
              ID Number
            </label>
            <Input
              name="idNumber"
              value={formData.idNumber}
              onChange={handleInputChange}
              className="h-12 pl-4 rounded-xl border-2 bg-card hover:bg-accent/50 transition-all border-border focus:ring-primary/20 focus:border-primary placeholder:text-muted-foreground/50"
              placeholder="000-000-000"
            />
          </div>
        </div>

        {/* Upload Section */}
        <div className="space-y-4">
          <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase ml-1">
            Attach Your Files
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Selfie Photo */}
            <div className="group relative">
              <input
                type="file"
                id="selfie-upload"
                className="hidden"
                onChange={(e) => handleFileChange("selfie", e)}
                accept="image/*"
              />
              <label
                htmlFor="selfie-upload"
                className={cn(
                  "flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300",
                  files.selfie
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card/50 hover:border-primary hover:bg-accent/50 group-hover:shadow-md",
                )}
              >
                <div
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300",
                    files.selfie
                      ? "bg-primary text-white"
                      : "bg-white text-muted-foreground shadow-sm group-hover:bg-primary/10 group-hover:text-primary",
                  )}
                >
                  <Camera className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-1">
                  Selfie Photo
                </h3>
                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-bold mb-3">
                  {files.selfie ? files.selfie.name : "NO FILE SELECTED"}
                </p>
                <span className="text-sm font-bold text-[#FF4D00] hover:underline">
                  Browse Files
                </span>
              </label>
            </div>

            {/* ID Photo */}
            <div className="group relative">
              <input
                type="file"
                id="id-upload"
                className="hidden"
                onChange={(e) => handleFileChange("idPhoto", e)}
                accept="image/*"
              />
              <label
                htmlFor="id-upload"
                className={cn(
                  "flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300",
                  files.idPhoto
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card/50 hover:border-primary hover:bg-accent/50 group-hover:shadow-md",
                )}
              >
                <div
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300",
                    files.idPhoto
                      ? "bg-primary text-white"
                      : "bg-white text-muted-foreground shadow-sm group-hover:bg-primary/10 group-hover:text-primary",
                  )}
                >
                  <IdCard className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-foreground text-base mb-1">
                  Valid ID Photo
                </h3>
                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-bold mb-3">
                  {files.idPhoto ? files.idPhoto.name : "NO FILE SELECTED"}
                </p>
                <span className="text-sm font-bold text-[#FF4D00] hover:underline">
                  Browse Files
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleSubmit}
          // disabled={
          //   isSubmitting ||
          //   !formData.idType ||
          //   !formData.idNumber ||
          //   !files.selfie ||
          //   !files.idPhoto
          // }
          className="w-full h-14 text-sm font-bold tracking-[0.15em] uppercase rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-primary/20"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </div>
          ) : (
            "Verify Account"
          )}
        </Button>

        {/* Note / Footer */}
        <footer className="flex items-start gap-4 p-6 bg-muted/20 border border-border/50 rounded-2xl">
          <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
            <Lock className="h-4 w-4 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              <span className="font-bold text-foreground">Privacy Note:</span>{" "}
              Your personal data is encrypted and securely stored. We utilize
              enterprise-grade security protocols to ensure your information
              remains confidential. We never share your ID information with
              third parties.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};
