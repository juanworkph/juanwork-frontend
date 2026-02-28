"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ClientSignupForm } from "@/features/auth/components";

export default function ClientSignupPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = "/images/logo white.png";

  return (
    <main className="flex min-h-screen w-full flex-col lg:flex-row bg-background">
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 lg:px-16">
        <ClientSignupForm />
      </section>

      <section className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Professional collaboration"
          className="absolute inset-0 w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLNbqTrEYwBPh4LCcv9AqS_S_Rkx6RMfi9661dNIXRwPpMWl6On3evIJuUbtTZflVXUuiVFOSzNxNWXPnpcyQxpa0YxPaWK78SPqirYYhqRTj87jUIMxImvEeIbksky-3c0W8vbx8Q9Mpx7MdgI9TDgWAMiimMrYtVgQbG2q8pqyepfCeR-4EWUQbcE-tgF3oy6YH7kjgPZXUp6H5tDgpFP7XdD4KUj-p0JZgfJzzFh8qTsKvhefNNa98aYiSrfo_twbY1ejbPAKph"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(9, 9, 11, 0.9) 0%, rgba(249, 115, 22, 0.1) 100%)",
          }}
        ></div>

        <div className="absolute top-12 left-16 flex items-center gap-2">
          {mounted && (
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative h-10 w-40 transition-transform duration-200 group-hover:scale-105">
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
          )}
        </div>

        <div className="absolute bottom-20 left-16 right-16 space-y-6">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-white leading-tight">
              Hire top talent
            </h2>
            <p className="text-xl text-zinc-300 max-w-md leading-relaxed font-light">
              Connect with skilled professionals and build your next great
              project together. Join the world's most innovative freelance
              marketplace.
            </p>
          </div>
          <div className="flex items-center space-x-4 pt-4">
            <div className="flex -space-x-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Avatar 1"
                className="inline-block h-12 w-12 rounded-full border-4 border-zinc-900 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5W0TaS7GcOG-uBYI3KF_97E8rpqJwCTPg8IT3guy5DTCUQJxD37TMSngmOImzSFA_NoSR82BdZdmaQOjVkaShF2ngM8Y-DuxlovqktopyVT_KISvblBQBiYxpA0BVzteUXHsYftfz4Fg_ZJsyTl4drmF0h8zYt7dpvG5mfeEBhZjYziqY54xkEBgzl4GiLqzNK8z6qKOpH9wMtAQTpkVQi_sn9s3vz2wjOKk-ehcTl_hIvHiX4syVl3ebilmVIodmdkna_TDLlWBv"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Avatar 2"
                className="inline-block h-12 w-12 rounded-full border-4 border-zinc-900 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAuJpU7Wku-eULabLelrjNYjHF-xmDP7TKsQVMKqeVPsglZdukF-NXRLC3BATxJzUhPn9qpb_jy0GmJFk5v1jboh8bNksmEY1A1AGHqRitJXxYvKxNbCPtkkSS6MMTuTSqxv4-uPWWMtqZgwE7PRTi3EyPLLLbFf-48QVpfrC2WsIvrKxfz-AuRerbPFC9QBsIvFjh83IEeGeekx2JgKlbfRNeO9sOMApVTTMemff94doxfN22-fCGhYeRTMbnvAPYqp-uNC6J6u0x"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Avatar 3"
                className="inline-block h-12 w-12 rounded-full border-4 border-zinc-900 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqFX6jWHbgSaOCuelA-w9VyaTkV4pBjKZUp5rvF4heAJXvc75Mj9FwEMtpN-xK2p2KbBhgq0hLWM53q6cFzrA_E7vlT1mzq4pTpW-dnVbzrc0Fz0LE9JQQE2xAOG1RE0D1pOalniBz8j46QqYkAnjJ5jPoGrYGDWwXU8_BEDstx9v3qaMBoPVKvb6s3LNPVPyWklVZ9xNKKTaBtRQ2fUKCZLPWLCzjdW4ueiWF9AOXgNHQiMf2kjpEi3G-IACBoBaOLsFJQiY3x5yJ"
              />
              <div className="flex items-center justify-center h-12 w-12 rounded-full border-4 border-zinc-900 bg-primary text-white text-xs font-bold relative z-10">
                +10k
              </div>
            </div>
            <span className="text-white font-medium">
              Trusted by 10,000+ businesses
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
