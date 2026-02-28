"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FreelancerSignupForm } from "@/features/auth/components";

export default function FreelancerSignupPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = "/images/logo white.png";

  return (
    <main className="flex min-h-screen w-full flex-col md:flex-row">
      <section className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-12 lg:px-20 xl:px-32 bg-background">
        <FreelancerSignupForm />
      </section>

      <section className="hidden md:block w-1/2 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Work from anywhere workspace"
          className="absolute inset-0 w-full h-full object-cover"
          src="https://plus.unsplash.com/premium_photo-1663013333799-4df1b15f605e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-primary/30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

        <div className="absolute top-8 left-8 flex items-center gap-2">
          {mounted && (
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative h-8 w-32 transition-transform duration-200 group-hover:scale-105">
                <Image
                  src={logoSrc}
                  alt="JuanWork Logo"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                  className="transition-opacity duration-200 opacity-90"
                />
              </div>
            </Link>
          )}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-end p-12 lg:p-24 pb-27 lg:pb-27">
          <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/10 w-full max-w-md p-10 rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/30 blur-3xl rounded-full"></div>

            <h2 className="text-4xl font-bold text-white mb-6 leading-[1.1]">
              Elevate your freelance career
            </h2>
            <p className="text-zinc-200 text-lg mb-10 leading-relaxed font-light">
              Connect with top-tier GLOBAL clients and work on projects that
              challenge and inspire you. Your journey starts here.
            </p>

            <div className="flex items-center gap-4 relative z-10">
              <div className="flex -space-x-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="User"
                  className="w-12 h-12 rounded-full border-2 border-zinc-900 object-cover ring-2 ring-white/10"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaY6tUPevho8SVAKxdIsoiom2AAwE_QtlMddfVXxCCrxP6TZgisEMBq36UX3nQ9AxYVpN037JnRFzQDEFOBKT63JMel97S2g7OBVY2vAGt2l3L_-E_OQoe4Zf83xNixwxhPzhJrXapr029j-ydJh89Qj6Rvf-JCeHgy-pn0d2XNUhJKiiGyeKuYM6GDJLh0IfTLeW5FJowKli-YivMgTa0cLgCXNlMQmqxHzc_-ji3OlaXjmFXvnypxYW98kqdPgRBEGKGxm_hwz7K"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="User"
                  className="w-12 h-12 rounded-full border-2 border-zinc-900 object-cover ring-2 ring-white/10"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCthrBdPdzcpo1DVKRkZta3JMOhbBphouebaUo-Rdy8l-bJ40G1MfB8ETFzAstmZoNhITqGMfTN7JKe_3yDPmX3U7KALp_RJP6b2fSJwQ2qaEvhmm-L5_bM7Ct9zG7Ih1ohXxKg3qHFySMWtj-OsgVBRQbDG0VKghmDbMjqdYyrLux03Sypuzim5sMji_9DdmIY7df3wnopXeueI9ywhltfuQIOLVxcCtSZilAKocE9DSFLKDe_dbriUZHUGi7UrjU-tots1YF7NUGl"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="User"
                  className="w-12 h-12 rounded-full border-2 border-zinc-900 object-cover ring-2 ring-white/10"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC68rgO9tjwfzzWVtFKNrwPVK0LNVFI6gM4WEe4HLxUUMDfk9CRLsWDISrFIDA-muCIpoUfCSmrkS8hKlbaIHGVd6IjZYPrunULkwtsQ0_r8wtFQtpHws6WUvjlbuivvLQHE-kOdEeCLV59QRgJZ92Irz7zkEzllcpLmKLlMm7BIWmVuvMWze5KeZSdI0HaE4J2AxYnvx7sUMZGbeoUkh5fFTv8dmEg1TxXUvaNymPyRp95nFddDac8p6EHqEcgfM6VOi9lz7aqqq8P"
                />
              </div>
              <div>
                <div className="text-base font-semibold text-white">
                  Join <span className="text-primary">50,000+</span>
                </div>
                <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                  Active Professionals
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-0 right-0 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/5 text-zinc-300 text-sm shadow-xl">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            1,200+ new jobs posted this week
          </div>
        </div>
      </section>
    </main>
  );
}
