"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/auth-context";
import { signupSchema, type SignupFormData } from "../schema/signup-schema";
import { SocialLoginButton } from "./social-login-button";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { SiGmail, SiFacebook } from "react-icons/si";

// Simple icons for social login
const GmailIcon = () => <SiGmail />;
const FacebookIcon = () => <SiFacebook />;

export function FreelancerSignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "freelancer",
    sendHelpfulEmails: false,
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleInputChange = (field: keyof SignupFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form data
      const validatedData = signupSchema.parse(formData);
      
      // Mock signup - create a user object
      const mockUser = {
        id: "1",
        email: validatedData.email,
        name: `${validatedData.firstName} ${validatedData.lastName}`,
        role: validatedData.role,
        avatar: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Login user
      login(mockUser);
      
      // Redirect to freelancer dashboard
      router.push("/freelancer");
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        // Handle validation errors
        const zodError = error as { errors?: Array<{ path: string[]; message: string }> };
        const fieldErrors: Partial<SignupFormData> = {};
        
        zodError.errors?.forEach((err) => {
          if (err.path[0]) {
            const fieldName = err.path[0] as keyof SignupFormData;
            (fieldErrors as Record<string, string>)[fieldName] = err.message;
          }
        });
        
        setErrors(fieldErrors);
      } else {
        console.error("Signup error:", error);
        alert("Signup failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/auth/signup")}
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Role Selection
        </Button>
        <h1 className="text-3xl font-bold text-foreground mb-2">Create your freelancer account</h1>
        <p className="text-muted-foreground">Start finding amazing projects</p>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3 mb-6">
        <SocialLoginButton
          provider="Gmail"
          icon={<GmailIcon />}
          className="transition-all duration-200 hover:shadow-md"
        />
        <SocialLoginButton
          provider="Facebook"
          icon={<FacebookIcon />}
          className="transition-all duration-200 hover:shadow-md"
        />
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className={errors.firstName ? "border-destructive" : ""}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive">{errors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className={errors.lastName ? "border-destructive" : ""}
            />
            {errors.lastName && (
              <p className="text-sm text-destructive">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={errors.password ? "border-destructive pr-10" : "pr-10"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className={errors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sendHelpfulEmails"
              checked={formData.sendHelpfulEmails || false}
              onCheckedChange={(checked) => handleInputChange("sendHelpfulEmails", checked as boolean)}
            />
            <Label htmlFor="sendHelpfulEmails" className="text-sm cursor-pointer">
              Send me helpful emails to find work
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
            />
            <Label htmlFor="agreeToTerms" className="text-sm cursor-pointer">
              Yes, I understand and agree to the{" "}
              <button type="button" className="text-primary hover:underline">
                Juanwork Terms and Policy
              </button>
            </Label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-sm text-destructive">{errors.agreeToTerms}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-11 text-base font-medium transition-all duration-200 hover:shadow-md"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Freelancer Account"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground leading-relaxed">
          This site is protected by reCAPTCHA and the{" "}
          <button type="button" className="text-primary hover:underline">
            Google Privacy Policy
          </button>{" "}
          and{" "}
          <button type="button" className="text-primary hover:underline">
            Terms of Service
          </button>{" "}
          apply.
        </p>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <button 
            type="button"
            className="text-primary hover:underline font-medium"
            onClick={() => router.push("/auth")}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
