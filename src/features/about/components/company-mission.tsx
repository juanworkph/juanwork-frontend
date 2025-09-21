import React from 'react';
import { companyHistory } from '../schema/about-data';

export function CompanyMission() {
  return (
    <section className="py-16">
      <div className="px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Story</h2>
            <p className="text-muted-foreground">
              Founded in {companyHistory.founded}, JuanWork was created to solve a simple problem: connecting talented professionals with opportunities worldwide, regardless of location.
            </p>
            <p className="text-muted-foreground">
              Since then, we&apos;ve grown into a global platform that has helped thousands of freelancers find work and businesses find the perfect talent for their projects.
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Our Mission</h3>
              <p>{companyHistory.mission}</p>
            </div>
            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Our Vision</h3>
              <p>{companyHistory.vision}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
