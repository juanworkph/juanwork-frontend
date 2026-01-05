"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/auth-context";
import { signupSchema, type SignupFormData } from "../schema/signup-schema";
import { authService, type RegisterRequest } from "@/services/auth.service";
import { User } from "@/types/user";
import { SocialLoginButton } from "./social-login-button";
import { Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react";
import { SiGmail, SiFacebook } from "react-icons/si";
import { logError } from "@/utils/logger";

// Simple icons for social login
const GmailIcon = () => <SiGmail />;
const FacebookIcon = () => <SiFacebook />;

export function ClientSignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "client",
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

  const handleInputChange = (field: keyof SignupFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
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
      // Validate form data using Zod schema (safeParse doesn't throw)
      const validationResult = signupSchema.safeParse(formData);
      
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
        role: "client", // Ensure role is set to "client"
      };

      // Call authService.register() with transformed data
      const authResponse = await authService.register(registerData);
      
      // Success! Tokens are already stored by authService
      
      // Display success message with email verification notice
      setSuccessMessage(
        authResponse.message || 
        "Registration successful! Please check your email to verify your account."
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
      
      // Redirect to client dashboard after a brief delay to show success message
      setTimeout(() => {
        router.push("/client");
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
          setGeneralError("Unable to connect to server. Please check your internet connection.");
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
        logError("Unexpected error during client signup:", error);
        setGeneralError("An unexpected error occurred. Please try again.");
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Create your client account</h1>
        <p className="text-muted-foreground">Start hiring amazing talent</p>
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
            <p className="text-sm text-green-800 dark:text-green-200">{successMessage}</p>
          </div>
        )}

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
              Send me helpful emails to hire talent
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
            />
            <Label>Yes I understand and agree to the <button type="button" className="text-primary hover:underline">Juanwork Terms and Policy</button></Label>
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
          {isLoading ? "Creating account..." : "Create Client Account"}
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
