"use client";

import React from "react";
import Image from "next/image";
import { Play, Upload, Video, Lightbulb, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VideoIntroSection() {
  return (
    <section className="bg-card dark:bg-card-accent border border-border rounded-3xl p-8 mb-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground">
          Video Introduction
        </h2>
        <p className="text-sm text-muted-foreground">
          Introduce yourself to potential clients with a short video
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 relative group aspect-video rounded-2xl overflow-hidden bg-muted border-2 border-dashed border-border flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop"
              alt="Workplace background"
              fill
              className="object-cover blur-sm opacity-20 dark:opacity-10"
              priority
            />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-4 text-center p-6">
            <div className="w-16 h-16 bg-card/80 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform cursor-pointer">
              <Play className="h-8 w-8 text-primary fill-current ml-1" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                No video uploaded yet
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Recommended format: MP4, Max duration: 60 seconds
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 py-6 border-2 border-border hover:border-primary rounded-xl font-medium text-foreground transition-all group"
            >
              <Upload className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              Upload Video
            </Button>
            <Button className="w-full flex items-center justify-center gap-2 py-6 bg-primary/10 border-2 border-transparent hover:border-primary/50 rounded-xl font-bold text-primary hover:bg-primary/20 transition-all shadow-none">
              <Video className="h-5 w-5" />
              Record Now
            </Button>
          </div>
          <div className="bg-muted/50 p-5 rounded-2xl border border-border/50">
            <div className="flex items-center gap-2 mb-3 text-primary font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="h-4 w-4" />
              Tips for a great video
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-xs text-muted-foreground">
                <CheckCircle className="h-3.5 w-3.5 mt-0.5 text-muted-foreground/50" />
                Keep it under 60 seconds to maintain engagement.
              </li>
              <li className="flex items-start gap-2.5 text-xs text-muted-foreground">
                <CheckCircle className="h-3.5 w-3.5 mt-0.5 text-muted-foreground/50" />
                Ensure you have good lighting and clear audio.
              </li>
              <li className="flex items-start gap-2.5 text-xs text-muted-foreground">
                <CheckCircle className="h-3.5 w-3.5 mt-0.5 text-muted-foreground/50" />
                Mention your top skills and what problems you solve.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
