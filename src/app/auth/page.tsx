"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/features/auth/components";

export default function AuthPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = "/images/logo white.png";

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Column - Hero/Brand (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-b from-[#134e4a] to-[#042f2e] p-12 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative h-8 w-32 transition-transform duration-200 group-hover:scale-105">
                <Image
                  src={logoSrc}
                  alt="JuanWork Logo"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                  className="transition-opacity duration-200"
                />
              </div>
            </Link>
          </div>

          <div className="mt-20">
            <h1 className="text-white text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
              Connecting w/ Top <br />{" "}
              <span className="text-primary">Filipino</span> Talents
            </h1>
            <p className="text-teal-50 text-xl max-w-md leading-relaxed opacity-90">
              Join thousands of Pinoy freelancers and clients building amazing
              projects together on the Philippines' premier gig marketplace.
            </p>
          </div>
        </div>

        {/* Decorative Background Image Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Filipino professionals collaborating"
            className="w-full h-full object-cover mix-blend-overlay"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          />
        </div>

        {/* Social Proof Footer */}
        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative h-10 w-10 rounded-full border-2 border-[#0d4d4f] overflow-hidden bg-slate-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={`User ${i}`}
                    className="w-full h-full object-cover"
                    src={`https://i.pravatar.cc/150?u=${i + 20}`} /* Just some placeholder avatars */
                  />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-[#0d4d4f] bg-primary flex items-center justify-center text-[10px] font-bold text-white">
                +10k
              </div>
            </div>
            <p className="text-teal-50 text-sm font-medium">
              Join 10,000+ Pinoy Professionals
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 bg-background">
        <LoginForm />
      </div>
    </div>
  );
}
