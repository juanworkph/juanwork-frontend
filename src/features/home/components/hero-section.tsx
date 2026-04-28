import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code, PenTool, Headset } from "lucide-react";

export function HeroSection() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes ripple {
            0% { transform: scale(0.8); opacity: 0.8; }
            100% { transform: scale(2.5); opacity: 0; }
        }
        .ripple-effect { animation: ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite; }
        .ripple-delay-1 { animation-delay: 0.5s; }
        .ripple-delay-2 { animation-delay: 1s; }
      `,
        }}
      />
      <section className="py-20 relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_2px_2px,rgba(249,115,22,0.05)_1px,transparent_0)] bg-[length:40px_40px]">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />

        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-l from-primary/30 to-transparent blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex items-center gap-12">
            {/* Left Content */}
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Proudly Filipino Freelance Hub
              </div>

              <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight font-display">
                Connecting <span className="text-primary">Filipino Talent</span>{" "}
                with Global Opportunities.
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed font-sans">
                The premiere marketplace for Philippine-based talent and local
                SMEs. Secure payments, verified professionals, and localized
                support for your business growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="group shadow-xl shadow-primary/20 rounded-md h-14 px-8 text-lg font-bold"
                >
                  <Link href="/client/post-job">
                    Start Hiring
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="rounded-md h-14 px-8 text-lg font-bold hover:bg-foreground hover:text-background"
                >
                  <Link href="/freelancer/find-work">Find Freelance Jobs</Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  <Image
                    className="w-10 h-10 rounded-full border-2 border-background object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100"
                    alt="User avatar"
                    width={40}
                    height={40}
                  />
                  <Image
                    className="w-10 h-10 rounded-full border-2 border-background object-cover"
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100"
                    alt="User avatar"
                    width={40}
                    height={40}
                  />
                  <Image
                    className="w-10 h-10 rounded-full border-2 border-background object-cover"
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&h=100"
                    alt="User avatar"
                    width={40}
                    height={40}
                  />
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground uppercase z-10">
                    +5k
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-semibold italic">
                  Trusted by 5,000+ Pinoy Freelancers
                </p>
              </div>
            </div>

            {/* Right Map & Trending Skills Data */}
            <div className="lg:w-1/2 mt-16 lg:mt-0 flex flex-col gap-8">
              {/* Map Container */}
              <div className="relative min-h-[450px] lg:min-h-[550px] flex items-center justify-center overflow-hidden pointer-events-none">
                <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
                  <Image
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen opacity-80 dark:opacity-60 dark:invert select-none pointer-events-none"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2QwfESGxWkEf_oSiS3fr-nz5f29fvs978SOtdKMIIM6corWdeKtME1e8oLEVV_a-QaGtkxHcrmxmU9jw25TXkageafgBue4bDw9sp0F3q46RCUIoYqspeJNkUzyX-iL-j68QhHFkSrUsPQnYfj6_e2-EpnYzXqxMATNlKx39V8j4vdEMtB0TAlbxfO8brPPCh6ocvJjeLiYcy7JBqtmao4klOdWUkAOMKJm7pVKHfeuNgemCxcsweHad2fmfEuSB3NvITzTKHIwhV"
                    alt="Philippines Map"
                    width={500}
                    height={600}
                    priority
                  />

                  {/* Pings */}
                  <div className="absolute top-[28%] left-[38%] group/pin">
                    <div className="relative flex items-center justify-center cursor-pointer">
                      <span className="ripple-effect absolute inline-flex h-16 w-16 rounded-full bg-primary/30"></span>
                      <span className="ripple-effect ripple-delay-1 absolute inline-flex h-12 w-12 rounded-full bg-primary/20"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary border border-white shadow-[0_0_10px_rgba(249,115,22,0.8)] dark:border-slate-900"></span>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap border border-primary/30 opacity-0 group-hover/pin:opacity-100 transition-opacity">
                        Metro Manila
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-[58%] left-[54%] group/pin">
                    <div className="relative flex items-center justify-center cursor-pointer">
                      <span className="ripple-effect absolute inline-flex h-14 w-14 rounded-full bg-primary/30"></span>
                      <span className="ripple-effect ripple-delay-2 absolute inline-flex h-10 w-10 rounded-full bg-primary/20"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary border border-white shadow-[0_0_10px_rgba(249,115,22,0.8)] dark:border-slate-900"></span>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap border border-primary/30 opacity-0 group-hover/pin:opacity-100 transition-opacity">
                        Cebu City
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-[82%] left-[64%] group/pin">
                    <div className="relative flex items-center justify-center cursor-pointer">
                      <span className="ripple-effect absolute inline-flex h-14 w-14 rounded-full bg-primary/30"></span>
                      <span className="ripple-effect ripple-delay-1 absolute inline-flex h-10 w-10 rounded-full bg-primary/20"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary border border-white shadow-[0_0_10px_rgba(249,115,22,0.8)] dark:border-slate-900"></span>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap border border-primary/30 opacity-0 group-hover/pin:opacity-100 transition-opacity">
                        Davao City
                      </div>
                    </div>
                  </div>

                  {/* Small random pings */}
                  <div className="absolute top-[18%] left-[45%]">
                    <div className="relative flex items-center justify-center">
                      <span className="ripple-effect absolute inline-flex h-6 w-6 rounded-full bg-primary/40"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                    </div>
                  </div>
                  <div className="absolute top-[42%] left-[34%]">
                    <div className="relative flex items-center justify-center">
                      <span className="ripple-effect ripple-delay-2 absolute inline-flex h-8 w-8 rounded-full bg-primary/40"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                    </div>
                  </div>
                  <div className="absolute top-[65%] left-[42%]">
                    <div className="relative flex items-center justify-center">
                      <span className="ripple-effect absolute inline-flex h-6 w-6 rounded-full bg-primary/40"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                    </div>
                  </div>
                  <div className="absolute top-[75%] left-[55%]">
                    <div className="relative flex items-center justify-center">
                      <span className="ripple-effect ripple-delay-1 absolute inline-flex h-7 w-7 rounded-full bg-primary/40"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                    </div>
                  </div>
                  <div className="absolute top-[88%] left-[48%]">
                    <div className="relative flex items-center justify-center">
                      <span className="ripple-effect absolute inline-flex h-6 w-6 rounded-full bg-primary/40"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trending Skills Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-display px-1">
                  Trending Skills in PH
                </h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-3 bg-card px-4 py-3 rounded-xl border border-border shadow-sm flex-1 min-w-[140px]">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Code className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold leading-tight">
                        Python Dev
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        120+ active openings
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-card px-4 py-3 rounded-xl border border-border shadow-sm flex-1 min-w-[140px]">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                      <PenTool className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold leading-tight">
                        Copywriting
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        85+ active openings
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-card px-4 py-3 rounded-xl border border-border shadow-sm flex-1 min-w-[140px]">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                      <Headset className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold leading-tight">
                        E-commerce VA
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        340+ active openings
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
