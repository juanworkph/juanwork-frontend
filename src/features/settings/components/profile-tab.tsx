"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Camera, Save, X } from "lucide-react";
import { UserProfile } from "../schema";
import { useAuth } from "@/contexts/auth-context";

interface ProfileTabProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

export function ProfileTab({
  profile: initialProfile,
  onSave,
}: ProfileTabProps) {
  const { currentRole } = useAuth();
  const isClient = currentRole === "client";
  const [profile, setProfile] = useState(initialProfile);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSave(profile);
    setIsSaving(false);
  };

  const handleSkillAdd = (skill: string) => {
    if (skill && !profile.skills.includes(skill)) {
      setProfile({ ...profile, skills: [...profile.skills, skill] });
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skillToRemove),
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal information and professional details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={profile.avatar}
                alt={`${profile.firstName} ${profile.lastName}`}
              />
              <AvatarFallback className="text-2xl">
                {profile.firstName[0]}
                {profile.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" className="gap-2">
                <Camera className="h-4 w-4" />
                Change Photo
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                JPG, GIF or PNG. Max size of 2MB
              </p>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
              />
            </div>
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={profile.phone || ""}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
            </div>
          </div>

          {/* Professional Title / Business Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              {isClient ? "Business Title" : "Professional Title"}
            </Label>
            <Input
              id="title"
              value={profile.title}
              onChange={(e) =>
                setProfile({ ...profile, title: e.target.value })
              }
              placeholder={
                isClient
                  ? "e.g., CEO, Founder, Project Manager"
                  : "e.g., Senior Full-Stack Developer"
              }
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio || ""}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder={
                isClient
                  ? "Tell freelancers about your company and projects..."
                  : "Tell clients about yourself..."
              }
              rows={4}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {profile.bio?.length || 0}/500 characters
            </p>
          </div>

          {/* Location and Timezone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) =>
                  setProfile({ ...profile, location: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={profile.timezone}
                onValueChange={(value) =>
                  setProfile({ ...profile, timezone: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Los_Angeles">
                    Pacific Time (PT)
                  </SelectItem>
                  <SelectItem value="America/Denver">
                    Mountain Time (MT)
                  </SelectItem>
                  <SelectItem value="America/Chicago">
                    Central Time (CT)
                  </SelectItem>
                  <SelectItem value="America/New_York">
                    Eastern Time (ET)
                  </SelectItem>
                  <SelectItem value="Europe/London">London (GMT)</SelectItem>
                  <SelectItem value="Europe/Paris">
                    Central Europe (CET)
                  </SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Hourly Rate - Freelancer Only */}
          {!isClient && (
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={profile.hourlyRate}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      hourlyRate: parseFloat(e.target.value),
                    })
                  }
                  className="pl-8"
                  min={0}
                  step={5}
                />
              </div>
            </div>
          )}

          {/* Skills - Freelancer Only */}
          {!isClient && (
            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm"
                  >
                    {skill}
                    <button
                      onClick={() => handleSkillRemove(skill)}
                      className="hover:text-blue-900 dark:hover:text-blue-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <Input
                placeholder="Add a skill and press Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSkillAdd(e.currentTarget.value);
                    e.currentTarget.value = "";
                  }
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
