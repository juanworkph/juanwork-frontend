"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building2,
  ArrowLeft,
  Search,
  Megaphone,
  Gavel,
  ClipboardCheck,
  FolderHeart,
  Globe,
  ListPlus,
  UserPlus,
  Users,
  Send,
  BadgeCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SignupPage() {
  const router = useRouter();

  const handleRoleSelection = (role: "freelancer" | "client") => {
    router.push(`/auth/signup/${role}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased font-sans">
      <div className="max-w-[1440px] mx-auto px-6 py-8 lg:px-12">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/auth"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left Column: Role Selection */}
          <div className="lg:col-span-7 flex flex-col">
            <header className="mb-10">
              <h1 className="text-4xl lg:text-5xl font-extrabold uppercase tracking-tight mb-2">
                Select your <span className="text-primary">Role</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Choose the account type that best fits your goals
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              {/* Freelancer Card */}
              <div
                className="group bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => handleRoleSelection("freelancer")}
                tabIndex={0}
                aria-label="Join as a Freelancer"
                onKeyDown={(e) =>
                  e.key === "Enter" && handleRoleSelection("freelancer")
                }
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold uppercase tracking-wide">
                      Freelancer
                    </h3>
                    <p className="text-primary font-semibold text-xs tracking-wider uppercase">
                      Looking for work
                    </p>
                  </div>
                  <div className="bg-primary/10 text-primary p-3 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Briefcase className="h-7 w-7" />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Find projects that match your skills, and grow your
                  professional career globally.
                </p>
                <ul className="space-y-4 mb-8 flex-grow">
                  {[
                    { icon: Search, text: "Browse and apply for projects" },
                    {
                      icon: Megaphone,
                      text: "Post services to attract clients",
                    },
                    { icon: Gavel, text: "Submit bids to compete for work" },
                    {
                      icon: ClipboardCheck,
                      text: "Manage projects and proposals",
                    },
                    {
                      icon: FolderHeart,
                      text: "Build a professional portfolio",
                    },
                    { icon: Globe, text: "Get hired by clients worldwide" },
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <feature.icon className="text-primary h-5 w-5 flex-shrink-0" />
                      <span className="text-sm font-medium leading-tight">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-6 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRoleSelection("freelancer");
                  }}
                >
                  SELECT ROLE
                </Button>
              </div>

              {/* Client Card */}
              <div
                className="group bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => handleRoleSelection("client")}
                tabIndex={0}
                aria-label="Join as a Client"
                onKeyDown={(e) =>
                  e.key === "Enter" && handleRoleSelection("client")
                }
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold uppercase tracking-wide">
                      Client
                    </h3>
                    <p className="text-primary font-semibold text-xs tracking-wider uppercase">
                      Hiring for a project
                    </p>
                  </div>
                  <div className="bg-primary/10 text-primary p-3 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Building2 className="h-7 w-7" />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Find the perfect talent for your business, manage your
                  projects efficiently, and scale your team with top
                  professionals.
                </p>
                <ul className="space-y-4 mb-8 flex-grow">
                  {[
                    {
                      icon: ListPlus,
                      text: "Post projects and discover talent",
                    },
                    { icon: UserPlus, text: "Hire top-rated Freelancers" },
                    { icon: Users, text: "Manage teams seamlessly" },
                    {
                      icon: Send,
                      text: "Submit proposals for custom services",
                    },
                    {
                      icon: BadgeCheck,
                      text: "Review milestones and approve work",
                    },
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <feature.icon className="text-primary h-5 w-5 flex-shrink-0" />
                      <span className="text-sm font-medium leading-tight">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-6 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRoleSelection("client");
                  }}
                >
                  SELECT ROLE
                </Button>
              </div>
            </div>

            <div className="mt-10 text-center lg:text-left">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/auth"
                  className="text-primary font-semibold hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Right Column: Hero Image (Sticky) */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="sticky top-10 h-[calc(100vh-120px)] rounded-[2.5rem] overflow-hidden group shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80"
                alt="Start your journey"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12">
                <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                  Start your Journey
                </h2>
                <p className="text-slate-200 text-lg mb-8 leading-relaxed">
                  Join our community of skilled professionals and ambitious
                  clients building the future together.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="relative h-10 w-10 rounded-full border-2 border-slate-800 overflow-hidden bg-slate-200"
                      >
                        <Image
                          src={`https://i.pravatar.cc/150?u=${i + 10}`}
                          alt={`User ${i}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                    <div className="relative h-10 w-10 rounded-full bg-primary border-2 border-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                      +10k
                    </div>
                  </div>
                  <span className="text-slate-300 text-sm font-medium">
                    Trusted by over 10,000+ professionals
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Hero (Conditional) */}
          <div className="lg:hidden mt-8 mb-4">
            <div className="relative h-64 rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-152202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Team working together"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <h2 className="text-xl font-bold text-white">
                  Start your Journey
                </h2>
                <p className="text-slate-200 text-xs">
                  Join 10,000+ professionals worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
