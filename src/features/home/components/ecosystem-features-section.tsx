import React from "react";
import { CreditCard, Building, ShieldCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function EcosystemFeaturesSection() {
  const cards = [
    {
      title: "Localized Payments",
      description:
        "Say goodbye to high transfer fees. Integrated with localized gateways to support GCash, Maya, and local bank transfers instantly.",
      icon: <CreditCard className="h-8 w-8 text-primary" />,
    },
    {
      title: "SME Focused",
      description:
        "Flexible contracts and lower service fees tailored for Small and Medium Enterprises looking to scale with quality talent.",
      icon: <Building className="h-8 w-8 text-primary" />,
    },
    {
      title: "Trust & Security",
      description:
        "Rigorous identity verification for all Filipino freelancers and safe escrow protection for every single project.",
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <section className="py-24 bg-background bg-muted/20 dark:bg-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black font-display">
            Built for the{" "}
            <span className="text-primary">Philippine Ecosystem</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to hire, manage, and pay Filipino talent in one
            unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Card
              key={index}
              className="rounded-md border-border hover:border-primary/50 transition-all shadow-lg group p-0"
            >
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 font-display">
                  {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-sans">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
