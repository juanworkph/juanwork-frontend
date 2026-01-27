"use client";

import React from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Clock,
  CreditCard,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SkillsManager } from "./skills-manager";

export function PersonalInfoSection() {
  return (
    <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-3xl p-8 mb-6 shadow-sm">
      <div className="mb-10">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Personal Information
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Update your personal information and professional details
        </p>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-slate-100 dark:bg-slate-700/50"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Basic Info
          </span>
          <div className="h-px flex-1 bg-slate-100 dark:bg-slate-700/50"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 px-1">
              FIRST NAME
            </Label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#f97316] transition-colors h-5 w-5" />
              <Input
                defaultValue="John"
                className="w-full pl-11 pr-4 py-6 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-[#f97316] focus:border-[#f97316] dark:text-white transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 px-1">
              LAST NAME
            </Label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#f97316] transition-colors h-5 w-5" />
              <Input
                defaultValue="Doe"
                className="w-full pl-11 pr-4 py-6 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-[#f97316] focus:border-[#f97316] dark:text-white transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 px-1">
              EMAIL ADDRESS
            </Label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#f97316] transition-colors h-5 w-5" />
              <Input
                type="email"
                defaultValue="john.doe@example.com"
                className="w-full pl-11 pr-4 py-6 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-[#f97316] focus:border-[#f97316] dark:text-white transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 px-1">
              PHONE NUMBER
            </Label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#f97316] transition-colors h-5 w-5" />
              <Input
                defaultValue="+1 (555) 123-4567"
                className="w-full pl-11 pr-4 py-6 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-[#f97316] focus:border-[#f97316] dark:text-white transition-all outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-slate-100 dark:bg-slate-700/50"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Professional Details
          </span>
          <div className="h-px flex-1 bg-slate-100 dark:bg-slate-700/50"></div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 px-1">
              PROFESSIONAL TITLE
            </Label>
            <div className="relative group">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#f97316] transition-colors h-5 w-5" />
              <Input
                defaultValue="Senior Full-Stack Developer"
                className="w-full pl-11 pr-4 py-6 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-[#f97316] focus:border-[#f97316] dark:text-white transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 px-1">
              BIO
            </Label>
            <Textarea
              className="w-full p-4 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-[#f97316] focus:border-[#f97316] dark:text-white transition-all outline-none resize-none"
              rows={4}
              defaultValue="Experienced full-stack developer with 8+ years in web and mobile development. Passionate about creating elegant solutions to complex problems."
            />
            <p className="text-right text-[10px] text-slate-400 mt-2 font-medium">
              142/500 characters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 px-1">
                LOCATION
              </Label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#f97316] transition-colors h-5 w-5" />
                <Input
                  defaultValue="San Francisco, CA"
                  className="w-full pl-11 pr-4 py-6 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-[#f97316] focus:border-[#f97316] dark:text-white transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 px-1">
                TIMEZONE
              </Label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Select defaultValue="PT">
                  <SelectTrigger className="w-full pl-11 pr-10 py-6 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-[#f97316] focus:border-[#f97316] dark:text-white appearance-none cursor-pointer">
                    <SelectValue placeholder="Select Timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PT">Pacific Time (PT)</SelectItem>
                    <SelectItem value="MT">Mountain Time (MT)</SelectItem>
                    <SelectItem value="CT">Central Time (CT)</SelectItem>
                    <SelectItem value="ET">Eastern Time (ET)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 px-1">
                HOURLY RATE (USD)
              </Label>
              <div className="relative group">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#f97316] transition-colors h-5 w-5" />
                <Input
                  defaultValue="75"
                  className="w-full pl-11 pr-12 py-6 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-[#f97316] focus:border-[#f97316] dark:text-white transition-all outline-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                  / hr
                </span>
              </div>
            </div>
          </div>

          <SkillsManager
            initialSkills={["React", "Node.js", "TypeScript", "Python", "AWS"]}
          />
        </div>
      </div>
    </section>
  );
}
