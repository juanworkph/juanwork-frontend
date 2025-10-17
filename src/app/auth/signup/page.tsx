"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Building2, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();

  const handleRoleSelection = (role: "freelancer" | "client") => {
    router.push(`/auth/signup/${role}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Role Selection */}
          <div className="flex items-center justify-center p-6 lg:p-8">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/auth")}
                  className="mb-4 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Sign In
                </Button>
                <h1 className="text-3xl font-bold text-foreground mb-2">Choose your role</h1>
                <p className="text-muted-foreground">Select how you'd like to use Juanwork</p>
              </div>

              <div className="space-y-4">
                {/* Freelancer Card */}
                <Card 
                  className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-primary/20"
                  onClick={() => handleRoleSelection("freelancer")}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">I'm a freelancer</CardTitle>
                        <CardDescription>Looking for work</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Browse and apply to projects</li>
                      <li>• Submit proposals and bids</li>
                      <li>• Build your professional portfolio</li>
                      <li>• Get hired by clients worldwide</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Client Card */}
                <Card 
                  className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-primary/20"
                  onClick={() => handleRoleSelection("client")}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">I'm a client</CardTitle>
                        <CardDescription>Hiring for a project</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Post projects and find talent</li>
                      <li>• Hire skilled freelancers</li>
                      <li>• Manage teams and collaborations</li>
                      <li>• Review and approve work</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-primary hover:underline font-medium"
                    onClick={() => router.push("/auth")}
                  >
                    Sign In
                  </Button>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Placeholder Image */}
          <div className="hidden lg:flex items-center justify-center p-8">
            <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-3xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                alt="Team collaboration"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="text-3xl font-bold mb-3">Start your journey</h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  Join our community of skilled professionals and ambitious clients building the future together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
