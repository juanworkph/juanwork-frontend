import React from "react";
import {
  Monitor,
  Palette,
  Megaphone,
  ShoppingCart,
  Headset,
  Calculator,
  PenTool,
  Video,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function ExploreCategoriesSection() {
  const categories = [
    {
      title: "IT & Software Development",
      description:
        "Web, mobile, and custom software solutions built by experts.",
      icon: <Monitor className="h-8 w-8 text-primary" />,
    },
    {
      title: "Creative & Design",
      description: "Stunning visual identities and user-centric UI/UX designs.",
      icon: <Palette className="h-8 w-8 text-primary" />,
    },
    {
      title: "Digital Marketing",
      description:
        "Performance-driven SEO, Social Media, and Content strategies.",
      icon: <Megaphone className="h-8 w-8 text-primary" />,
    },
    {
      title: "E-commerce",
      description: "End-to-end Shopify, Shopee, and Lazada store management.",
      icon: <ShoppingCart className="h-8 w-8 text-primary" />,
    },
    {
      title: "Customer & Admin Support",
      description:
        "Reliable virtual assistants, data entry, and customer care.",
      icon: <Headset className="h-8 w-8 text-primary" />,
    },
    {
      title: "Accounting & Consulting",
      description:
        "Expert financial planning, bookkeeping, and tax preparation.",
      icon: <Calculator className="h-8 w-8 text-primary" />,
    },
    {
      title: "Writing & Translation",
      description:
        "Compelling copywriting, blog posts, and language translation.",
      icon: <PenTool className="h-8 w-8 text-primary" />,
    },
    {
      title: "Video & Animation",
      description: "Engaging promotional videos, motion graphics, and editing.",
      icon: <Video className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <section className="py-24 bg-background bg-muted/20 dark:bg-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black font-display">
            Explore <span className="text-primary">Categories</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Browse top-tier talent across our most in-demand industries.
          </p>
        </div>

        {/* Updated Grid: Now 4 columns, meaning it naturally wraps into 2 rows of 4 for the 8 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="rounded-md border-border hover:border-primary/50 transition-all shadow-lg group cursor-pointer p-0 h-full"
            >
              <CardContent className="p-8 h-full flex flex-col">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                  <div className="[&>svg]:text-primary group-hover:[&>svg]:text-primary-foreground transition-colors duration-300">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 font-display">
                  {category.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
