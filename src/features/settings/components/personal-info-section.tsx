"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Clock,
  CreditCard,
  Calendar,
  Sparkles,
  Globe,
  TrendingUp,
  Layers,
  Activity,
  Code2,
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
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

const LANGUAGES_OPTIONS: Option[] = [
  { label: "English", value: "english" },
  { label: "Spanish", value: "spanish" },
  { label: "French", value: "french" },
  { label: "German", value: "german" },
  { label: "Chinese", value: "chinese" },
  { label: "Japanese", value: "japanese" },
  { label: "Tagalog", value: "tagalog" },
];

const SKILLS_OPTIONS: Option[] = [
  { label: "React", value: "react" },
  { label: "Next.js", value: "nextjs" },
  { label: "TypeScript", value: "typescript" },
  { label: "Node.js", value: "nodejs" },
  { label: "Tailwind CSS", value: "tailwindcss" },
  { label: "PostgreSQL", value: "postgresql" },
  { label: "Python", value: "python" },
];

export function PersonalInfoSection() {
  const [languages, setLanguages] = useState<Option[]>([
    { label: "English", value: "english" },
    { label: "Spanish", value: "spanish" },
  ]);

  const [skills, setSkills] = useState<Option[]>([
    { label: "React", value: "react" },
    { label: "Node.js", value: "nodejs" },
    { label: "TypeScript", value: "typescript" },
  ]);

  return (
    <section className="bg-card dark:bg-card-accent border border-border rounded-3xl p-8 mb-6 shadow-sm ">
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
                className="w-full pl-11 pr-4 h-11 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground transition-all outline-none"
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
                className="w-full pl-11 pr-4 h-11 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground transition-all outline-none"
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
                className="w-full pl-11 pr-4 h-11 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground transition-all outline-none"
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
                className="w-full pl-11 pr-4 h-11 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="block text-xs font-bold text-foreground mb-2 px-1 opacity-70">
              BIRTHDAY
            </Label>
            <div className="relative group">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors h-5 w-5" />
              <Input
                type="date"
                defaultValue="1990-05-15"
                className="w-full pl-11 pr-4 h-11 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground transition-all outline-none block"
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label className="block text-xs font-bold text-foreground mb-2 px-1 opacity-70">
              LANGUAGES
            </Label>
            <div className="relative group multiple-selector-icon">
              <Globe className="absolute left-3 top-2 z-10 text-muted-foreground group-focus-within:text-primary transition-colors h-5 w-5" />
              <MultipleSelector
                defaultOptions={LANGUAGES_OPTIONS}
                value={languages}
                onChange={setLanguages}
                placeholder="Select languages..."
                creatable
                className="w-full pl-10 py-1.5 bg-muted/30 border-border rounded-xl focus-within:ring-primary focus-within:border-primary text-foreground transition-all"
                badgeClassName="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="block text-xs font-bold text-foreground mb-2 px-1 opacity-70">
                PROFESSIONAL TITLE
              </Label>
              <div className="relative group">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors h-5 w-5" />
                <Input
                  defaultValue="Senior Full-Stack Developer"
                  className="w-full pl-11 pr-4 h-11 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="block text-xs font-bold text-foreground mb-2 px-1 opacity-70">
                TAGLINE
              </Label>
              <div className="relative group">
                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors h-5 w-5" />
                <Input
                  defaultValue="Turning complex problems into elegant code"
                  placeholder="A short, catchy phrase about you"
                  className="w-full pl-11 pr-4 h-11 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground transition-all outline-none"
                />
              </div>
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

          <div className="space-y-2">
            <Label className="block text-xs font-bold text-foreground mb-2 px-1 opacity-70">
              LOCATION
            </Label>
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors h-5 w-5" />
              <Input
                defaultValue="San Francisco, CA"
                className="w-full pl-11 pr-4 h-11 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground transition-all outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="block text-xs font-bold text-foreground mb-2 px-1 opacity-70">
                AVAILABILITY
              </Label>
              <div className="relative">
                <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Select defaultValue="full-time">
                  <SelectTrigger className="w-full pl-11 !h-11 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground appearance-none cursor-pointer">
                    <SelectValue placeholder="Select Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="block text-xs font-bold text-foreground mb-2 px-1 opacity-70">
                HOURLY RATE (USD)
              </Label>
              <div className="relative group">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors h-5 w-5" />
                <Input
                  defaultValue="75"
                  className="w-full pl-11 pr-12 h-11 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground transition-all outline-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold">
                  / hr
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="block text-xs font-bold text-foreground mb-2 px-1 opacity-70">
                TALENT CATEGORY
              </Label>
              <div className="relative">
                <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Select defaultValue="development">
                  <SelectTrigger className="w-full pl-11 !h-11 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground appearance-none cursor-pointer">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">
                      Development & IT
                    </SelectItem>
                    <SelectItem value="design">Design & Creative</SelectItem>
                    <SelectItem value="marketing">Sales & Marketing</SelectItem>
                    <SelectItem value="writing">
                      Writing & Translation
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="block text-xs font-bold text-foreground mb-2 px-1 opacity-70">
                EXPERIENCE LEVEL
              </Label>
              <div className="relative">
                <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Select defaultValue="senior">
                  <SelectTrigger className="w-full pl-11 !h-11 bg-muted/30 border-border rounded-xl focus:ring-primary focus:border-primary text-foreground appearance-none cursor-pointer">
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="block text-xs font-bold text-foreground mb-2 px-1 opacity-70">
              SKILLS
            </Label>
            <div className="relative group multiple-selector-icon">
              <Code2 className="absolute left-3 top-2 z-10 text-muted-foreground group-focus-within:text-primary transition-colors h-5 w-5" />
              <MultipleSelector
                defaultOptions={SKILLS_OPTIONS}
                value={skills}
                onChange={setSkills}
                placeholder="Select or add skills..."
                creatable
                className="w-full pl-10 py-1.5 bg-muted/30 border-border rounded-xl focus-within:ring-primary focus-within:border-primary text-foreground transition-all"
                badgeClassName="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
