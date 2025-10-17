"use client";

import React from 'react';
import {
  ProfileHeader,
  AboutMeSection,
  VideoIntroduction,
  SkillsSection,
  LanguagesSection,
  SocialLinks,
} from '@/features/profile/components';
import {
  mockFreelancerProfile
} from '@/features/profile/schema';

export default function FreelancerProfilePage() {
  // Use the mock data from the profile feature
  const profile = mockFreelancerProfile;
  const isOwnProfile = true; // In a real app, this would be determined by comparing user IDs

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Profile Header */}
      <ProfileHeader 
        personalInfo={profile.personalInfo}
        stats={profile.stats}
        isVerified={profile.isVerified}
        profileCompleteness={profile.profileCompleteness}
        joinDate={profile.joinDate}
        isOwnProfile={isOwnProfile}
      />

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

          {/* Video Introduction */}
          <VideoIntroduction 
            videoIntroduction={profile.videoIntroduction}
            isOwnProfile={isOwnProfile}
          />

          {/* Skills Section */}
          <SkillsSection 
            skills={profile.skills}
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
