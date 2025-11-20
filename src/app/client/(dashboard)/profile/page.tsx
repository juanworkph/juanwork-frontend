"use client";

import React from "react";
import {
  AboutMeSection,
  LanguagesSection,
  SocialLinks,
  CompanyDetailsSection,
  ProjectPreferencesSection,
} from "@/features/profile/components";
import { mockClientProfile } from "@/features/profile/schema";

export default function ClientProfilePage() {
  // Use the mock data from the profile feature
  const profile = mockClientProfile;
  const isOwnProfile = true; // In a real app, this would be determined by comparing user IDs

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column - Primary Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Me Section */}
          <AboutMeSection
            personalInfo={profile.personalInfo}
            joinDate={profile.joinDate}
            isOwnProfile={isOwnProfile}
          />

          {/* Company Details Section */}
          {profile.companyDetails && (
            <CompanyDetailsSection
              companyDetails={profile.companyDetails}
              isOwnProfile={isOwnProfile}
            />
          )}

          {/* Project Preferences Section */}
          <ProjectPreferencesSection
            preferences={profile.projectPreferences}
            isOwnProfile={isOwnProfile}
          />
        </div>

        {/* Right Column - Secondary Content */}
        <div className="space-y-6">
          {/* Languages */}
          <LanguagesSection
            languages={profile.languages}
            isOwnProfile={isOwnProfile}
          />

          {/* Social Links */}
          <SocialLinks
            socialLinks={profile.socialLinks}
            isOwnProfile={isOwnProfile}
          />
        </div>
      </div>
    </div>
  );
}
