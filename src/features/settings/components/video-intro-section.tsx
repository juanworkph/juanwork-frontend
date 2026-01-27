"use client";

import React from "react";
import Image from "next/image";
import { Play, Upload, Video, Lightbulb, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VideoIntroSection() {
  return (
    <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-3xl p-8 mb-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Video Introduction
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Introduce yourself to potential clients with a short video
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 relative group aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center">
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
            <div className="w-16 h-16 bg-white/80 dark:bg-slate-800/80 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform cursor-pointer">
              <Play className="h-8 w-8 text-[#f97316] fill-current ml-1" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                No video uploaded yet
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Recommended format: MP4, Max duration: 60 seconds
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 py-6 border-2 border-slate-200 dark:border-slate-700 hover:border-[#f97316] dark:hover:border-[#f97316] rounded-xl font-medium text-slate-700 dark:text-slate-300 transition-all group"
            >
              <Upload className="h-4 w-4 text-slate-400 group-hover:text-[#f97316] transition-colors" />
              Upload Video
            </Button>
            <Button className="w-full flex items-center justify-center gap-2 py-6 bg-orange-50 dark:bg-orange-500/10 border-2 border-transparent hover:border-[#f97316]/50 rounded-xl font-bold text-[#f97316] hover:bg-orange-100 dark:hover:bg-orange-500/20 transition-all">
              <Video className="h-5 w-5" />
              Record Now
            </Button>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/30">
            <div className="flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="h-4 w-4" />
              Tips for a great video
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                <CheckCircle className="h-3.5 w-3.5 mt-0.5 text-slate-400" />
                Keep it under 60 seconds to maintain engagement.
              </li>
              <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                <CheckCircle className="h-3.5 w-3.5 mt-0.5 text-slate-400" />
                Ensure you have good lighting and clear audio.
              </li>
              <li className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                <CheckCircle className="h-3.5 w-3.5 mt-0.5 text-slate-400" />
                Mention your top skills and what problems you solve.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
