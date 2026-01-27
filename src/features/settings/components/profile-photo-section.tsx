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
    <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-3xl p-8 mb-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Profile Photo
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Update your personal information and professional details
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-[#f97316] to-orange-200 dark:to-orange-900">
            <div className="w-full h-full rounded-full border-4 border-white dark:border-slate-800 overflow-hidden bg-slate-100">
              <Avatar className="w-full h-full">
                <AvatarImage
                  src={avatarUrl}
                  alt={name}
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl font-bold">
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
            <Button className="bg-[#f97316] hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2">
              <CloudUpload className="h-4 w-4" />
              Change Photo
            </Button>
            <Button
              variant="secondary"
              className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-xl font-medium transition-colors"
            >
              Delete
            </Button>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            JPG, GIF or PNG. Max size of 2MB
          </p>
        </div>
      </div>
    </section>
  );
}
