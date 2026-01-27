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
    <section className="bg-card dark:bg-card-accent border border-border rounded-3xl p-8 mb-6 shadow-sm">
      <div className="mb-10">
        <h2 className="text-lg font-bold text-foreground">
          Personal Information
        </h2>
        <p className="text-sm text-muted-foreground">
          Update your personal information and professional details
        </p>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-border"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Basic Info
          </span>
          <div className="h-px flex-1 bg-border"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="block text-xs font-bold text-foreground mb-2 px-1 opacity-70">
              FIRST NAME
            </Label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors h-5 w-5" />
              <Input
                defaultValue="John"
                className="w-full pl-11 pr-4 py-6 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground transition-all outline-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="block text-xs font-bold text-foreground mb-2 px-1 opacity-70">
              LAST NAME
            </Label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors h-5 w-5" />
              <Input
                defaultValue="Doe"
                className="w-full pl-11 pr-4 py-6 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="block text-xs font-bold text-foreground mb-2 px-1 opacity-70">
              EMAIL ADDRESS
            </Label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors h-5 w-5" />
              <Input
                type="email"
                defaultValue="john.doe@example.com"
                className="w-full pl-11 pr-4 py-6 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="block text-xs font-bold text-foreground mb-2 px-1 opacity-70">
              PHONE NUMBER
            </Label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors h-5 w-5" />
              <Input
                defaultValue="+1 (555) 123-4567"
                className="w-full pl-11 pr-4 py-6 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground transition-all outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-border"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Professional Details
          </span>
          <div className="h-px flex-1 bg-border"></div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="block text-xs font-bold text-foreground mb-2 px-1 opacity-70">
              PROFESSIONAL TITLE
            </Label>
            <div className="relative group">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors h-5 w-5" />
              <Input
                defaultValue="Senior Full-Stack Developer"
                className="w-full pl-11 pr-4 py-6 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="block text-xs font-bold text-foreground mb-2 px-1 opacity-70">
              BIO
            </Label>
            <Textarea
              className="w-full p-4 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground transition-all outline-none resize-none"
              rows={4}
              defaultValue="Experienced full-stack developer with 8+ years in web and mobile development. Passionate about creating elegant solutions to complex problems."
            />
            <p className="text-right text-[10px] text-muted-foreground mt-2 font-medium">
              142/500 characters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="block text-xs font-bold text-foreground mb-2 px-1 opacity-70">
                LOCATION
              </Label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors h-5 w-5" />
                <Input
                  defaultValue="San Francisco, CA"
                  className="w-full pl-11 pr-4 py-6 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="block text-xs font-bold text-foreground mb-2 px-1 opacity-70">
                TIMEZONE
              </Label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Select defaultValue="PT">
                  <SelectTrigger className="w-full pl-11 pr-10 py-6 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground appearance-none cursor-pointer">
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
              <Label className="block text-xs font-bold text-foreground mb-2 px-1 opacity-70">
                HOURLY RATE (USD)
              </Label>
              <div className="relative group">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors h-5 w-5" />
                <Input
                  defaultValue="75"
                  className="w-full pl-11 pr-12 py-6 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground transition-all outline-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold">
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
