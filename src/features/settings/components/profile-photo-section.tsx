"use client";

import React from "react";
import { Camera, CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfilePhotoSectionProps {
  avatarUrl?: string;
  name?: string;
}

export function ProfilePhotoSection({
  avatarUrl,
  name,
}: ProfilePhotoSectionProps) {
  return (
    <section className="bg-card dark:bg-card-accent border border-border rounded-3xl p-8 mb-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground">Profile Photo</h2>
        <p className="text-sm text-muted-foreground">
          Update your personal information and professional details
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary to-orange-200 dark:to-orange-950">
            <div className="w-full h-full rounded-full border-4 border-card dark:border-card-accent overflow-hidden bg-muted">
              <Avatar className="w-full h-full">
                <AvatarImage
                  src={avatarUrl}
                  alt={name}
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl font-bold bg-muted text-muted-foreground">
                  {name
                    ? name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "JD"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="absolute inset-1 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Camera className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap gap-3 mb-3 justify-center md:justify-start">
            <Button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2">
              <CloudUpload className="h-4 w-4" />
              Change Photo
            </Button>
            <Button
              variant="secondary"
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-5 py-2.5 rounded-xl font-medium transition-colors border border-border"
            >
              Delete
            </Button>
          </div>
          <p className="text-xs text-muted-foreground/60">
            JPG, GIF or PNG. Max size of 2MB
          </p>
        </div>
      </div>
    </section>
  );
}
