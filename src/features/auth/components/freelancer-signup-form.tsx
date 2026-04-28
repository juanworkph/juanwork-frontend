"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/auth-context";
import {
  signupSchema,
  type SignupFormData,
  type RegisterRequest,
} from "../schema/auth";
import { registerUser } from "@/features/auth/actions/auth";
import { User } from "@/types/user";
import { SocialLoginButton } from "./social-login-button";
import { Eye, EyeOff, ArrowLeft, CheckCircle2, Chromium } from "lucide-react";
import { SiFacebook } from "react-icons/si";
import { logError } from "@/utils/logger";

// Simple icons for social login
const GmailIcon = () => <Chromium />;
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
  const [generalError, setGeneralError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleInputChange = (
    field: keyof SignupFormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    // Clear general error when user makes changes
    if (generalError) {
      setGeneralError("");
    }
    // Clear success message when user makes changes
    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneralError("");
    setSuccessMessage("");
    setErrors({});

    try {
      // Auto-sync confirmPassword to match password to satisfy Zod schema without a UI field
      const dataToValidate = {
        ...formData,
        confirmPassword: formData.password,
      };
      const validationResult = signupSchema.safeParse(dataToValidate);

      if (!validationResult.success) {
        // Handle validation errors
        const fieldErrors: Partial<SignupFormData> = {};
        validationResult.error.issues.forEach((err) => {
          if (err.path && err.path[0]) {
            const fieldName = err.path[0] as keyof SignupFormData;
            (fieldErrors as Record<string, string>)[fieldName] = err.message;
          }
        });
        setErrors(fieldErrors);
        setIsLoading(false);
        return;
      }

      // Transform SignupFormData to RegisterRequest
      // Remove frontend-only fields: confirmPassword and agreeToTerms
      const registerData: RegisterRequest = {
        firstName: validationResult.data.firstName,
        lastName: validationResult.data.lastName,
        email: validationResult.data.email,
        password: validationResult.data.password,
        role: validationResult.data.role,
      };

      // Call registerUser() with transformed data
      const authResponse = await registerUser(registerData);

      // Success! Tokens are already stored by registerUser

      // Display success message with email verification notice
      setSuccessMessage(
        authResponse.message ||
          "Registration successful! Please check your email to verify your account.",
      );

      // Convert AuthUserData to User format for Auth Context
      const user: User = {
        id: authResponse.user.id,
        email: authResponse.user.email,
        name: `${authResponse.user.firstName} ${authResponse.user.lastName}`,
        role: authResponse.user.role,
        avatar: null,
        balance: 0,
        createdAt: authResponse.user.createdAt,
        updatedAt: authResponse.user.updatedAt,
      };

      // Update Auth Context with user data
      login(user);

      // Redirect to freelancer dashboard after a brief delay to show success message
      setTimeout(() => {
        router.push("/freelancer");
      }, 1500);
    } catch (error: unknown) {
      // Handle API errors from authService
      if (error instanceof Error) {
        const errorMessage = error.message;

        // Log all errors to console for debugging (sensitive data redacted in production)
        logError("Registration error:", {
          message: errorMessage,
          error: error,
        });

        // Categorize and display errors appropriately

        // Check for duplicate email error
        if (errorMessage.includes("already exists")) {
          setErrors({ email: "An account with this email already exists" });
        }
        // Check for password strength errors
        else if (
          errorMessage.toLowerCase().includes("password") &&
          (errorMessage.toLowerCase().includes("must") ||
            errorMessage.toLowerCase().includes("require") ||
            errorMessage.toLowerCase().includes("character") ||
            errorMessage.toLowerCase().includes("uppercase") ||
            errorMessage.toLowerCase().includes("lowercase") ||
            errorMessage.toLowerCase().includes("number"))
        ) {
          setErrors({ password: errorMessage });
        }
        // Check for network errors
        else if (errorMessage.includes("Unable to connect")) {
          setGeneralError(
            "Unable to connect to server. Please check your internet connection.",
          );
        }
        // Check for server errors
        else if (errorMessage.includes("Something went wrong")) {
          setGeneralError("Something went wrong. Please try again later.");
        }
        // Handle other validation or field-specific errors
        else if (
          errorMessage.toLowerCase().includes("email") ||
          errorMessage.toLowerCase().includes("first") ||
          errorMessage.toLowerCase().includes("last") ||
          errorMessage.toLowerCase().includes("name")
        ) {
          // Try to map to appropriate field, default to general error
          if (errorMessage.toLowerCase().includes("email")) {
            setErrors({ email: errorMessage });
          } else if (errorMessage.toLowerCase().includes("first")) {
            setErrors({ firstName: errorMessage });
          } else if (errorMessage.toLowerCase().includes("last")) {
            setErrors({ lastName: errorMessage });
          } else {
            setGeneralError(errorMessage);
          }
        }
        // Default: display as general error
        else {
          setGeneralError(errorMessage);
        }
      }
      // Fallback for unexpected errors
      else {
        logError("Unexpected error during freelancer signup:", error);
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px]">
      <div className="mb-10">
        <Link
          href="/auth/signup"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Role Selection
        </Link>
        <h1 className="text-4xl font-bold tracking-tight mb-3 text-foreground">
          Find your next project
        </h1>
        <p className="text-muted-foreground text-lg">
          Join thousands of freelancers building amazing careers in the
          Philippines.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {generalError && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{generalError}</p>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800 dark:text-green-200">
              {successMessage}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium">
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Juan"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className={errors.firstName ? "border-destructive" : ""}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive">{errors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium">
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Dela Cruz"
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
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="juan@example.ph"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
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
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password}</p>
          )}
        </div>

        <div className="space-y-4 pt-1">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="pt-0.5">
              <Checkbox
                id="sendHelpfulEmails"
                checked={formData.sendHelpfulEmails || false}
                onCheckedChange={(checked) =>
                  handleInputChange("sendHelpfulEmails", checked as boolean)
                }
              />
            </div>
            <span className="text-sm text-muted-foreground leading-snug">
              Send me helpful emails to find work and industry tips.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="pt-0.5">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  handleInputChange("agreeToTerms", checked as boolean)
                }
              />
            </div>
            <span className="text-sm text-muted-foreground leading-snug">
              Yes I understand and agree to the{" "}
              <Link href="#" className="text-primary hover:underline">
                Terms and Conditions
              </Link>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-sm text-destructive">{errors.agreeToTerms}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full py-3.5 px-4 h-auto font-semibold rounded-md shadow-lg shadow-orange-950/20 transition-all active:scale-[0.99] mt-2 group relative overflow-hidden"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink mx-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Or continue with
          </span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SocialLoginButton
            provider="Google"
            icon={<GmailIcon />}
            className="transition-all duration-200 hover:bg-accent"
          />
          <SocialLoginButton
            provider="Facebook"
            icon={<FacebookIcon />}
            className="transition-all duration-200 hover:bg-accent"
          />
        </div>

        <div className="text-center pt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth"
              className="text-primary font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
