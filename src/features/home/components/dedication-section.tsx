import React from "react";
import { Heart, Quote, GraduationCap, Code, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function DedicationSection() {
  const mentors = [
    {
      name: "Grace Hermogenes",
      role: "Adviser",
      icon: <GraduationCap className="h-5 w-5" />,
      opacity: "opacity-100",
    },
    {
      name: "Marlon Hernandez",
      role: "Adviser",
      icon: <GraduationCap className="h-5 w-5" />,
      opacity: "opacity-100",
    },
    {
      name: "Lester Leal",
      role: "IT Professional",
      icon: <Code className="h-5 w-5" />,
      opacity: "opacity-100",
    },
    {
      name: "Supremido",
      role: "Partner",
      icon: <Star className="h-5 w-5" />,
      opacity: "opacity-60",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Header & Quote Block */}
        <div className="mb-12">
          <Heart className="h-12 w-12 text-primary mx-auto mb-6 fill-primary" />
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight font-display">
            Built for Every <span className="text-primary">Filipino Dream</span>
          </h2>

          <div className="max-w-4xl mx-auto space-y-8 relative">
            <Quote className="absolute -top-4 -left-8 text-primary opacity-20 h-10 w-10 fill-current" />

            <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed italic">
              "This platform is dedicated to the hardworking Filipino talent
              whose skills deserve a global stage. We believe that distance
              should never be a barrier to opportunity."
            </p>

            <p className="text-xl text-muted-foreground font-bold max-w-2xl mx-auto">
              Our journey was made possible through the unwavering support of a
              community committed to excellence and the Filipino spirit.
            </p>

            <Quote className="absolute -bottom-4 -right-8 text-primary opacity-20 h-10 w-10 rotate-180 fill-current" />
          </div>
        </div>

        {/* Mentors Section */}
        <div className="pt-16 border-t border-border mt-20">
          <h5 className="text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground mb-12 font-display">
            Mentors, Partners & Supporting Experts
          </h5>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mentors.map((mentor, index) => (
              <Card
                key={index}
                className={`rounded-md border-border group hover:border-primary/40 transition-all p-0 ${mentor.opacity}`}
              >
                <CardContent className="p-6 flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    {mentor.icon}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{mentor.name}</p>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                      {mentor.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
