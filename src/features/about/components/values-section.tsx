import React from 'react';
import { companyValues } from '../schema/about-data';
import { Star, Eye, Lightbulb, Users } from 'lucide-react';

export function ValuesSection() {
  // Map of icon names to their components
  const iconMap: Record<string, React.ReactNode> = {
    star: <Star className="h-10 w-10 text-primary" />,
    eye: <Eye className="h-10 w-10 text-primary" />,
    lightbulb: <Lightbulb className="h-10 w-10 text-primary" />,
    users: <Users className="h-10 w-10 text-primary" />,
  };

  return (
    <section className="py-16">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Values</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg dark:text-gray-400">
              These core principles guide everything we do at JuanWork.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2">
          {companyValues.map((value, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                {value.icon && iconMap[value.icon]}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
