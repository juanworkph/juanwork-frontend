"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function WorkflowSection() {
  const [activeTab, setActiveTab] = useState<"clients" | "freelancers">(
    "clients",
  );

  const clientSteps = [
    {
      title: "Post a Job",
      description: "Describe your project and set your budget in PHP or USD.",
    },
    {
      title: "Review Proposals",
      description: "Browse verified profiles and interview top candidates.",
    },
    {
      title: "Work Together",
      description: "Collaborate using our built-in project management tools.",
    },
    {
      title: "Secure Pay",
      description: "Release funds via GCash or Bank once satisfied.",
    },
  ];

  const freelancerSteps = [
    {
      title: "Create Profile",
      description:
        "Highlight your skills, experience, and past work portfolio.",
    },
    {
      title: "Find Work",
      description: "Search and bid on projects that match your expertise.",
    },
    {
      title: "Deliver Quality",
      description: "Communicate with clients and deliver outstanding results.",
    },
    {
      title: "Get Paid",
      description: "Receive payments securely directly to your local accounts.",
    },
  ];

  const currentSteps = activeTab === "clients" ? clientSteps : freelancerSteps;

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black mb-4 font-display">
              Simple Workflow
            </h2>
            <p className="text-muted-foreground text-lg font-sans">
              Whether you're hiring or looking for work, we've streamlined the
              entire process.
            </p>
          </div>

          <div className="flex bg-card p-1 rounded-xl border border-border">
            <Button
              variant={activeTab === "clients" ? "default" : "ghost"}
              onClick={() => setActiveTab("clients")}
              className={cn(
                "px-6 py-2 font-bold transition-all rounded-lg",
                activeTab !== "clients" &&
                  "text-muted-foreground hover:text-primary",
              )}
            >
              For Clients
            </Button>
            <Button
              variant={activeTab === "freelancers" ? "default" : "ghost"}
              onClick={() => setActiveTab("freelancers")}
              className={cn(
                "px-6 py-2 font-bold transition-all rounded-lg",
                activeTab !== "freelancers" &&
                  "text-muted-foreground hover:text-primary",
              )}
            >
              For Freelancers
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Decorative line visible on md and up */}
          <div className="hidden md:block absolute top-[60px] left-0 w-full h-[1px] bg-border z-0"></div>

          {currentSteps.map((step, index) => (
            <Card
              key={index}
              className="rounded-md border-border shadow-lg hover:border-primary/30 transition-all relative z-10 p-0"
            >
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-md bg-primary text-primary-foreground flex items-center justify-center mx-auto font-black text-xl shadow-lg shadow-primary/20">
                  {index + 1}
                </div>
                <h4 className="font-bold text-lg font-display">{step.title}</h4>
                <p className="text-sm text-muted-foreground font-sans">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
