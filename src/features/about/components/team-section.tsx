import React from 'react';
import Image from 'next/image';
import { teamMembers } from '../schema/about-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

export function TeamSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Team</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg dark:text-gray-400">
              Meet the people behind JuanWork who are passionate about connecting talent with opportunity.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-square relative bg-muted flex items-center justify-center">
                {member.imageUrl ? (
                  <Image 
                    src={member.imageUrl} 
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <User className="h-24 w-24 text-muted-foreground/30" />
                )}
              </div>
              <CardHeader>
                <CardTitle>{member.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
