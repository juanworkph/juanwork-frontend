"use client";

import React from 'react';
import {
  PortfolioHeader,
  ProjectGrid,
} from '@/features/portfolio/components';
import { mockPortfolioData } from '@/features/portfolio/schema';

export default function FreelancerPortfolioPage() {
  // Use the mock data from the portfolio feature
  const portfolio = mockPortfolioData;
  const isOwnProfile = true; // In a real app, this would be determined by comparing user IDs

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Portfolio Header with Stats */}
      <PortfolioHeader 
        stats={portfolio.stats}
        isOwnProfile={isOwnProfile}
      />

      {/* Projects Grid with Filters */}
      <ProjectGrid
        projects={portfolio.projects}
        categories={portfolio.categories}
        isOwnProfile={isOwnProfile}
      />
    </div>
  );
}
