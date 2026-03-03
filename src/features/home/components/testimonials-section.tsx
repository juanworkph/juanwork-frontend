import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

export function TestimonialsSection() {
  const testimonials = [
    {
      content:
        '"Finding reliable developers in the PH was always a challenge until JuanWork. The payment integration with GCash makes it so convenient for our payroll."',
      name: "Miguel S.",
      role: "Tech Founder, Manila",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150",
    },
    {
      content:
        '"As a creative freelancer, the low service fees on JuanWork mean more earnings in my pocket. The community support here is incredible for Pinoys."',
      name: "Elena L.",
      role: "Graphic Designer, Cebu",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150",
    },
    {
      content:
        "\"The verification process gives me peace of mind. We've hired three virtual assistants through the platform and they've all been exceptional.\"",
      name: "Rico T.",
      role: "E-commerce Owner, Davao",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/testimonials.png"
        alt="Testimonials Background"
        fill
        className="h-full w-full object-fill opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen pointer-events-none"
        priority
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black font-display">
            What Our <span className="text-primary">Community</span> Says
          </h2>
          <p className="text-muted-foreground text-lg">
            Join the thousands of Filipinos and SMEs thriving together on
            JuanWork.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="rounded-md border-border shadow-lg p-0"
            >
              <CardContent className="p-8 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex gap-1 text-primary">
                    <Star className="h-4 w-4 fill-primary" />
                    <Star className="h-4 w-4 fill-primary" />
                    <Star className="h-4 w-4 fill-primary" />
                    <Star className="h-4 w-4 fill-primary" />
                    <Star className="h-4 w-4 fill-primary" />
                  </div>
                  <p className="text-foreground italic font-sans leading-relaxed">
                    {testimonial.content}
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border">
                  <Image
                    className="w-12 h-12 rounded-full object-cover"
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                  />
                  <div>
                    <h4 className="font-bold text-sm">{testimonial.name}</h4>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider font-bold">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
