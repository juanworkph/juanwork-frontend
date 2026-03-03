import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Globe } from "lucide-react";

export function CtaBannerSection() {
  return (
    <section className="py-24 bg-background overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
          {/* Decorative background icon */}
          <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
            <Globe className="w-[300px] h-[300px] text-white stroke-1" />
          </div>

          <div className="space-y-6 md:w-2/3 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight font-display">
              Ready to hire the best Pinoy talent?
            </h2>
            <p className="text-white/90 text-xl font-medium font-sans">
              Join hundreds of businesses scaling faster with JuanWork.
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                asChild
                className="bg-white text-primary hover:bg-white/90 px-10 rounded-md font-black text-lg shadow-xl h-14"
              >
                <Link href="/auth/signup">Get Started Free</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:w-1/3 relative z-10 text-primary-foreground">
            <div className="text-center md:text-left">
              <div className="text-4xl font-black text-white font-display">
                15k+
              </div>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">
                Jobs Completed
              </p>
            </div>

            <div className="text-center md:text-left">
              <div className="text-4xl font-black text-white font-display">
                4.9/5
              </div>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">
                User Rating
              </p>
            </div>

            <div className="text-center md:text-left">
              <div className="text-4xl font-black text-white font-display">
                24/7
              </div>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">
                Local Support
              </p>
            </div>

            <div className="text-center md:text-left">
              <div className="text-4xl font-black text-white font-display">
                0%
              </div>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">
                Withdrawal Fee
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
