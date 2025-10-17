import { FreelancerSignupForm } from "@/features/auth/components";
import Image from "next/image";

export default function FreelancerSignupPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Freelancer Signup Form */}
          <div className="flex items-center justify-center p-6 lg:p-8">
            <div className="w-full max-w-md">
              <FreelancerSignupForm />
            </div>
          </div>

          {/* Right Column - Placeholder Image */}
          <div className="hidden lg:flex items-center justify-center p-8">
            <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-3xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                alt="Freelancer workspace"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="text-3xl font-bold mb-3">Start freelancing</h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  Join thousands of freelancers building amazing projects and growing their careers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
