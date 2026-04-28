import React from "react";
import {
  XCircle,
  CheckCircle,
  Zap,
  FileX,
  Users,
  CreditCard,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function DigitalEvolutionSection() {
  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black leading-tight font-display">
              The Digital Evolution of{" "}
              <span className="text-primary">Pinoy Work</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed font-sans">
              Say goodbye to paper-heavy onboarding. JuanWork PH streamlines the
              journey for the Filipino worker, replacing manual processes with
              automated, efficient solutions designed for the local market.
            </p>

            <div className="space-y-4">
              {/* Conventional Card */}
              <Card className="rounded-md bg-red-500/5 border-red-500/20 p-0">
                <CardContent className="p-6 flex gap-4">
                  <XCircle className="h-6 w-6 text-red-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-500 mb-1 font-display">
                      Conventional Barriers
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Manual verification, slow processing, and lack of
                      localized payment support.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* JuanWork Edge Card */}
              <Card className="rounded-md bg-green-500/5 border-green-500/20 p-0">
                <CardContent className="p-6 flex gap-4">
                  <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-green-500 mb-1 font-display">
                      JuanWork Digital Solutions
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Instant payouts, automated profile verification, and
                      transparent real-time activity logs.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="rounded-md border-border shadow-lg p-0">
              <CardContent className="p-8 text-center flex flex-col items-center justify-center space-y-3">
                <Zap className="text-primary h-10 w-10" />
                <div className="text-3xl font-black font-display text-foreground">
                  85%
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Faster Onboarding
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-md border-border shadow-lg p-0">
              <CardContent className="p-8 text-center flex flex-col items-center justify-center space-y-3">
                <FileX className="text-primary h-10 w-10" />
                <div className="text-3xl font-black font-display text-foreground">
                  0
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Paperwork Required
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-md border-border shadow-lg p-0">
              <CardContent className="p-8 text-center flex flex-col items-center justify-center space-y-3">
                <Users className="text-primary h-10 w-10" />
                <div className="text-3xl font-black font-display text-foreground">
                  Local
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  SME Focused
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-md border-border shadow-lg p-0">
              <CardContent className="p-8 text-center flex flex-col items-center justify-center space-y-3">
                <CreditCard className="text-primary h-10 w-10" />
                <div className="text-3xl font-black font-display text-foreground">
                  PHP
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Direct Payouts
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
